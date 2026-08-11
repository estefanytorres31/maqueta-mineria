import { ReactNode } from 'react'
import { LucideIcon } from 'lucide-react'

interface MetricCardProps {
  label: string
  value: string | number
  unit?: string
  icon?: LucideIcon
  iconColor?: string
  subValue?: string
  subLabel?: string
  trend?: 'up' | 'down' | 'neutral'
  className?: string
  children?: ReactNode
}

export default function MetricCard({
  label,
  value,
  unit,
  icon: Icon,
  iconColor = 'text-electric-400',
  subValue,
  subLabel,
  className = ''
}: MetricCardProps) {
  return (
    <div className={`kpi-card ${className}`}>
      {Icon && (
        <div className={`w-7 h-7 rounded-md bg-industrial-750 flex items-center justify-center mb-2 ${iconColor}`}>
          <Icon size={15} />
        </div>
      )}
      <div className="metric-label mb-1">{label}</div>
      <div className="flex items-baseline gap-1.5 mb-1">
        <span className="metric-value text-2xl md:text-3xl">{value}</span>
        {unit && <span className="text-sm text-gray-400 font-medium">{unit}</span>}
      </div>
      {subLabel && (
        <div className="text-xs text-gray-500">
          {subLabel} {subValue && <span className="text-gray-300 font-mono ml-0.5">{subValue}</span>}
        </div>
      )}
    </div>
  )
}
