import type { ReactNode } from 'react'

interface KpiProps {
  label: string
  value: string
  unit?: string
  sub?: string
  labelColor?: string
  children?: ReactNode
}

function Kpi({ label, value, unit, sub, labelColor = 'text-fuel-primary', children }: KpiProps) {
  return (
    <div className="min-w-0 flex flex-col justify-center rounded-lg border border-industrial-700 bg-industrial-800 px-1.5 py-1 xl:px-3 xl:py-2">
      <div className={`truncate text-[9px] md:text-[9px] lg:text-[11px] xl:text-[15px] 2xl:text-[15px] font-semibold ${labelColor}`}>{label}</div>
      <div className="flex items-baseline gap-1">
        <span className="font-mono font-bold leading-none text-white text-lg lg:text-[22px] xl:text-[28px] 2xl:text-3xl">{value}</span>
        {unit && <span className="text-xs lg:text-[17px] xl:text-xl 2xl:text-[22px] text-gray-400">{unit}</span>}
      </div>
      {sub && <div className="text-[10px] lg:text-[13px] xl:text-[15px] 2xl:text-[19px] text-gray-500">{sub}</div>}
      {children}
    </div>
  )
}

interface FuelKPIsProps {
  instant: number
  average: number
  today: number
  idleToday: number
  idlePct: number
  autonomy: number
  tankLevel: number
  sparkline?: string
}

export default function FuelKPIs({
  instant, average, today, idleToday, idlePct, autonomy, tankLevel, sparkline
}: FuelKPIsProps) {
  return (
    <div className="grid flex-none grid-cols-3 gap-2 md:grid-cols-6 xl:gap-3">
      <Kpi label="CONSUMO INSTANTÁNEO" value={instant.toFixed(1)} unit="gal/h">
        {sparkline && (
          <svg viewBox="0 0 200 40" preserveAspectRatio="none" className="mt-1 h-4 w-full xl:h-5">
            <polyline fill="none" stroke="#84CC16" strokeWidth={1.4} vectorEffect="non-scaling-stroke" points={sparkline} />
          </svg>
        )}
      </Kpi>
      <Kpi label="CONSUMO PROMEDIO" value={average.toFixed(1)} unit="gal/h" sub="(Últ. 1 hora)" />
      <Kpi label="CONSUMO HOY" value={today.toFixed(2)} unit="gal" sub="(Total día)" />
      <Kpi label="CONSUMO RALENTÍ HOY" value={idleToday.toFixed(2)} unit="gal" sub={`(${idlePct.toFixed(1)}%)`} />
      <Kpi label="AUTONOMÍA ESTIMADA" value={autonomy.toFixed(1)} unit="h" labelColor="text-gray-300" />
      <Kpi label="NIVEL TANQUE" value={tankLevel.toFixed(0)} unit="%">
        <div className="h-1 overflow-hidden rounded-full bg-industrial-700">
          <div className="h-full rounded-full bg-fuel-primary shadow-glow-orange" style={{ width: `${tankLevel}%` }} />
        </div>
      </Kpi>
    </div>
  )
}
