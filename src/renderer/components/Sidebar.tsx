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

interface SidebarProps {
  className?: string
}

export default function Sidebar({ className = '' }: SidebarProps) {
  const { currentPage, setPage } = useNavigationStore()
  const alertsCount = useTelemetryStore(s => s.getUnresolvedAlertsCount())

  const navItems: { id: Page; icon: React.ElementType; label: string; badge?: number }[] = [
    { id: 'home', icon: Home, label: 'INICIO' },
    { id: 'fuel', icon: Fuel, label: 'COMBUSTIBLE' },
    { id: 'operation', icon: Activity, label: 'OPERACIÓN' },
    { id: 'productivity', icon: BarChart3, label: 'PRODUCTIVIDAD' },
    { id: 'gps', icon: MapPin, label: 'GPS / MOVIMIENTO' },
    { id: 'alerts', icon: Bell, label: 'ALERTAS', badge: alertsCount },
    { id: 'settings', icon: Settings, label: 'CONFIGURACIÓN' }
  ]

  return (
    <aside className={`${className} w-52 xl:w-60 flex-col bg-industrial-850 border-r border-industrial-700 py-3 px-2 gap-1 flex-shrink-0`}>
      {navItems.map(item => {
        const Icon = item.icon
        const isActive = currentPage === item.id
        return (
          <button
            key={item.id}
            onClick={() => setPage(item.id)}
            className={`nav-item w-full text-left ${isActive ? 'nav-item-active' : ''}`}
          >
            <Icon size={20} className="flex-shrink-0" />
            <span className="text-sm font-medium">{item.label}</span>
            {item.badge !== undefined && item.badge > 0 && (
              <span className="ml-auto bg-status-danger text-white text-xs font-bold rounded-full px-2 py-0.5 min-w-[22px] text-center">
                {item.badge}
              </span>
            )}
          </button>
        )
      })}
    </aside>
  )
}
