import { Thermometer, Droplets } from 'lucide-react'
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
      icon={<Motor size={18} className="text-white md:size-[18px] lg:size-[22px] xl:size-[24px]" />}
      iconColor="text-white"
      titleColorClass="text-white"
      borderClass="border-industrial-600"
      grow
    >
      <div className="p-0.5 md:p-0.5 lg:p-1 xl:p-1.5 h-full flex flex-col min-h-0 gap-1 md:gap-1 lg:gap-1.5">
        <div className="flex items-center justify-between gap-1 md:gap-1 lg:gap-2 flex-shrink-0 min-h-0">
          <div className="flex flex-col justify-center flex-1 min-w-0 px-2">
            <div className="font-mono font-black text-3xl md:text-3xl lg:text-4xl xl:text-5xl text-white leading-[0.9] tracking-tighter mt-0.5">
              {engine.rpm.toLocaleString()}
            </div>
            <div className="text-[9px] md:text-[9.5px] lg:text-[11px] xl:text-[13px] text-gray-400 font-semibold tracking-[0.2em] uppercase mt-0.5">RPM</div>
          </div>
          <div className="flex-shrink px-6">
            <TachoGauge value={engine.rpm} size={96} className="md:hidden lg:hidden" />
            <TachoGauge value={engine.rpm} size={108} className="hidden md:block lg:block xl:hidden" />
            <TachoGauge value={engine.rpm} size={120} className="hidden xl:block" />
          </div>
        </div>

        <div className="grid grid-cols-3 divide-x divide-industrial-700/70 border-t border-industrial-700/70 flex-1 min-h-0 pt-0.5 md:pt-0.5 lg:pt-1">
          <div className="flex flex-col items-center justify-center gap-0.25 lg:gap-0.5 px-0.5 lg:px-1 py-0.25 min-w-0 h-full">
            <Thermometer size={18} className="text-electric-400 md:size-[14px] lg:size-[18px] xl:size-[20px] flex-shrink-0" />
            <div className="text-[7px] md:text-[9px] lg:text-[11px] xl:text-[13px] text-gray-300 uppercase tracking-wider font-bold text-center whitespace-nowrap">TEMP. REFR.</div>
            <div className="font-mono font-black text-xl md:text-xl lg:text-2xl xl:text-2xl text-white leading-none tracking-tight">
              {Math.round(engine.coolantTemp)}
            </div>
            <div className="text-[9px] md:text-[9.5px] lg:text-[10px] xl:text-[11px] text-electric-400 font-semibold mt-0.25 leading-none">°C</div>
          </div>
          <div className="flex flex-col items-center justify-center gap-0.25 lg:gap-0.5 px-0.5 lg:px-1 py-0.25 min-w-0 h-full">
            <Droplets size={18} className="text-electric-400 md:size-[14px] lg:size-[18px] xl:size-[20px] flex-shrink-0" />
            <div className="text-[7px] md:text-[9px] lg:text-[11px] xl:text-[13px] text-gray-300 uppercase tracking-wider font-bold text-center whitespace-nowrap">TEMP. ACEITE</div>
            <div className="font-mono font-black text-xl md:text-xl lg:text-2xl xl:text-2xl text-white leading-none tracking-tight">
              {Math.round(engine.oilTemp)}
            </div>
            <div className="text-[9px] md:text-[9.5px] lg:text-[10px] xl:text-[11px] text-electric-400 font-semibold mt-0.25 leading-none">°C</div>
          </div>
          <div className="flex flex-col items-center justify-center gap-0.25 lg:gap-0.5 px-0.5 lg:px-1 py-0.25 min-w-0 h-full">
            <Droplets size={18} className="text-electric-400 md:size-[14px] lg:size-[18px] xl:size-[20px] flex-shrink-0" />
            <div className="text-[7px] md:text-[9px] lg:text-[11px] xl:text-[13px] text-gray-300 uppercase tracking-wider font-bold text-center whitespace-nowrap">PRES. ACEITE</div>
            <div className="font-mono font-black text-xl md:text-xl lg:text-2xl xl:text-2xl text-white leading-none tracking-tight">
              {engine.oilPressure.toFixed(1)}
            </div>
            <div className="text-[9px] md:text-[9.5px] lg:text-[10px] xl:text-[11px] text-electric-400 font-semibold mt-0.25 leading-none">bar</div>
          </div>
        </div>
      </div>
    </SectionPanel>
  )
}
