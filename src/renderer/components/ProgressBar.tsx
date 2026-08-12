interface ProgressBarProps {
  value: number
  max?: number
  color?: string
  label?: string
  showValue?: boolean
  height?: string
  className?: string
}

export default function ProgressBar({
  value,
  max = 100,
  color = 'bg-electric-500',
  label,
  showValue = true,
  height = 'h-1.5',
  className = ''
}: ProgressBarProps) {
  const percentage = Math.max(0, Math.min(100, (value / max) * 100))

  return (
    <div className={`w-full ${className}`}>
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-1">
          {label && <span className="text-xs text-gray-400">{label}</span>}
        </div>
      )}
      <div className={`progress-bar-track ${height}`}>
        <div
          className={`progress-bar-fill ${color}`}
          style={{
            width: `${percentage}%`,
            boxShadow: '0 0 8px currentColor'
          }}
        />
      </div>
    </div>
  )
}
