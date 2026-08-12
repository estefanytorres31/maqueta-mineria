import { Fuel as FuelIcon } from 'lucide-react'
import SectionPanel from '../SectionPanel'
import ProgressBar from '../ProgressBar'
import { FuelData } from '../../types'

interface FuelPanelProps {
  fuel: Pick<FuelData, 'instantConsumption' | 'tankLevel' | 'todayConsumption' | 'idleTodayConsumption' | 'autonomy'>
}

export default function FuelPanel({ fuel }: FuelPanelProps) {
  return (
    <SectionPanel
      title="COMBUSTIBLE"
      icon={<FuelIcon size={14} className="text-fuel-primary" />}
    >
      <div className="p-3 space-y-3">
      <div className="grid grid-cols-2 gap-2">
        <div>
          <div className="flex items-center gap-1 mb-0.5">
            <FuelIcon size={10} className="text-gray-500" />
            <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">CONSUMO INSTANTÁNEO</span>
          </div>
          <div className="font-mono font-black text-xl text-white leading-none">{fuel.instantConsumption.toFixed(1)} <span className="text-xs text-gray-400 font-semibold">gal/h</span></div>
          <div className="mt-1 h-1 w-full flex gap-0.5">
            {[...Array(10)].map((_, i) => (
              <div key={i} className={`flex-1 rounded-full h-1 ${i < Math.round((fuel.instantConsumption / 25) * 10) ? 'bg-status-ok' : 'bg-industrial-700'}`} />
            ))}
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">NIVEL TANQUE</span>
            <FuelIcon size={12} className="text-fuel-primary" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="font-mono font-black text-xl text-fuel-primary leading-none">{fuel.tankLevel.toFixed(0)}</span>
            <span className="text-sm text-gray-400 font-semibold">%</span>
          </div>
          <ProgressBar value={fuel.tankLevel} color="bg-fuel-primary" height="h-1.5" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-1.5">
        <div className="bg-industrial-900/80 rounded-md p-2 border border-industrial-750/80">
          <div className="text-[9px] text-gray-400 uppercase tracking-wider font-semibold mb-0.5">CONSUMO HOY</div>
          <div className="font-mono font-bold text-xs text-white leading-none">{fuel.todayConsumption.toFixed(1)} <span className="text-[9px] text-gray-400">gal</span></div>
        </div>
        <div className="bg-industrial-900/80 rounded-md p-2 border border-industrial-750/80">
          <div className="text-[9px] text-gray-400 uppercase tracking-wider font-semibold mb-0.5">RALENTÍ HOY</div>
          <div className="font-mono font-bold text-xs text-white leading-none">{fuel.idleTodayConsumption.toFixed(1)} <span className="text-[9px] text-gray-400">gal</span></div>
        </div>
        <div className="bg-industrial-900/80 rounded-md p-2 border border-industrial-750/80">
          <div className="text-[9px] text-gray-400 uppercase tracking-wider font-semibold mb-0.5">AUTONOMÍA</div>
          <div className="font-mono font-bold text-xs text-status-ok leading-none">{fuel.autonomy.toFixed(1)} <span className="text-[9px] text-gray-400">h</span></div>
        </div>
      </div>
      </div>
    </SectionPanel>
  )
}
