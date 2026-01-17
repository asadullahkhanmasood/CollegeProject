const Car = ({ car, isMoving, onDelete }) => {
  const colors = [
    { bg: 'bg-red-500', light: 'bg-red-700', accent: 'text-red-900' },
    { bg: 'bg-blue-500', light: 'bg-blue-700', accent: 'text-blue-900' },
    { bg: 'bg-green-500', light: 'bg-green-700', accent: 'text-green-900' },
    { bg: 'bg-purple-500', light: 'bg-purple-700', accent: 'text-purple-900' },
    { bg: 'bg-yellow-500', light: 'bg-yellow-700', accent: 'text-yellow-900' },
    { bg: 'bg-pink-500', light: 'bg-pink-700', accent: 'text-pink-900' },
  ]
  const carColor = colors[car.id % colors.length]

  return (
    <div
      className={`absolute flex flex-col items-center gap-3 transition-all duration-100 ease-linear`}
      style={{
        top: `${car.position}%`,
        left: `${(car.subLane - 1) * 25 + 12.5}%`,
        transform: 'translateX(-50%)'
      }}
      title={`Car #${car.id} - Violations: ${car.violations}`}
    >
      {/* Big Car Body */}
      <div className={`relative w-20 h-32 ${carColor.bg} rounded-2xl shadow-2xl border-4 border-gray-800 ${isMoving ? 'animate-carBounce' : 'opacity-80'} ${car.isViolating ? 'ring-4 ring-red-600 animate-pulse' : ''}`}>
        
        {/* Car Roof */}
        <div className={`absolute top-6 left-2 w-6 h-20 ${carColor.light} rounded-lg opacity-90 shadow-inner`}></div>

        {/* Front Window */}
        <div className="absolute top-3 left-3 w-5 h-8 bg-cyan-300 opacity-70 rounded-lg border-2 border-cyan-600 shadow-md"></div>
        
        {/* Back Window */}
        <div className="absolute top-3 right-3 w-5 h-10 bg-cyan-300 opacity-70 rounded-lg border-2 border-cyan-600 shadow-md"></div>

        {/* Door Stripe */}
        <div className={`absolute left-8 top-8 w-1 h-16 ${carColor.light} rounded-full opacity-60`}></div>

        {/* Lights */}
        <div className="absolute top-1 right-3 w-2 h-2 bg-yellow-300 rounded-full shadow-lg"></div>
        <div className="absolute top-1 left-3 w-2 h-2 bg-red-300 rounded-full shadow-lg"></div>

        {/* Front Wheel */}
        <div className={`absolute left-6 top-1 w-6 h-6 bg-gray-900 rounded-full border-2 border-gray-700 shadow-lg ${isMoving ? 'animate-wheelSpin' : ''}`}>
          <div className="absolute inset-1 border-2 border-gray-600 rounded-full"></div>
        </div>

        {/* Back Wheel */}
        <div className={`absolute right-6 top-1 w-6 h-6 bg-gray-900 rounded-full border-2 border-gray-700 shadow-lg ${isMoving ? 'animate-wheelSpin' : ''}`}>
          <div className="absolute inset-1 border-2 border-gray-600 rounded-full"></div>
        </div>
      </div>

      {/* Car ID Badge with Violation Indicator */}
      <div className={`font-bold text-xs text-white px-2 py-1 rounded-lg min-w-max flex items-center gap-1 shadow-xl border-2 border-gray-900 ${car.isViolating ? 'bg-red-700 shadow-lg shadow-red-500 animate-pulse' : 'bg-black'}`}>
        <div>#{car.id}</div>
        {car.isRuleViolator && <div className="text-xs bg-orange-600 px-1.5 py-0.5 rounded-full">🚨RV</div>}
        {car.violations > 0 && <div className="text-xs bg-red-500 px-1.5 py-0.5 rounded-full">⚠️{car.violations}</div>}
        {onDelete && (
          <button 
            onClick={() => onDelete(car.id)}
            className="ml-1 bg-red-600 hover:bg-red-700 text-white px-1.5 py-0.5 rounded text-xs font-bold transition-colors"
            title="Delete car"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  )
}

export default Car