import { observer } from 'mobx-react-lite';
import { reportStore } from '../../ReportStore';
import {Table} from './Table';
import {MapDisplay} from './MapDisplay';

export const DataSection = observer(({ activeSection }: { activeSection: 'static' | 'trips' | 'parking' }) => {
    const data = reportStore.reportData;

    const renderContent = () => {
        if (reportStore.loading) {
            return <div className="text-blue-500 p-6 text-center">Загрузка отчета...</div>;
        }
        if (!data) return <div className="text-gray-400 p-6 text-center">Нет данных для отображения</div>;

        switch (activeSection) {
            case 'static': {
                return (
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 className="text-lg mb-4 text-gray-700">Общие данные</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {data.static.map(([key, value]) => (
                                <div key={key} className="p-3 bg-gray-50 rounded-lg">
                                    <div className="text-sm text-gray-500">{key}</div>
                                    <div className="text-gray-700">{String(value)}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            }
            case 'trips': {
                const tripsItem = data.items.find(item => item.type === 'trip');
                return tripsItem ? (
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 className="text-lg mb-4 text-gray-700">{tripsItem.name}</h3>
                        <Table headers={tripsItem.header} rows={tripsItem.rows} />
                        {tripsItem.footer && (
                            <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                                <div className="text-sm text-gray-600 mb-2">Итог:</div>
                                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                    {tripsItem.footer.map((val, idx) => (
                                        val && val.trim() !== '--' && val.trim() !== '' &&
                                        <span key={idx} className="bg-white px-2 py-1 rounded border border-gray-200">
                                            {tripsItem.header[idx]}: {val}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ) : <div className="text-gray-400 p-6 text-center">Данные о поездках не найдены</div>;
            }
            case 'parking': {
                const parkingItem = data.items.find(item => item.type === 'parking');
                return parkingItem ? (
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 className="text-lg mb-4 text-gray-700">{parkingItem.name}</h3>
                        <Table headers={parkingItem.header} rows={parkingItem.rows} />
                        {parkingItem.footer && (
                            <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                                <div className="text-sm text-gray-600 mb-2">Итог:</div>
                                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                    {parkingItem.footer.map((val, idx) => (
                                        val && val.trim() !== '--' && val.trim() !== '' &&
                                        <span key={idx} className="bg-white px-2 py-1 rounded border border-gray-200">
                                            {parkingItem.header[idx]}: {val}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ) : <div className="text-gray-400 p-6 text-center">Данные о парковках не найдены</div>;
            }
            default:
                return null;
        }
    };

    return (
        <div className="h-full flex flex-col space-y-4">
            <div className="h-64 flex-shrink-0">
                <MapDisplay />
            </div>
            <div className="flex-1 overflow-auto min-h-0">
                {renderContent()}
            </div>
        </div>
    );
});
