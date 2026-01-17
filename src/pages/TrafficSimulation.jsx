import { useState, useEffect } from 'react'
import Car from '../components/Car'
import TrafficLight from '../components/TrafficLight'

const TrafficSimulation = ({ lightStates, autoMode, setAutoMode, setLightStates, cars, setCars, totalViolations, setTotalViolations, violationRecord, setViolationRecord }) => {
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
        const newViolationRecord = []
        
        // Zebra crossing position is at 71% of the road (20rem from bottom)
        const zebraCrossingPos = 71
        const stopDistance = 2 // Minimum distance between cars (in position percentage)
        
        const updatedCars = prevCars.map((car, index) => {
          const currentLight = lightStates[`light${car.lane}`]
          let newPosition = car.position
          let isViolating = false
          let newViolations = car.violations

          // Get all cars in the same lane ahead of current car
          const carsAheadInLane = prevCars
            .filter(c => c.lane === car.lane && c.position > car.position)
            .sort((a, b) => a.position - b.position)
          
          // Find the nearest car ahead
          const nearestCarAhead = carsAheadInLane.length > 0 ? carsAheadInLane[0] : null
          const maxPositionBeforeCar = nearestCarAhead ? nearestCarAhead.position - stopDistance : 120 // Allow cars to go to 120 if no car ahead

          if (currentLight === 'green') {
            // On green light, cars can move freely past zebra crossing
            newPosition += car.speed
            isViolating = false
            
            // Don't exceed the nearest car ahead
            if (nearestCarAhead && newPosition > maxPositionBeforeCar) {
              newPosition = maxPositionBeforeCar
            }
          } else if (currentLight === 'yellow') {
            // On yellow, slow down but still move a bit
            newPosition += car.speed * 0.3
            isViolating = false
            
            // Slow down approaching zebra crossing
            if (newPosition > zebraCrossingPos) {
              newPosition = zebraCrossingPos
            }
          } else if (currentLight === 'red') {
            // Red light - must stop at zebra crossing
            // Rule violators are more aggressive and go through red lights
            const violationThreshold = car.isRuleViolator ? 5 : 2
            
            if (car.position >= zebraCrossingPos - violationThreshold && car.position <= zebraCrossingPos + violationThreshold) {
              // Car is at zebra crossing zone
              newPosition += car.speed * (car.isRuleViolator ? 0.7 : 0.5) // Violators move more
              isViolating = true
              newViolations += 0.02
              
              // Record the violation
              newViolationRecord.push({
                carId: car.id,
                lane: car.lane,
                timestamp: new Date().toLocaleTimeString(),
                isRuleViolator: car.isRuleViolator
              })
            } else if (car.position < zebraCrossingPos) {
              // Car hasn't reached zebra crossing yet, approach slowly
              newPosition = Math.min(car.position + car.speed * 0.1, zebraCrossingPos)
              isViolating = false
            } else {
              // Already past zebra crossing on red light, stop here
              newPosition = car.position
              isViolating = false
            }
          }

          // Reset position when car goes off screen (top of road only)
          if (newPosition > 110) {
            newPosition = -70
            newViolations = 0
          }
          
          // Prevent cars from going too far back
          if (newPosition < -100) {
            newPosition = -70
          }

          violations += Math.floor(newViolations)
          return { ...car, position: newPosition, violations: Math.floor(newViolations), isViolating }
        })
        
        // Add new violations to record
        if (newViolationRecord.length > 0) {
          setViolationRecord(prev => [...prev, ...newViolationRecord])
        }
        
        setTotalViolations(violations)
        return updatedCars
      })
    }, 50)

    return () => clearInterval(carInterval)
  }, [lightStates, setViolationRecord])

  const handleAddCar = () => {
    const newId = Math.max(...cars.map(c => c.id), 0) + 1
    const randomLane = Math.floor(Math.random() * 3) + 1
    const randomSubLane = Math.floor(Math.random() * 4) + 1
    const isRuleViolator = Math.random() < 0.08 // 8% chance to be a rule violator
    setCars([...cars, {
      id: newId,
      lane: randomLane,
      subLane: randomSubLane,
      position: -60,
      speed: 1 + Math.random() * 0.8,
      violations: 0,
      isViolating: false,
      isRuleViolator: isRuleViolator
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[1, 2, 3].map(laneNum => (
            <div key={`light-${laneNum}`} className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-3xl border-4 border-blue-600 shadow-2xl">
              <h3 className="text-center font-bold text-blue-900 mb-6 text-2xl">Lane {laneNum}</h3>
              <div className="flex justify-center items-center min-h-32">
                <TrafficLight state={lightStates[`light${laneNum}`]} />
              </div>
            </div>
          ))}
        </div>

        {/* Roads Row - Below Signals */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map(laneNum => (
            <div key={`lane-${laneNum}`} className="bg-gray-100 rounded-3xl overflow-hidden border-4 border-gray-400 shadow-2xl">
              {/* Lane Header */}
              <div className="bg-slate-900 text-white px-6 py-4 flex justify-between items-center">
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
              <div className="relative bg-black border-l-4 border-r-4 border-white overflow-hidden" style={{
                height: '70rem',
                backgroundImage: `
                  linear-gradient(90deg, 
                    transparent 0%, 
                    transparent 24.5%, 
                    white 24.5%, 
                    white 25.5%, 
                    transparent 25.5%, 
                    transparent 49.5%, 
                    white 49.5%, 
                    white 50.5%, 
                    transparent 50.5%, 
                    transparent 74.5%, 
                    white 74.5%, 
                    white 75.5%, 
                    transparent 75.5%, 
                    transparent 100%
                  )
                `,
                backgroundRepeat: 'repeat-y',
                backgroundSize: '100% 100%'
              }}>
                {/* Zebra Crossing Lines */}
                <div className="absolute left-0 right-0 h-24" style={{
                  bottom: '20rem',
                  backgroundImage: 'repeating-linear-gradient(90deg, white 0px, white 35px, black 35px, black 70px)'
                }}></div>
                {cars.filter(car => car.lane === laneNum).map(car => (
                  <Car 
                    key={car.id} 
                    car={car}
                    isMoving={lightStates[`light${car.lane}`] !== 'red'}
                    onDelete={handleRemoveCar}
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