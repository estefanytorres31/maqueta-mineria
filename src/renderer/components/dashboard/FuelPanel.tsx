import { Fuel as FuelIcon } from 'lucide-react'
import SectionPanel from '../SectionPanel'
import ProgressBar from '../ProgressBar'
import { FuelData } from '../../types'

interface FuelPanelProps {
  fuel: Pick<FuelData, 'instantConsumption' | 'tankLevel' | 'todayConsumption' | 'idleTodayConsumption' | 'autonomy'>
}

function Sparkline({ value, color = '#10B981' }: { value: number; color?: string }) {
  const pts = [
    12.4, 15.2, 13.8, 14.5, 16.1, 14.9, 13.2, 15.6, 17.3, 16.4, 14.8, 15.9, 18.2, 16.7, value
  ]
  const max = Math.max(...pts)
  const min = Math.min(...pts) * 0.95
  const w = 100
  const h = 20
  const scaleX = (i: number) => (i / (pts.length - 1)) * w
  const scaleY = (v: number) => h - ((v - min) / (max - min)) * (h - 4) - 2
  const poly = pts.map((v, i) => `${scaleX(i).toFixed(1)},${scaleY(v).toFixed(1)}`).join(' ')
  const lastIdx = pts.length - 1
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-5" preserveAspectRatio="none">
      <defs>
        <linearGradient id="sparkFill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon
        points={`0,${h} ${poly} ${w},${h}`}
        fill="url(#sparkFill)"
      />
      <polyline
        points={poly}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx={scaleX(lastIdx)} cy={scaleY(value)} r="2" fill={color} />
    </svg>
  )
}

export default function FuelPanel({ fuel }: FuelPanelProps) {
  return (
    <SectionPanel
      title="COMBUSTIBLE"
      icon={<FuelIcon size={14} className="text-fuel-primary" />}
    >
      <div className="p-0.5 md:p-1 lg:p-1 xl:p-1.5 h-full flex flex-col min-h-0 gap-0.5 md:gap-0.5 lg:gap-1">
        <div className="grid grid-cols-2 divide-x divide-industrial-700/60 flex-1 min-h-0">
          <div className="flex flex-col px-0.5 md:px-0.5 lg:px-1 xl:px-1 py-0.25 md:py-0.25 lg:py-0.5 min-w-0 h-full gap-0.25 md:gap-0.25 lg:gap-0.5">
            <div className="flex items-center gap-0.5 md:gap-0.5 lg:gap-1 min-w-0">
              <FuelIcon size={10} className="text-gray-500 flex-shrink-0" />
              <span className="text-[7px] md:text-[7.5px] lg:text-[8px] xl:text-[9px] text-gray-400 uppercase tracking-wider font-semibold truncate">CONSUMO INST.</span>
            </div>
            <div className="flex flex-col gap-0.25 md:gap-0.25 lg:gap-0.5 min-w-0 mt-auto">
              <div className="flex items-baseline gap-0.5 md:gap-0.5 min-w-0">
                <div className="font-mono font-black text-xl md:text-xl lg:text-2xl xl:text-2xl text-white leading-none tracking-tight">
                  {fuel.instantConsumption.toFixed(1)}
                </div>
                <span className="text-[8px] md:text-[8.5px] lg:text-[9px] xl:text-[9.5px] text-gray-400 font-bold leading-none whitespace-nowrap">gal/h</span>
              </div>
              <div className="w-full min-w-0"><Sparkline value={fuel.instantConsumption} /></div>
            </div>
          </div>
          <div className="flex flex-col px-0.5 md:px-0.5 lg:px-1 xl:px-1 py-0.25 md:py-0.25 lg:py-0.5 min-w-0 h-full gap-0.25 md:gap-0.25 lg:gap-0.5">
            <div className="flex items-center justify-between min-w-0 gap-0.5">
              <span className="text-[7px] md:text-[7.5px] lg:text-[8px] xl:text-[9px] text-gray-400 uppercase tracking-wider font-semibold truncate">NIVEL TANQUE</span>
              <FuelIcon size={12} className="text-fuel-primary flex-shrink-0" />
            </div>
            <div className="flex flex-col gap-0.25 md:gap-0.25 lg:gap-0.5 min-w-0 mt-auto">
              <div className="flex items-baseline gap-0.5 md:gap-0.5 min-w-0">
                <span className="font-mono font-black text-xl md:text-xl lg:text-2xl xl:text-2xl text-fuel-primary leading-none tracking-tight">
                  {fuel.tankLevel.toFixed(0)}
                </span>
                <span className="text-[9px] md:text-[9.5px] lg:text-[10px] xl:text-[11px] text-gray-400 font-bold">%</span>
              </div>
              <ProgressBar value={fuel.tankLevel} color="bg-fuel-primary" height="h-1.5 md:h-1.5 lg:h-2" rounded />
            </div>
          </div>
        </div>

        <div className="border-t border-industrial-700/60 my-0.25 md:my-0.25 lg:my-0.25" />

        <div className="grid grid-cols-3 divide-x divide-industrial-700/60 flex-shrink-0">
          <div className="flex flex-col items-start justify-center gap-0.25 md:gap-0.25 lg:gap-0.5 px-0.5 md:px-0.5 lg:px-1 xl:px-1 py-0.25 md:py-0.25 lg:py-0.5 min-w-0">
            <div className="text-[6.5px] md:text-[7px] lg:text-[7.5px] xl:text-[8px] text-gray-400 uppercase tracking-wider font-bold truncate w-full text-start">CONSUMO HOY</div>
            <div className="font-mono font-bold text-[10px] md:text-[10.5px] lg:text-[11px] xl:text-xs text-white leading-none whitespace-nowrap">
              {fuel.todayConsumption.toFixed(1)} <span className="text-[6.5px] md:text-[7px] lg:text-[7.5px] text-gray-400 font-semibold">gal</span>
            </div>
          </div>
          <div className="flex flex-col items-start justify-center gap-0.25 md:gap-0.25 lg:gap-0.5 px-0.5 md:px-0.5 lg:px-1 xl:px-1 py-0.25 md:py-0.25 lg:py-0.5 min-w-0">
            <div className="text-[6.5px] md:text-[7px] lg:text-[7.5px] xl:text-[8px] text-gray-400 uppercase tracking-wider font-bold truncate w-full text-start">RALENTÍ HOY</div>
            <div className="font-mono font-bold text-[10px] md:text-[10.5px] lg:text-[11px] xl:text-xs text-white leading-none whitespace-nowrap">
              {fuel.idleTodayConsumption.toFixed(1)} <span className="text-[6.5px] md:text-[7px] lg:text-[7.5px] text-gray-400 font-semibold">gal</span>
            </div>
          </div>
          <div className="flex flex-col items-start justify-center gap-0.25 md:gap-0.25 lg:gap-0.5 px-0.5 md:px-0.5 lg:px-1 xl:px-1 py-0.25 md:py-0.25 lg:py-0.5 min-w-0">
            <div className="text-[6.5px] md:text-[7px] lg:text-[7.5px] xl:text-[8px] text-gray-400 uppercase tracking-wider font-bold truncate w-full text-start">AUTONOMÍA</div>
            <div className="font-mono font-bold text-[10px] md:text-[10.5px] lg:text-[11px] xl:text-xs text-status-ok leading-none whitespace-nowrap">
              {fuel.autonomy.toFixed(1)} <span className="text-[6.5px] md:text-[7px] lg:text-[7.5px] text-gray-400 font-semibold">h</span>
            </div>
          </div>
        </div>
      </div>
    </SectionPanel>
  )
}
