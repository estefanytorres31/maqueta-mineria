import { 
  Home, 
  Fuel, 
  Activity, 
  BarChart3, 
  Cog, 
  MapPin, 
  Bell, 
  Settings,
  Wifi,
  Cloud,
  Calendar,
  Clock,
  CircleDot
} from 'lucide-react'
import { useNavigationStore } from '../stores/navigationStore'
import { useTelemetryStore } from '../stores/telemetryStore'
import { useDateTime } from '../hooks/useDateTime'

export default function Header() {
  const { selectedMachine, setPage, currentPage } = useNavigationStore()
  const { telemetry } = useTelemetryStore()
  const { date, time } = useDateTime()
  const alertsCount = useTelemetryStore(s => s.getUnresolvedAlertsCount())

  if (!selectedMachine) return null

  const navItems = [
    { id: 'home' as const, icon: Home, label: 'INICIO' },
    { id: 'fuel' as const, icon: Fuel, label: 'COMBUSTIBLE' },
    { id: 'operation' as const, icon: Activity, label: 'OPERACIÓN' },
    { id: 'productivity' as const, icon: BarChart3, label: 'PRODUCTIVIDAD' },
    { id: 'gps' as const, icon: MapPin, label: 'GPS / MOV' },
    { id: 'alerts' as const, icon: Bell, label: 'ALERTAS', badge: alertsCount },
    { id: 'settings' as const, icon: Settings, label: 'CONFIG' }
  ]

  return (
    <header className="bg-industrial-850 border-b border-industrial-700 px-4 py-2 flex items-center gap-4 flex-shrink-0">
      <div 
        className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
        onClick={() => setPage('selector')}
      >
        <div className="text-electric-400 font-black text-xl tracking-tight">
          EDGE<span className="text-white">SMART</span>
        </div>
      </div>

      <div className="h-8 w-px bg-industrial-700 mx-2" />

      <div className="flex items-center gap-3">
        <div>
          <div className="text-yellow-400 font-bold text-lg leading-tight">{selectedMachine.model}</div>
          <div className="text-gray-400 text-xs">{selectedMachine.category}</div>
        </div>
        <div className="px-2 py-1 rounded bg-industrial-750 border border-industrial-600 text-electric-400 font-mono text-sm font-semibold">
          {selectedMachine.code}
        </div>
      </div>

      <div className="flex-1" />

      <div className="hidden md:flex items-center gap-4 text-sm">
        <div className="flex items-center gap-1.5 text-status-ok">
          <MapPin size={16} />
          <span className="text-gray-300 text-xs">GPS</span>
        </div>
        <div className="flex items-center gap-1.5 text-electric-400">
          <Wifi size={16} />
          <span className="text-gray-300 text-xs">4G</span>
        </div>
        <div className="flex items-center gap-1.5 text-electric-400">
          <Cloud size={16} />
          <span className="text-gray-300 text-xs">CLOUD</span>
        </div>
      </div>

      <div className="h-6 w-px bg-industrial-700 mx-1 hidden md:block" />

      <div className="hidden md:flex items-center gap-3 text-sm text-gray-300 font-mono">
        <div className="flex items-center gap-1.5">
          <Calendar size={14} className="text-electric-400" />
          <span>{date}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock size={14} className="text-electric-400" />
          <span>{time}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-industrial-800 border border-status-ok/30">
        <CircleDot size={10} className="text-status-ok animate-pulse" fill="currentColor" />
        <span className={`text-sm font-semibold ${telemetry.online ? 'text-status-ok' : 'text-status-offline'}`}>
          {telemetry.online ? 'ONLINE' : 'OFFLINE'}
        </span>
      </div>
    </header>
  )
}
