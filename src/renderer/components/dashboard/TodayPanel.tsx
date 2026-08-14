import { Clock, Hourglass, TimerReset, Calendar } from 'lucide-react'
import SectionPanel from '../SectionPanel'
import UtilizationRing from '../gauges/UtilizationRing'
import { OperationData } from '../../types'

interface TodayPanelProps {
  operation: Pick<OperationData, 'engineHours' | 'effectiveHours' | 'idleHours' | 'inoperativeHours' | 'utilization' | 'totalHours'>
}

export default function TodayPanel({ operation }: TodayPanelProps) {
  return (
    <SectionPanel
      title="RESUMEN HOY"
      icon={<Calendar size={18} className="text-electric-400 md:size-[18px] lg:size-[20px] xl:size-[22px]" />}
      iconColor="text-electric-400"
      titleColorClass="text-electric-400"
      borderClass="border-industrial-600"
      grow
    >
      <div className="p-0.5 md:p-0.5 lg:p-1 xl:p-1.5 h-full flex flex-col min-h-0 gap-0.5 md:gap-0.5 lg:gap-1">
        <div className="grid grid-cols-3 divide-x divide-industrial-700/70 flex-1 min-h-0">
          <div className="flex flex-col items-center justify-center gap-0.25 md:gap-0.5 lg:gap-0.5 py-0.5 md:py-0.5 px-0.5 md:px-0.5 min-w-0 h-full">
            <Clock size={18} className="text-gray-400 md:size-[18px] lg:size-[20px] xl:size-[22px]" />
            <div className="text-[6.5px] md:text-[7px] lg:text-[9px] xl:text-[10px] text-gray-400 uppercase tracking-wider font-bold text-center leading-tight whitespace-nowrap">HORAS MOTOR</div>
            <div className="flex flex-col items-center min-w-0">
              <div className="font-mono font-black text-2xl md:text-xl lg:text-xl xl:text-2xl text-white leading-none tracking-tighter whitespace-nowrap">
                {operation.engineHours.toFixed(1)}
              </div>
              <span className="text-[8px] md:text-[9px] lg:text-[9.5px] xl:text-[10px] text-gray-400 font-bold leading-none mt-0.25">h</span>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-0.25 md:gap-0.5 lg:gap-0.5 py-0.5 md:py-0.5 px-0.5 md:px-0.5 min-w-0 h-full">
            <Clock size={18} className="text-gray-400 md:size-[18px] lg:size-[20px] xl:size-[22px]" />
            <div className="text-[6.5px] md:text-[7px] lg:text-[9px] xl:text-[10px] text-gray-400 uppercase tracking-wider font-bold text-center leading-tight whitespace-nowrap">HORAS EFECTIVAS</div>
            <div className="flex flex-col items-center min-w-0">
              <div className="font-mono font-black text-2xl md:text-xl lg:text-xl xl:text-2xl text-white leading-none tracking-tighter whitespace-nowrap">
                {operation.effectiveHours.toFixed(1)}
              </div>
              <span className="text-[8px] md:text-[9px] lg:text-[9.5px] xl:text-[10px] text-gray-400 font-bold leading-none mt-0.25">h</span>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-0.25 md:gap-0.5 lg:gap-0.5 py-0.5 md:py-0.5 px-0.5 md:px-0.5 min-w-0 h-full">
            <Hourglass size={18} className="text-status-warning md:size-[18px] lg:size-[20px] xl:size-[22px]" />
            <div className="text-[6.5px] md:text-[7px] lg:text-[9px] xl:text-[10px] text-gray-400 uppercase tracking-wider font-bold text-center leading-tight whitespace-nowrap">RELENTÍ</div>
            <div className="flex flex-col items-center min-w-0">
              <div className="font-mono font-black text-2xl md:text-xl lg:text-xl xl:text-2xl text-status-warning leading-none tracking-tighter whitespace-nowrap">
                {operation.idleHours.toFixed(1)}
              </div>
              <span className="text-[8px] md:text-[9px] lg:text-[9.5px] xl:text-[10px] text-status-warning font-bold leading-none mt-0.25">h</span>
            </div>
          </div>
        </div>

        <div className="border-t border-industrial-700/70" />

        <div className="grid grid-cols-3 divide-x divide-industrial-700/70 flex-1 min-h-0">
          <div className="flex flex-col items-center justify-center gap-0.25 md:gap-0.5 lg:gap-0.5 py-0.5 md:py-0.5 px-0.5 md:px-0.5 min-w-0 h-full">
            <TimerReset size={18} className="text-status-danger md:size-[18px] lg:size-[20px] xl:size-[22px]" />
            <div className="text-[6.5px] md:text-[7px] lg:text-[9px] xl:text-[10px] text-gray-400 uppercase tracking-wider font-bold text-center leading-tight whitespace-nowrap">INOPERATIVO</div>
            <div className="flex flex-col items-center min-w-0">
              <div className="font-mono font-black text-2xl md:text-xl lg:text-xl xl:text-2xl text-status-danger leading-none tracking-tighter whitespace-nowrap">
                {operation.inoperativeHours.toFixed(1)}
              </div>
              <span className="text-[8px] md:text-[9px] lg:text-[9.5px] xl:text-[10px] text-status-danger font-bold leading-none mt-0.25">h</span>
            </div>
          </div>
          <div className="flex items-center justify-center py-0 md:py-0.25 lg:py-0.25 min-w-0 h-full">
            <UtilizationRing utilization={operation.utilization} />
          </div>
          <div className="flex flex-col items-center justify-center gap-0.25 md:gap-0.5 lg:gap-0.5 py-0.5 md:py-0.5 px-0.5 md:px-0.5 min-w-0 h-full">
            <Hourglass size={18} className="text-electric-400 md:size-[18px] lg:size-[20px] xl:size-[22px]" />
            <div className="text-[6.5px] md:text-[7px] lg:text-[9px] xl:text-[10px] text-gray-400 uppercase tracking-wider font-bold text-center leading-tight whitespace-nowrap">HORÓMETRO TOTAL</div>
            <div className="flex flex-col items-center min-w-0">
              <div className="font-mono font-black text-2xl md:text-xl lg:text-xl xl:text-2xl text-white leading-none tracking-tighter whitespace-nowrap">
                {operation.totalHours.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </div>
              <span className="text-[8px] md:text-[9px] lg:text-[9.5px] xl:text-[10px] text-electric-400 font-bold leading-none mt-0.25">h</span>
            </div>
          </div>
        </div>
      </div>
    </SectionPanel>
  )
}
