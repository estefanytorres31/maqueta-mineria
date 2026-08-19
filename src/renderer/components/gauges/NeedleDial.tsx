import { ReactNode } from "react";

interface NeedleDialProps {
  value: number;
  range?: number;
  color?: string;
  size?: number;
  centerIcon?: ReactNode;
  iconSize?: number;
  className?: string;
}

export default function NeedleDial({
  value,
  range = 30,
  color = "#8B5CF6",
  size = 96,
  centerIcon,
  iconSize = 34,
  className = "",
}: NeedleDialProps) {
  const cx = 50;
  const cy = 50;
  const r = 40;

  const clamped = Math.max(-range, Math.min(range, value));
  const maxSwing = 60;
  const rotation = (clamped / range) * maxSwing;

  const minorTicks = Array.from({ length: 24 }, (_, i) => (360 / 24) * i);
  const toRad = (deg: number) => (deg * Math.PI) / 180;

  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      style={{ width: size, height: size, overflow: "visible" }}
    >
      <circle cx={cx} cy={cy} r={r + 4} fill="rgba(255,255,255,0.02)" />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />

      {minorTicks.map((deg, i) => {
        const rad = toRad(deg - 90);
        const x = cx + (r + 2) * Math.cos(rad);
        const y = cy + (r + 2) * Math.sin(rad);
        return <circle key={i} cx={x} cy={y} r="0.7" fill="rgba(0,229,255,0.45)" />;
      })}

      <line x1={cx} y1={cy - r} x2={cx} y2={cy + r} stroke="rgba(0,229,255,0.35)" strokeWidth="1" strokeDasharray="2 3" />
      {/* Referencia fija en 0°, ahora punteada para no confundirse con la aguja */}
      <line x1={cx - r} y1={cy} x2={cx + r} y2={cy} stroke="rgba(255,255,255,0.2)" strokeWidth="0.6" strokeDasharray="1.5 2" />

      <text x={cx} y={cy - r - 6} textAnchor="middle" fontSize="7" fill="rgba(255,255,255,0.6)" fontWeight="700">+{range}°</text>
      <text x={cx} y={cy + r + 10} textAnchor="middle" fontSize="7" fill="rgba(255,255,255,0.6)" fontWeight="700">-{range}°</text>
      <text x={cx - r - 4} y={cy + 2.5} textAnchor="end" fontSize="7" fill="rgba(255,255,255,0.6)" fontWeight="700">0°</text>
      <text x={cx + r + 4} y={cy + 2.5} textAnchor="start" fontSize="7" fill="rgba(255,255,255,0.6)" fontWeight="700">0°</text>

      <g
        transform={`rotate(${-rotation} ${cx} ${cy})`}
        style={{ transition: 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)' }}
      >
        <line x1={cx - r + 3} y1={cy} x2={cx + r - 3} y2={cy} stroke={color} strokeWidth="3" strokeLinecap="round" opacity="0.25" />
        <line x1={cx - r + 3} y1={cy} x2={cx + r - 3} y2={cy} stroke={color} strokeWidth="1" strokeLinecap="round" />

        {/* Puntas de aguja: hacen el movimiento notorio incluso en ángulos chicos */}
        <circle cx={cx - r + 3} cy={cy} r="2.5" fill={color} />
        <circle cx={cx + r - 3} cy={cy} r="2.5" fill={color} />

        {centerIcon ? (
          <foreignObject x={cx - iconSize / 2} y={cy - iconSize / 2} width={iconSize} height={iconSize}>
            <div
              // @ts-expect-error xmlns requerido dentro de foreignObject
              xmlns="http://www.w3.org/1999/xhtml"
              style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              {centerIcon}
            </div>
          </foreignObject>
        ) : (
          <circle cx={cx} cy={cy} r="2.5" fill={color} />
        )}
      </g>
    </svg>
  );
}