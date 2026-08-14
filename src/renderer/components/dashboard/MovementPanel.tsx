import { Gauge, MapPin } from 'lucide-react'
import SectionPanel from '../SectionPanel'
import MiniGauge from '../gauges/MiniGauge'
import SvgExcavatorIcon from '../icons/SvgExcavatorIcon'
import { GpsData, ImuData } from '../../types'

interface MovementPanelProps {
  gps: Pick<GpsData, 'speed' | 'latitude' | 'longitude'>
  imu: Pick<ImuData, 'pitch' | 'roll' | 'status'>
}

export default function MovementPanel({ gps, imu }: MovementPanelProps) {
  return (
    <SectionPanel
      title="MOVIMIENTO"
      icon={<Gauge size={12} className="text-electric-400" />}
    >
      <div className="grid grid-cols-3 divide-x divide-industrial-700/60 p-2 md:p-1 lg:p-1">
        
        {/* Velocidad */}
        <div className="flex flex-col items-center justify-between px-1.5 lg:px-2 md:px-2 py-0.5">
          
            <div className="text-[8px] lg:text-[9px] md:text-[8px] text-gray-400 uppercase tracking-wider font-semibold mb-1 lg:mb-1.5 md:mb-1.5 text-center">VELOCIDAD</div>
            <div className="grid grid-cols-2 items-center gap-1.5 lg:gap-2 md:gap-2 w-full">
              <div className="text-left h-full flex items-center">
                <span className="font-mono font-black text-2xl lg:text-[28px] md:text-2xl text-white leading-none tracking-tight">{gps.speed.toFixed(1)}</span>
                <span className="text-[9px] lg:text-[10px] md:text-[9px] text-gray-400 font-semibold mt-0.5">km/h</span>
              </div>
              <div className="flex flex-col gap-0.5 lg:gap-1 md:gap-0.5 h-full items-center">
                <MiniGauge value={Math.round(gps.speed * 10) / 10} max={10} unit="km/h" warningThreshold={8} color="#0EA5E9" size={36} className="md:hidden lg:hidden" />
                <MiniGauge value={Math.round(gps.speed * 10) / 10} max={10} unit="km/h" warningThreshold={8} color="#0EA5E9" size={44} className="hidden md:block lg:block xl:hidden" />
                <MiniGauge value={Math.round(gps.speed * 10) / 10} max={10} unit="km/h" warningThreshold={8} color="#0EA5E9" size={54} className="hidden xl:block" />
              </div>
            </div>
        </div>

        {/* Inclinación IMU */}
        <div className="flex flex-col items-center justify-center px-1.5 lg:px-2 md:px-2 py-0.5">
          <div className="text-[8px] lg:text-[9px] md:text-[8px] text-gray-400 uppercase tracking-wider font-semibold mb-1 lg:mb-1.5 md:mb-1.5 text-center">INCLINACIÓN (IMU)</div>
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-1.5 lg:gap-3 md:gap-2 w-full">
            <div className="text-left">
              <div className="text-[7px] lg:text-[8px] md:text-[8px] text-gray-500 font-semibold uppercase tracking-wider mb-0.5">PITCH</div>
              <div className={`font-mono font-bold text-base lg:text-sm md:text-base leading-none tracking-tight ${imu.pitch > 3 ? 'text-status-warning' : 'text-white'}`}>
                {imu.pitch > 0 ? '+' : ''}{imu.pitch.toFixed(1)}°
              </div>
            </div>
            <div className="flex flex-col items-center justify-center leading-none px-0.5">
              <SvgExcavatorIcon className="w-8 h-8 lg:w-10 lg:h-10 md:w-9 md:h-9 text-gray-400" />
            </div>
            <div className="text-right">
              <div className="text-[7px] lg:text-[8px] md:text-[8px] text-gray-500 font-semibold uppercase tracking-wider mb-0.5">ROLL</div>
              <div className={`font-mono font-bold text-base lg:text-sm md:text-base leading-none tracking-tight ${Math.abs(imu.roll) > 3 ? 'text-status-warning' : 'text-white'}`}>
                {imu.roll > 0 ? '+' : ''}{imu.roll.toFixed(1)}°
              </div>
            </div>
          </div>
        </div>

        {/* GPS */}
        <div className="flex flex-col justify-center px-1.5 lg:px-2 md:px-2 py-0.5">
          <div className="text-[8px] lg:text-[9px] md:text-[8px] text-gray-400 uppercase tracking-wider font-semibold mb-1 lg:mb-1.5 md:mb-1.5 text-center">UBICACIÓN GPS</div>
          <div className="grid grid-cols-2 gap-1.5 lg:gap-1.5 md:gap-1.5 w-fit">
            <MapPin size={24} className="text-electric-500 flex-shrink-0 justify-start" strokeWidth={2} />
            <div className="flex flex-col gap-0.5 lg:gap-1 md:gap-0.5 h-full items-center">
              <div className="font-mono text-[9px] lg:text-[11px] md:text-[10px] text-white font-medium whitespace-nowrap tracking-wide">{gps.latitude}</div>
              <div className="font-mono text-[9px] lg:text-[11px] md:text-[10px] text-white font-medium whitespace-nowrap tracking-wide">{gps.longitude}</div>
            </div>
          </div>
        </div>

      </div>
    </SectionPanel>
  )
}
