import { Clock, Hourglass, TimerReset } from 'lucide-react'
import SectionPanel from '../SectionPanel'
import UtilizationRing from '../gauges/UtilizationRing'
import { OperationData } from '../../types'
import { PiClockCountdownLight as FadingClock } from "react-icons/pi";

interface TodayPanelProps {
  operation: Pick<OperationData, 'engineHours' | 'effectiveHours' | 'idleHours' | 'inoperativeHours' | 'utilization' | 'totalHours'>
}

export default function TodayPanel({ operation }: TodayPanelProps) {
  return (
    <SectionPanel
      title="HOY"
      icon={<Clock size={14} className="text-gray-400" />}
    >
      <div className="p-0.5 md:p-0.5 lg:p-0.75 xl:p-1 h-full flex flex-col min-h-0 gap-0.25 md:gap-0.25 lg:gap-0.5">
        <div className="grid grid-cols-3 divide-x divide-industrial-700/60 flex-1 min-h-0">
          <div className="flex flex-col items-center justify-center gap-0.25 md:gap-0.25 lg:gap-0.5 py-0.25 md:py-0.25 lg:py-0.5 px-0.5 md:px-0.5 lg:px-0.75 min-w-0 h-full">
            <Clock size={12} className="text-gray-400 md:size-[12px] lg:size-[13px] xl:size-[14px]" />
            <div className="text-[6px] md:text-[6.5px] lg:text-[7px] xl:text-[8px] text-gray-400 uppercase tracking-wider font-bold text-center leading-tight whitespace-normal">HORAS MOTOR</div>
            <div className="font-mono font-bold text-base md:text-base lg:text-lg xl:text-xl text-white leading-none tracking-tight whitespace-nowrap mt-auto">
              {operation.engineHours.toFixed(1)}<span className="text-[7px] md:text-[7.5px] lg:text-[8px] xl:text-[9px] text-gray-400 font-semibold ml-0.25">h</span>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-0.25 md:gap-0.25 lg:gap-0.5 py-0.25 md:py-0.25 lg:py-0.5 px-0.5 md:px-0.5 lg:px-0.75 min-w-0 h-full">
            <FadingClock size={12} className="text-status-ok md:size-[12px] lg:size-[13px] xl:size-[14px]" />
            <div className="text-[6px] md:text-[6.5px] lg:text-[7px] xl:text-[8px] text-gray-400 uppercase tracking-wider font-bold text-center leading-tight whitespace-normal">HORAS EFECTIVAS</div>
            <div className="font-mono font-bold text-base md:text-base lg:text-lg xl:text-xl text-white leading-none tracking-tight whitespace-nowrap mt-auto">
              {operation.effectiveHours.toFixed(1)}<span className="text-[7px] md:text-[7.5px] lg:text-[8px] xl:text-[9px] text-gray-400 font-semibold ml-0.25">h</span>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-0.25 md:gap-0.25 lg:gap-0.5 py-0.25 md:py-0.25 lg:py-0.5 px-0.5 md:px-0.5 lg:px-0.75 min-w-0 h-full">
            <Hourglass size={12} className="text-status-warning md:size-[12px] lg:size-[13px] xl:size-[14px]" />
            <div className="text-[6px] md:text-[6.5px] lg:text-[7px] xl:text-[8px] text-gray-400 uppercase tracking-wider font-bold text-center leading-tight whitespace-normal">RALENTÍ</div>
            <div className="font-mono font-bold text-base md:text-base lg:text-lg xl:text-xl text-white leading-none tracking-tight whitespace-nowrap mt-auto">
              {operation.idleHours.toFixed(1)}<span className="text-[7px] md:text-[7.5px] lg:text-[8px] xl:text-[9px] text-gray-400 font-semibold ml-0.25">h</span>
            </div>
          </div>
        </div>
        <div className="border-t border-industrial-700/60 my-0.125 md:my-0.25 lg:my-0.25 flex-shrink-0" />
        <div className="grid grid-cols-3 divide-x divide-industrial-700/60 flex-1 min-h-0">
          <div className="flex flex-col items-center justify-center gap-0.25 md:gap-0.25 lg:gap-0.5 py-0.25 md:py-0.25 lg:py-0.5 px-0.5 md:px-0.5 lg:px-0.75 min-w-0 h-full">
            <TimerReset size={12} className="text-status-danger md:size-[12px] lg:size-[13px] xl:size-[14px]" />
            <div className="text-[6px] md:text-[6.5px] lg:text-[7px] xl:text-[8px] text-gray-400 uppercase tracking-wider font-bold text-center leading-tight whitespace-normal">INOPERATIVO</div>
            <div className="font-mono font-bold text-base md:text-base lg:text-lg xl:text-xl text-white leading-none tracking-tight whitespace-nowrap mt-auto">
              {operation.inoperativeHours.toFixed(1)}<span className="text-[7px] md:text-[7.5px] lg:text-[8px] xl:text-[9px] text-gray-400 font-semibold ml-0.25">h</span>
            </div>
          </div>
          <div className="flex items-center justify-center py-0.25 md:py-0.25 lg:py-0.5 min-w-0 h-full">
            <UtilizationRing utilization={operation.utilization} />
          </div>
          <div className="flex flex-col items-center justify-center gap-0.25 md:gap-0.25 lg:gap-0.5 py-0.25 md:py-0.25 lg:py-0.5 px-0.5 md:px-0.5 lg:px-0.75 min-w-0 h-full">
            <Hourglass size={12} className="text-electric-400 md:size-[12px] lg:size-[13px] xl:size-[14px]" />
            <div className="text-[6px] md:text-[6.5px] lg:text-[7px] xl:text-[8px] text-gray-400 uppercase tracking-wider font-bold text-center leading-tight whitespace-normal">HORÓMETRO</div>
            <div className="font-mono font-bold text-base md:text-base lg:text-lg xl:text-xl text-white leading-none tracking-tight whitespace-nowrap mt-auto">
              {operation.totalHours.toLocaleString(undefined, { maximumFractionDigits: 0 })}<span className="text-[7px] md:text-[7.5px] lg:text-[8px] xl:text-[9px] text-gray-400 font-semibold ml-0.25">h</span>
            </div>
          </div>
        </div>
      </div>
    </SectionPanel>
  )
}
