import { BarChart3 } from 'lucide-react'
import SectionPanel from '../SectionPanel'
import ProgressBar from '../ProgressBar'
import { ProductivityData } from '../../types'

interface ProductivityPanelProps {
  productivity: Pick<ProductivityData, 'consumptionPerTon' | 'performance' | 'tonsMoved'>
}

export default function ProductivityPanel({ productivity }: ProductivityPanelProps) {
  const efficiencyPct = Math.min(100, Math.round((productivity.consumptionPerTon / 0.5) * 100))
  const performancePct = Math.min(100, Math.round((productivity.performance / 200) * 100))

  return (
    <SectionPanel
      title="PRODUCTIVIDAD"
      icon={<BarChart3 size={18} className="text-status-warning md:size-[18px] lg:size-[20px] xl:size-[22px]" />}
      iconColor="text-status-warning"
      titleColorClass="text-status-warning"
      borderClass="border-status-warning/60"
      bodyClass="shadow-[0_0_32px_-10px_rgba(245,158,11,0.12)]"
      grow
    >
      <div className="p-0.5 md:p-0.5 lg:p-1 xl:p-1.5 h-full flex flex-col min-h-0 gap-1 md:gap-1 lg:gap-1.5">
        <div className="grid grid-cols-2 divide-x divide-status-warning/40 flex-1 min-h-0">
          <div className="flex flex-col items-center justify-center px-1 md:px-1.5 lg:px-2 xl:px-3 py-0.5 md:py-0.75 lg:py-1 min-w-0 h-full">
            <div className="text-[8px] md:text-[8.5px] lg:text-[9px] xl:text-[10px] text-gray-300 uppercase tracking-[0.1em] font-bold text-center whitespace-nowrap">EFICIENCIA</div>
            <div className="flex items-baseline gap-0.5 md:gap-1 lg:gap-2 min-w-0 mt-2">
              <span className="font-mono font-black text-4xl md:text-3xl lg:text-4xl xl:text-6xl text-status-warning leading-none tracking-tighter">
                {productivity.consumptionPerTon.toFixed(3)}
              </span>
              <span className="text-[10px] md:text-[11px] lg:text-xs xl:text-sm text-status-warning font-bold leading-none mb-1">gal/ton</span>
            </div>
            <div className="w-full mt-1 md:mt-1.5 lg:mt-2 min-w-0">
              <ProgressBar value={efficiencyPct} color="bg-status-warning" height="h-2 md:h-2 lg:h-2.5 xl:h-3" rounded />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center px-1 md:px-1.5 lg:px-2 xl:px-3 py-0.5 md:py-0.75 lg:py-1 min-w-0 h-full">
            <div className="text-[8px] md:text-[8.5px] lg:text-[9px] xl:text-[10px] text-gray-300 uppercase tracking-[0.1em] font-bold text-center whitespace-nowrap">RENDIMIENTO</div>
            <div className="flex items-baseline gap-0.5 md:gap-1 lg:gap-2 min-w-0 mt-2">
              <span className="font-mono font-black text-4xl md:text-3xl lg:text-4xl xl:text-6xl text-status-warning leading-none tracking-tighter">
                {productivity.performance.toFixed(0)}
              </span>
              <span className="text-[10px] md:text-[11px] lg:text-xs xl:text-sm text-status-warning font-bold leading-none mb-1">ton/h</span>
            </div>
            <div className="w-full mt-1 md:mt-1.5 lg:mt-2 min-w-0">
              <ProgressBar value={performancePct} color="bg-status-warning" height="h-2 md:h-2 lg:h-2.5 xl:h-3" rounded />
            </div>
          </div>
        </div>
      </div>
    </SectionPanel>
  )
}
