interface TankLevelProps {
  level: number
  capacity?: number
  lastCalibration?: string
}

export default function TankLevel({ level, capacity = 3000, lastCalibration = '18/05/2024' }: TankLevelProps) {
  const current = Math.round((level / 100) * capacity)

  return (
    <section className="flex min-h-0 flex-col overflow-hidden rounded-lg border border-industrial-700 bg-industrial-800 md:col-span-3">
      <header className="border-b border-industrial-700 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-gray-200 xl:text-[11px]">
        Nivel de combustible
      </header>
      <div className="flex min-h-0 flex-1 flex-col p-2 xl:p-3">
        <div className="flex min-h-0 flex-1 items-start gap-2 lg:gap-1.5 xl:gap-3">
          <svg viewBox="0 0 122 200" preserveAspectRatio="xMidYMid meet" className="h-full w-auto max-h-[150px] lg:max-h-[110px] xl:max-h-[150px] shrink-0">
            {[0, 25, 50, 75, 100].map((pct) => {
              const y = 190 - (pct / 100) * 170
              return (
                <g key={pct}>
                  <line x1={36} y1={y} x2={42} y2={y} stroke="#4B5563" strokeWidth={2} />
                  <text x={32} y={y + 3} textAnchor="end" className="fill-gray-400" style={{ fontSize: 15, fontFamily: 'monospace' }}>
                    {pct}%
                  </text>
                </g>
              )
            })}

            <rect x={62} y={4} width={36} height={10} rx={3} fill="#0D0D0D" stroke="#000" />
            <rect x={44} y={14} width={72} height={176} rx={10} fill="#0D0D0D" stroke="#000" strokeWidth={2} />

            <clipPath id="tank-clip">
              <rect x={46} y={16} width={68} height={172} rx={8} />
            </clipPath>
            <g clipPath="url(#tank-clip)">
              <rect
                x={46}
                y={188 - (level / 100) * 172}
                width={68}
                height={(level / 100) * 172}
                fill="#F59E0B"
                style={{ transition: 'all .8s ease-out' }}
              />
              {[25, 50, 75].map((pct) => (
                <line
                  key={pct}
                  x1={46}
                  y1={188 - (pct / 100) * 172}
                  x2={114}
                  y2={188 - (pct / 100) * 172}
                  stroke="#4B5563"
                  strokeWidth={2}
                />
              ))}
            </g>
          </svg>

          <div className="flex min-w-0 flex-1 flex-col justify-center">
            <div className="flex items-baseline gap-1">
              <span className="font-mono text-xl md:text-sm lg:text-base xl:text-2xl font-bold leading-none text-white">{level.toFixed(2)}</span>
              <span className="text-sm font-semibold text-gray-400">%</span>
              <div className="ml-2 text-[10px] text-gray-500">({current.toLocaleString()} gal)</div>
            </div>

            <dl className="py-2 flex flex-col gap-0.5">
              {[
                ['CAPACIDAD TANQUE', capacity],
                ['COMBUSTIBLE ACTUAL', current],
                ['DISPONIBLE', capacity - current]
              ].map(([label, val]) => (
                <div key={label as string} className="flex items-center justify-between gap-2">
                  <dt className="shrink-0 whitespace-nowrap text-[9px] lg:text-[9px] xl:text-xs text-gray-500">{label}</dt>
                  <dd className="shrink-0 whitespace-nowrap font-mono text-[10px] font-semibold text-white lg:text-[10px] xl:text-xs">
                    {(val as number).toLocaleString()} <span className="text-[10px] font-normal text-gray-400">gal</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
        <div className="mt-1 flex items-center gap-1 border-t border-industrial-700 pt-2 text-[10px] tracking-wide text-gray-500">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <span className="whitespace-nowrap">ÚLTIMA CALIBRACIÓN</span>
          <span className="ml-auto whitespace-nowrap font-mono text-gray-300">{lastCalibration}</span>
        </div>
      </div>
    </section>
  )
}