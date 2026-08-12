import { Droplets } from 'lucide-react'
import SectionPanel from '../SectionPanel'
import MiniGauge from '../gauges/MiniGauge'
import ProgressBar from '../ProgressBar'
import { HydraulicData } from '../../types'

interface HydraulicPanelProps {
  hydraulic: HydraulicData
}

export default function HydraulicPanel({ hydraulic }: HydraulicPanelProps) {
  return (
    <SectionPanel
      title="HIDRÁULICA"
      icon={<Droplets size={14} className="text-electric-500" />}
      grow
    >
      <div className="p-3 space-y-2.5">
      <div className="grid grid-cols-3 gap-2">
        <div className="flex flex-col items-center gap-0.5">
          <div className="text-[9px] text-gray-400 uppercase font-semibold tracking-wider">PRESIÓN PRINCIPAL</div>
          <MiniGauge value={Math.round(hydraulic.mainPressure)} max={350} unit="bar" warningThreshold={300} dangerThreshold={330} color="#14B8FF" />
        </div>
        <div className="flex flex-col items-center gap-0.5">
          <div className="text-[9px] text-gray-400 uppercase font-semibold tracking-wider">PRESIÓN BRAZO</div>
          <MiniGauge value={Math.round(hydraulic.armPressure)} max={350} unit="bar" warningThreshold={300} dangerThreshold={330} color="#14B8FF" />
        </div>
        <div className="flex flex-col items-center gap-0.5">
          <div className="text-[9px] text-gray-400 uppercase font-semibold tracking-wider">PRESIÓN GIRO</div>
          <MiniGauge value={Math.round(hydraulic.swingPressure)} max={300} unit="bar" warningThreshold={260} dangerThreshold={280} color="#14B8FF" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-1.5">
        <div className="bg-industrial-900/80 rounded-md p-2 border border-industrial-750/80">
          <div className="text-[9px] text-gray-400 uppercase tracking-wider font-semibold mb-0.5">TEMP. ACEITE HIDR.</div>
          <div className="font-mono font-bold text-sm text-white leading-none">{hydraulic.oilTemp.toFixed(0)} <span className="text-[9px] text-gray-400">°C</span></div>
        </div>
        <div className="bg-industrial-900/80 rounded-md p-2 border border-industrial-750/80">
          <div className="text-[9px] text-gray-400 uppercase tracking-wider font-semibold mb-0.5">CARGA HIDRÁULICA</div>
          <div className="font-mono font-bold text-sm text-white leading-none">{hydraulic.load.toFixed(0)} <span className="text-[9px] text-gray-400">%</span></div>
        </div>
      </div>
      <ProgressBar value={hydraulic.load} color="bg-electric-500" />
      </div>
    </SectionPanel>
  )
}
