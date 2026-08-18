import type { ModeSlice } from './ConsumptionModeChart'

interface Props {
  data: ModeSlice[]
  axisMax?: number
}

export default function ConsumptionDistribution({ data, axisMax = 100 }: Props) {
  const ticks = [0, 20, 40, 60, 80, 100]

  return (
    <section className="flex min-h-0 flex-col overflow-hidden rounded-lg border border-industrial-700 bg-industrial-800 md:col-span-5">
      <header className="border-b border-industrial-700 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-gray-200 xl:text-[11px]">
        Distribución de consumo hoy
      </header>
      <div className="flex min-h-0 flex-1 flex-col justify-center gap-3 p-2 xl:gap-4 xl:p-3">
        {data.map(item => (
          <div key={item.name} className="flex items-center gap-2 xl:gap-3">
            <span className="w-20 flex-none text-right text-[10px] font-semibold tracking-wide text-gray-300 xl:w-24">
              {item.name}
            </span>
            <div className="h-4 min-w-0 flex-1 overflow-hidden rounded border border-industrial-700 bg-industrial-750 xl:h-[18px]">
              <div
                className="h-full transition-all duration-700"
                style={{ width: `${(item.value / axisMax) * 100}%`, backgroundColor: item.color, boxShadow: `0 0 10px ${item.color}66` }}
              />
            </div>
            <span className="w-24 flex-none font-mono text-[10px] text-gray-300 xl:text-[11px]">
              {item.value.toFixed(1)} gal ({item.pct.toFixed(1)}%)
            </span>
          </div>
        ))}
        <div className="flex items-center gap-2 xl:gap-3">
          <span className="w-20 flex-none xl:w-24" />
          <div className="flex min-w-0 flex-1 justify-between font-mono text-[9px] text-gray-500">
            {ticks.map(t => <span key={t}>{t}</span>)}
          </div>
          <span className="w-24 flex-none font-mono text-[9px] text-gray-500">gal</span>
        </div>
      </div>
    </section>
  )
}
