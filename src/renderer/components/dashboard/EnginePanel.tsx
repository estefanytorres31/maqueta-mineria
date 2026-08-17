import { Thermometer, Droplets, Gauge, Battery } from 'lucide-react'
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
      <div className="p-[2px] md:p-[2px] lg:p-[3px] xl:p-1 h-full flex flex-col min-h-0 gap-[2px] md:gap-[3px] lg:gap-0.5">
        <div className="flex items-center justify-between gap-1 flex-shrink-0 min-h-0">
          <div className="flex flex-col justify-center flex-1 min-w-0 pl-[2px] md:px-1 lg:pl-2">
            <div className="text-[7px] md:text-[8px] lg:text-[9px] xl:text-[10px] text-gray-400 font-semibold tracking-[0.2em] uppercase">RPM MOTOR</div>
            <div className="font-mono font-black text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-white leading-[0.9] tracking-tighter mt-[2px]">
              {engine.rpm.toLocaleString()}
            </div>
            <div className="text-[8px] md:text-[9px] lg:text-[10px] text-gray-400 font-bold tracking-[0.15em] uppercase mt-[1px]">RPM</div>
          </div>
          <div className="flex-shrink-0 px-1 md:px-2 lg:px-3 xl:px-4">
            <TachoGauge value={engine.rpm} size={64} className="md:hidden lg:hidden" />
            <TachoGauge value={engine.rpm} size={80} className="hidden md:block lg:block xl:hidden" />
            <TachoGauge value={engine.rpm} size={96} className="hidden xl:block" />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-0 border-t border-industrial-700/70 flex-1 min-h-0 pt-[1px] md:pt-[2px]">
          {/* TEMP REFRIGERANTE */}
          <div className="flex flex-col items-center justify-center gap-[1px] px-[2px] py-[1px] min-w-0 h-full border-r border-industrial-700/50">
            <Thermometer size={12} className="text-electric-400 md:size-[12px] lg:size-[14px] flex-shrink-0" />
            <div className="text-[6px] md:text-[6.5px] lg:text-[7.5px] xl:text-[8.5px] text-gray-300 uppercase tracking-wider font-bold text-center whitespace-nowrap">TEMP. REFR.</div>
            <div className="font-mono font-black text-base md:text-lg lg:text-xl xl:text-2xl text-white leading-none tracking-tight">
              {Math.round(engine.coolantTemp)}
            </div>
            <div className="text-[7px] md:text-[8px] lg:text-[9px] text-electric-400 font-semibold leading-none">°C</div>
          </div>
          {/* TEMP ACEITE */}
          <div className="flex flex-col items-center justify-center gap-[1px] px-[2px] py-[1px] min-w-0 h-full border-r border-industrial-700/50">
            <Droplets size={12} className="text-electric-400 md:size-[12px] lg:size-[14px] flex-shrink-0" />
            <div className="text-[6px] md:text-[6.5px] lg:text-[7.5px] xl:text-[8.5px] text-gray-300 uppercase tracking-wider font-bold text-center whitespace-nowrap">TEMP. ACEITE</div>
            <div className="font-mono font-black text-base md:text-lg lg:text-xl xl:text-2xl text-white leading-none tracking-tight">
              {Math.round(engine.oilTemp)}
            </div>
            <div className="text-[7px] md:text-[8px] lg:text-[9px] text-electric-400 font-semibold leading-none">°C</div>
          </div>
          {/* PRESION ACEITE */}
          <div className="flex flex-col items-center justify-center gap-[1px] px-[2px] py-[1px] min-w-0 h-full border-r border-industrial-700/50">
            <Gauge size={12} className="text-electric-400 md:size-[12px] lg:size-[14px] flex-shrink-0" />
            <div className="text-[6px] md:text-[6.5px] lg:text-[7.5px] xl:text-[8.5px] text-gray-300 uppercase tracking-wider font-bold text-center whitespace-nowrap">PRES. ACEITE</div>
            <div className="font-mono font-black text-base md:text-lg lg:text-xl xl:text-2xl text-white leading-none tracking-tight">
              {engine.oilPressure.toFixed(1)}
            </div>
            <div className="text-[7px] md:text-[8px] lg:text-[9px] text-electric-400 font-semibold leading-none">bar</div>
          </div>
          {/* VOLTAJE */}
          <div className="flex flex-col items-center justify-center gap-[1px] px-[2px] py-[1px] min-w-0 h-full">
            <Battery size={12} className="text-electric-400 md:size-[12px] lg:size-[14px] flex-shrink-0" />
            <div className="text-[6px] md:text-[6.5px] lg:text-[7.5px] xl:text-[8.5px] text-gray-300 uppercase tracking-wider font-bold text-center whitespace-nowrap">VOLTAJE</div>
            <div className="font-mono font-black text-base md:text-lg lg:text-xl xl:text-2xl text-white leading-none tracking-tight">
              {engine.voltage.toFixed(1)}
            </div>
            <div className="text-[7px] md:text-[8px] lg:text-[9px] text-electric-400 font-semibold leading-none">V</div>
          </div>
        </div>
      </div>
    </SectionPanel>
  )
}
