interface KpiCardProps {
  label: string
  value: string | number
  unit?: string
  highlight?: boolean
  trendValue?: string
  subValue?: string
  subLabel?: string
  className?: string
  icon?: React.ReactNode
  color?: string
}

export default function KpiCard({
  label,
  value,
  unit,
  highlight = false,
  trendValue,
  subValue,
  subLabel,
  className = '',
  icon,
  color = 'text-white'
}: KpiCardProps) {
  return (
    <div className={`bg-industrial-850 border ${highlight ? 'border-electric-500/40 shadow-glow-blue' : 'border-industrial-700'} rounded-lg p-3 flex flex-col ${className}`}>
      {icon && <div className="mb-2">{icon}</div>}
      <div className="metric-label mb-1">{label}</div>
      <div className="flex items-baseline gap-1">
        <span className={`font-mono font-bold text-xs md:text-sm ${color}`}>
          {typeof value === 'number' ? value.toLocaleString(undefined, { maximumFractionDigits: 2 }) : value}
        </span>
        {unit && <span className="text-xs text-gray-400 font-medium">{unit}</span>}
      </div>
      {(trendValue || subLabel || subValue) && (
        <div className="mt-1 text-[10px] text-gray-500">
          {trendValue}
          {subLabel && (
            <span>
              {subLabel}{subValue && <span className="text-gray-300 font-mono ml-0.5">{subValue}</span>}
            </span>
          )}
        </div>
      )}
    </div>
  )
}
