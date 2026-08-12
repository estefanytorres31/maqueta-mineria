import { SensorStatus } from '../types'

interface StatusIndicatorProps {
  label: string
  icon: React.ElementType
  status: SensorStatus
  size?: 'sm' | 'md'
  className?: string
}

export default function StatusIndicator({
  label,
  icon: Icon,
  status,
  size = 'md',
  className = ''
}: StatusIndicatorProps) {
  const statusConfig: Record<SensorStatus, { color: string; dot: string; glow: string }> = {
    OK: { color: 'text-status-ok', dot: 'bg-status-ok', glow: 'shadow-glow-green' },
    WARNING: { color: 'text-status-warning', dot: 'bg-status-warning', glow: 'shadow-glow-orange' },
    ERROR: { color: 'text-status-danger', dot: 'bg-status-danger', glow: 'shadow-glow-red animate-pulse' },
    OFFLINE: { color: 'text-status-offline', dot: 'bg-status-offline', glow: '' }
  }

  const config = statusConfig[status]
  const isSm = size === 'sm'
  const iconSize = isSm ? 18 : 20
  const iconBox = isSm ? 'w-8 h-8 rounded-md' : 'w-9 h-9 rounded-lg'

  return (
    <div className={`flex flex-col items-center justify-center gap-1 md:gap-1.5 py-1.5 px-1 md:px-1.5 ${className}`}>
      <div className={`${iconBox} bg-industrial-800/80 border border-industrial-700 flex items-center justify-center ${config.color}`}>
        <Icon size={iconSize} />
      </div>
      <div className={`${isSm ? 'text-[10px] leading-[11px]' : 'text-[10px] md:text-[11px] leading-[12px]'} uppercase tracking-wider text-gray-300 font-bold text-center`}>{label}</div>
      <div className="flex items-center gap-1 leading-none">
        <span className={`status-dot ${isSm ? 'w-1.5 h-1.5' : 'w-2 h-2'} ${config.dot} ${config.glow}`} />
        <span className={`${isSm ? 'text-[9px]' : 'text-[10px]'} font-bold ${config.color} leading-none`}>{status}</span>
      </div>
    </div>
  )
}
