interface TachoGaugeProps {
  value: number
  maxRpm?: number
  warningRpm?: number
  dangerRpm?: number
  size?: number
  className?: string
}

export default function TachoGauge({
  value,
  maxRpm = 4000,
  warningRpm = 3200,
  dangerRpm = 3600,
  size = 170,
  className = ''
}: TachoGaugeProps) {
  const startDeg = -120
  const endDeg = 120
  const sweepDeg = endDeg - startDeg
  const ratio = Math.max(0, Math.min(1, value / maxRpm))
  const needleDeg = startDeg + (ratio * sweepDeg)

  let needleColor = '#3ABFFB'
  if (value >= dangerRpm) needleColor = '#EF4444'
  else if (value >= warningRpm) needleColor = '#F59E0B'

  const W = size
  const H = size * 0.95
  const cx = W / 2
  const cy = H * 0.56
  const rOuter = Math.min(W, H) * 0.45
  const rTickInnerSmall = rOuter - 0.08 * size
  const rTickInnerBig   = rOuter - 0.14 * size
  const rTickOuter = rOuter - 0.005 * size
  const rLabel = rOuter - 0.24 * size
  const rNeedle = rOuter - 0.13 * size

  const p2r = (deg: number, rad: number) => {
    const r = (deg - 90) * Math.PI / 180
    return { x: cx + rad * Math.cos(r), y: cy + rad * Math.sin(r) }
  }
  const arcPath = (fromDeg: number, toDeg: number, rad: number) => {
    const a = p2r(fromDeg, rad)
    const b = p2r(toDeg, rad)
    const large = Math.abs(toDeg - fromDeg) > 180 ? 1 : 0
    return `M ${a.x} ${a.y} A ${rad} ${rad} 0 ${large} 1 ${b.x} ${b.y}`
  }

  const labels = [
    { val: 0, deg: startDeg },
    { val: 1, deg: startDeg + sweepDeg / 4 },
    { val: 2, deg: startDeg + (sweepDeg / 4) * 2 },
    { val: 3, deg: startDeg + (sweepDeg / 4) * 3 },
    { val: 4, deg: endDeg }
  ]
  const warnPct  = warningRpm / maxRpm
  const dangerPct = dangerRpm / maxRpm

  return (
    <div className={`relative flex-shrink ${className}`} style={{ width: W, height: H }}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        <path d={arcPath(startDeg, endDeg, rOuter)}
          stroke="#111E2D" strokeWidth={size * 0.07} fill="none" strokeLinecap="round" />

        <path
          d={arcPath(startDeg, startDeg + sweepDeg * warnPct, rOuter)}
          stroke="#14B8FF" strokeWidth={size * 0.05} fill="none" strokeLinecap="butt"
          
        />
        <path
          d={arcPath(startDeg + sweepDeg * warnPct, startDeg + sweepDeg * dangerPct, rOuter)}
          stroke="#F59E0B" strokeWidth={size * 0.05} fill="none" strokeLinecap="butt"
        />
        <path
          d={arcPath(startDeg + sweepDeg * dangerPct, endDeg, rOuter)}
          stroke="#EF4444" strokeWidth={size * 0.05} fill="none" strokeLinecap="round"
        />

        {Array.from({ length: 21 }).map((_, i) => {
          const deg = startDeg + (sweepDeg * i) / 20
          const pA = p2r(deg, rTickOuter)
          const bigStep = i % 5 === 0
          const pB = p2r(deg, bigStep ? rTickInnerBig : rTickInnerSmall)
          return (
            <line key={i} x1={pA.x} y1={pA.y} x2={pB.x} y2={pB.y}
              stroke={bigStep ? '#BDCBE0' : '#32475F'}
              strokeWidth={bigStep ? size * 0.024 : size * 0.012}
              strokeLinecap="round"
              opacity={bigStep ? 1 : 0.85}
            />
          )
        })}

        {labels.map(l => {
          const p = p2r(l.deg, rLabel)
          return (
            <text key={l.val} x={p.x} y={p.y} textAnchor="middle" dominantBaseline="central"
              className="font-mono font-black fill-gray-50"
              style={{ fontSize: size * 0.1, paintOrder: 'stroke', stroke: '#06080C', strokeWidth: size * 0.008 }}
            >
              {l.val}
            </text>
          )
        })}

        <text x={cx} y={cy + rOuter * 0.95} textAnchor="middle"
          className="fill-gray-300 font-mono font-bold uppercase tracking-[0.2em]"
          style={{ fontSize: size * 0.1 }}
        >
          ×1000
        </text>

        <g transform={`rotate(${needleDeg} ${cx} ${cy})`}
            style={{ transition: 'transform 0.35s cubic-bezier(.2,.85,.2,1.1)' }}>
          <polygon
            points={`${cx},${cy - rNeedle * 1.01}  ${cx - size * 0.035},${cy + size * 0.04}  ${cx + size * 0.035},${cy + size * 0.04}`}
            fill="#000000" opacity="0.35"
          />
          <polygon
            points={`${cx},${cy - rNeedle}  ${cx - size * 0.02},${cy + size * 0.03}  ${cx + size * 0.02},${cy + size * 0.03}`}
            fill={needleColor} stroke="#06080C" strokeWidth={size * 0.002} strokeLinejoin="round"
          />
          <polygon
            points={`${cx},${cy - rNeedle * 0.96}  ${cx - size * 0.002},${cy + size * 0.01}  ${cx + size * 0.002},${cy + size * 0.01}`}
            fill="#FFFFFF" opacity="0.85"
          />
        </g>

        <circle cx={cx} cy={cy} r={size * 0.095} fill="#06080C" stroke="#192839" strokeWidth={size * 0.015} />
        <circle cx={cx} cy={cy} r={size * 0.055} fill="#0B1620" />
        <circle cx={cx} cy={cy} r={size * 0.028} fill={needleColor} />
      </svg>
    </div>
  )
}
