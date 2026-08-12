import { BarChart3, Pickaxe, Cpu, Gauge, Timer } from 'lucide-react'
import SectionPanel from '../SectionPanel'
import KpiCard from '../KpiCard'
import { ProductivityData } from '../../types'

interface ProductivityPanelProps {
  productivity: Pick<ProductivityData, 'cyclesCompleted' | 'tonsMoved' | 'performance' | 'avgCycleTime'>
}

export default function ProductivityPanel({ productivity }: ProductivityPanelProps) {
  return (
    <SectionPanel
      title="PRODUCTIVIDAD HOY"
      icon={<BarChart3 size={14} className="text-status-ok" />}
    >
      <div className="p-3 space-y-2.5">
      <div className="grid grid-cols-3 gap-1.5">
        <KpiCard 
          label="CICLOS REALIZADOS" 
          value={productivity.cyclesCompleted.toLocaleString()} 
          unit="ciclos" 
          icon={<Pickaxe size={14} className="text-electric-400" />} 
        />
        <KpiCard 
          label="TONELADAS MOVIDAS" 
          value={productivity.tonsMoved.toLocaleString()} 
          unit="ton" 
          highlight 
          icon={<Cpu size={14} className="text-status-ok" />} 
        />
        <KpiCard 
          label="RENDIMIENTO" 
          value={productivity.performance.toFixed(0)} 
          unit="ton/h" 
          icon={<Gauge size={14} className="text-fuel-primary" />} 
        />
      </div>
      <div className="bg-industrial-900/80 rounded-md p-2.5 border border-industrial-750/80 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Timer size={16} className="text-fuel-primary" />
          <div>
            <div className="text-[9px] text-gray-400 uppercase font-semibold tracking-wider">TIEMPO PROMEDIO POR CICLO</div>
            <div className="font-mono font-bold text-sm text-white leading-tight">
              00:{String(Math.floor(productivity.avgCycleTime)).padStart(2, '0')} <span className="text-[10px] text-gray-400 font-semibold">min</span>
            </div>
          </div>
        </div>
        <Gauge size={20} className="text-fuel-primary/70" />
      </div>
      </div>
    </SectionPanel>
  )
}
