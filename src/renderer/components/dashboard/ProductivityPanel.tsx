import { BarChart3, ArrowRight, Clock, ArrowsUpFromLine } from 'lucide-react'
import { GiMineTruck as TruckIcon, GiBulldozer as BulldozerIcon } from "react-icons/gi";
import { LiaRulerVerticalSolid as MeterIcon } from "react-icons/lia";
import { GrCycle as CycleIcon } from "react-icons/gr";
import { BsClockHistory as ClockHistoryIcon } from "react-icons/bs";
import SectionPanel from '../SectionPanel'
import { ProductivityData, Machine, MachineType } from '../../types'
import { ReactNode } from 'react';

interface ProductivityPanelProps {
  productivity: Pick<ProductivityData, 'tonsMoved' | 'performance' | 'hourlyProductivity' | 'cyclesCompleted' | 'avgCycleTime'>
  machine: Pick<Machine, 'type' | 'name' | 'model'>
}

/* ================================================================
   VARIANTE 1: LOADER (Cargador Frontal 950 / 980K)
   ————————————————————————————————————————————————————————————————
   Layout: SVG HourlyBarChart a la izquierda (col-span-3) + 3 KPIs a la derecha (col-span-2)
   Referencia visual: FOTO 1 diseño actual
   ================================================================ */

function HourlyBarChart({ hourly, color = '#F59E0B' }: { hourly: ProductivityData['hourlyProductivity']; color?: string }) {
  const pts = hourly.length ? hourly.slice(0, 6) : [
    { hour: '06:00', tons: 9, cycles: 3 },
    { hour: '07:00', tons: 10, cycles: 4 },
    { hour: '08:00', tons: 12, cycles: 5 },
    { hour: '09:00', tons: 13, cycles: 6 },
    { hour: '10:00', tons: 9, cycles: 4 },
    { hour: '11:00', tons: 12, cycles: 5 },
  ]
  const maxTons = 15
  const w = 260
  const h = 140
  const barGap = 8
  const totalBars = pts.length
  const barWidth = (w - barGap * (totalBars + 1)) / totalBars
  const axisMarginBottom = 24
  const axisMarginLeft = 28
  const chartW = w - axisMarginLeft - 4
  const chartH = h - axisMarginBottom - 8

  const xFor = (i: number) => axisMarginLeft + barGap + i * (barWidth + barGap)
  const yFor = (tons: number) => 8 + chartH - (tons / maxTons) * chartH
  const hFor = (tons: number) => (tons / maxTons) * chartH
  const yTickVals = [0, 5, 10, 15]

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="prodBarGrad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="1" />
          <stop offset="100%" stopColor={color} stopOpacity="0.55" />
        </linearGradient>
      </defs>
      {yTickVals.map((t, i) => {
        const y = 8 + chartH - (t / 15) * chartH
        return (
          <g key={i}>
            <line x1={axisMarginLeft} x2={axisMarginLeft + chartW} y1={y} y2={y} stroke="rgba(75,85,99,0.25)" strokeDasharray="2 3" />
            <text x={axisMarginLeft - 4} y={y + 3} textAnchor="end" fontSize="9" fill="rgba(156,163,175,0.9)" fontFamily="monospace" fontWeight="700">{t}</text>
          </g>
        )
      })}
      <line x1={axisMarginLeft} x2={axisMarginLeft + chartW} y1={8 + chartH} y2={8 + chartH} stroke="rgba(75,85,99,0.5)" />
      {pts.map((p, i) => (
        <g key={i}>
          <rect
            x={xFor(i)}
            y={yFor(Math.max(0.2, p.tons))}
            width={Math.max(6, barWidth)}
            height={Math.max(1, hFor(Math.max(0.2, p.tons)))}
            fill="url(#prodBarGrad)"
            rx="2"
          />
          <text
            x={xFor(i) + Math.max(6, barWidth) / 2}
            y={h - 6}
            textAnchor="middle"
            fontSize="10"
            fill="rgba(209,213,219,0.95)"
            fontFamily="monospace"
            fontWeight="700"
          >
            {p.hour.substring(0, 5)}
          </text>
        </g>
      ))}
      <text x={axisMarginLeft - 16} y={h / 2} fontSize="10" fill="rgba(209,213,219,0.75)" fontFamily="monospace" fontWeight="700" transform={`rotate(-90 ${axisMarginLeft - 16} ${h / 2})`} textAnchor="middle">ton</text>
    </svg>
  )
}

function LoaderProductivityContent({ productivity }: Pick<ProductivityPanelProps, 'productivity'>) {
  const totalTonsToday = 186
  const tonsLoaded = 24.5
  const avgPerf = 8.0
  const kpis = [
    { label: 'PRODUCCIÓN HOY', value: totalTonsToday.toLocaleString(), unit: 'ton' },
    { label: 'TONELADAS CARGADAS', value: tonsLoaded.toFixed(1), unit: 'ton' },
    { label: 'RENDIMIENTO PROM.', value: avgPerf.toFixed(1), unit: 'ton/h' },
  ]
  return (
    <div className="grid grid-cols-5 flex-1 min-h-0 gap-0">
      <div className="col-span-3 min-w-0 h-full px-[2px] md:px-[3px] py-[1px] md:py-[2px] border-r border-status-warning/30">
        <div className="w-full h-full min-h-0">
          <HourlyBarChart hourly={productivity.hourlyProductivity} />
        </div>
      </div>
      <div className="col-span-2 min-w-0 h-full px-[2px] md:px-[3px] lg:px-1 py-[1px] md:py-[2px] flex flex-col gap-[2px] md:gap-[3px] lg:gap-0.5">
        {kpis.map((k, i) => (
          <div key={i} className={`flex flex-col min-w-0 flex-1 min-h-0 justify-center ${i > 0 ? 'pt-[1px] md:pt-[2px] border-t border-industrial-700/50' : ''}`}>
            <div className="text-[6px] md:text-[6.5px] lg:text-[7.5px] xl:text-[8.5px] text-gray-300 uppercase tracking-wider font-semibold whitespace-nowrap">
              {k.label}
            </div>
            <div className="flex items-baseline gap-[2px] md:gap-0.5 min-w-0 mt-[1px]">
              <span className="font-mono font-black text-lg md:text-xl lg:text-2xl xl:text-3xl text-white leading-none tracking-tighter whitespace-nowrap">
                {k.value}
              </span>
              <span className="text-[9px] md:text-[10px] lg:text-[11px] xl:text-xs text-status-warning font-bold leading-none whitespace-nowrap mb-0.5">
                {k.unit}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ================================================================
   ESTRUCTURA GENÉRICA COMÚN PARA: Scoop / Camion / Tractor / Drill / Excavator / Retroexcavator
   ————————————————————————————————————————————————————————————————
   Layout interior: FILA SUPERIOR (KPIs grid 4 cols / tractor=5 cols)
                + FILA INFERIOR (Ciclo 4 pasos separados por flechas + Tiempo Promedio)
   Referencia visual: FOTOS 2 (Scoop), 3 (Camión), 4 (Tractor), 5 (Perforadora)
   ================================================================ */

interface KpiDef {
  label: string
  value: string
  unit?: string
  valueColor?: string
  valueIcon?: ReactNode
  labelIcon?: ReactNode
}
interface CycleStep {
  label: string
  duration: string
  iconGlyph: string
}
interface CycleDef {
  title: string
  steps: CycleStep[]
  totalDuration: string
  totalLabel: string
}

const pick = <T,>(o: T | null | undefined, fallback: T): T => (o ?? fallback)

function getGenericConfig(type: MachineType, p: ProductivityPanelProps['productivity']): {
  panelTitle: string
  kpis: KpiDef[]
  kpisRow2?: KpiDef[] 
  cycle: CycleDef | null
} {
  const cycles = p.cyclesCompleted || 0
  const tons = p.tonsMoved || 0
  const perf = p.performance || 0
  const avgCycle = p.avgCycleTime || 0

  switch (type) {
    case 'scoop':
      return {
        panelTitle: 'PRODUCTIVIDAD',
        kpis: [
          { label: 'CICLOS DE CARGA', value: Math.round(cycles || 48).toLocaleString(), unit: 'ciclos', valueIcon: <CycleIcon size={18} className="text-status-warning shrink-0" /> },
          { label: 'TONELADAS MOVIDAS', value: Math.round(tons || 164).toLocaleString(), unit: 'ton', valueIcon: <TruckIcon size={18} className="text-status-warning shrink-0" /> },
          { label: 'RENDIMIENTO', value: (perf > 0 ? perf : 21.6).toFixed(1), unit: 'ton/h' },
          { label: 'EFICIENCIA', value: (0.078).toFixed(3), unit: 'gal/ton' },
        ],
        cycle: {
          title: 'CICLO SCOOP / LHD',
          steps: [
            { label: 'CARGA', duration: '00:32', iconGlyph: '🚜' },
            { label: 'TRANSPORTE', duration: '00:48', iconGlyph: '🚛' },
            { label: 'DESCARGA', duration: '00:18', iconGlyph: '📥' },
            { label: 'RETORNO', duration: '00:36', iconGlyph: '🔄' },
          ],
          totalDuration: '02:14',
          totalLabel: 'TIEMPO PROMEDIO / CICLO',
        },
      }
    case 'other':
      return {
        panelTitle: 'PRODUCTIVIDAD',
        kpis: [
          { label: 'TONELADAS MOVIDAS', value: Math.max(Math.round(tons), 1248).toLocaleString(), unit: 'ton', valueIcon: <TruckIcon size={18} className="text-status-warning shrink-0" /> },
          { label: 'TONELADAS / HORA', value: Math.max(Math.round(perf), 165).toLocaleString(), unit: 'ton/h', valueIcon: <BulldozerIcon size={18} className="text-status-warning shrink-0" /> },
          { label: 'CICLOS REALIZADOS', value: Math.max(Math.round(cycles), 38).toLocaleString(), unit: 'ciclos', valueIcon: <CycleIcon size={18} className="text-status-warning shrink-0" /> },
          { label: 'TIEMPO PROMEDIO / CICLO', value: '18:45', unit: 'min', valueIcon: <ClockHistoryIcon size={18} className="text-status-warning shrink-0" /> },
        ],
        cycle: {
          title: 'CICLO DE CARGA',
          steps: [
            { label: 'CARGA', duration: '00:38', iconGlyph: '🚛' },
            { label: 'TRANSPORTE', duration: '06:45', iconGlyph: '🚚' },
            { label: 'DESCARGA', duration: '00:42', iconGlyph: '📤' },
            { label: 'RETORNO', duration: '06:40', iconGlyph: '🔁' },
          ],
          totalDuration: '14:45',
          totalLabel: 'DURACIÓN TOTAL',
        },
      }
    case 'tractor':
      return {
        panelTitle: 'PRODUCTIVIDAD',
        kpis: [
          { label: 'MODO DE TRABAJO', value: 'EMPUJE / NIVELACIÓN', valueColor: '#F59E0B', valueIcon: <ArrowsUpFromLine size={14} className="text-status-warning shrink-0" /> },
          { label: 'TIEMPO EFECTIVO', value: '6.2', unit: 'h', valueIcon: <ClockHistoryIcon size={18} className="text-status-warning shrink-0" /> },
          { label: 'MATERIAL MOVIDO', value: '1,256', unit: 'm³' },
          { label: 'RENDIMIENTO', value: '203', unit: 'm³/h' },
          { label: 'EFICIENCIA', value: '0.085', unit: 'gal/m³' },
        ],
        cycle: {
          title: 'CICLO DE TRABAJO PROMEDIO',
          steps: [
            { label: 'EMPUJE', duration: '00:38', iconGlyph: '🚜' },
            { label: 'RETROCESO', duration: '00:25', iconGlyph: '⏪' },
            { label: 'GIRO', duration: '00:20', iconGlyph: '🔃' },
            { label: 'EMPUJE', duration: '00:42', iconGlyph: '🚜' },
          ],
          totalDuration: '02:05',
          totalLabel: 'TIEMPO PROMEDIO / CICLO',
        },
      }
    case 'drill':
      return {
        panelTitle: 'PRODUCTIVIDAD DE PERFORACIÓN',
        kpis: [
          { label: 'METROS PERFORADOS', value: '145.6', unit: 'm', valueIcon: <MeterIcon size={18} className="text-status-warning shrink-0" /> },
          { label: 'TIEMPO PERFORANDO', value: '6.1', unit: 'h', valueIcon: <ClockHistoryIcon size={18} className="text-status-warning shrink-0" /> },
          { label: 'AVANCE PROMEDIO', value: '23.9', unit: 'm/h' },
          { label: 'EFICIENCIA', value: '78', unit: '%' },
        ],
        cycle: {
          title: 'CICLO DE PERFORACIÓN PROMEDIO',
          steps: [
            { label: 'POSICIONAMIENTO', duration: '01:45', iconGlyph: '📍' },
            { label: 'PERFORANDO', duration: '10:32', iconGlyph: '⛏️' },
            { label: 'LIMPIEZA', duration: '01:20', iconGlyph: '💨' },
            { label: 'CAMBIO VARILLA', duration: '02:10', iconGlyph: '🔧' },
          ],
          totalDuration: '15:47',
          totalLabel: 'TOTAL CICLO',
        },
      }
    case 'retroexcavator':
      return {
        panelTitle: 'PRODUCTIVIDAD',
        kpis: [
          { label: 'MODO DE TRABAJO', value: 'CARGADOR FRONTAL', valueColor: '#F59E0B', valueIcon: <BulldozerIcon size={18} className="text-status-warning shrink-0" /> },
          { label: 'CICLOS CARGADOR', value: Math.max(Math.round(cycles), 56).toLocaleString(), unit: 'ciclos' },
          { label: 'CICLOS EXCAVADOR', value: Math.max(Math.round(cycles), 56).toLocaleString(), unit: 'ciclos' },
        ],
        kpisRow2: [
          { label: 'TONELADAS MOVIDAS', value: Math.max(Math.round(tons), 192).toLocaleString(), unit: 'ton' },
          { label: 'RENDIMIENTO', value: (perf > 0 ? perf : 22.1).toFixed(1), unit: 'ton/h' },
          { label: 'EFICIENCIA', value: '0.082', unit: 'gal/ton' },
        ],
        cycle: null,
      }
    case 'excavator':
      return {
        panelTitle: 'PRODUCTIVIDAD',
        kpis: [
          { label: 'EFICIENCIA', value: '0.094', unit: 'gal/ton' },
          { label: 'RENDIMIENTO', value: Math.max(Math.round(perf), 138).toLocaleString(), unit: 'ton/h' },
        ],
        cycle: null,
      }
    default:
      return {
        panelTitle: 'PRODUCTIVIDAD',
        kpis: [
          { label: 'CICLOS EXCAVACIÓN', value: Math.max(Math.round(cycles), 52).toLocaleString(), unit: 'ciclos' },
          { label: 'TONELADAS EXCAVADAS', value: Math.max(Math.round(tons), 182).toLocaleString(), unit: 'ton' },
          { label: 'RENDIMIENTO', value: (perf > 0 ? perf : 19.2).toFixed(1), unit: 'ton/h' },
          { label: 'EFICIENCIA', value: '0.082', unit: 'gal/ton' },
        ],
        cycle: {
          title: 'CICLO EXCAVADORA',
          steps: [
            { label: 'EXCAVACIÓN', duration: '00:22', iconGlyph: '⛏️' },
            { label: 'GIRO', duration: '00:10', iconGlyph: '🔄' },
            { label: 'DESCARGA', duration: '00:14', iconGlyph: '📥' },
            { label: 'GIRO RETORNO', duration: '00:18', iconGlyph: '↩️' },
          ],
          totalDuration: avgCycle > 0
            ? `${String(Math.floor(avgCycle / 60)).padStart(2, '0')}:${String(Math.round(avgCycle % 60)).padStart(2, '0')}`
            : '01:04',
          totalLabel: 'TIEMPO PROMEDIO / CICLO',
        },
      }
  }
}

/* ================================================================
   VARIANTE 2: EXCAVADORA (diseño foto referencia)
   ————————————————————————————————————————————————————————————————
   2 columnas iguales con línea divisoria vertical central:
     EFICIENCIA  |  RENDIMIENTO
     0.094 gal/ton | 138 ton/h
   ================================================================ */
function ExcavatorProductivityContent({ productivity }: Pick<ProductivityPanelProps, 'productivity'>) {
  const perf = productivity.performance || 0
  const eficiencia = '0.094'
  const rendimiento = Math.max(Math.round(perf), 138).toLocaleString()

  return (
    <div className="relative h-full flex items-stretch justify-center min-h-0 w-full">
      {/* LÍNEA VERTICAL DIVISORIA CENTRAL */}
      <div
        className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-status-warning/50 z-20 pointer-events-none"
        aria-hidden
      />

      <div className="grid grid-cols-2 w-full h-full min-h-0">
        {/* COLUMNA IZQUIERDA: EFICIENCIA */}
        <div className="flex flex-col items-center justify-center min-w-0 px-[2px] md:px-[4px] lg:px-2 h-full relative">
          <div className="text-[10px] md:text-[11px] lg:text-[13px] xl:text-[16px] text-gray-200 uppercase tracking-widest font-black whitespace-nowrap mb-[4px] md:mb-[6px] lg:mb-2">
            EFICIENCIA
          </div>
          <div className="flex items-baseline gap-[2px] md:gap-0.5 min-w-0">
            <span className="font-mono font-black text-[36px] md:text-[32px] lg:text-[36px] xl:text-[48px] text-status-warning leading-[0.9] tracking-tighter">
              {eficiencia}
            </span>
            <span className="text-[14px] md:text-[16px] lg:text-[20px] xl:text-[26px] text-status-warning font-black leading-none mb-1">
              gal/ton
            </span>
          </div>
        </div>

        {/* COLUMNA DERECHA: RENDIMIENTO */}
        <div className="flex flex-col items-center justify-center min-w-0 px-[2px] md:px-[4px] lg:px-2 h-full relative">
          <div className="text-[10px] md:text-[11px] lg:text-[13px] xl:text-[16px] text-gray-200 uppercase tracking-widest font-black whitespace-nowrap mb-[4px] md:mb-[6px] lg:mb-2">
            RENDIMIENTO
          </div>
          <div className="flex items-baseline gap-[2px] md:gap-0.5 min-w-0">
            <span className="font-mono font-black text-[36px] md:text-[32px] lg:text-[36px] xl:text-[48px] text-status-warning leading-[0.9] tracking-tighter">
              {rendimiento}
            </span>
            <span className="text-[14px] md:text-[16px] lg:text-[20px] xl:text-[26px] text-status-warning font-black leading-none mb-1">
              ton/h
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

function GenericProductivityContent(props: ProductivityPanelProps) {
  const { machine, productivity } = props
  const cfg = getGenericConfig(machine.type, productivity)
  const cycle = cfg.cycle || null
  const totalKpis = cfg.kpis.length
  const kpiGridCols = totalKpis === 3 ? 'grid-cols-3' : totalKpis === 5 ? 'grid-cols-5' : 'grid-cols-4'
  const row2GridCols = cfg.kpisRow2?.length === 3 ? 'grid-cols-3' : 'grid-cols-4'

  return (
    <div className="h-full flex flex-col min-h-0 gap-[2px] md:gap-[3px] lg:gap-0.5">
      {/* ============== FILA 1: KPIs ============== */}
      <div className={`grid ${kpiGridCols} gap-[2px] md:gap-[3px] lg:gap-1 border-b border-industrial-700/50 pb-[2px] md:pb-[3px] flex-1 min-h-0`}>
        {cfg.kpis.map((k, i) => (
          <div
            key={i}
            className={`flex flex-col justify-center min-w-0 overflow-hidden px-[2px] md:px-[3px] lg:px-1 py-[1px] md:py-[2px] ${i > 0 ? 'border-l border-industrial-700/40' : ''}`}
          >
            <div className="text-[5.5px] md:text-[6px] lg:text-[7px] xl:text-[8px] text-gray-300 uppercase tracking-wider font-semibold whitespace-nowrap flex items-center gap-[2px]">
              {k.label}
            </div>
            <div className="flex items-baseline gap-[1px] min-w-0 mt-[1px] flex-wrap">
              {k.valueIcon && (
                <div className="text-[8px] md:text-[9px] lg:text-[10px] xl:text-[11px] font-bold leading-none mb-0.5 whitespace-nowrap">
                  {k.valueIcon}
                </div>
              )}
              <span
                className={`font-mono font-black leading-none tracking-tighter ${
                  k.value.length > 10
                    ? 'text-[9px] md:text-[10px] lg:text-[11px] xl:text-sm whitespace-normal break-words'
                    : 'text-lg md:text-xl lg:text-2xl xl:text-3xl whitespace-nowrap'
                }`}
                style={{ color: k.valueColor ? k.valueColor : '#ffffff' }}
              >
                {k.value}
              </span>
              {k.unit && (
                <span
                  className="text-[8px] md:text-[9px] lg:text-[10px] xl:text-[11px] font-bold leading-none mb-0.5 whitespace-nowrap"
                  style={{ color: k.valueColor ?? '#F59E0B' }}
                >
                  {k.unit}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ============== FILA 2: CICLO 4 PASOS + TIEMPO PROM ============== */}
      {cycle ? (
        <div className="flex min-h-0 flex-1 gap-[2px] md:gap-[3px] lg:gap-1 items-stretch pt-[1px] md:pt-[2px]">
        <div className="flex-1 min-w-0 flex flex-col gap-[1px] md:gap-[2px]">
          <div className="text-[5.5px] md:text-[6px] lg:text-[6.5px] xl:text-[7.5px] text-gray-300 uppercase tracking-wider font-semibold whitespace-nowrap">
            {cycle.title}
          </div>
          <div className="grid grid-flow-col auto-cols-fr items-center gap-[1px] md:gap-[2px] flex-1 min-h-0">
            {cycle.steps.map((step, i) => (
              <div key={i} className="contents">
                <div className="flex flex-col items-center justify-center min-w-0 gap-[1px] px-[1px] md:px-[2px] py-[1px] md:py-[2px] rounded-md bg-industrial-800/40 border border-industrial-700/40 min-h-0 h-full">
                  <div className="text-xs md:text-sm leading-none" aria-hidden>{step.iconGlyph}</div>
                  <div className="text-[5px] md:text-[5.5px] lg:text-[6px] xl:text-[7px] text-gray-200 uppercase tracking-wider font-bold whitespace-nowrap leading-tight">
                    {step.label}
                  </div>
                  <div className="font-mono font-black text-[10px] md:text-[11px] lg:text-xs xl:text-sm leading-none text-status-warning whitespace-nowrap">
                    {step.duration}
                  </div>
                </div>
                {i < cycle.steps.length - 1 && (
                  <div className="flex items-center justify-center min-w-0 h-full">
                    <ArrowRight size={10} className="text-industrial-500 md:w-3 md:h-3 lg:w-3.5 lg:h-3.5" strokeWidth={2.2} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* TIEMPO PROMEDIO TOTAL */}
        <div className="w-[72px] md:w-[84px] lg:w-[96px] xl:w-[110px] shrink-0 flex flex-col items-center justify-center gap-[1px] px-[2px] md:px-[3px] lg:px-1 py-[1px] md:py-[2px] rounded-md border border-status-warning/30 bg-industrial-850/60 min-h-0">
          <Clock size={12} className="text-status-warning md:w-3 md:h-3 lg:w-3.5 lg:h-3.5 shrink-0" />
          <div className="text-[5px] md:text-[5.5px] lg:text-[6px] xl:text-[7px] text-gray-300 uppercase tracking-wider font-semibold whitespace-nowrap text-center leading-tight">
            {cycle.totalLabel}
          </div>
          <div className="font-mono font-black text-sm md:text-base lg:text-xl xl:text-2xl leading-none tracking-tighter text-status-warning whitespace-nowrap">
            {cycle.totalDuration}
          </div>
          <div className="text-[6px] md:text-[7px] lg:text-[8px] text-gray-400 font-bold leading-none whitespace-nowrap">min</div>
        </div>
      </div>
      ) : cfg.kpisRow2 ? (
        <div className={`grid ${row2GridCols} gap-[2px] md:gap-[3px] lg:gap-1 border-b border-industrial-700/50 pb-[2px] md:pb-[3px] flex-1 min-h-0`}>
          {cfg.kpisRow2.map((k, i) => (
            <div
              key={i}
              className={`flex flex-col justify-center min-w-0 overflow-hidden px-[2px] md:px-[3px] lg:px-1 py-[1px] md:py-[2px] ${i > 0 ? 'border-l border-industrial-700/40' : ''}`}
            >
              <div className="text-[5.5px] md:text-[6px] lg:text-[7px] xl:text-[8px] text-gray-300 uppercase tracking-wider font-semibold whitespace-nowrap flex items-center gap-[2px]">
                {k.label}
              </div>
              <div className="flex items-baseline gap-[2px] min-w-0 mt-[2px] flex-wrap">
                <span
                  className="font-mono font-black text-lg md:text-xl lg:text-2xl xl:text-3xl leading-none tracking-tighter whitespace-nowrap"
                  style={{ color: k.valueColor ?? '#ffffff' }}
                >
                  {k.value}
                </span>
                {k.unit && (
                  <span
                    className="text-[9px] md:text-[10px] lg:text-[11px] xl:text-xs font-bold leading-none mb-0.5 whitespace-nowrap"
                    style={{ color: k.valueColor ?? '#F59E0B' }}
                  >
                    {k.unit}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : null
      }
    </div>
  ) 
}

/* ================================================================
   COMPONENTE PRINCIPAL ProductivityPanel
   ————————————————————————————————————————————————————————————————
   Recibe prop `machine` y bifurca contenido:
    · type === 'loader'  → LoaderProductivityContent (BarChart SVG + 3 KPIs)
    · cualquier otro type → GenericProductivityContent (KPIs cols + Ciclo 4 pasos)
   Contenedor SectionPanel (naranja) es IDÉNTICO en ambos casos, y
   el layout exterior del Dashboard (2×3 6 paneles) no varía nunca.
   ================================================================ */

export default function ProductivityPanel({ productivity, machine }: ProductivityPanelProps) {
  const cfg = machine.type !== 'loader' ? getGenericConfig(machine.type, productivity) : null
  const panelTitle = machine.type === 'loader' ? 'PRODUCTIVIDAD' : pick(cfg?.panelTitle, 'PRODUCTIVIDAD')

  return (
    <SectionPanel
      title={panelTitle}
      icon={<BarChart3 size={18} className="text-status-warning md:size-[18px] lg:size-[22px] xl:size-[24px]" />}
      iconColor="text-status-warning"
      titleColorClass="text-status-warning"
      borderClass="border-status-warning/60"
      grow
    >
      <div className="p-[2px] md:p-[2px] lg:p-[3px] xl:p-1 h-full flex flex-col min-h-0 gap-[2px]">
        {machine.type === 'loader'
          ? <LoaderProductivityContent productivity={productivity} />
          : machine.type === 'excavator'
          ? <ExcavatorProductivityContent productivity={productivity} />
          : <GenericProductivityContent productivity={productivity} machine={machine} />
        }
      </div>
    </SectionPanel>
  )
}
