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
          <div key={c.key} className="flex min-h-0 flex-col rounded-md border border-industrial-700 bg-industrial-850 p-2">
            <div className="text-[9px] font-bold tracking-wider" style={{ color: c.key === 'in' ? c.color : '#C6D0DC' }}>
              {c.title} {c.hint && <span className="text-gray-400">{c.hint}</span>}
            </div>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="font-mono text-lg font-bold leading-none xl:text-2xl" style={{ color: c.color }}>
                {c.value.toFixed(1)}
              </span>
              <span className="text-[10px] text-gray-400">gal/h</span>
            </div>
            <div className="my-1.5 min-h-0 flex-1 overflow-hidden rounded-md bg-industrial-900">
              {c.img && <img src={c.img} alt={c.title} className="h-full w-full object-contain" />}
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-industrial-700">
              <div className={`h-full ${c.bar}`} style={{ width: `${c.pct}%` }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
