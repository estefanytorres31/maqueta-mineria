interface SvgExcavatorFrontIconProps {
  className?: string
}

/**
 * Vista FRONTAL (de frente) simétrica de una excavadora/cargador,
 * pensada para el gauge de ROLL (inclinación lateral izquierda/derecha).
 * Silueta simple, monocromática vía currentColor.
 */
export default function SvgExcavatorFrontIcon({ className = '' }: SvgExcavatorFrontIconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none">
      {/* Cabina */}
      <rect x="20" y="12" width="24" height="16" rx="2" fill="currentColor" opacity="0.9" />
      {/* Ventana */}
      <rect x="24" y="15" width="16" height="8" rx="1" fill="black" opacity="0.35" />
      {/* Cuerpo / chasis */}
      <rect x="14" y="28" width="36" height="12" rx="2" fill="currentColor" />
      {/* Eje / tren de rodaje */}
      <rect x="10" y="40" width="44" height="6" rx="2" fill="currentColor" opacity="0.85" />
      {/* Ruedas / orugas simétricas */}
      <circle cx="18" cy="50" r="6" fill="currentColor" />
      <circle cx="46" cy="50" r="6" fill="currentColor" />
      <circle cx="18" cy="50" r="2.2" fill="black" opacity="0.4" />
      <circle cx="46" cy="50" r="2.2" fill="black" opacity="0.4" />
      {/* Antena / referencia central para notar la inclinación */}
      <line x1="32" y1="12" x2="32" y2="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="32" cy="3" r="1.6" fill="currentColor" />
    </svg>
  )
}