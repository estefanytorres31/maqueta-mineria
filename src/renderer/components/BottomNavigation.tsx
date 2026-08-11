import { 
  Home, 
  Fuel, 
  Activity, 
  BarChart3, 
  Cog, 
  MapPin, 
  Bell, 
  Settings 
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
    { id: 'home', icon: Home, label: 'Inicio' },
    { id: 'fuel', icon: Fuel, label: 'Combust.' },
    { id: 'operation', icon: Activity, label: 'Oper.' },
    { id: 'productivity', icon: BarChart3, label: 'Prod.' },
    { id: 'gps', icon: MapPin, label: 'GPS' },
    { id: 'alerts', icon: Bell, label: 'Alertas', badge: alertsCount },
    { id: 'settings', icon: Settings, label: 'Conf.' }
  ]

  return (
    <nav className={`${className} flex-shrink-0 bg-industrial-850 border-t border-industrial-700 px-1 py-1.5 flex justify-around items-center gap-0.5`}>
      {navItems.map(item => {
        const Icon = item.icon
        const isActive = currentPage === item.id
        return (
          <button
            key={item.id}
            onClick={() => setPage(item.id)}
            className={`relative flex flex-col items-center justify-center px-2 py-1.5 rounded-lg min-w-[44px] min-h-[52px] transition-all ${
              isActive 
                ? 'bg-electric-600/20 text-electric-400' 
                : 'text-gray-400 hover:text-white hover:bg-industrial-750'
            }`}
          >
            <Icon size={20} />
            <span className="text-[10px] font-medium mt-0.5">{item.label}</span>
            {item.badge !== undefined && item.badge > 0 && (
              <span className="absolute top-0 right-0 bg-status-danger text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {item.badge}
              </span>
            )}
          </button>
        )
      })}
    </nav>
  )
}
