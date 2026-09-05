export interface ModeSlice {
  name: string
  value: number
  pct: number
  color: string
}

interface Props {
  data: ModeSlice[]
  total: number
}

export default function ConsumptionModeChart({ data, total }: Props) {
  const C = 2 * Math.PI * 70
  let offset = 0

  return (
    <section className="flex min-h-0 flex-col overflow-hidden rounded-lg border border-industrial-700 bg-industrial-800 md:col-span-3">
      <header className="border-b border-industrial-700 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-gray-200 xl:text-[11px]">
        Consumo por modo
      </header>
      <div className="flex min-h-0 flex-1 flex-col p-2 xl:p-3">
        <div className="flex min-h-0 flex-1 items-center gap-1 md:gap-2 xl:gap-2 2xl:gap-3">
          <svg viewBox="0 0 200 200" className="h-full max-h-[100px] md:max-h-[120px] 2xl:max-h-[170px] w-auto">
            <g transform="rotate(-90 100 100)">
              {data.map(s => {
                if (s.pct <= 0) return null
                const len = Math.max(0, (s.pct / 100) * C - 4)
                const dash = `${len} ${C - len}`
                const dashOffset = -offset
                offset += (s.pct / 100) * C
                return (
                  <circle key={s.name} cx={100} cy={100} r={70} fill="none" stroke={s.color}
                    strokeWidth={34} strokeDasharray={dash} strokeDashoffset={dashOffset} />
                )
              })}
            </g>
          </svg>
          <ul className="flex min-w-0 flex-1 flex-col justify-center gap-1 md:gap-0.5 lg:gap-1 xl:gap-0 2xl:gap-2">
            {data.map(s => (
              <li key={s.name} className="flex gap-1 items-center xl:items-start 2xl:items-center">
                <span className="mt-0.5 h-2 w-2 xl:h-2 xl:w-2 2xl:h-2.5 2xl:w-2.5 flex-none rounded-sm" style={{ backgroundColor: s.color }} />
                <div className="min-w-0">
                  <div className="text-[10px] font-bold tracking-wide xl:text-[10px] 2xl:text-[11px]" style={{ color: s.color }}>{s.name}</div>
                  <div className="font-mono text-[10px] text-gray-400 xl:text-[9px] 2xl:text-[11px] whitespace-nowrap">
                    {s.value.toFixed(2)} gal ({s.pct.toFixed(2)}%)
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-1 flex items-baseline justify-center gap-2 border-t border-industrial-700 pt-1">
          <span className="text-[10px] tracking-widest text-gray-400">TOTAL</span>
          <span className="font-mono text-base font-bold text-white md:text-[10px] lg:text-xs xl:text-sm 2xl:text-lg">
            {total.toFixed(2)} <span className="text-[11px] font-medium text-gray-400">gal</span>
          </span>
        </div>
      </div>
    </section>
  )
}
