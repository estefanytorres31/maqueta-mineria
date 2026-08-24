interface FlowProps {
  supply: number
  supplyImg?: string
  returnFlow: number
  returnImg?: string
}

export default function FuelFlow({ supply, supplyImg, returnFlow, returnImg }: FlowProps) {
  const cards = [
    { key: 'in', title: 'INGRESO', hint: '', value: supply, color: '#10B981', bar: 'bg-status-ok', pct: Math.min(100, (supply / 20) * 100), img: supplyImg },
    { key: 'out', title: 'RETORNO', hint: '', value: returnFlow, color: '#42A5F5', bar: 'bg-electric-400', pct: Math.min(100, (returnFlow / 1) * 100), img: returnImg }
  ]

  return (
    <section className="flex min-h-0 flex-col overflow-hidden rounded-lg border border-industrial-700 bg-industrial-800 md:col-span-3">
      <header className="border-b border-industrial-700 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-gray-200 xl:text-[11px]">
        Flujo de combustible
      </header>
      <div className="grid min-h-0 flex-1 grid-cols-2 gap-2 p-2 xl:p-2.5">
        {cards.map(c => (
          <div key={c.key} className="flex min-h-0 flex-col justify-between rounded-md border border-industrial-700 bg-industrial-850 p-2 xl:p-3">
            <div className="flex flex-1 min-h-0 flex-row items-center justify-between gap-1">
              <div className="flex flex-col h-full justify-center">
                <div className="text-[9px] xl:text-[11px] font-bold tracking-wider" style={{ color: c.key === 'in' ? c.color : '#C6D0DC' }}>
                  {c.title} {c.hint && <span className="text-gray-400">{c.hint}</span>}
                </div>
                <div className="mt-1 flex flex-col items-start gap-0.5 xl:gap-1">
                  <span className="font-mono text-2xl font-bold leading-none md:text-xl lg:text-2xl xl:text-4xl" style={{ color: c.color }}>
                    {c.value.toFixed(1)}
                  </span>
                  <span className="text-[9px] lg:text-[10px] xl:text-[12px] font-bold text-gray-400">gal/h</span>
                </div>
              </div>
              <div className="flex-1 min-w-0 h-full max-w-[50%] flex items-center justify-center">
                {c.img && <img src={c.img} alt={c.title} className="max-h-[50px] w-auto object-contain xl:scale-125 drop-shadow-md" />}
              </div>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-industrial-700 shrink-0">
              <div className={`h-full ${c.bar}`} style={{ width: `${c.pct}%` }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
