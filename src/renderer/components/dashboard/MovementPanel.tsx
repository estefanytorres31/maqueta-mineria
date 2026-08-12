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
      icon={<Gauge size={13} className="text-electric-400" />}
    >
      <div className="grid grid-cols-12 gap-2 p-3">
      <div className="col-span-4 bg-industrial-900/70 rounded-md p-2 border border-industrial-750/80">
        <div className="flex items-center gap-2">
          <div className="flex-1 min-w-0">
            <div className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">VELOCIDAD</div>
            <div className="flex items-baseline gap-1">
              <span className="font-mono font-black text-2xl text-white leading-none">{gps.speed.toFixed(1)}</span>
              <span className="text-xs text-gray-400 font-semibold">km/h</span>
            </div>
          </div>
          <MiniGauge value={Math.round(gps.speed * 10) / 10} max={10} unit="km/h" warningThreshold={8} color="#10B981" />
        </div>
      </div>

      <div className="col-span-4 bg-industrial-900/70 rounded-md p-2 border border-industrial-750/80">
        <div className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mb-1">INCLINACIÓN (IMU)</div>
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
          <div>
            <div className="text-[9px] text-gray-500 font-semibold uppercase tracking-wider mb-0.5">PITCH</div>
            <div className={`font-mono font-bold text-base leading-none ${imu.pitch > 3 ? 'text-status-warning' : 'text-white'}`}>
              {imu.pitch > 0 ? '+' : ''}{imu.pitch.toFixed(1)}°
            </div>
          </div>
          <div className="flex flex-col items-center justify-center text-status-warning text-[28px] leading-none">
            <SvgExcavatorIcon className="w-10 h-10 text-electric-500" />
          </div>
          <div className="text-right">
            <div className="text-[9px] text-gray-500 font-semibold uppercase tracking-wider mb-0.5">ROLL</div>
            <div className={`font-mono font-bold text-base leading-none ${Math.abs(imu.roll) > 3 ? 'text-status-warning' : 'text-white'}`}>
              {imu.roll > 0 ? '+' : ''}{imu.roll.toFixed(1)}°
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-4 bg-industrial-900/70 rounded-md p-2 border border-industrial-750/80">
        <div className="flex items-center gap-1 mb-1">
          <MapPin size={11} className="text-electric-400" />
          <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">UBICACIÓN GPS</span>
        </div>
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[9px] text-gray-500 uppercase tracking-wider">N</span>
            <span className="font-mono text-[11px] text-white font-semibold">{gps.latitude}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[9px] text-gray-500 uppercase tracking-wider">W</span>
            <span className="font-mono text-[11px] text-white font-semibold">{gps.longitude}</span>
          </div>
        </div>
      </div>
      </div>
    </SectionPanel>
  )
}
