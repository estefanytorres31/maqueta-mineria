import { BarChart3,Timer } from 'lucide-react'
import SectionPanel from '../SectionPanel'
import SvgExcavatorIcon from '../icons/SvgExcavatorIcon'
import { ProductivityData } from '../../types'
import { PiGauge as Gauge } from "react-icons/pi";
import { GiMineTruck as Truck } from "react-icons/gi";

interface ProductivityPanelProps {
  productivity: Pick<ProductivityData, 'cyclesCompleted' | 'tonsMoved' | 'performance' | 'avgCycleTime'>
}

export default function ProductivityPanel({ productivity }: ProductivityPanelProps) {
  return (
    <SectionPanel
      title="PRODUCTIVIDAD HOY"
      icon={<BarChart3 size={14} className="text-status-ok md:size-[14px] lg:size-[15px] xl:size-[16px]" />}
    >
      <div className="p-0.5 md:p-0.5 lg:p-0.75 xl:p-2 h-full flex flex-col min-h-0 gap-0.25 md:gap-0.25 lg:gap-0.5">
        <div className="grid grid-cols-3 divide-x divide-industrial-700/60 flex-1 min-h-0">
          <div className="flex flex-col px-0.5 md:px-0.5 lg:px-0.75 xl:px-1 py-0.25 md:py-0.25 lg:py-0.5 min-w-0 h-full gap-0.25 md:gap-0.25 lg:gap-0.5">
            <div className="text-[6.5px] md:text-[7px] lg:text-[7.5px] xl:text-[8.5px] uppercase font-bold tracking-wider text-gray-300 whitespace-normal leading-[1.1] text-start min-w-0 mb-auto">
              CICLOS REALIZADOS
            </div>
            <div className="flex items-end justify-between gap-0.25 md:gap-0.25 lg:gap-0.5 min-w-0 mt-auto">
              <div className="flex flex-col min-w-0">
                <div className="font-mono font-black text-xl md:text-sm lg:text-sm xl:text-2xl text-white leading-none tracking-tight">
                  {productivity.cyclesCompleted.toLocaleString()}
                </div>
                <div className="text-[8px] md:text-[8.5px] lg:text-[9px] xl:text-[9.5px] text-gray-300 font-bold leading-none mt-0.25">
                  ciclos
                </div>
              </div>
              <div className="text-status-ok flex-shrink-0 mb-0.25 md:mb-0.25">
                <SvgExcavatorIcon className="w-5 h-5 md:w-5 md:h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7" />
              </div>
            </div>
          </div>
          <div className="flex flex-col px-0.5 md:px-0.5 lg:px-0.75 xl:px-1 py-0.25 md:py-0.25 lg:py-0.5 min-w-0 h-full gap-0.25 md:gap-0.25 lg:gap-0.5">
            <div className="text-[6.5px] md:text-[7px] lg:text-[7.5px] xl:text-[8.5px] uppercase font-bold tracking-wider text-gray-300 whitespace-normal leading-[1.1] text-start min-w-0 mb-auto">
              TONELADAS MOVIDAS
            </div>
            <div className="flex items-end justify-between gap-0.25 md:gap-0.25 lg:gap-0.5 min-w-0 mt-auto">
              <div className="flex flex-col min-w-0">
                <div className="font-mono font-black text-xl md:text-xs lg:text-sm xl:text-xl text-white leading-none tracking-tighter">
                  {productivity.tonsMoved.toLocaleString()}
                </div>
                <div className="text-[8px] md:text-[8.5px] lg:text-[9px] xl:text-[9.5px] text-gray-300 font-bold leading-none mt-0.25">
                  ton
                </div>
              </div>
              <div className="flex-shrink-0 mb-0.25 md:mb-0.25">
                <Truck size={20} className="text-status-ok md:size-[20px] lg:size-[24px] xl:size-[28px]" />
              </div>
            </div>
          </div>
          <div className="flex flex-col px-0.5 md:px-0.5 lg:px-0.75 xl:px-1 py-0.25 md:py-0.25 lg:py-0.5 min-w-0 h-full gap-0.25 md:gap-0.25 lg:gap-0.5">
            <div className="text-[6.5px] md:text-[7px] lg:text-[7.5px] xl:text-[8.5px] uppercase font-bold tracking-wider text-gray-300 whitespace-normal leading-[1.1] text-start min-w-0 mb-auto">
              RENDIMIENTO
            </div>
            <div className="flex items-end justify-between gap-0.25 md:gap-0.25 lg:gap-0.5 min-w-0 mt-auto">
              <div className="flex flex-col min-w-0">
                <div className="font-mono font-black text-xl md:text-xs lg:text-sm xl:text-xl text-white leading-none tracking-tight">
                  {productivity.performance.toFixed(0)}
                </div>
                <div className="text-[8px] md:text-[8.5px] lg:text-[9px] xl:text-[9.5px] text-gray-300 font-bold leading-none mt-0.25 whitespace-nowrap">
                  ton/h
                </div>
              </div>
              <div className="flex-shrink-0 mb-0.25 md:mb-0.25">
                <Gauge size={20} className="text-status-ok md:size-[20px] lg:size-[24px] xl:size-[28px]" />
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-industrial-700/60 my-0.25 md:my-0.25 lg:my-0.25 flex-shrink-0" />

        <div className="flex items-center gap-0.5 md:gap-0.5 lg:gap-0.75 xl:gap-1 px-0.5 md:px-0.5 lg:px-0.75 xl:px-1 py-0.25 md:py-0.25 lg:py-0.25 min-w-0 flex-shrink-0">
          <Timer size={16} className="text-status-ok flex-shrink-0 md:size-[16px] lg:size-[18px] xl:size-[20px]" />
          <div className="text-[6.5px] md:text-[7px] lg:text-[7.5px] xl:text-[8.5px] uppercase font-bold tracking-wider text-gray-200 whitespace-normal leading-[1.1] min-w-0 flex-1">
            TIEMPO PROMEDIO POR CICLO
          </div>
          <div className="flex items-baseline gap-0.25 md:gap-0.5 lg:gap-0.5 min-w-0 flex-shrink-0">
            <span className="font-mono font-black text-xl md:text-xs lg:text-sm xl:text-xl text-white leading-none tracking-tight">
              00:{String(Math.floor(productivity.avgCycleTime)).padStart(2, '0')}
            </span>
            <span className="text-[8px] md:text-[8.5px] lg:text-[9px] xl:text-[9.5px] text-gray-200 font-bold leading-none">
              min
            </span>
          </div>
        </div>
      </div>
    </SectionPanel>
  )
}
