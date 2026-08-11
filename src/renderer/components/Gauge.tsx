interface GaugeProps {
  value: number
  min?: number
  max: number
  label: string
  unit?: string
  size?: number
  color?: string
  warningThreshold?: number
  dangerThreshold?: number
  className?: string
}

export default function Gauge({
  value,
  min = 0,
  max,
  label,
  unit,
  size = 140,
  color = '#1E88E5',
  warningThreshold,
  dangerThreshold,
  className = ''
}: GaugeProps) {
  const percentage = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100))
  const strokeWidth = size * 0.08
  const radius = (size - strokeWidth) / 2
  const circumference = Math.PI * radius
  const offset = circumference - (percentage / 100) * circumference

  let currentColor = color
  if (dangerThreshold !== undefined && value >= dangerThreshold) {
    currentColor = '#EF4444'
  } else if (warningThreshold !== undefined && value >= warningThreshold) {
    currentColor = '#F59E0B'
  }

  return (
    <div className={`flex flex-col items-center justify-center ${className}`} style={{ width: size, height: size * 0.75 }}>
      <svg width={size} height={size * 0.75} viewBox={`0 0 ${size} ${size * 0.75}`}>
        <defs>
          <linearGradient id={`grad-${label}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={currentColor} stopOpacity="0.6" />
            <stop offset="100%" stopColor={currentColor} stopOpacity="1" />
          </linearGradient>
        </defs>
        <path
          d={`M ${strokeWidth / 2},${size * 0.7 - strokeWidth / 2} A ${radius},${radius} 0 0 1 ${size - strokeWidth / 2},${size * 0.7 - strokeWidth / 2}`}
          fill="none"
          stroke="#1C2B3F"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        <path
          d={`M ${strokeWidth / 2},${size * 0.7 - strokeWidth / 2} A ${radius},${radius} 0 0 1 ${size - strokeWidth / 2},${size * 0.7 - strokeWidth / 2}`}
          fill="none"
          stroke={`url(#grad-${label})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{
            transition: 'stroke-dashoffset 0.5s ease-out, stroke 0.3s ease',
            filter: `drop-shadow(0 0 4px ${currentColor}60)`
          }}
        />
        <text
          x={size / 2}
          y={size * 0.52}
          textAnchor="middle"
          className="fill-white font-bold font-mono"
          style={{ fontSize: size * 0.18 }}
        >
          {typeof value === 'number' ? value.toLocaleString() : value}
        </text>
        {unit && (
          <text
            x={size / 2}
            y={size * 0.65}
            textAnchor="middle"
            className="fill-gray-400"
            style={{ fontSize: size * 0.08 }}
          >
            {unit}
          </text>
        )}
      </svg>
      <div className="text-xs text-gray-400 uppercase tracking-wider font-medium mt-0.5 -translate-y-1">
        {label}
      </div>
    </div>
  )
}
