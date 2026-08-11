import { AlertType } from '../types'

interface AlertBadgeProps {
  type: AlertType
  size?: 'sm' | 'md'
  className?: string
}

export default function AlertBadge({ type, size = 'md', className = '' }: AlertBadgeProps) {
  const config: Record<AlertType, { label: string; classes: string }> = {
    CRÍTICA: {
      label: 'CRÍTICA',
      classes: 'bg-status-danger/20 text-status-danger border-status-danger/40'
    },
    ADVERTENCIA: {
      label: 'ADVERTENCIA',
      classes: 'bg-status-warning/20 text-status-warning border-status-warning/40'
    },
    INFORMACIÓN: {
      label: 'INFO',
      classes: 'bg-electric-500/20 text-electric-400 border-electric-500/40'
    }
  }

  const sizeClasses = size === 'sm' ? 'text-[10px] px-2 py-0.5' : 'text-xs px-2.5 py-1'

  return (
    <span className={`inline-flex items-center font-bold tracking-wider rounded border ${sizeClasses} ${config[type].classes} ${className}`}>
      {config[type].label}
    </span>
  )
}
