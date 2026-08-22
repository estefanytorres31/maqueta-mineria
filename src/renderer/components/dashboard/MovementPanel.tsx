import { Gauge } from 'lucide-react'
import SectionPanel from '../SectionPanel'
import NeedleDial from '../gauges/NeedleDial'
import SvgExcavatorIcon from '../icons/SvgExcavatorIcon'          // vista lateral → PITCH
import SvgExcavatorFrontIcon from '../icons/SvgFrontExcavatorIcon'
import { ImuData } from '../../types'

interface MovementPanelProps {
  imu: Pick<ImuData, 'pitch' | 'roll' | 'status'>
}

export default function MovementPanel({ imu }: MovementPanelProps) {

  return (
    <SectionPanel
      title="PITCH & ROLL"
      icon={<Gauge size={18} className="md:size-[18px] lg:size-[20px] xl:size-[22px] flex-shrink-0" style={{ color: '#8B5CF6' }} />}
      iconColor="text-[#8B5CF6]"
      titleColorClass="text-[#8B5CF6]"
      headerBgClass=""
      borderClass="border-[#8B5CF6]/60"
      grow
      centerTitle
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
              <span className="font-mono font-black text-xl md:text-xl lg:text-2xl xl:text-3xl text-white leading-none tracking-tighter whitespace-nowrap mb-2">
                {imu.pitch > 0 ? '+' : ''}{imu.pitch.toFixed(1)}
              </span>
              <span className="text-[10px] md:text-[11px] lg:text-[12px] text-gray-300 font-bold leading-none">°</span>
            </div>
            <div className="w-12 h-12 md:w-18 md:h-18 lg:w-24 lg:h-24 xl:w-32 xl:h-32 min-w-0 mb-[1px]">
              <NeedleDial
                value={imu.pitch}
                range={30}
                color="#8B5CF6"
                size={96}
                centerIcon={<SvgExcavatorIcon className="w-full h-full text-white/90" />}
                className="!w-full !h-full"
              />
            </div>
          </div>

          {/* ========== COL 2: ROLL ========== */}
          <div className="flex flex-col items-center justify-center px-[2px] md:px-[2px] lg:px-[3px] xl:px-1 py-[1px] md:py-[2px] min-w-0 h-full">
            <div className="text-[6.5px] md:text-[7px] lg:text-[7.5px] xl:text-[8.5px] text-gray-200 uppercase tracking-[0.1em] font-bold text-center whitespace-nowrap">
              ROLL
            </div>
            <div className="flex items-baseline gap-[2px] md:gap-0.5 min-w-0 mt-[2px]">
              <span className="font-mono font-black text-xl md:text-xl lg:text-2xl xl:text-3xl text-white leading-none tracking-tighter whitespace-nowrap mb-2">
                {imu.roll > 0 ? '+' : ''}{imu.roll.toFixed(1)}
              </span>
              <span className="text-[10px] md:text-[11px] lg:text-[12px] text-gray-300 font-bold leading-none">°</span>
            </div>
            <div className="w-12 h-12 md:w-18 md:h-18 lg:w-24 lg:h-24 xl:w-32 xl:h-32 min-w-0 mb-[1px]">
              <NeedleDial
                value={imu.roll}
                range={30}
                color="#8B5CF6"
                size={96}
                centerIcon={<SvgExcavatorFrontIcon className="w-full h-full text-white/90" />}
                className="!w-full !h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </SectionPanel>
  )
}
