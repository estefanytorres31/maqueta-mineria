interface MiniGaugeProps {
  value: number
  max: number
  unit: string
  warningThreshold?: number
  dangerThreshold?: number
  color?: string
}

export default function MiniGauge({
  value,
  max,
  unit,
  warningThreshold,
  dangerThreshold,
  color = '#14B8FF'
}: MiniGaugeProps) {
  const ratio = Math.min(1, value / max)
  let stroke = color
  if (dangerThreshold && value >= dangerThreshold) stroke = '#EF4444'
  else if (warningThreshold && value >= warningThreshold) stroke = '#F59E0B'
  const r = 18
  const c = 2 * Math.PI * r
  const dash = `${(ratio) * (c * 0.75)} ${c}`
  return (
    <div className="relative w-14 h-14 flex items-center justify-center flex-shrink-0">
      <svg viewBox="0 0 48 48" className="w-full h-full -rotate-[135deg]">
        <circle cx="24" cy="24" r={r} fill="none" stroke="#1C2B3F" strokeWidth="3" strokeDasharray={`${c * 0.75} ${c}`} strokeLinecap="round" />
        <circle cx="24" cy="24" r={r} fill="none" stroke={stroke} strokeWidth="3" strokeDasharray={dash} strokeLinecap="round" style={{ filter: `drop-shadow(0 0 3px ${stroke}99)`, transition: 'all 0.5s' }} />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center pt-1.5">
        <span className="font-mono font-bold text-[13px] text-white leading-none">{value}<span className="text-[7px] text-gray-400 block leading-none">{unit}</span></span>
      </div>
    </div>
  )
}
