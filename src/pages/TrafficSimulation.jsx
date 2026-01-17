import { useState, useEffect } from 'react'
import Car from '../components/Car'
import TrafficLight from '../components/TrafficLight'

const TrafficSimulation = ({ lightStates, autoMode, setAutoMode, setLightStates, cars, setCars, totalViolations, setTotalViolations }) => {
  // Auto traffic light cycling
  useEffect(() => {
    if (!autoMode) return

    const lightCycle = setInterval(() => {
      setLightStates(prev => {
        const lights = Object.keys(prev)
        const newStates = {}
        
        lights.forEach((light) => {
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
    }, 4000)

    return () => clearInterval(lightCycle)
  }, [autoMode, setLightStates])

  // Update car positions and detect violations
  useEffect(() => {
    const carInterval = setInterval(() => {
      setCars(prevCars => {
        let violations = 0
        const updatedCars = prevCars.map(car => {
          const currentLight = lightStates[`light${car.lane}`]
          let newPosition = car.position
          let isViolating = false
          let newViolations = car.violations

          if (currentLight === 'green') {
            newPosition += car.speed
            isViolating = false
          } else if (currentLight === 'yellow') {
            newPosition += car.speed * 0.3
            isViolating = false
          } else if (currentLight === 'red') {
            // Red light - detect violations
            if (car.position >= -5 && car.position <= 2) {
              newPosition += car.speed * 0.5 // Car still moves slightly (violation)
              isViolating = true
              newViolations += 0.02 // Increment violation counter smoothly
            } else {
              newPosition = car.position // Stop completely
              isViolating = false
            }
          }

          // Reset position when car goes off screen
          if (newPosition > 105) {
            newPosition = -60
            newViolations = 0
          }

          violations += Math.floor(newViolations)
          return { ...car, position: newPosition, violations: Math.floor(newViolations), isViolating }
        })
        
        setTotalViolations(violations)
        return updatedCars
      })
    }, 50)

    return () => clearInterval(carInterval)
  }, [lightStates])

  const handleAddCar = () => {
    const newId = Math.max(...cars.map(c => c.id), 0) + 1
    const randomLane = Math.floor(Math.random() * 3) + 1
    setCars([...cars, {
      id: newId,
      lane: randomLane,
      position: -60,
      speed: 1 + Math.random() * 0.8,
      violations: 0,
      isViolating: false
    }])
  }

  const handleRemoveCar = (id) => {
    if (cars.length > 1) {
      setCars(cars.filter(car => car.id !== id))
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-6 border-b-2 border-gray-200">
        <label className="flex items-center gap-3 text-lg font-semibold text-slate-700 cursor-pointer">
          <input 
            type="checkbox" 
            checked={autoMode}
            onChange={(e) => setAutoMode(e.target.checked)}
            className="w-5 h-5 cursor-pointer"
          />
          Auto Mode
        </label>
        <button 
          onClick={handleAddCar}
          className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
        >
          + Add Car
        </button>
      </div>

      {/* Main Content */}
      <div className="w-full mb-8">
        {/* Traffic Lights Row - Top */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {[1, 2, 3].map(laneNum => (
            <div key={`light-${laneNum}`} className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-3xl border-4 border-blue-600 shadow-2xl">
              <h3 className="text-center font-bold text-slate-800 mb-6 text-2xl">Lane {laneNum}</h3>
              <div className="flex justify-center">
                <TrafficLight state={lightStates[`light${laneNum}`]} />
              </div>
            </div>
          ))}
        </div>

        {/* Roads Row - Below Signals */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map(laneNum => (
            <div key={`lane-${laneNum}`} className="bg-gradient-to-r from-gray-100 to-gray-50 rounded-3xl overflow-hidden border-4 border-gray-400 shadow-2xl">
              {/* Lane Header */}
              <div className="bg-slate-800 text-white px-6 py-3 flex justify-between items-center">
                <span className="font-bold text-xl">Road {laneNum}</span>
                <span className={`px-4 py-2 rounded-full text-lg font-bold shadow-md ${
                  lightStates[`light${laneNum}`] === 'red' ? 'bg-red-500 animate-pulse' :
                  lightStates[`light${laneNum}`] === 'yellow' ? 'bg-yellow-500 animate-pulse' :
                  'bg-green-500'
                }`}>
                  {lightStates[`light${laneNum}`].toUpperCase()}
                </span>
              </div>

              {/* Lane - Big Road */}
              <div className="relative bg-gradient-to-b from-gray-100 to-gray-50 border-t-4 border-gray-400 overflow-hidden" style={{
                height: '70rem',
                backgroundImage: `
                  repeating-linear-gradient(
                    180deg,
                    transparent 0,
                    transparent 20px,
                    #ffff00 20px,
                    #ffff00 30px
                  )
                `
              }}>
                {cars.filter(car => car.lane === laneNum).map(car => (
                  <Car 
                    key={car.id} 
                    car={car}
                    isMoving={lightStates[`light${car.lane}`] !== 'red'}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TrafficSimulation