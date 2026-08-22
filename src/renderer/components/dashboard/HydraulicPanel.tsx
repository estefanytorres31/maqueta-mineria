import { Droplets, Thermometer } from 'lucide-react'
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
      icon={<Droplets size={14} className="text-electric-500 md:size-[14px] lg:size-[15px] xl:size-[16px]" />}
      grow
      centerTitle
    >
      <div className="p-0.5 md:p-0.5 lg:p-1 xl:p-1 h-full flex flex-col min-h-0">
        <div className="grid grid-cols-3 divide-x divide-industrial-700/60">
          <div className="flex flex-col px-0.5 md:px-1 lg:px-1 py-0.5 md:py-1 min-w-0">
            <div className="text-[8px] md:text-[9px] lg:text-[10px] xl:text-[11px] uppercase font-black tracking-wider text-gray-300 mb-0.5 whitespace-nowrap overflow-hidden text-ellipsis text-center">
              PRES. PRINC.
            </div>
            <div className="flex items-end justify-between gap-0.5 min-w-0 mt-2">
              <div className="flex flex-col min-w-0">
                <div className="font-mono font-black text-base md:text-lg lg:text-xl xl:text-2xl text-white leading-none tracking-tight">
                  {hydraulic.mainPressure.toFixed(0)}
                </div>
                <div className="text-[9px] md:text-[10px] lg:text-[11px] text-gray-300 font-bold leading-none">
                  bar
                </div>
              </div>
              <div className="flex-shrink-0 mb-0.5">
                <MiniGauge value={Math.round(hydraulic.mainPressure)} max={350} unit="" warningThreshold={300} dangerThreshold={330} color="#14B8FF" size={34} className="md:hidden lg:block xl:hidden" />
                <MiniGauge value={Math.round(hydraulic.mainPressure)} max={350} unit="" warningThreshold={300} dangerThreshold={330} color="#14B8FF" size={40} className="hidden xl:block" />
                <MiniGauge value={Math.round(hydraulic.mainPressure)} max={350} unit="" warningThreshold={300} dangerThreshold={330} color="#14B8FF" size={30} className="hidden md:block lg:hidden" />
              </div>
            </div>
          </div>
          <div className="flex flex-col px-0.5 md:px-1 lg:px-1 py-0.5 md:py-1 min-w-0">
            <div className="text-[8px] md:text-[9px] lg:text-[10px] xl:text-[11px] uppercase font-black tracking-wider text-gray-300 mb-0.5 whitespace-nowrap overflow-hidden text-ellipsis text-center">
              PRES. BRAZO
            </div>
            <div className="flex items-end justify-between gap-0.5 min-w-0 mt-2">
              <div className="flex flex-col min-w-0">
                <div className="font-mono font-black text-base md:text-lg lg:text-xl xl:text-2xl text-white leading-none tracking-tight">
                  {hydraulic.armPressure.toFixed(0)}
                </div>
                <div className="text-[9px] md:text-[10px] lg:text-[11px] text-gray-300 font-bold leading-none">
                  bar
                </div>
              </div>
              <div className="flex-shrink-0 mb-0.5">
                <MiniGauge value={Math.round(hydraulic.armPressure)} max={350} unit="" warningThreshold={300} dangerThreshold={330} color="#14B8FF" size={34} className="md:hidden lg:block xl:hidden" />
                <MiniGauge value={Math.round(hydraulic.armPressure)} max={350} unit="" warningThreshold={300} dangerThreshold={330} color="#14B8FF" size={40} className="hidden xl:block" />
                <MiniGauge value={Math.round(hydraulic.armPressure)} max={350} unit="" warningThreshold={300} dangerThreshold={330} color="#14B8FF" size={30} className="hidden md:block lg:hidden" />
              </div>
            </div>
          </div>
          <div className="flex flex-col px-0.5 md:px-1 lg:px-1 py-0.5 md:py-1 min-w-0">
            <div className="text-[8px] md:text-[9px] lg:text-[10px] xl:text-[11px] uppercase font-black tracking-wider text-gray-300 mb-0.5 whitespace-nowrap overflow-hidden text-ellipsis text-center">
              PRES. GIRO
            </div>
            <div className="flex items-end justify-between gap-0.5 min-w-0 mt-2">
              <div className="flex flex-col min-w-0">
                <div className="font-mono font-black text-base md:text-lg lg:text-xl xl:text-2xl text-white leading-none tracking-tight">
                  {hydraulic.swingPressure.toFixed(0)}
                </div>
                <div className="text-[9px] md:text-[9px] lg:text-[10px] text-gray-300 font-bold leading-none">
                  bar
                </div>
              </div>
              <div className="flex-shrink-0 mb-0.5">
                <MiniGauge value={Math.round(hydraulic.swingPressure)} max={300} unit="" warningThreshold={260} dangerThreshold={280} color="#14B8FF" size={34} className="md:hidden lg:block xl:hidden" />
                <MiniGauge value={Math.round(hydraulic.swingPressure)} max={300} unit="" warningThreshold={260} dangerThreshold={280} color="#14B8FF" size={40} className="hidden xl:block" />
                <MiniGauge value={Math.round(hydraulic.swingPressure)} max={300} unit="" warningThreshold={260} dangerThreshold={280} color="#14B8FF" size={30} className="hidden md:block lg:hidden" />
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-industrial-700/60 my-2" />
        <div className="grid grid-cols-2 divide-x divide-industrial-700/60 mt-1">
          <div className="flex items-center gap-1 px-0.5 md:px-1 lg:px-1.5 py-0.5 md:py-1 min-w-0">
            <Thermometer size={16} className="text-white flex-shrink-0 md:size-[16px] lg:size-[18px] xl:size-[20px]" />
            <div className="flex flex-col min-w-0">
              <div className="text-[7px] md:text-[8px] lg:text-[9px] xl:text-[10px] uppercase font-black tracking-wider text-gray-200 mb-0.25 whitespace-nowrap overflow-hidden text-ellipsis">
                TEMP. ACEITE H.
              </div>
              <div className="flex items-baseline gap-0.5 min-w-0">
                <span className="font-mono font-black text-lg md:text-xl lg:text-2xl text-white leading-none tracking-tight">
                  {hydraulic.oilTemp.toFixed(0)}
                </span>
                <span className="text-[9px] md:text-[10px] lg:text-[11px] text-gray-200 font-bold leading-none">
                  °C
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col px-0.5 md:px-1 lg:px-1.5 py-0.5 md:py-1 min-w-0">
            <div className="text-[7px] md:text-[8px] lg:text-[9px] xl:text-[10px] uppercase font-black tracking-wider text-gray-200 mb-0.5">
              CARGA HIDRÁULICA
            </div>
            <div className="flex items-center gap-1 mt-1 mb-0.25">
              <div className="flex-1 min-w-0">
                <ProgressBar value={hydraulic.load} color="bg-electric-500" height="h-1.5 md:h-2 lg:h-2 xl:h-2.5" rounded showValue={false} />
              </div>
              <div className="flex items-baseline gap-0.25 min-w-0 flex-shrink-0">
                <span className="font-mono font-black text-base md:text-lg lg:text-xl text-white leading-none tracking-tight">
                  {hydraulic.load.toFixed(0)}
                </span>
                <span className="text-[9px] md:text-[10px] lg:text-[11px] text-gray-200 font-bold leading-none">
                  %
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionPanel>
  )
}
