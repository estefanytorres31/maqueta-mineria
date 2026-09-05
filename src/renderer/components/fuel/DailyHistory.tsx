interface Props {
  data: { date: string; value: number }[]
}

export default function DailyHistory({ data }: Props) {
  const max = Math.max(...data.map(d => d.value), 1)

  return (
    <section className="flex min-h-0 flex-col overflow-hidden rounded-lg border border-industrial-700 bg-industrial-800 md:col-span-4">
      <header className="border-b border-industrial-700 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-gray-200 xl:text-[11px]">
        Historial de consumo diario (gal)
      </header>
      <div className="flex min-h-0 flex-1 flex-col justify-around gap-0.5 xl:gap-0 2xl:gap-1 p-2 xl:p-1.5 2xl:p-3">
        {data.map((d, i) => (
          <div key={d.date} className="flex items-center gap-2">
            <span className={`w-16 flex-none text-[10px] xl:text-[11px] ${i === 0 ? 'text-gray-200' : 'font-mono text-gray-400'}`}>
              {d.date}
            </span>
            <span className="w-10 flex-none text-right font-mono text-[10px] text-gray-200 xl:text-[11px]">
              {d.value.toFixed(1)}
            </span>
            <div className="h-2 min-w-0 flex-1 overflow-hidden rounded-sm bg-industrial-850">
              <div
                className={`h-full rounded-sm ${i === 0 ? 'bg-fuel-primary' : 'bg-industrial-500'}`}
                style={{ width: `${(d.value / max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
