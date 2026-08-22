import StatusIndicator from '../StatusIndicator'
import SvgExcavatorIcon from '../icons/SvgExcavatorIcon'
import { Machine, SensorStatus } from '../../types'

interface SystemStatus {
  label: string
  icon: React.ElementType
  status: SensorStatus
}

interface ModeConfig {
  label: string
  color: string
  border: string
  iconColor: string
  bg: string
}

interface CenterMachinePanelProps {
  selectedMachine?: Machine
  systemStatusesTop: SystemStatus[]
  systemStatusesBottom: SystemStatus[]
  modeConfig: ModeConfig
}

export default function CenterMachinePanel({
  selectedMachine,
  systemStatusesTop,
  systemStatusesBottom,
  modeConfig
}: CenterMachinePanelProps) {
  return (
    <div className="flex flex-col gap-0.5 lg:gap-0.5 md:gap-0.5 min-h-0 min-w-0 h-full">
      <div className={`rounded-lg border-2 px-2 lg:px-2 md:px-2 py-0.5 lg:py-0.5 md:py-0.5 flex items-center justify-center gap-1.5 lg:gap-2 md:gap-2 flex-shrink-0 ${modeConfig.border} ${modeConfig.bg}`}>
        <SvgExcavatorIcon className={`w-6 h-6 lg:w-7 lg:h-7 md:w-7 md:h-7 ${modeConfig.iconColor}`} />
        <div className="text-center">
          <div className={`text-lg lg:text-xl md:text-lg font-black ${modeConfig.color} leading-none tracking-wider`}>
            {modeConfig.label}
          </div>
          <div className="text-gray-400 text-[8px] lg:text-[9px] md:text-[9px] mt-0.25 lg:mt-0.5 md:mt-0.5">Modo operación</div>
        </div>
      </div>

      <div className="rounded-lg border border-industrial-700 bg-industrial-850/50 flex flex-col flex-1 min-h-0 overflow-hidden">
        <div className="flex-1 flex items-center justify-center min-h-0 relative py-0.5 lg:py-1 md:py-1 px-1 lg:px-1 md:px-1">
          <div className="absolute inset-0 opacity-40 pointer-events-none" style={{
            background: 'radial-gradient(ellipse 80% 70% at 50% 55%, rgba(20, 184, 255, 0.08), transparent 70%), radial-gradient(ellipse 60% 50% at 50% 85%, rgba(0,0,0,0.6), transparent 70%)'
          }} />
          {selectedMachine?.imageUrl ? (
            <img
              src={selectedMachine.imageUrl}
              alt={selectedMachine.name}
              className="relative max-h-[82%] lg:max-h-[80%] md:max-h-[78%] max-w-[90%] lg:max-w-[88%] md:max-w-[86%] object-contain select-none pointer-events-none"
              style={{
                filter: 'drop-shadow(0 30px 40px rgba(0,0,0,0.7)) drop-shadow(0 0 30px rgba(20, 184, 255, 0.18))'
              }}
            />
          ) : (
            <div className="relative text-[180px] md:text-[220px] leading-none drop-shadow-2xl">🚜</div>
          )}
        </div>

        <div className="border-t border-industrial-700/70 bg-industrial-900/80 rounded-b-lg overflow-hidden">
          <div className="grid grid-cols-5 divide-x divide-industrial-700/60">
            {systemStatusesTop.map(s => (
              <StatusIndicator key={s.label} label={s.label} icon={s.icon} status={s.status} size="sm" />
            ))}
          </div>
          <div className="border-t border-industrial-700/60" />
          <div className="grid grid-cols-5 divide-x divide-industrial-700/60">
            {systemStatusesBottom.map(s => (
              <StatusIndicator key={s.label} label={s.label} icon={s.icon} status={s.status} size="sm" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
