import { TrendingUp, BarChart3 } from 'lucide-react'
import SectionPanel from '../SectionPanel'
import ProgressBar from '../ProgressBar'
import { ProductivityData } from '../../types'

interface EfficiencyPanelProps {
  productivity: Pick<ProductivityData, 'consumptionPerTon' | 'consumptionPerCycle' | 'unproductiveFuel'>
}

export default function EfficiencyPanel({ productivity }: EfficiencyPanelProps) {
  return (
    <SectionPanel
      title="EFICIENCIA"
      icon={<TrendingUp size={14} className="text-fuel-primary" />}
      grow
    >
      <div className="p-3 space-y-2.5">
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-industrial-900/80 border border-fuel-primary/30 rounded-md p-2.5">
          <div className="text-[9px] uppercase font-bold tracking-wider text-fuel-primary mb-0.5">CONSUMO POR TONELADA</div>
          <div className="flex items-baseline gap-1">
            <span className="font-mono font-black text-sm text-fuel-primary leading-none">
              {productivity.consumptionPerTon.toFixed(3)}
            </span>
            <span className="text-[10px] text-gray-400 font-semibold">gal/ton</span>
          </div>
        </div>
        <div className="bg-industrial-900/80 border border-industrial-750 rounded-md p-2.5">
          <div className="text-[9px] uppercase font-bold tracking-wider text-gray-400 mb-0.5">CONSUMO POR CICLO</div>
          <div className="flex items-baseline gap-1">
            <span className="font-mono font-black text-sm text-white leading-none">
              {productivity.consumptionPerCycle.toFixed(2)}
            </span>
            <span className="text-[10px] text-gray-400 font-semibold">gal/ciclo</span>
          </div>
        </div>
      </div>
      <div className="bg-industrial-900/80 border border-status-warning/30 rounded-md p-2.5">
        <div className="flex items-center justify-between mb-1.5">
          <div>
            <div className="text-[9px] uppercase font-bold tracking-wider text-status-warning mb-0.5">COMBUSTIBLE IMPRODUCTIVO</div>
            <div className="flex items-baseline gap-1">
              <span className="font-mono font-black text-sm text-status-warning leading-none">
                {productivity.unproductiveFuel.toFixed(1)}
              </span>
              <span className="text-[10px] text-gray-400 font-semibold">%</span>
            </div>
          </div>
          <BarChart3 size={22} className="text-status-warning/60" />
        </div>
        <ProgressBar value={productivity.unproductiveFuel} max={100} color="bg-status-warning" />
      </div>
      </div>
    </SectionPanel>
  )
}
