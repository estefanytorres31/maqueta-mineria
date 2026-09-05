import { Clock, Hourglass, Calendar, Fuel as FuelIcon, BarChart3, Repeat, Timer, Gauge, Activity } from 'lucide-react'
import SectionPanel from '../SectionPanel'
import { OperationData, FuelData, ProductivityData } from '../../types'

interface TodayPanelProps {
  variant?: 'loader' | 'other'
  operation: Pick<OperationData, 'engineHours' | 'effectiveHours' | 'idleHours' | 'inoperativeHours' | 'utilization' | 'totalHours'>
  fuel: Pick<FuelData, 'todayConsumption'>
  productivity: Pick<ProductivityData, 'performance' | 'cyclesCompleted'>
}

/* ================================================================
   ROW 1 COMÚN (loader + other): 3 columnas HorasMotor/Efectivas/Ralentí
   ================================================================ */
function TodayHoursRow({ operation }: { operation: TodayPanelProps['operation'] }) {
  return (
    <div className="grid grid-cols-3 flex-1 min-h-0 border-b border-industrial-700/60">
      <div className="flex flex-col items-center justify-center gap-[2px] md:gap-[1px] py-[1px] md:py-[2px] px-[2px] min-w-0 h-full border-r border-industrial-700/50">
        <Clock size={12} className="text-gray-400 md:size-[12px] lg:size-[14px] xl:size-[16px] flex-shrink-0" />
        <div className="text-[6px] md:text-[8px] lg:text-[10px] xl:text-[10px] 2xl:text-[13px] text-gray-400 uppercase font-bold text-center leading-tight whitespace-normal">HORAS MOTOR</div>
        <div className="flex flex-col items-center min-w-0">
          <div className="font-mono font-black text-xl md:text-sm lg:text-2xl xl:text-2xl 2xl:text-3xl text-white leading-none tracking-tighter whitespace-nowrap">
            {operation.engineHours.toFixed(1)}
          </div>
          <span className="text-[7px] md:text-[7.5px] lg:text-sm text-gray-400 font-bold leading-none mt-[1px]">h</span>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-[2px] md:gap-[1px] py-[1px] md:py-[2px] px-[2px] min-w-0 h-full border-r border-industrial-700/50">
        <Clock size={12} className="text-gray-400 md:size-[12px] lg:size-[14px] xl:size-[16px] flex-shrink-0" />
        <div className="text-[6px] md:text-[8px] lg:text-[10px] xl:text-[10px] 2xl:text-[13px] text-gray-400 uppercase font-bold text-center leading-tight whitespace-normal">HORAS EFECTIVAS</div>
        <div className="flex flex-col items-center min-w-0">
          <div className="font-mono font-black text-xl md:text-sm lg:text-2xl xl:text-2xl 2xl:text-3xl text-white leading-none tracking-tighter whitespace-nowrap">
            {operation.effectiveHours.toFixed(1)}
          </div>
          <span className="text-[7px] md:text-[7.5px] lg:text-sm text-gray-400 font-bold leading-none mt-[1px]">h</span>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-[2px] md:gap-[1px] py-[1px] md:py-[2px] px-[2px] min-w-0 h-full">
        <Hourglass size={12} className="text-status-warning md:size-[12px] lg:size-[14px] xl:size-[16px] flex-shrink-0" />
        <div className="text-[6px] md:text-[8px] lg:text-[10px] xl:text-[10px] 2xl:text-[13px] text-gray-400 uppercase font-bold text-center leading-tight whitespace-normal">RALENTÍ</div>
        <div className="flex flex-col items-center min-w-0">
          <div className="font-mono font-black text-xl md:text-sm lg:text-2xl xl:text-2xl 2xl:text-3xl text-status-warning leading-none tracking-tighter whitespace-nowrap">
            {operation.idleHours.toFixed(1)}
          </div>
          <span className="text-[7px] md:text-[7.5px] lg:text-sm text-status-warning font-bold leading-none mt-[1px]">h</span>
        </div>
      </div>
    </div>
  )
}

/* ================================================================
   VARIANTE LOADER (FOTO1 — fila2 cols 3):
   3 cols CONSUMO COMB / RENDIMIENTO / CICLOS (todos icono verde #14B8A6)
   ================================================================ */
function LoaderProductivityRow({ fuel, productivity }: { fuel: TodayPanelProps['fuel']; productivity: TodayPanelProps['productivity'] }) {
  const fixedPerformance = 8.0
  return (
    <div className="grid grid-cols-3 flex-1 min-h-0">
      <div className="flex flex-col items-center justify-center gap-[2px] md:gap-[1px] py-[1px] md:py-[2px] px-[2px] min-w-0 h-full border-r border-industrial-700/50">
        <FuelIcon size={12} style={{ color: '#14B8A6' }} className="md:size-[12px] lg:size-[14px] xl:size-[16px] flex-shrink-0" />
        <div className="text-[6px] md:text-[8px] lg:text-[10px] xl:text-[13px] text-gray-400 uppercase font-bold text-center leading-tight whitespace-normal">CONSUMO COMB.</div>
        <div className="flex flex-col items-center min-w-0">
          <div className="font-mono font-black text-xl md:text-sm lg:text-2xl xl:text-3xl text-white leading-none tracking-tighter whitespace-nowrap">
            {fuel.todayConsumption.toFixed(1)}
          </div>
          <span className="text-[7px] md:text-[7.5px] lg:text-sm font-bold leading-none mt-[1px]" style={{ color: '#14B8A6' }}>gal</span>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-[2px] md:gap-[1px] py-[1px] md:py-[2px] px-[2px] min-w-0 h-full border-r border-industrial-700/50">
        <BarChart3 size={12} style={{ color: '#14B8A6' }} className="md:size-[12px] lg:size-[14px] xl:size-[16px] flex-shrink-0" />
        <div className="text-[6px] md:text-[8px] lg:text-[10px] xl:text-[13px] text-gray-400 uppercase font-bold text-center leading-tight whitespace-normal">RENDIMIENTO</div>
        <div className="flex flex-col items-center min-w-0">
          <div className="font-mono font-black text-xl md:text-sm lg:text-2xl xl:text-3xl text-white leading-none tracking-tighter whitespace-nowrap">
            {fixedPerformance.toFixed(1)}
          </div>
          <span className="text-[7px] md:text-[7.5px] lg:text-sm font-bold leading-none mt-[1px]" style={{ color: '#14B8A6' }}>ton/h</span>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-[2px] md:gap-[1px] py-[1px] md:py-[2px] px-[2px] min-w-0 h-full">
        <Repeat size={12} style={{ color: '#14B8A6' }} className="md:size-[12px] lg:size-[14px] xl:size-[16px] flex-shrink-0" />
        <div className="text-[6px] md:text-[8px] lg:text-[10px] xl:text-[13px] text-gray-400 uppercase font-bold text-center leading-tight whitespace-normal">CICLOS</div>
        <div className="flex flex-col items-center min-w-0">
          <div className="font-mono font-black text-xl md:text-sm lg:text-2xl xl:text-3xl text-white leading-none tracking-tighter whitespace-nowrap">
            {productivity.cyclesCompleted}
          </div>
          <span className="text-[7px] md:text-[7.5px] lg:text-sm font-bold leading-none mt-[1px]" style={{ color: '#14B8A6' }}>ciclos</span>
        </div>
      </div>
    </div>
  )
}

/* ================================================================
   DONUT Utilización 75% — SVG (verde status-ok / azul electric-500)
   ================================================================ */
function UtilizationDonut({ pct }: { pct: number }) {
  const size = 64
  const stroke = 6
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const safePct = Math.max(0, Math.min(1, pct))
  const offset = c * (1 - safePct)
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none"
          stroke="#22d3ee"
          strokeOpacity="0.25"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none"
          stroke="#10b981"
          strokeWidth={stroke}
          strokeDasharray={c}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="font-mono font-black text-xl md:text-xl lg:text-2xl text-white leading-none tracking-tighter">
          {Math.round(safePct * 100)}
        </div>
        <div className="text-[7px] md:text-[7.5px] lg:text-sm text-gray-300 font-black leading-none mt-[2px]">%</div>
      </div>
    </div>
  )
}

/* ================================================================
   VARIANTE OTHER (FOTO3 — Scoop/Camion/Tractor/Drill/Excav/Retro):
   3 cols INOPERATIVO (Clock rojo) / UTILIZACIÓN (donut 75%) / HORÓMETRO TOTAL (4,256h)
   ================================================================ */
function OtherProductivityRow({ operation }: { operation: TodayPanelProps['operation'] }) {
  const inoperativeH = operation.inoperativeHours > 0
    ? operation.inoperativeHours
    : 0.8
  const utilizationPct = operation.utilization > 0 && operation.utilization <= 1
    ? operation.utilization
    : operation.totalHours > 0 && operation.engineHours > 0
      ? Math.min(operation.effectiveHours / Math.max(operation.engineHours, 0.1), 1)
      : 0.75
  const totalH = operation.totalHours > 0
    ? operation.totalHours
    : 4256

  return (
    <div className="grid grid-cols-3 flex-1 min-h-0">
      {/* INOPERATIVO */}
      <div className="flex flex-col items-center justify-center gap-[2px] md:gap-[1px] py-[1px] md:py-[2px] px-[2px] min-w-0 h-full border-r border-industrial-700/50">
        <Timer size={12} className="text-status-error md:size-[12px] lg:size-[14px] xl:size-[16px] flex-shrink-0" strokeWidth={2} />
        <div className="text-[6px] md:text-[8px] lg:text-[10px] xl:text-[10px] 2xl:text-[13px] text-gray-400 uppercase font-bold text-center leading-tight whitespace-normal">INOPERATIVO</div>
        <div className="flex flex-col items-center min-w-0">
          <div className="font-mono font-black text-xl md:text-sm lg:text-2xl xl:text-2xl 2xl:text-3xl text-white leading-none tracking-tighter whitespace-nowrap">
            {inoperativeH.toFixed(1)}
          </div>
          <span className="text-[7px] md:text-[7.5px] lg:text-sm font-black leading-none mt-[1px]">h</span>
        </div>
      </div>
      {/* UTILIZACIÓN DONUT */}
      <div className="flex flex-col items-center justify-center gap-[2px] md:gap-[1px] py-[1px] md:py-[2px] px-[2px] min-w-0 h-full border-r border-industrial-700/50">
        <Gauge size={12} className="text-electric-400 md:size-[12px] lg:size-[14px] xl:size-[16px] flex-shrink-0" />
        <div className="text-[6px] md:text-[8px] lg:text-[10px] xl:text-[10px] 2xl:text-[13px] text-gray-400 uppercase font-bold text-center leading-tight whitespace-normal">UTILIZACIÓN</div>  
        <div className="flex flex-col items-center justify-center min-w-0 my-[1px]">
          <UtilizationDonut pct={utilizationPct} />
        </div>
      </div>
      {/* HORÓMETRO TOTAL */}
      <div className="flex flex-col items-center justify-center gap-[2px] md:gap-[1px] py-[1px] md:py-[2px] px-[2px] min-w-0 h-full">
        <Activity size={12} style={{ color: '#14B8A6' }} className="md:size-[12px] lg:size-[14px] xl:size-[16px] flex-shrink-0" />
        <div className="text-[6px] md:text-[8px] lg:text-[10px] xl:text-[10px] 2xl:text-[13px] text-gray-400 uppercase font-bold text-center leading-tight whitespace-normal">HORÓMETRO TOTAL</div>
        <div className="flex flex-col items-center min-w-0">
          <div className="font-mono font-black text-xl md:text-sm lg:text-2xl xl:text-2xl 2xl:text-3xl text-white leading-none tracking-tighter whitespace-nowrap">
            {Math.round(totalH).toLocaleString()}
          </div>
          <span className="text-[7px] md:text-[7.5px] lg:text-sm font-black leading-none mt-[1px]" style={{ color: '#14B8A6' }}>h</span>
        </div>
      </div>
    </div>
  )
}

export default function TodayPanel({ variant = 'loader', operation, fuel, productivity }: TodayPanelProps) {
  return (
    <SectionPanel
      title="RESUMEN HOY"
      icon={<Calendar size={18} className="text-electric-400 md:size-[18px] lg:size-[22px] xl:size-[24px]" />}
      iconColor="text-electric-400"
      titleColorClass="text-electric-400"
      borderClass="border-industrial-600"
      grow
      centerTitle
    >
      <div className="p-[2px] md:p-[2px] lg:p-[3px] xl:p-1 h-full flex flex-col min-h-0 gap-[2px]">
        <TodayHoursRow operation={operation} />
        {variant === 'loader' ? (
          <LoaderProductivityRow fuel={fuel} productivity={productivity} />
        ) : (
          <OtherProductivityRow operation={operation} />
        )}
      </div>
    </SectionPanel>
  )
}
