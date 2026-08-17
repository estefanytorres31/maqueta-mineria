import { Gauge } from 'lucide-react'
import SectionPanel from '../SectionPanel'
import MiniGauge from '../gauges/MiniGauge'
import SvgExcavatorIcon from '../icons/SvgExcavatorIcon'
import { GiMineTruck as TruckIcon } from 'react-icons/gi'
import { ImuData } from '../../types'

interface MovementPanelProps {
  imu: Pick<ImuData, 'pitch' | 'roll' | 'status'>
}

export default function MovementPanel({ imu }: MovementPanelProps) {
  const pitchGaugePct = Math.round(Math.min(100, Math.max(0, ((imu.pitch + 10) / 20) * 100)))
  const rollGaugePct = Math.round(Math.min(100, Math.max(0, ((imu.roll + 10) / 20) * 100)))

  return (
    <SectionPanel
      title="PITCH & ROLL"
      icon={<Gauge size={18} className="md:size-[18px] lg:size-[20px] xl:size-[22px] flex-shrink-0" style={{ color: '#8B5CF6' }} />}
      iconColor="text-[#8B5CF6]"
      titleColorClass="text-[#8B5CF6]"
      headerBgClass=""
      borderClass="border-[#8B5CF6]/60"
      grow
    >
      <div className="p-[2px] md:p-[2px] lg:p-[3px] xl:p-1 h-full flex flex-col min-h-0 gap-[2px]">
        <div className="grid grid-cols-2 divide-x flex-1 min-h-0" style={{ columnRuleColor: 'rgba(139,92,246,0.35)' }}>
          {/* ========== COL 1: PITCH ========== */}
          <div
            className="flex flex-col items-center justify-center px-[2px] md:px-[2px] lg:px-[3px] xl:px-1 py-[1px] md:py-[2px] min-w-0 h-full"
            style={{ borderRight: '1px solid rgba(139,92,246,0.35)' }}
          >
            <div className="text-[6.5px] md:text-[7px] lg:text-[7.5px] xl:text-[8.5px] text-gray-200 uppercase tracking-[0.1em] font-bold text-center whitespace-nowrap">
              PITCH
            </div>
            <div className="flex items-baseline gap-[2px] md:gap-0.5 min-w-0 mt-[2px]">
              <span className="font-mono font-black text-xl md:text-2xl lg:text-3xl xl:text-4xl text-white leading-none tracking-tighter whitespace-nowrap">
                {imu.pitch > 0 ? '+' : ''}{imu.pitch.toFixed(1)}
              </span>
              <span className="text-[10px] md:text-[11px] lg:text-[12px] text-gray-300 font-bold leading-none">°</span>
            </div>
            <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 xl:w-20 xl:h-20 min-w-0 mb-[1px]">
              <MiniGauge
                value={pitchGaugePct}
                max={100}
                unit=""
                warningThreshold={70}
                dangerThreshold={90}
                color="#8B5CF6"
                size={96}
                className="!w-full !h-full"
              />
            </div>
            <div className="flex justify-between text-[6px] md:text-[6.5px] lg:text-[7px] text-gray-400 font-semibold px-[2px] tracking-wider w-full pb-[1px]">
              <span>-10°</span>
              <span>0°</span>
              <span>+10°</span>
            </div>
            <div className="w-7 h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 flex items-center justify-center flex-shrink-0">
              <SvgExcavatorIcon className="w-full h-full text-gray-300/80" />
            </div>
          </div>

          {/* ========== COL 2: ROLL ========== */}
          <div className="flex flex-col items-center justify-center px-[2px] md:px-[2px] lg:px-[3px] xl:px-1 py-[1px] md:py-[2px] min-w-0 h-full">
            <div className="text-[6.5px] md:text-[7px] lg:text-[7.5px] xl:text-[8.5px] text-gray-200 uppercase tracking-[0.1em] font-bold text-center whitespace-nowrap">
              ROLL
            </div>
            <div className="flex items-baseline gap-[2px] md:gap-0.5 min-w-0 mt-[2px]">
              <span className="font-mono font-black text-xl md:text-2xl lg:text-3xl xl:text-4xl text-white leading-none tracking-tighter whitespace-nowrap">
                {imu.roll > 0 ? '+' : ''}{imu.roll.toFixed(1)}
              </span>
              <span className="text-[10px] md:text-[11px] lg:text-[12px] text-gray-300 font-bold leading-none">°</span>
            </div>
            <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 xl:w-20 xl:h-20 min-w-0 mb-[1px]">
              <MiniGauge
                value={rollGaugePct}
                max={100}
                unit=""
                warningThreshold={70}
                dangerThreshold={90}
                color="#8B5CF6"
                size={96}
                className="!w-full !h-full"
              />
            </div>
            <div className="flex justify-between text-[6px] md:text-[6.5px] lg:text-[7px] text-gray-400 font-semibold px-[2px] tracking-wider w-full pb-[1px]">
              <span>-10°</span>
              <span>0°</span>
              <span>+10°</span>
            </div>
            <div className="w-7 h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 flex items-center justify-center flex-shrink-0">
              <TruckIcon style={{ color: 'rgba(209,213,219,0.8)' }} className="w-full h-full" />
            </div>
          </div>
        </div>
      </div>
    </SectionPanel>
  )
}
