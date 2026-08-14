import { SensorStatus } from '../types'
import { CircleCheck, AlertTriangle, XCircle, CloudOff } from 'lucide-react'

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
  const statusConfig: Record<SensorStatus, { StatusIcon: React.ElementType; iconColor: string; bgColor?: string }> = {
    OK: { StatusIcon: CircleCheck, iconColor: 'text-status-ok' },
    WARNING: { StatusIcon: AlertTriangle, iconColor: 'text-status-warning' },
    ERROR: { StatusIcon: XCircle, iconColor: 'text-status-danger' },
    OFFLINE: { StatusIcon: CloudOff, iconColor: 'text-status-offline' }
  }

  const { StatusIcon, iconColor } = statusConfig[status]
  const isSm = size === 'sm'
  const iconBoxSize = isSm
    ? 'w-7 h-7 md:w-7 lg:w-9 xl:w-10 rounded-lg'
    : 'w-8 h-8 md:w-8 lg:w-10 xl:w-11 rounded-xl'
  const iconSize = isSm ? 18 : 24
  const statusIconSize = isSm ? 16 : 22
  const labelSize = isSm
    ? 'text-[9px] md:text-[8px] lg:text-[10px] xl:text-[11px]'
    : 'text-[10px] md:text-[9px] lg:text-[11px] xl:text-[12px]'

  return (
    <div className={`flex flex-col items-center justify-center gap-1 md:gap-1 py-1 md:py-1.5 lg:py-2 min-w-0 w-full ${className}`}>
      <div className={`${iconBoxSize} bg-industrial-800/60 border border-industrial-700/40 flex items-center justify-center text-white shadow-sm`}>
        <Icon size={iconSize} strokeWidth={1.8} />
      </div>
      <div className={`${labelSize} uppercase tracking-wider text-white font-black text-center whitespace-normal break-words line-clamp-2 leading-tight`}>
        {label}
      </div>
      <div className="flex items-center justify-center leading-none mt-0.25">
        <StatusIcon size={statusIconSize} className={`${iconColor}`} />
      </div>
    </div>
  )
}
