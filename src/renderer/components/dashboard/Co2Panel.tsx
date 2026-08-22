import { CloudFog } from 'lucide-react'
import SectionPanel from '../SectionPanel'
import { FuelData } from '../../types'

interface Co2PanelProps {
  fuel: Pick<FuelData, 'todayConsumption'>
}

function Co2Sparkline({ value, color = '#10B981' }: { value: number; color?: string }) {
  const pts = [
    0.89, 0.94, 0.98, 1.02, 1.01, 1.08, 1.04, 1.09, 1.11, 1.07, 1.12, 1.10, 1.15, 1.13, value
  ]
  const max = Math.max(...pts)
  const min = Math.min(...pts) * 0.97
  const w = 100
  const h = 36
  const scaleX = (i: number) => (i / (pts.length - 1)) * w
  const scaleY = (v: number) => h - ((v - min) / (max - min)) * (h - 8) - 4
  const poly = pts.map((v, i) => `${scaleX(i).toFixed(1)},${scaleY(v).toFixed(1)}`).join(' ')
  const lastIdx = pts.length - 1
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-9 md:h-10 lg:h-12 xl:h-16" preserveAspectRatio="none">
      <defs>
        <linearGradient id="co2SparkFill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon
        points={`0,${h} ${poly} ${w},${h}`}
        fill="url(#co2SparkFill)"
      />
      <polyline
        points={poly}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx={scaleX(lastIdx)} cy={scaleY(value)} r="2.5" fill={color} />
    </svg>
  )
}

export default function Co2Panel({ fuel }: Co2PanelProps) {
  const co2Today = +(fuel.todayConsumption * 0.00995).toFixed(2)

  return (
    <SectionPanel
      title="CO₂ EMISIONES HOY"
      icon={<CloudFog size={18} className="text-gray-300 md:size-[18px] lg:size-[20px] xl:size-[22px]" />}
      iconColor="text-gray-300"
      titleColorClass="text-gray-200"
      borderClass="border-industrial-600"
      grow
      centerTitle
    >
      <div className="p-1 md:p-1.5 lg:p-2 xl:p-3 h-full flex flex-col min-h-0 gap-2 md:gap-2 lg:gap-3">
        <div className="flex items-center justify-between gap-2 md:gap-2 lg:gap-3 flex-1 min-h-0">
          <div className="flex flex-col justify-center flex-1 min-w-0 h-full">
            <div className="text-[9px] md:text-[10px] lg:text-[11px] xl:text-xs text-gray-400 uppercase tracking-[0.1em] font-semibold">
              EMISIONES TOTALES
            </div>
            <div className="font-mono font-black text-4xl md:text-3xl lg:text-4xl xl:text-5xl text-white leading-[0.9] tracking-tighter mt-1">
              {co2Today.toFixed(2)}
            </div>
            <div className="text-[11px] md:text-xs lg:text-sm xl:text-base text-status-ok font-bold mt-0.5 leading-none tracking-wider">
              t CO₂
            </div>
          </div>
          <div className="flex-1 min-w-0 flex items-center justify-end h-full py-4">
            <Co2Sparkline value={co2Today} />
          </div>
        </div>
      </div>
    </SectionPanel>
  )
}
