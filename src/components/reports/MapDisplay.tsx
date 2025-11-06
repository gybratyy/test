import { observer } from 'mobx-react-lite';
import { reportStore } from '../../ReportStore';
import {MapContainer, TileLayer, Polyline, useMap} from 'react-leaflet';
import { LatLngBounds } from 'leaflet';
import type { LatLngExpression } from 'leaflet';


function ChangeView({ bounds }: { bounds: LatLngBounds }) {
    const map = useMap();
    map.fitBounds(bounds, { padding: [50, 50] });
    return null;
}

export const MapDisplay = observer(() => {
    const defaultPosition: LatLngExpression = [43.2389, 76.8897]; // Алматы
    const route = reportStore.routeToShow;

    let bounds: LatLngBounds | null = null;
    if (route && route.length > 0) {
        bounds = new LatLngBounds(route as LatLngExpression[]);
    }

    return (
        <div className="h-full w-full border border-gray-200 rounded-lg overflow-hidden bg-white">
            <MapContainer
                center={defaultPosition}
                zoom={10}
                className="h-full w-full"
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {route && <Polyline positions={route as LatLngExpression[]} color="blue" />}
                {bounds && <ChangeView bounds={bounds} />}
            </MapContainer>
        </div>
    );
});
