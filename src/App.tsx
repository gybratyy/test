import React from 'react';
import 'leaflet/dist/leaflet.css';
import './App.css';
import {FormSection, DataSection} from "./components";




function App() {
    const [activeSection, setActiveSection] = React.useState<'static' | 'trips' | 'parking'>('static');

    return (
        <div className="h-screen bg-gray-50 flex flex-col">
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-5 gap-4 p-4 min-h-0">
                <div className="lg:col-span-1 min-h-0">
                    <FormSection activeSection={activeSection} setActiveSection={setActiveSection} />
                </div>

                <div className="lg:col-span-4 min-h-0">
                    <DataSection activeSection={activeSection} />
                </div>
            </div>
        </div>
    )
}

export default App
