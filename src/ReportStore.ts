import { makeAutoObservable, runInAction } from 'mobx';
import axios from 'axios';
import * as polyline from 'google-polyline';


export interface ReportItem {
    type: string;
    name: string;
    header: string[];
    rows: any[][];
    footer?: string[];
    route?: string;
}

export interface ReportData {
    static: [string, string][];
    items: ReportItem[];
}

export type Coordinates = [number, number];

class ReportStore {
    startTime = '';
    endTime = '';
    reportData: ReportData | null = null;
    loading = false;
    error: string | null = null;
    routeToShow: Coordinates[] | null = null;

    constructor() {
        makeAutoObservable(this);
    }


    setStartTime = (time: string) => {
        this.startTime = time;
    };

    setEndTime = (time: string) => {
        this.endTime = time;
    };

    setRouteToShow = (routeString: string) => {
        if (!routeString) {
            this.routeToShow = null;
            return;
        }
        try {
            this.routeToShow =  polyline.decode(routeString) as Coordinates[];
            console.log('routeToShow:', this.routeToShow);
        } catch (e) {
            console.error('Не удалось декодировать polyline:', e);
            this.routeToShow = null;
        }
    };

    fetchReport = async () => {
        if (!this.startTime || !this.endTime) {
            this.error = 'Пожалуйста, выберите время начала и окончания.';
            return;
        }

        const fromTimestamp = Math.floor(new Date(this.startTime).getTime() / 1000);
        const toTimestamp = Math.floor(new Date(this.endTime).getTime() / 1000);

        if (fromTimestamp >= toTimestamp) {
            this.error = 'Время начала должно быть раньше времени окончания.';
            return;
        }

        this.loading = true;
        this.error = null;
        this.reportData = null;
        this.routeToShow = null;

         const API_URL = 'http://localhost:3001/api/v2/report/5257/';
         const requestBody = {
            "id": 5257,
            "name": "Aieke",
            "type": "analyze",
            "format": "json",
            "isGroup": false,
            "typeGroup": "unit",
            "to": toTimestamp,
            "from": fromTimestamp,
            "threshold1": 60,
            "threshold2": 90
        }

         try {
             const response = await axios.post<ReportData>(API_URL, requestBody, {
                 headers: {
                     'Content-Type': 'application/json',
                 },
             });

             runInAction(() => {
                 this.reportData = response.data;
                 this.loading = false;
                 const tripItem = response.data.items.find(item => item.type === 'trip' && item.route);
                 if (tripItem && tripItem.route) {
                     this.setRouteToShow(tripItem.route);
                 }
             });
         } catch (err) {
              console.error('Ошибка при загрузке отчета:', err);
         }
    };
}

export const reportStore = new ReportStore();