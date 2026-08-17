import { ReactNode } from "react";

interface NeedleDialProps {
  /** Valor actual en grados (puede ser negativo o positivo) */
  value: number;
  /** Rango máximo absoluto que representa el dial (ej: 30 para escala -30°..+30°) */
  range?: number;
  /** Color de la aguja/horizonte y acentos */
  color?: string;
  /** Tamaño en px (cuadrado) */
  size?: number;
  /** Ícono que rota junto con la línea de horizonte (vista frontal para roll, vista lateral para pitch) */
  centerIcon?: ReactNode;
  /** Tamaño del ícono central embebido, en unidades del viewBox (0-100) */
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

  // Clamp y conversión a ángulo de rotación visual (efecto "horizonte artificial")
  const clamped = Math.max(-range, Math.min(range, value));
  const maxSwing = 40; // grados de rotación visual en el extremo del rango
  const rotation = (clamped / range) * maxSwing;

  // Ticks menores alrededor del círculo (puntitos tipo brújula), fijos
  const minorTicks = Array.from({ length: 24 }, (_, i) => (360 / 24) * i);

  const toRad = (deg: number) => (deg * Math.PI) / 180;

  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      style={{ width: size, height: size, overflow: "visible" }}
    >
      {/* Fondo circular sutil */}
      <circle cx={cx} cy={cy} r={r + 4} fill="rgba(255,255,255,0.02)" />
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="1"
      />

      {/* Ticks menores (puntos) fijos alrededor del aro */}
      {minorTicks.map((deg, i) => {
        const rad = toRad(deg - 90);
        const x = cx + (r + 2) * Math.cos(rad);
        const y = cy + (r + 2) * Math.sin(rad);
        return (
          <circle key={i} cx={x} cy={y} r="0.7" fill="rgba(0,229,255,0.45)" />
        );
      })}

      {/* Crosshair fijo: vertical punteada + horizontal tenue de referencia (0°) */}
      <line
        x1={cx}
        y1={cy - r}
        x2={cx}
        y2={cy + r}
        stroke="rgba(0,229,255,0.35)"
        strokeWidth="1"
        strokeDasharray="2 3"
      />
      <line
        x1={cx - r}
        y1={cy}
        x2={cx + r}
        y2={cy}
        stroke="rgba(255,255,255,0.15)"
        strokeWidth="0.75"
      />

      {/* Labels fijos: 0° a los costados (reposo de la aguja), ±range arriba/abajo */}
      <text
        x={cx}
        y={cy - r - 6}
        textAnchor="middle"
        fontSize="7"
        fill="rgba(255,255,255,0.6)"
        fontWeight="700"
      >
        +{range}°
      </text>
      <text
        x={cx}
        y={cy + r + 10}
        textAnchor="middle"
        fontSize="7"
        fill="rgba(255,255,255,0.6)"
        fontWeight="700"
      >
        -{range}°
      </text>
      <text
        x={cx - r - 4}
        y={cy + 2.5}
        textAnchor="end"
        fontSize="7"
        fill="rgba(255,255,255,0.6)"
        fontWeight="700"
      >
        0°
      </text>
      <text
        x={cx + r + 4}
        y={cy + 2.5}
        textAnchor="start"
        fontSize="7"
        fill="rgba(255,255,255,0.6)"
        fontWeight="700"
      >
        0°
      </text>

      {/* ===== GRUPO ROTATIVO: ícono + línea de horizonte giran juntos según el valor ===== */}
      <g transform={`rotate(${-rotation} ${cx} ${cy})`}>
        {/* Halo suave detrás de la línea */}
        <line
          x1={cx - r + 3}
          y1={cy}
          x2={cx + r - 3}
          y2={cy}
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.25"
        />
        {/* Línea de horizonte */}
        <line
          x1={cx - r + 3}
          y1={cy}
          x2={cx + r - 3}
          y2={cy}
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
        />

        {centerIcon ? (
          <foreignObject
            x={cx - iconSize / 2}
            y={cy - iconSize / 2}
            width={iconSize}
            height={iconSize}
          >
            <div
              // @ts-expect-error xmlns requerido dentro de foreignObject
              xmlns="http://www.w3.org/1999/xhtml"
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
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
