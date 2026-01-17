import { useState } from 'react'
import './App.css'
import TrafficSimulation from './pages/TrafficSimulation'
import ControlPanel from './pages/ControlPanel'
import CarDetails from './pages/CarDetails'

function App() {
  const [currentPage, setCurrentPage] = useState('simulation')
  const [lightStates, setLightStates] = useState({
    light1: 'red',
    light2: 'yellow',
    light3: 'green'
  })
  const [autoMode, setAutoMode] = useState(true)
  const [cars, setCars] = useState([
    { id: 1, lane: 1, position: -50, speed: 1.2, violations: 0, isViolating: false },
    { id: 2, lane: 1, position: -150, speed: 1.5, violations: 0, isViolating: false },
    { id: 3, lane: 2, position: -80, speed: 1.3, violations: 0, isViolating: false },
    { id: 4, lane: 2, position: -180, speed: 1.4, violations: 0, isViolating: false },
    { id: 5, lane: 3, position: -120, speed: 1.1, violations: 0, isViolating: false },
    { id: 6, lane: 3, position: -200, speed: 1.6, violations: 0, isViolating: false },
  ])
  const [totalViolations, setTotalViolations] = useState(0)

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-500 via-indigo-600 to-purple-700">
      {/* Navigation Bar */}
      <nav className="bg-gradient-to-r from-slate-700 to-slate-800 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <h1 className="text-2xl sm:text-3xl font-bold">🚗 Traffic Light Simulator</h1>
            <div className="flex gap-3">
              <button 
                onClick={() => setCurrentPage('simulation')}
                className={`px-4 sm:px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  currentPage === 'simulation' 
                    ? 'bg-blue-500 text-white shadow-lg' 
                    : 'border-2 border-white text-white hover:bg-white hover:text-slate-700'
                }`}
              >
                Simulation
              </button>
              <button 
                onClick={() => setCurrentPage('details')}
                className={`px-4 sm:px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  currentPage === 'details' 
                    ? 'bg-blue-500 text-white shadow-lg' 
                    : 'border-2 border-white text-white hover:bg-white hover:text-slate-700'
                }`}
              >
                Car Details
              </button>
              <button 
                onClick={() => setCurrentPage('control')}
                className={`px-4 sm:px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  currentPage === 'control' 
                    ? 'bg-blue-500 text-white shadow-lg' 
                    : 'border-2 border-white text-white hover:bg-white hover:text-slate-700'
                }`}
              >
                Control Panel
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8">
        {currentPage === 'simulation' ? (
          <TrafficSimulation 
            lightStates={lightStates} 
            autoMode={autoMode}
            setAutoMode={setAutoMode}
            setLightStates={setLightStates}
            cars={cars}
            setCars={setCars}
            totalViolations={totalViolations}
            setTotalViolations={setTotalViolations}
          />
        ) : currentPage === 'details' ? (
          <CarDetails 
            cars={cars}
            totalViolations={totalViolations}
          />
        ) : (
          <ControlPanel 
            lightStates={lightStates}
            setLightStates={setLightStates}
            autoMode={autoMode}
            setAutoMode={setAutoMode}
          />
        )}
      </main>
    </div>
  )
}

export default App
