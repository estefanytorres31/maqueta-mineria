interface FuelTankProps {
  level: number
  capacity?: number
  width?: number
  height?: number
  className?: string
}

export default function FuelTank({
  level,
  capacity = 3000,
  width = 100,
  height = 180,
  className = ''
}: FuelTankProps) {
  const currentFuel = (level / 100) * capacity
  const fuelHeight = (level / 100) * (height * 0.78)
  const capWidth = width * 0.55
  const capHeight = height * 0.06
  const neckHeight = height * 0.03

  const tier1 = height * 0.58
  const tier2 = height * 0.78

  let fuelColor = '#F59E0B'
  if (level < 20) fuelColor = '#EF4444'
  else if (level < 40) fuelColor = '#F97316'

  return (
    <div className={`flex items-center gap-5 ${className}`}>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <defs>
          <linearGradient id="fuel-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={fuelColor} stopOpacity="1" />
            <stop offset="50%" stopColor={fuelColor} stopOpacity="0.85" />
            <stop offset="100%" stopColor={fuelColor} stopOpacity="0.7" />
          </linearGradient>
          <linearGradient id="tank-body" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0D141E" />
            <stop offset="50%" stopColor="#162233" />
            <stop offset="100%" stopColor="#0D141E" />
          </linearGradient>
          <linearGradient id="fuel-level-line" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        <rect
          x={(width - capWidth) / 2}
          y={0}
          width={capWidth}
          height={capHeight}
          rx={3}
          fill="#253A54"
          stroke="#334A68"
          strokeWidth={1}
        />
        <rect
          x={(width - capWidth * 0.7) / 2}
          y={capHeight}
          width={capWidth * 0.7}
          height={neckHeight}
          fill="#1C2B3F"
          stroke="#253A54"
          strokeWidth={1}
        />

        <rect
          x={2}
          y={capHeight + neckHeight}
          width={width - 4}
          height={height - capHeight - neckHeight - 4}
          rx={8}
          fill="url(#tank-body)"
          stroke="#253A54"
          strokeWidth={1.5}
        />

        <line x1={6} y1={tier1} x2={width - 6} y2={tier1} stroke="#253A54" strokeWidth={0.5} strokeDasharray="3 2" />
        <text x={width - 8} y={tier1 - 2} textAnchor="end" fill="#4B5563" fontSize={8}>50%</text>
        <line x1={6} y1={tier2} x2={width - 6} y2={tier2} stroke="#253A54" strokeWidth={0.5} strokeDasharray="3 2" />
        <text x={width - 8} y={tier2 - 2} textAnchor="end" fill="#4B5563" fontSize={8}>25%</text>
        <line x1={6} y1={capHeight + neckHeight + 10} x2={width - 6} y2={capHeight + neckHeight + 10} stroke="#253A54" strokeWidth={0.5} strokeDasharray="3 2" />
        <text x={width - 8} y={capHeight + neckHeight + 18} textAnchor="end" fill="#4B5563" fontSize={8}>100%</text>
        <text x={width - 8} y={height - 8} textAnchor="end" fill="#4B5563" fontSize={8}>0%</text>

        <rect
          x={7}
          y={(capHeight + neckHeight + 4) + ((height - capHeight - neckHeight - 12) - fuelHeight)}
          width={width - 14}
          height={fuelHeight}
          rx={5}
          fill="url(#fuel-gradient)"
          style={{
            transition: 'all 0.8s ease-out',
            filter: `drop-shadow(0 0 6px ${fuelColor}50)`
          }}
        />

        {fuelHeight > 6 && (
          <rect
            x={7}
            y={(capHeight + neckHeight + 4) + ((height - capHeight - neckHeight - 12) - fuelHeight)}
            width={width - 14}
            height={3}
            rx={2}
            fill="url(#fuel-level-line)"
          />
        )}

        {level < 20 && (
          <text x={width / 2} y={height / 2} textAnchor="middle" fill="#fff" fontSize={10} fontWeight="bold">
            !
          </text>
        )}
      </svg>

      <div className="flex flex-col justify-between h-full py-1 min-w-[140px]">
        <div>
          <div className="text-gray-400 text-xs uppercase tracking-wider mb-0.5">NIVEL</div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold font-mono text-white">{level.toFixed(0)}</span>
            <span className="text-lg text-gray-400 font-semibold">%</span>
          </div>
          <div className="text-xs text-gray-500">({currentFuel.toFixed(0)} gal)</div>
        </div>
        <div className="space-y-1.5 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-500">CAPACIDAD</span>
            <span className="text-gray-300 font-mono">{capacity.toLocaleString()} gal</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">ACTUAL</span>
            <span className="text-gray-300 font-mono">{currentFuel.toFixed(0)} gal</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">DISPONIBLE</span>
            <span className="text-gray-300 font-mono">{(capacity - currentFuel).toFixed(0)} gal</span>
          </div>
        </div>
      </div>
    </div>
  )
}
