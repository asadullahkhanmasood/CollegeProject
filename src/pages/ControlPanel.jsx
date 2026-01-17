import { useState } from 'react'
import TrafficLight from '../components/TrafficLight'

const ControlPanel = ({ lightStates, setLightStates, autoMode, setAutoMode }) => {
  const handleLightChange = (light, newState) => {
    setLightStates(prev => ({
      ...prev,
      [light]: newState
    }))
  }

  const handleAutoModeToggle = (e) => {
    setAutoMode(e.target.checked)
  }

  const allGreen = () => {
    setLightStates({
      light1: 'green',
      light2: 'green',
      light3: 'green'
    })
  }

  const allRed = () => {
    setLightStates({
      light1: 'red',
      light2: 'red',
      light3: 'red'
    })
  }

  const cycleNext = () => {
    setLightStates(prev => {
      const lights = Object.keys(prev)
      const newStates = {}
      
      lights.forEach(light => {
        if (prev[light] === 'red') {
          newStates[light] = 'green'
        } else if (prev[light] === 'green') {
          newStates[light] = 'yellow'
        } else {
          newStates[light] = 'red'
        }
      })
      
      return newStates
    })
  }

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 pb-8 border-b-4 border-gray-200">
        <h2 className="text-3xl font-bold text-slate-700">Traffic Light Control Panel</h2>
        <label className="flex items-center gap-3 text-lg font-semibold cursor-pointer px-4 py-2 bg-gray-50 rounded-lg border-2 border-gray-200 hover:bg-gray-100 transition-colors">
          <input 
            type="checkbox" 
            checked={autoMode}
            onChange={handleAutoModeToggle}
            className="w-6 h-6 cursor-pointer"
          />
          <span>{autoMode ? '🟢 Auto Mode' : '🔴 Manual Mode'}</span>
        </label>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <button 
          onClick={allGreen}
          className="px-6 py-4 bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-bold text-lg rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
        >
          🟢 All Green
        </button>
        <button 
          onClick={allRed}
          className="px-6 py-4 bg-gradient-to-r from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 text-white font-bold text-lg rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
        >
          🔴 All Red
        </button>
        <button 
          onClick={cycleNext}
          className="px-6 py-4 bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white font-bold text-lg rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
        >
          ⏭️ Next Cycle
        </button>
      </div>

      {/* Light Controls Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {['light1', 'light2', 'light3'].map((lightKey, index) => {
          const laneNum = index + 1
          return (
            <div key={lightKey} className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border-2 border-gray-300 shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold text-slate-700 mb-6 text-center">Lane {laneNum} Light</h3>
              
              {/* Light Display */}
              <div className="flex justify-center mb-6">
                <TrafficLight state={lightStates[lightKey]} />
              </div>

              {/* Current State */}
              <div className="text-center p-4 bg-white rounded-lg mb-6 border-2 border-gray-200">
                <p className="text-gray-600 text-sm">Current State</p>
                <p className="text-2xl font-bold text-slate-700">{lightStates[lightKey].toUpperCase()}</p>
              </div>

              {/* Buttons */}
              <div className="grid grid-cols-3 gap-2">
                <button 
                  onClick={() => handleLightChange(lightKey, 'red')}
                  disabled={autoMode}
                  className={`py-3 rounded-lg font-semibold transition-all duration-300 ${
                    lightStates[lightKey] === 'red'
                      ? 'bg-red-500 text-white shadow-lg'
                      : 'border-2 border-red-500 text-red-500 hover:bg-red-50'
                  } ${autoMode ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  🔴
                </button>
                <button 
                  onClick={() => handleLightChange(lightKey, 'yellow')}
                  disabled={autoMode}
                  className={`py-3 rounded-lg font-semibold transition-all duration-300 ${
                    lightStates[lightKey] === 'yellow'
                      ? 'bg-yellow-500 text-white shadow-lg'
                      : 'border-2 border-yellow-500 text-yellow-600 hover:bg-yellow-50'
                  } ${autoMode ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  🟡
                </button>
                <button 
                  onClick={() => handleLightChange(lightKey, 'green')}
                  disabled={autoMode}
                  className={`py-3 rounded-lg font-semibold transition-all duration-300 ${
                    lightStates[lightKey] === 'green'
                      ? 'bg-green-500 text-white shadow-lg'
                      : 'border-2 border-green-500 text-green-600 hover:bg-green-50'
                  } ${autoMode ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  🟢
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Information */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-xl border-l-4 border-blue-500">
        <h3 className="text-xl font-bold text-slate-700 mb-4">ℹ️ Information</h3>
        <ul className="space-y-3 text-slate-700">
          <li className="flex items-start gap-3">
            <span className="text-green-500 font-bold mt-1">✓</span>
            <span>Auto Mode: Cycles through traffic lights every 4 seconds</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-green-500 font-bold mt-1">✓</span>
            <span>Manual Mode: Control each light individually</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-green-500 font-bold mt-1">✓</span>
            <span>Cars stop on red, slow on yellow, and move on green</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-green-500 font-bold mt-1">✓</span>
            <span>Each car has a unique ID and different speed</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default ControlPanel