interface UtilizationRingProps {
  utilization: number
}

export default function UtilizationRing({ utilization }: UtilizationRingProps) {
  const circumference = 2 * Math.PI * 26
  const dashArray = `${(utilization / 100) * circumference} ${circumference}`
  return (
    <div className="col-span-1 flex flex-col items-center justify-center py-1">
      <div className="w-16 h-16 relative">
        <svg viewBox="0 0 64 64" className="w-full h-full -rotate-90">
          <circle cx="32" cy="32" r="26" fill="none" stroke="#1C2B3F" strokeWidth="6" />
          <circle 
            cx="32" cy="32" r="26" fill="none" 
            stroke="url(#utilGradDash)" strokeWidth="6" strokeLinecap="round"
            strokeDasharray={dashArray}
            style={{ filter: 'drop-shadow(0 0 4px #14B8FF80)', transition: 'all 0.5s' }}
          />
          <defs>
            <linearGradient id="utilGradDash">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="60%" stopColor="#1E88E5" />
              <stop offset="100%" stopColor="#14B8FF" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-mono font-black text-sm text-white leading-none">{utilization.toFixed(0)}<span className="text-[10px] text-gray-400">%</span></span>
        </div>
      </div>
      <div className="text-[9px] text-gray-400 uppercase font-bold tracking-wider mt-0.5">UTILIZACIÓN</div>
    </div>
  )
}
