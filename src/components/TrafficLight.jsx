const TrafficLight = ({ state }) => {
  return (
    <div className="flex flex-col gap-2 bg-black rounded-2xl p-2 shadow-xl border-2 border-gray-900">
      {/* Red Light */}
      <div className={`w-12 h-12 rounded-full transition-all duration-200 ${
        state === 'red' 
          ? 'bg-red-500 shadow-lg shadow-red-500 scale-110 animate-glow' 
          : 'bg-gray-700'
      }`}></div>

      {/* Yellow Light */}
      <div className={`w-12 h-12 rounded-full transition-all duration-200 ${
        state === 'yellow' 
          ? 'bg-yellow-400 shadow-lg shadow-yellow-400 scale-110 animate-glow' 
          : 'bg-gray-700'
      }`}></div>

      {/* Green Light */}
      <div className={`w-12 h-12 rounded-full transition-all duration-200 ${
        state === 'green' 
          ? 'bg-green-500 shadow-lg shadow-green-500 scale-110 animate-glow' 
          : 'bg-gray-700'
      }`}></div>
    </div>
  )
}

export default TrafficLight