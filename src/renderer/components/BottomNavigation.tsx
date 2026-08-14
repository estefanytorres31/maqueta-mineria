import { 
  Home, 
  Fuel, 
  Activity, 
  BarChart3, 
  MapPin, 
  Bell
} from 'lucide-react'
import { useNavigationStore } from '../stores/navigationStore'
import { useTelemetryStore } from '../stores/telemetryStore'
import { Page } from '../types'

interface BottomNavigationProps {
  className?: string
}

export default function BottomNavigation({ className = '' }: BottomNavigationProps) {
  const { currentPage, setPage } = useNavigationStore()
  const alertsCount = useTelemetryStore(s => s.getUnresolvedAlertsCount())

  const navItems: { id: Page; icon: React.ElementType; label: string; badge?: number }[] = [
    { id: 'home', icon: Home, label: 'INICIO' },
    { id: 'fuel', icon: Fuel, label: 'COMBUSTIBLE' },
    { id: 'gps', icon: MapPin, label: 'GPS' },
    { id: 'alerts', icon: Bell, label: 'ALERTAS', badge: alertsCount }
  ]

  return (
    <nav 
      className={`${className} flex-shrink-0 bg-industrial-850 border-t border-industrial-700`}
      role="navigation"
      aria-label="Navegación principal"
    >
      <div className="grid grid-cols-4 w-full">
        {navItems.map((item, idx) => {
          const Icon = item.icon
          const isActive = currentPage === item.id
          return (
            <div key={item.id} className="relative flex">
              {idx > 0 && (
                <div className="absolute left-0 top-3 bottom-3 w-px bg-industrial-700/60" aria-hidden />
              )}
              <button
                type="button"
                onClick={() => setPage(item.id)}
                className={`group relative flex flex-row items-center justify-center gap-1.5 w-full min-h-[42px] md:min-h-[44px] lg:min-h-[44px] xl:min-h-[52px] 2xl:min-h-[56px] px-1 md:px-2 py-0.5 md:py-1 transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-electric-500/50 ${
                  isActive
                    ? 'text-electric-400'
                    : 'text-gray-400 hover:text-white hover:bg-industrial-800/70'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {isActive && (
                  <div className="absolute inset-0 pointer-events-none border-l border-r border-t border-electric-500/30 bg-electric-600/[0.08]" aria-hidden />
                )}
                <div className="relative flex items-center justify-center transition-transform">
                  <Icon size={20} strokeWidth={isActive ? 2.15 : 1.9} />
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="absolute -top-1.5 -left-3 bg-status-danger text-white text-[10px] font-bold rounded-full min-w-[20px] h-[20px] px-1 flex items-center justify-center border-2 border-industrial-850 shadow-[0_0_8px_rgba(239,68,68,0.55)]">
                      {item.badge > 99 ? '99+' : item.badge}
                    </span>
                  )}
                </div>
                <span className={`text-[11px] sm:text-xs md:text-xs font-bold tracking-wide uppercase leading-none truncate max-w-[7.5rem] ${
                  isActive ? 'text-electric-300' : 'text-gray-300 group-hover:text-white'
                }`}>
                  {item.label}
                </span>
                {isActive && (
                  <div className="absolute bottom-0 left-3 right-3 h-0.5 bg-electric-400 shadow-[0_0_6px_rgba(20,184,255,0.8)]" aria-hidden />
                )}
              </button>
            </div>
          )
        })}
      </div>
    </nav>
  )
}
