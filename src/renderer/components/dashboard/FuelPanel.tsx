import { Fuel as FuelIcon, Clock } from 'lucide-react'
import SectionPanel from '../SectionPanel'
import ProgressBar from '../ProgressBar'
import { FuelData, OperationData } from '../../types'

interface FuelPanelProps {
  fuel: Pick<FuelData, 'instantConsumption' | 'tankLevel' | 'todayConsumption' | 'idleTodayConsumption' | 'autonomy' | 'avgConsumption'>
  totalHours: OperationData['totalHours']
}

export default function FuelPanel({ fuel, totalHours }: FuelPanelProps) {
  const accumulatedConsumption = Math.round(fuel.todayConsumption * 11 + fuel.idleTodayConsumption * 40)

  const dataRows = [
    { label: 'CONSUMO INSTANTÁNEO', value: fuel.instantConsumption.toFixed(1), unit: 'gal/h' },
    { label: 'CONSUMO ACUMULADO', value: accumulatedConsumption.toLocaleString(), unit: 'gal' },
    { label: 'CONSUMO DE HOY', value: fuel.todayConsumption.toFixed(1), unit: 'gal' },
    { label: 'RELENTÍ HOY', value: fuel.idleTodayConsumption.toFixed(1), unit: 'gal' },
  ]

  return (
    <SectionPanel
      title="COMBUSTIBLE"
      icon={<FuelIcon size={18} className="text-status-ok md:size-[18px] lg:size-[22px] xl:size-[24px]" />}
      iconColor="text-status-ok"
      titleColorClass="text-status-ok"
      borderClass="border-status-ok/60"
      bodyClass="shadow-[0_0_32px_-10px_rgba(16,185,129,0.12)]"
      grow
    >
      <div className="p-0.5 md:p-0.5 lg:p-1 xl:p-1.5 h-full flex flex-col min-h-0 gap-1 md:gap-1 lg:gap-1.5">
        <div className="grid grid-cols-2 divide-x divide-status-ok/40 flex-1 min-h-0 gap-0">
          <div className="flex flex-col min-w-0 h-full divide-y divide-industrial-700/70 px-0.5 md:px-0.5 lg:px-1 xl:px-1 py-0.25 md:py-0.5 gap-0.5 md:gap-0.5 lg:gap-0.5">
            {dataRows.map((row, i) => (
              <div key={i} className={`flex flex-col min-w-0 flex-1 min-h-0 justify-center ${i > 0 ? 'pt-0.5 md:pt-0.5' : ''}`}>
                <div className="text-[7px] md:text-[7.5px] lg:text-[8px] xl:text-[8.5px] text-gray-300 uppercase tracking-wider font-semibold whitespace-nowrap">{row.label}</div>
                <div className="flex items-baseline gap-0.5 min-w-0 mt-0.25">
                  <div className="font-mono font-black text-xl md:text-xl lg:text-2xl xl:text-2xl text-white leading-none tracking-tight">
                    {row.value}
                  </div>
                  <span className="text-[9px] md:text-[9.5px] lg:text-[10px] xl:text-[10px] text-status-ok font-bold leading-none whitespace-nowrap mt-0.25">
                    {row.unit}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col min-w-0 h-full px-0.5 md:px-0.5 lg:px-1 xl:px-1 py-0.25 md:py-0.5 gap-0.5 md:gap-0.5 lg:gap-0.5">
            <div className="flex flex-col flex-1 min-h-0">
              <div className="flex items-center justify-between gap-0.5 min-w-0">
                <span className="text-[7px] md:text-[7.5px] lg:text-[8px] xl:text-[8.5px] text-gray-300 uppercase tracking-wider font-semibold whitespace-nowrap">NIVEL TANQUE COMBUSTIBLE</span>
              </div>
              <div className="flex items-center justify-between gap-1 mt-0.25 min-w-0">
                <div className="flex items-baseline gap-0.5 min-w-0">
                  <span className="font-mono font-black text-3xl md:text-3xl lg:text-4xl xl:text-4xl text-white leading-none tracking-tighter">
                    {fuel.tankLevel.toFixed(0)}
                  </span>
                  <span className="text-[12px] md:text-sm lg:text-base xl:text-base text-gray-300 font-bold leading-none">%</span>
                </div>
                <FuelIcon size={32} className="text-gray-300/70 md:size-[32px] lg:size-[36px] xl:size-[38px] flex-shrink-0" />
              </div>
              <div className="min-w-0">
                <ProgressBar value={fuel.tankLevel} color="bg-status-ok" height="h-3 md:h-3 lg:h-3.5 xl:h-4" rounded />
                <div className="flex justify-between text-[6px] md:text-[7px] lg:text-[7.5px] text-gray-400 font-semibold mt-0.25 tracking-wider">
                  <span>0</span>
                  <span>1/2</span>
                  <span>1</span>
                </div>
              </div>
            </div>

            <div className="border-t border-industrial-700/70 my-0.25" />

            <div className="flex flex-col flex-1 min-h-0">
              <span className="text-[7px] md:text-[7.5px] lg:text-[8px] xl:text-[8.5px] text-gray-300 uppercase tracking-wider font-semibold whitespace-nowrap">AUTONOMÍA COMBUSTIBLE</span>
              <div className="flex items-center justify-between gap-1 mt-0.25 min-w-0">
                <div className="flex items-baseline gap-0.5 min-w-0">
                  <span className="font-mono font-black text-2xl md:text-2xl lg:text-3xl xl:text-3xl text-white leading-none tracking-tighter">
                    {fuel.autonomy.toFixed(1)}
                  </span>
                  <span className="text-[10px] md:text-[11px] lg:text-xs xl:text-xs text-status-ok font-bold leading-none mt-0.25">
                    h
                  </span>
                </div>
                <Clock size={28} className="text-status-ok md:size-[28px] lg:size-[30px] xl:size-[32px] flex-shrink-0" strokeWidth={1.5} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionPanel>
  )
}
