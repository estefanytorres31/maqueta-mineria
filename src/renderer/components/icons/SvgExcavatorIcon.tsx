interface SvgExcavatorIconProps {
  className?: string
}

export default function SvgExcavatorIcon({ className = '' }: SvgExcavatorIconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 40 L54 40" />
      <circle cx="16" cy="48" r="5.5" />
      <circle cx="48" cy="48" r="5.5" />
      <path d="M11 48 L53 48" />
      <path d="M20 40 L22 24 L42 22 L44 40 Z" />
      <path d="M34 24 L52 8 L58 10 L50 30" />
      <path d="M52 8 L46 12" />
      <path d="M58 10 L60 16 L56 18" />
    </svg>
  )
}
