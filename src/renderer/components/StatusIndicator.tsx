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
  const iconSize = size === 'sm' ? 16 : 20

  return (
    <div className={`kpi-card flex flex-col items-center gap-1.5 p-2.5 ${className}`}>
      <div className={`w-9 h-9 rounded-lg bg-industrial-800 border border-industrial-700 flex items-center justify-center ${config.color}`}>
        <Icon size={iconSize} />
      </div>
      <div className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">{label}</div>
      <div className="flex items-center gap-1">
        <span className={`status-dot ${config.dot} ${config.glow}`} />
        <span className={`text-xs font-bold ${config.color}`}>{status}</span>
      </div>
    </div>
  )
}
