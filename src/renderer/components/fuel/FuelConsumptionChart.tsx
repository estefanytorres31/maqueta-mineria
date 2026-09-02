import { useState, useMemo, useEffect } from 'react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'

export type TimeRange = '1H' | '6H' | '12H' | '24H'
const RANGES: TimeRange[] = ['1H', '6H', '12H', '24H']

interface Props {
  data: { time: string; value: number }[]
  range?: TimeRange
  onRangeChange?: (r: TimeRange) => void
}

export default function FuelConsumptionChart({ data, range = '1H', onRangeChange }: Props) {
  const [active, setActive] = useState<TimeRange>(range)
  const [mockValues, setMockValues] = useState<number[]>([])

  // Generamos una "montaña rusa" de datos diferente para cada pestaña (1H, 6H, etc.)
  // así rompemos la ilusión de que es la misma gráfica estirada.
  useEffect(() => {
    const newVals: number[] = []
    let last = 38
    for (let i = 0; i < 24; i++) {
      last = Math.max(15, Math.min(50, last + (Math.random() - 0.5) * 18))
      newVals.push(last)
    }
    setMockValues(newVals)
  }, [active])

  // Recalcular el eje X para que SIEMPRE termine en la hora actual y abarque el rango exacto
  const chartData = useMemo(() => {
    const now = new Date()
    const minutes = active === '1H' ? 60 : active === '6H' ? 360 : active === '12H' ? 720 : 1440
    const points = 24
    const step = minutes / points
    
    // Obtenemos el consumo instantáneo real del simulador
    const currentInstant = data.length > 0 ? data[data.length - 1].value : 40

    return Array.from({ length: points }).map((_, i) => {
      const minutesAgo = (points - 1 - i) * step
      const pointTime = new Date(now.getTime() - minutesAgo * 60000)
      
      return {
        time: `${String(pointTime.getHours()).padStart(2, '0')}:${String(pointTime.getMinutes()).padStart(2, '0')}`,
        value: Number((i === points - 1 ? currentInstant : (mockValues[i] || 40)).toFixed(2))
      }
    })
  }, [data, active, mockValues])


  return (
    <section className="flex min-h-0 flex-col overflow-hidden rounded-lg border border-industrial-700 bg-industrial-800 md:col-span-6">
      <header className="flex items-center gap-2 border-b border-industrial-700 px-3 py-1.5">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-200 xl:text-[11px]">
          Consumo de combustible (gal/h)
        </span>
        <div className="ml-auto flex gap-1">
          {RANGES.map(r => (
            <button
              key={r}
              onClick={() => { setActive(r); onRangeChange?.(r) }}
              className={`rounded px-2 py-0.5 text-[10px] font-bold transition-colors xl:px-2.5 xl:py-1 ${
                active === r ? 'bg-electric-500 text-white' : 'bg-industrial-700 text-gray-400 hover:text-white'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </header>
      <div className="min-h-0 flex-1 p-2 xl:p-3">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 4, right: 8, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1C2B3F" vertical={false} />
            <XAxis dataKey="time" stroke="#4B5563" tick={{ fontSize: 10, fill: '#5B6675' }} axisLine={false} tickLine={false} minTickGap={40} />
            <YAxis domain={['auto', 'auto']} stroke="#4B5563" tick={{ fontSize: 10, fill: '#5B6675' }} axisLine={false} tickLine={false} width={34} />
            <Tooltip
              contentStyle={{ backgroundColor: '#0D141E', border: '1px solid #253A54', borderRadius: 8, fontSize: 12 }}
              labelStyle={{ color: '#9CA3AF' }}
              itemStyle={{ color: '#F59E0B' }}
            />
            <Line type="monotone" dataKey="value" name="Consumo instantáneo (gal/h)" stroke="#F59E0B" strokeWidth={1.6} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center justify-center gap-2 pb-1.5 text-[10px] text-gray-400">
        <span className="inline-block h-0.5 w-4 bg-fuel-primary" />
        Consumo instantáneo (gal/h)
      </div>
    </section>
  )
}
