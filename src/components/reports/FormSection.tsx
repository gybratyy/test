import { observer } from 'mobx-react-lite';
import { reportStore } from '../../ReportStore';


export const FormSection = observer(({ activeSection, setActiveSection }: {
    activeSection: 'static' | 'trips' | 'parking';
    setActiveSection: (section: 'static' | 'trips' | 'parking') => void;
}) => {
    return (
        <div className="w-full h-full p-6 bg-white border border-gray-200 rounded-lg flex flex-col">
            <h2 className="text-xl text-gray-800 mb-6">Генератор отчета</h2>
            <div className="space-y-4 mb-6">
                <div>
                    <label htmlFor="startTime" className="block text-sm text-gray-600 mb-2">
                        От (Дата и время начала)
                    </label>
                    <input
                        type="datetime-local"
                        id="startTime"
                        value={reportStore.startTime}
                        onChange={(e) => reportStore.setStartTime(e.target.value)}
                        className="w-full p-3 rounded-lg bg-white text-gray-700 border border-gray-300 focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
                    />
                </div>
                <div>
                    <label htmlFor="endTime" className="block text-sm text-gray-600 mb-2">
                        До (Дата и время окончания)
                    </label>
                    <input
                        type="datetime-local"
                        id="endTime"
                        value={reportStore.endTime}
                        onChange={(e) => reportStore.setEndTime(e.target.value)}
                        className="w-full p-3 rounded-lg bg-white text-gray-700 border border-gray-300 focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
                    />
                </div>
            </div>

            <button
                onClick={reportStore.fetchReport}
                disabled={reportStore.loading}
                className="w-full py-3 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-400 disabled:bg-gray-300 disabled:cursor-not-allowed mb-4"
            >
                {reportStore.loading ? 'Загрузка...' : 'Получить отчёт'}
            </button>

            {reportStore.error && (
                <div className="p-3 bg-red-25 text-red-600 border border-red-200 rounded-lg mb-4">
                    {reportStore.error}
                </div>
            )}

            {reportStore.reportData && (
                <div className="flex-1 min-h-0">
                    <h3 className="text-base text-gray-700 mb-3">Разделы отчета</h3>
                    <div className="space-y-2">
                        <button
                            onClick={() => setActiveSection('static')}
                            className={`w-full py-3 px-4 rounded-lg ${
                                activeSection === 'static'
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            Общие данные
                        </button>
                        <button
                            onClick={() => setActiveSection('trips')}
                            className={`w-full py-3 px-4 rounded-lg ${
                                activeSection === 'trips'
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            Поездки
                        </button>
                        <button
                            onClick={() => setActiveSection('parking')}
                            className={`w-full py-3 px-4 rounded-lg ${
                                activeSection === 'parking'
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            Парковки
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
});