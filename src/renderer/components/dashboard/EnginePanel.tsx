import { Cpu, Thermometer, Droplets, CircleDot } from 'lucide-react'
import SectionPanel from '../SectionPanel'
import KpiCard from '../KpiCard'
import TachoGauge from '../gauges/TachoGauge'
import { EngineData } from '../../types'

interface EnginePanelProps {
  engine: EngineData
}

export default function EnginePanel({ engine }: EnginePanelProps) {
  return (
    <SectionPanel
      title="MOTOR"
      icon={<Cpu size={14} className="text-electric-400" />}
    >
      <div className="p-2.5 md:p-3 space-y-2.5 md:space-y-3">
      <div className="flex items-center gap-2 md:gap-3 relative">
        <div className="flex flex-col justify-end flex-1 min-w-0">
          <div className="text-[10px] md:text-xs text-gray-400 uppercase tracking-[0.12em] mb-0.5 md:mb-1 font-semibold">RPM MOTOR</div>
          <div className="font-mono font-black text-xl sm:text-2xl md:text-3xl lg:text-[32px] text-white leading-[0.9] tracking-tighter"
               style={{ textShadow: '0 2px 18px rgba(255,255,255,0.06)' }}>
            {engine.rpm.toLocaleString()}
          </div>
          <div className="text-sm md:text-base text-gray-400 mt-1 md:mt-1.5 font-semibold tracking-widest uppercase">RPM</div>
        </div>
        <div className="flex-shrink-0 -mr-2 md:-mr-1">
          <TachoGauge value={engine.rpm} size={120} />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-1.5 md:gap-2">
        <KpiCard
          label="TEMP. REFR."
          value={engine.coolantTemp}
          unit="°C"
          icon={<Thermometer size={10} className="text-status-warning" />}
          className="bg-industrial-900/80 border border-industrial-750/80"
        />
        <KpiCard
          label="PRES. ACEITE"
          value={engine.oilPressure}
          unit="bar"
          icon={<Droplets size={10} className="text-electric-400" />}
          className="bg-industrial-900/80 border border-industrial-750/80"
        />
        <KpiCard
          label="TEMP. ACEITE"
          value={engine.oilTemp}
          unit="°C"
          icon={<Thermometer size={10} className="text-status-warning" />}
          className="bg-industrial-900/80 border border-industrial-750/80"
        />
      </div>

      <div className="flex items-center justify-between px-2.5 py-1.5 rounded-md bg-industrial-900/70 border border-industrial-750/80">
        <span className="text-[10px] text-gray-400 uppercase font-semibold tracking-wider">ESTADO MOTOR</span>
        <div className="flex items-center gap-1.5">
          <CircleDot size={9} className="text-status-ok" fill="currentColor" />
          <span className="text-status-ok font-bold text-xs">{engine.status}</span>
        </div>
      </div>
      </div>
    </SectionPanel>
  )
}
