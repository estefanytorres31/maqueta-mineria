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
    <div className={`bg-industrial-850 border ${highlight ? 'border-electric-500/40 shadow-glow-blue' : 'border-industrial-700'} rounded-md p-1 md:p-1 lg:p-1 flex flex-col min-w-0 ${className}`}>
      {icon && <div className="mb-0.5 md:mb-0.5">{icon}</div>}
      <div className="metric-label mb-0.5 md:mb-0.25 leading-tight text-wrap whitespace-normal break-words line-clamp-2">{label}</div>
      <div className="flex items-baseline gap-0.5 min-w-0">
        <span className={`font-mono font-bold text-[11px] md:text-[11px] lg:text-[11px] xl:text-xs 2xl:text-sm ${color} leading-none`}>
          {typeof value === 'number' ? value.toLocaleString(undefined, { maximumFractionDigits: 2 }) : value}
        </span>
        {unit && <span className="text-[9px] md:text-[9px] text-gray-400 font-medium leading-none">{unit}</span>}
      </div>
      {(trendValue || subLabel || subValue) && (
        <div className="mt-0.25 text-[9px] text-gray-500 leading-tight">
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
