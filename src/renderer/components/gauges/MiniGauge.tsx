interface MiniGaugeProps {
  value: number
  max: number
  unit: string
  warningThreshold?: number
  dangerThreshold?: number
  color?: string
  size?: number
  className?: string
}

export default function MiniGauge({
  value,
  max,
  unit,
  warningThreshold,
  dangerThreshold,
  color = '#14B8FF',
  size = 56,
  className = ''
}: MiniGaugeProps) {
  const ratio = Math.min(1, value / max)
  let stroke = color
  if (dangerThreshold && value >= dangerThreshold) stroke = '#EF4444'
  else if (warningThreshold && value >= warningThreshold) stroke = '#F59E0B'
  const svgSize = 48
  const r = (svgSize - 12) / 2
  const c = 2 * Math.PI * r
  const dash = `${(ratio) * (c * 0.75)} ${c}`
  const fontSizeValue = Math.max(11, Math.round(size * 0.23))
  const fontSizeUnit = Math.max(7, Math.round(size * 0.13))
  return (
    <div className={`relative flex items-center justify-center flex-shrink-0 ${className}`} style={{ width: size, height: size }}>
      <svg viewBox={`0 0 ${svgSize} ${svgSize}`} className="w-full h-full -rotate-[135deg]">
        <circle cx={svgSize/2} cy={svgSize/2} r={r} fill="none" stroke="#1C2B3F" strokeWidth={Math.max(2, size*0.054)} strokeDasharray={`${c * 0.75} ${c}`} strokeLinecap="round" />
        <circle cx={svgSize/2} cy={svgSize/2} r={r} fill="none" stroke={stroke} strokeWidth={Math.max(2, size*0.054)} strokeDasharray={dash} strokeLinecap="round" style={{ filter: `drop-shadow(0 0 3px ${stroke}99)`, transition: 'all 0.5s' }} />
      </svg>
      {/* <div className="absolute inset-0 flex items-center justify-center" style={{ paddingTop: Math.round(size*0.05) }}>
        <span className="font-mono font-bold text-white leading-none" style={{ fontSize: fontSizeValue }}>{value}<span className="text-gray-400 block leading-none" style={{ fontSize: fontSizeUnit }}>{unit}</span></span>
      </div> */}
    </div>
  )
}
