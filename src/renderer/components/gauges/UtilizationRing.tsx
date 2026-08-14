interface UtilizationRingProps {
  utilization: number
}

export default function UtilizationRing({ utilization }: UtilizationRingProps) {
  const svgSize = 48
  const r = (svgSize - 10) / 2
  const circumference = 2 * Math.PI * r
  const dashArray = `${(utilization / 100) * circumference} ${circumference}`
  return (
    <div className="col-span-1 flex flex-col items-center justify-center py-0">
      <div className="w-20 h-20 md:w-14 md:h-14 lg:w-16 lg:h-16 xl:w-20 xl:h-20 relative">
        <svg viewBox={`0 0 ${svgSize} ${svgSize}`} className="w-full h-full -rotate-90">
          <circle cx={svgSize/2} cy={svgSize/2} r={r} fill="none" stroke="#1C2B3F" strokeWidth="4" />
          <circle 
            cx={svgSize/2} cy={svgSize/2} r={r} fill="none" 
            stroke="url(#utilGradDash)" strokeWidth="4" strokeLinecap="round"
            strokeDasharray={dashArray}
            style={{ filter: 'drop-shadow(0 0 3px #14B8FF80)', transition: 'all 0.5s' }}
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
          <span className="font-mono font-black text-[16px] text-white leading-none">{utilization.toFixed(0)}<span className="text-[12px] text-gray-400">%</span></span>
        </div>
      </div>
      <div className="text-[10px] md:text-[9px] lg:text-[9px] xl:text-[10px] text-gray-400 uppercase font-bold tracking-wider mt-0.25">UTILIZACIÓN</div>
    </div>
  )
}
