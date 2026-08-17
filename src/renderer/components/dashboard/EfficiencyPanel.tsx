import { BarChart3 } from 'lucide-react'
import SectionPanel from '../SectionPanel'
import MiniGauge from '../gauges/MiniGauge'
import { ProductivityData } from '../../types'

interface EfficiencyPanelProps {
  productivity: Pick<ProductivityData, 'consumptionPerTon' | 'consumptionPerCycle' | 'unproductiveFuel'>
}

export default function EfficiencyPanel({ productivity }: EfficiencyPanelProps) {
  return (
    <SectionPanel
      title="EFICIENCIA"
      icon={<BarChart3 size={14} className="text-status-warning md:size-[18px] lg:size-[22px] xl:size-[24px]" />}
    >
      <div className="p-0.5 md:p-0.5 lg:p-0.75 xl:p-1 h-full flex flex-col min-h-0 gap-0.25 md:gap-0.25 lg:gap-0.5">
        <div className="grid grid-cols-2 divide-x divide-industrial-700/60 flex-1 min-h-0">
          <div className="flex flex-col px-0.5 md:px-0.5 lg:px-0.75 xl:px-1 py-0.25 md:py-0.25 lg:py-0.5 min-w-0 h-full gap-0.25 md:gap-0.25 lg:gap-0.5">
            <div className="text-[6.5px] md:text-[7px] lg:text-[7.5px] xl:text-[8.5px] uppercase font-bold tracking-wider text-status-warning whitespace-normal leading-[1.1]">
              CONSUMO POR TONELADA
            </div>
            <div className="flex items-center justify-between gap-0.25 md:gap-0.25 lg:gap-0.5 min-w-0 mt-auto">
              <div className="flex flex-col min-w-0">
                <div className="font-mono font-black text-xl md:text-xl lg:text-2xl xl:text-2xl text-status-warning leading-none tracking-tight">
                  {productivity.consumptionPerTon.toFixed(3)}
                </div>
                <div className="text-[8px] md:text-[8.5px] lg:text-[9px] xl:text-[9.5px] text-status-warning font-bold leading-none mt-0.25">
                  gal/ton
                </div>
              </div>
              <div className="relative flex-shrink-0 mb-0.25 w-6 h-6 md:w-7 md:h-7 lg:w-[28px] lg:h-[28px] xl:w-8 xl:h-8">
                {(() => {
                  const gaugeValue = Math.round((productivity.consumptionPerTon / 0.5) * 100)
                  return (
                    <>
                      <MiniGauge
                        value={gaugeValue}
                        max={100}
                        unit=""
                        warningThreshold={70}
                        dangerThreshold={90}
                        color="#F59E0B"
                        size={32}
                        className="!w-full !h-full"
                      />
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <BarChart3 size={9} className="text-status-warning md:size-[9px] lg:size-[10px] xl:size-[11px]" />
                      </div>
                    </>
                  )
                })()}
              </div>
            </div>
          </div>
          <div className="flex flex-col min-h-0">
            <div className="flex flex-col px-0.5 md:px-0.5 lg:px-0.75 xl:px-1 py-0.25 md:py-0.25 lg:py-0.5 min-w-0 flex-1 gap-0.25 md:gap-0.25 lg:gap-0.5">
              <div className="text-[6.5px] md:text-[7px] lg:text-[7.5px] xl:text-[8.5px] uppercase font-bold tracking-wider text-gray-300 whitespace-normal leading-[1.1]">
                CONSUMO POR CICLO
              </div>
              <div className="flex items-baseline gap-0.25 md:gap-0.25 lg:gap-0.5 min-w-0 mt-auto">
                <span className="font-mono font-black text-xl md:text-xl lg:text-2xl xl:text-2xl text-white leading-none tracking-tight">
                  {productivity.consumptionPerCycle.toFixed(2)}
                </span>
                <span className="text-[8px] md:text-[8.5px] lg:text-[9px] xl:text-[9.5px] text-gray-300 font-bold leading-none whitespace-nowrap">
                  gal/ciclo
                </span>
              </div>
            </div>
            <div className="border-t border-industrial-700/60 my-0.25 md:my-0.25 lg:my-0.25 flex-shrink-0" />
            <div className="flex flex-col px-0.5 md:px-0.5 lg:px-0.75 xl:px-1 py-0.25 md:py-0.25 lg:py-0.5 min-w-0 flex-1 gap-0.25 md:gap-0.25 lg:gap-0.5">
              <div className="text-[6.5px] md:text-[7px] lg:text-[7.5px] xl:text-[8.5px] uppercase font-bold tracking-wider text-status-warning whitespace-normal leading-[1.1]">
                COMBUSTIBLE IMPRODUCTIVO
              </div>
              <div className="flex items-baseline gap-0.25 md:gap-0.25 lg:gap-0.5 min-w-0 mt-auto">
                <span className="font-mono font-black text-2xl md:text-2xl lg:text-3xl xl:text-3xl text-white leading-none tracking-tight">
                  {productivity.unproductiveFuel.toFixed(1)}
                </span>
                <span className="text-[9px] md:text-[9.5px] lg:text-[10px] xl:text-[11px] text-gray-300 font-bold leading-none">
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
