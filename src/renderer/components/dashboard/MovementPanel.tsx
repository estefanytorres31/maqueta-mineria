import { Gauge, MapPin } from 'lucide-react'
import SectionPanel from '../SectionPanel'
import MiniGauge from '../gauges/MiniGauge'
import SvgExcavatorIcon from '../icons/SvgExcavatorIcon'
import { GiMineTruck as TruckIcon } from 'react-icons/gi'
import { GpsData, ImuData } from '../../types'

interface MovementPanelProps {
  gps: Pick<GpsData, 'speed' | 'latitude' | 'longitude'>
  imu: Pick<ImuData, 'pitch' | 'roll' | 'status'>
}

export default function MovementPanel({ gps, imu }: MovementPanelProps) {
  const pitchGaugePct = Math.round(Math.min(100, Math.max(0, ((imu.pitch + 10) / 20) * 100)))
  const rollGaugePct = Math.round(Math.min(100, Math.max(0, ((imu.roll + 10) / 20) * 100)))
  const pitchColor = Math.abs(imu.pitch) > 5 ? '#F59E0B' : Math.abs(imu.pitch) > 8 ? '#EF4444' : '#8B5CF6'
  const rollColor = Math.abs(imu.roll) > 5 ? '#F59E0B' : Math.abs(imu.roll) > 8 ? '#EF4444' : '#8B5CF6'

  return (
    <SectionPanel
      title="PITCH & ROLL"
      icon={<Gauge size={18} className="md:size-[18px] lg:size-[22px] xl:size-[24px] flex-shrink-0" style={{ color: '#8B5CF6' }} />}
      iconColor="text-[#8B5CF6]"
      titleColorClass="text-[#8B5CF6]"
      borderClass="border-[#8B5CF6]/60"
      bodyClass="shadow-[0_0_40px_-10px_rgba(139,92,246,0.2)]"
      grow
    >
      <div className="p-0.5 md:p-0.5 lg:p-1 xl:p-1 h-full flex flex-col min-h-0 gap-0">
        <div className="grid grid-cols-2 divide-x flex-1 min-h-0">
          {/* ========== COL 1: PITCH & ROLL INCLINACIÓN ========== */}
          <div className="flex flex-col items-center justify-center px-0.5 md:px-0.5 lg:px-1 xl:px-1 py-0.25 md:py-0.25 min-w-0 h-full">
            <div className="text-[6.5px] md:text-[8px] lg:text-[10px] xl:text-[11px] text-gray-300 uppercase tracking-[0.1em] font-bold text-center whitespace-nowrap">
              INCLINACIÓN
            </div>
            <div className="grid grid-cols-2 gap-0.5 md:gap-0.5 lg:gap-1 xl:gap-1 w-full flex-1 min-h-0 mt-0.5 md:mt-0.5">
              {/* Pitch */}
              <div className="flex flex-col items-center justify-center min-w-0 h-full">
                <div className="text-[6.5px] md:text-[7px] lg:text-[9px] xl:text-[10px] text-gray-300 uppercase tracking-[0.1em] font-bold text-center whitespace-nowrap">
                  PITCH
                </div>
                <div className="flex items-baseline gap-0.5 min-w-0 mt-0.25 md:mt-0.25 lg:mt-0.5">
                  <span className="font-mono font-black text-base md:text-base lg:text-lg xl:text-lg text-white leading-none tracking-tighter whitespace-nowrap">
                    {imu.pitch > 0 ? '+' : ''}{imu.pitch.toFixed(1)}
                  </span>
                  <span className="text-[10px] md:text-[10px] lg:text-[11px] xl:text-[11px] font-bold leading-none" style={{ color: pitchColor }}>°</span>
                </div>
                <div className="w-10 h-10 md:w-10 md:h-10 lg:w-12 lg:h-12 xl:w-12 xl:h-12 mb-0.5">
                  <MiniGauge value={pitchGaugePct} max={100} unit="" warningThreshold={70} dangerThreshold={90} color="#8B5CF6" size={48} className="!w-full !h-full" />
                </div>
              </div>
              {/* Roll */}
              <div className="flex flex-col items-center justify-center min-w-0 h-full">
                <div className="text-[6.5px] md:text-[7px] lg:text-[9px] xl:text-[10px] text-gray-300 uppercase tracking-[0.1em] font-bold text-center whitespace-nowrap">
                  ROLL
                </div>
                <div className="flex items-baseline gap-0.5 min-w-0 mt-0.25 md:mt-0.25 lg:mt-0.5">
                  <span className="font-mono font-black text-base md:text-base lg:text-lg xl:text-lg text-white leading-none tracking-tighter whitespace-nowrap">
                    {imu.roll > 0 ? '+' : ''}{imu.roll.toFixed(1)}
                  </span>
                  <span className="text-[10px] md:text-[10px] lg:text-[11px] xl:text-[11px] font-bold leading-none" style={{ color: rollColor }}>°</span>
                </div>
                <div className="w-10 h-10 md:w-10 md:h-10 lg:w-12 lg:h-12 xl:w-12 xl:h-12 mb-0.5">
                  <MiniGauge value={rollGaugePct} max={100} unit="" warningThreshold={70} dangerThreshold={90} color="#8B5CF6" size={48} className="!w-full !h-full" />
                </div>
              </div>
            </div>
            <div className="flex justify-between text-[6px] md:text-[6.5px] lg:text-[7px] xl:text-[7px] text-gray-400 font-semibold px-0.5 tracking-wider w-full">
              <span>-10°</span>
              <span>0°</span>
              <span>+10°</span>
            </div>
          </div>

          {/* ========== COL 2: UBICACIÓN GPS ========== */}
          <div className="flex flex-col items-center justify-center px-0.5 md:px-0.5 lg:px-1 xl:px-1 py-0.25 md:py-0.25 min-w-0 h-full">
            <div className="text-[6.5px] md:text-[8px] lg:text-[10px] xl:text-[11px] text-gray-300 uppercase tracking-[0.1em] font-bold text-center whitespace-nowrap w-full">
              UBICACIÓN GPS
            </div>
            <div className="flex flex-col items-center justify-center w-full flex-1 min-h-0 gap-0.5 lg:gap-0.5">
              <MapPin size={20} className="flex-shrink-0" style={{ color: '#8B5CF6' }} strokeWidth={2} />
              <div className="flex flex-col gap-0.25 w-full items-center min-w-0">
                <div className="font-mono text-[8px] md:text-[8.5px] lg:text-[9px] xl:text-[10px] text-white font-medium whitespace-nowrap tracking-wide">
                  {gps.latitude}
                </div>
                <div className="font-mono text-[8px] md:text-[8.5px] lg:text-[9px] xl:text-[10px] text-white font-medium whitespace-nowrap tracking-wide">
                  {gps.longitude}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionPanel>
  )
}
