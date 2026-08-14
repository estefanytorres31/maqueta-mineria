import { Thermometer, Droplets, CheckCircle2 } from 'lucide-react'
import SectionPanel from '../SectionPanel'
import TachoGauge from '../gauges/TachoGauge'
import { EngineData } from '../../types'
import { PiEngineFill as Motor } from "react-icons/pi";

interface EnginePanelProps {
  engine: EngineData
}

export default function EnginePanel({ engine }: EnginePanelProps) {
  return (
    <SectionPanel
      title="MOTOR"
      icon={<Motor size={14} className="text-electric-400" />}
    >
      <div className="p-0.5 md:p-0.5 lg:p-1 xl:p-1.5 h-full flex flex-col min-h-0 gap-0.5 md:gap-0.5 lg:gap-1">
        <div className="flex items-center gap-1 md:gap-1 lg:gap-2 flex-1 min-h-0">
          <div className="flex flex-col justify-end flex-1 min-w-0 h-full gap-0.25 md:gap-0.25 lg:gap-0.5">
            <div className="text-[7px] md:text-[7.5px] lg:text-[8px] xl:text-[9px] text-gray-400 uppercase tracking-[0.1em] font-semibold">RPM MOTOR</div>
            <div className="font-mono font-black text-2xl md:text-2xl lg:text-[26px] xl:text-[30px] text-white leading-[0.9] tracking-tighter mt-auto"
                 style={{ textShadow: '0 2px 18px rgba(255,255,255,0.06)' }}>
              {engine.rpm.toLocaleString()}
            </div>
            <div className="text-[9px] md:text-[9.5px] lg:text-[10px] xl:text-xs text-gray-400 font-semibold tracking-widest uppercase">RPM</div>
          </div>
          <div className="flex-shrink-0">
            <TachoGauge value={engine.rpm} size={68} className="md:hidden" />
            <TachoGauge value={engine.rpm} size={76} className="hidden md:block lg:block xl:hidden" />
            <TachoGauge value={engine.rpm} size={96} className="hidden xl:block" />
          </div>
        </div>

        <div className="grid grid-cols-3 divide-x divide-industrial-700/60 flex-shrink-0">
          <div className="flex flex-col gap-0.25 md:gap-0.25 lg:gap-0.5 px-0.5 md:px-0.5 lg:px-1 xl:px-1 py-0.25 md:py-0.25 lg:py-0.5 min-w-0 h-full">
            <div className="flex items-center gap-0.5 md:gap-0.5 lg:gap-1 min-w-0">
              <Thermometer size={11} className="text-status-warning flex-shrink-0" />
              <span className="text-[6.5px] md:text-[7px] lg:text-[7.5px] xl:text-[8px] text-gray-400 uppercase tracking-wider font-bold truncate whitespace-nowrap">TEMP. REFRIG.</span>
            </div>
            <div className="font-mono font-bold text-[11px] md:text-[11.5px] lg:text-sm xl:text-[14px] text-white leading-none whitespace-nowrap mt-auto">
              {engine.coolantTemp}<span className="text-[8px] md:text-[8.5px] lg:text-[9px] xl:text-[10px] text-gray-400 font-semibold ml-0.25">°C</span>
            </div>
          </div>
          <div className="flex flex-col gap-0.25 md:gap-0.25 lg:gap-0.5 px-0.5 md:px-0.5 lg:px-1 xl:px-1 py-0.25 md:py-0.25 lg:py-0.5 min-w-0 h-full">
            <div className="flex items-center gap-0.5 md:gap-0.5 lg:gap-1 min-w-0">
              <Droplets size={11} className="text-electric-400 flex-shrink-0" />
              <span className="text-[6.5px] md:text-[7px] lg:text-[7.5px] xl:text-[8px] text-gray-400 uppercase tracking-wider font-bold truncate whitespace-nowrap">PRES. ACEITE</span>
            </div>
            <div className="font-mono font-bold text-[11px] md:text-[11.5px] lg:text-sm xl:text-[14px] text-white leading-none whitespace-nowrap mt-auto">
              {engine.oilPressure}<span className="text-[8px] md:text-[8.5px] lg:text-[9px] xl:text-[10px] text-gray-400 font-semibold ml-0.25">bar</span>
            </div>
          </div>
          <div className="flex flex-col gap-0.25 md:gap-0.25 lg:gap-0.5 px-0.5 md:px-0.5 lg:px-1 xl:px-1 py-0.25 md:py-0.25 lg:py-0.5 min-w-0 h-full">
            <div className="flex items-center gap-0.5 md:gap-0.5 lg:gap-1 min-w-0">
              <Thermometer size={11} className="text-status-warning flex-shrink-0" />
              <span className="text-[6.5px] md:text-[7px] lg:text-[7.5px] xl:text-[8px] text-gray-400 uppercase tracking-wider font-bold truncate whitespace-nowrap">TEMP. ACEITE</span>
            </div>
            <div className="font-mono font-bold text-[11px] md:text-[11.5px] lg:text-sm xl:text-[14px] text-white leading-none whitespace-nowrap mt-auto">
              {engine.oilTemp}<span className="text-[8px] md:text-[8.5px] lg:text-[9px] xl:text-[10px] text-gray-400 font-semibold ml-0.25">°C</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between py-0.25 md:py-0.25 lg:py-0.5 px-0.5 md:px-0.5 lg:px-1 xl:px-1 flex-shrink-0">
          <span className="text-[8px] md:text-[8.5px] lg:text-[9px] xl:text-[10px] text-gray-400 uppercase font-semibold tracking-wider truncate">ESTADO MOTOR</span>
          <div className="flex items-center gap-0.5 md:gap-0.5 lg:gap-1 min-w-0">
            <CheckCircle2 size={14} className="text-status-ok flex-shrink-0" />
            <span className="text-status-ok font-black text-xs md:text-xs lg:text-sm xl:text-base whitespace-nowrap">{engine.status}</span>
          </div>
        </div>
      </div>
    </SectionPanel>
  )
}
