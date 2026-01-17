const CarDetails = ({ cars, totalViolations, violationRecord = [] }) => {
  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8">
      {/* Header */}
      <div className="mb-10">
        <h2 className="text-4xl font-bold text-slate-800 mb-2">📊 Car Details & Statistics</h2>
        <p className="text-gray-600">Real-time information about all active vehicles</p>
      </div>

      {/* Violations Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl border-4 border-purple-500 shadow-lg">
          <h3 className="text-2xl font-bold text-purple-700 mb-4">🚨 Rule Violators</h3>
          <p className="text-5xl font-bold text-purple-600">{cars.filter(c => c.isRuleViolator).length}</p>
          <p className="text-sm text-purple-600 mt-4">Cars with aggressive driving (8%)</p>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-red-100 p-8 rounded-2xl border-4 border-red-500 shadow-lg">
          <h3 className="text-2xl font-bold text-red-700 mb-4">⚠️ Total Violations</h3>
          <p className="text-5xl font-bold text-red-600">{totalViolations}</p>
          <p className="text-sm text-red-600 mt-4">Traffic rule breaches detected</p>
        </div>

        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-8 rounded-2xl border-4 border-yellow-500 shadow-lg">
          <h3 className="text-2xl font-bold text-yellow-700 mb-4">🚗 Vehicles with Violations</h3>
          <p className="text-5xl font-bold text-yellow-600">{cars.filter(c => c.violations > 0).length}</p>
          <p className="text-sm text-yellow-600 mt-4">Out of {cars.length} total vehicles</p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl border-4 border-blue-500 shadow-lg">
          <h3 className="text-2xl font-bold text-blue-700 mb-4">✓ Safe Drivers</h3>
          <p className="text-5xl font-bold text-blue-600">{cars.filter(c => c.violations === 0).length}</p>
          <p className="text-sm text-blue-600 mt-4">Following traffic rules</p>
        </div>
      </div>

      {/* Detailed Car Information */}
      <div className="mb-10">
        <h3 className="text-3xl font-bold text-slate-800 mb-8">🚙 Vehicle Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map(car => {
            const colors = [
              { bg: 'bg-red-500', light: 'border-red-600' },
              { bg: 'bg-blue-500', light: 'border-blue-600' },
              { bg: 'bg-green-500', light: 'border-green-600' },
              { bg: 'bg-purple-500', light: 'border-purple-600' },
              { bg: 'bg-yellow-500', light: 'border-yellow-600' },
              { bg: 'bg-pink-500', light: 'border-pink-600' },
            ]
            const carColor = colors[car.id % colors.length]
            
            return (
              <div 
                key={car.id} 
                className={`bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl border-4 shadow-lg hover:shadow-xl transition-all ${carColor.light}`}
              >
                {/* Car Visual */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-20 h-12 ${carColor.bg} rounded-xl shadow-lg`}></div>
                  {car.violations > 0 && (
                    <div className="text-right">
                      <div className="text-red-600 font-bold text-lg">⚠️</div>
                      <div className="text-red-600 font-bold text-sm">{car.violations}</div>
                    </div>
                  )}
                </div>

                {/* Car Details */}
                <h4 className="text-2xl font-bold text-slate-800 mb-4">Car #{car.id}</h4>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center bg-white p-3 rounded-lg">
                    <span className="text-gray-700 font-semibold">Lane:</span>
                    <span className="text-slate-800 font-bold text-lg">{car.lane}</span>
                  </div>

                  <div className="flex justify-between items-center bg-white p-3 rounded-lg">
                    <span className="text-gray-700 font-semibold">Speed:</span>
                    <span className="text-slate-800 font-bold text-lg">{car.speed.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between items-center bg-white p-3 rounded-lg">
                    <span className="text-gray-700 font-semibold">Position:</span>
                    <span className="text-slate-800 font-bold text-lg">{car.position.toFixed(1)}%</span>
                  </div>

                  <div className="flex justify-between items-center bg-white p-3 rounded-lg">
                    <span className="text-gray-700 font-semibold">Violations:</span>
                    <span className={`font-bold text-lg ${car.violations > 0 ? 'text-red-600' : 'text-green-600'}`}>
                      {car.violations}
                    </span>
                  </div>

                  {car.isViolating && (
                    <div className="bg-red-100 border-2 border-red-500 p-3 rounded-lg">
                      <p className="text-red-700 font-bold text-center">🚨 RED LIGHT VIOLATION!</p>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Summary Table */}
      <div className="bg-gradient-to-r from-slate-50 to-slate-100 p-8 rounded-2xl border-4 border-slate-400">
        <h3 className="text-2xl font-bold text-slate-800 mb-6">📋 Summary Table</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-800 text-white">
                <th className="px-6 py-4 text-left font-bold">Car ID</th>
                <th className="px-6 py-4 text-left font-bold">Lane</th>
                <th className="px-6 py-4 text-left font-bold">Speed</th>
                <th className="px-6 py-4 text-left font-bold">Position</th>
                <th className="px-6 py-4 text-left font-bold">Violations</th>
                <th className="px-6 py-4 text-left font-bold">Status</th>
              </tr>
            </thead>
            <tbody>
              {cars.map((car, index) => (
                <tr 
                  key={car.id}
                  className={`border-b-2 border-slate-300 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                >
                  <td className="px-6 py-4 font-bold text-slate-800">#{car.id}</td>
                  <td className="px-6 py-4 text-slate-700">{car.lane}</td>
                  <td className="px-6 py-4 text-slate-700">{car.speed.toFixed(2)}</td>
                  <td className="px-6 py-4 text-slate-700">{car.position.toFixed(1)}%</td>
                  <td className="px-6 py-4 font-bold">
                    <span className={car.violations > 0 ? 'text-red-600' : 'text-green-600'}>
                      {car.violations}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {car.isViolating ? (
                      <span className="bg-red-100 text-red-700 px-4 py-2 rounded-full font-bold text-sm">⚠️ Violation</span>
                    ) : car.violations > 0 ? (
                      <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full font-bold text-sm">⚡ Offender</span>
                    ) : (
                      <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-bold text-sm">✓ Safe</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Violation Record */}
      {violationRecord.length > 0 && (
        <div className="bg-gradient-to-r from-red-50 to-orange-50 p-8 rounded-2xl border-4 border-red-500 mt-10">
          <h3 className="text-2xl font-bold text-red-800 mb-6">📜 Violation Record</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-red-800 text-white">
                  <th className="px-6 py-4 text-left font-bold">Car ID</th>
                  <th className="px-6 py-4 text-left font-bold">Lane</th>
                  <th className="px-6 py-4 text-left font-bold">Timestamp</th>
                  <th className="px-6 py-4 text-left font-bold">Type</th>
                </tr>
              </thead>
              <tbody>
                {violationRecord.slice(-50).reverse().map((record, index) => (
                  <tr 
                    key={index}
                    className={`border-b-2 border-red-200 ${index % 2 === 0 ? 'bg-white' : 'bg-red-50'}`}
                  >
                    <td className="px-6 py-4 font-bold text-slate-800">#{record.carId}</td>
                    <td className="px-6 py-4 text-slate-700">{record.lane}</td>
                    <td className="px-6 py-4 text-slate-700">{record.timestamp}</td>
                    <td className="px-6 py-4">
                      {record.isRuleViolator ? (
                        <span className="bg-orange-100 text-orange-700 px-4 py-2 rounded-full font-bold text-sm">🚨 Rule Violator</span>
                      ) : (
                        <span className="bg-red-100 text-red-700 px-4 py-2 rounded-full font-bold text-sm">⚠️ Violation</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {violationRecord.length > 50 && (
              <p className="text-sm text-red-600 mt-4 font-semibold">Showing last 50 violations (Total: {violationRecord.length})</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default CarDetails
