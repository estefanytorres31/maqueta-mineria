import { Monitor, Database, Cpu, MapPin, Radio, Settings } from 'lucide-react'
import { useNavigationStore } from '../stores/navigationStore'

export default function StatusBar() {
  const { systemStatus, setPage, currentPage } = useNavigationStore()

  if (currentPage !== 'selector') {
    return null
  }

  const statusColor = (status: string) => {
    switch (status) {
      case 'OK': return 'text-status-ok'
      case 'WARNING': return 'text-status-warning'
      case 'ERROR': return 'text-status-danger'
      default: return 'text-status-offline'
    }
  }

  const items = [
    { icon: Database, label: 'ALMACENAMIENTO', value: systemStatus.storage },
    { icon: Cpu, label: 'SENSORES', value: systemStatus.sensors },
    { icon: MapPin, label: 'GPS', value: systemStatus.gps },
    { icon: Radio, label: 'COMUNICACIONES', value: systemStatus.communications }
  ]

  return (
    <footer className="flex-shrink-0 bg-industrial-900 border-t border-industrial-750 px-4 py-2.5 flex items-center gap-4 md:gap-8 text-xs flex-wrap">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded bg-industrial-800 border border-industrial-600 flex items-center justify-center relative">
          <Monitor size={16} className="text-electric-400" />
          <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-status-ok rounded-full border border-industrial-900" />
        </div>
        <div>
          <div className="text-white font-semibold">EDGE SMART</div>
          <div className="text-gray-400">v{systemStatus.version}</div>
        </div>
      </div>

      <div className="flex items-center gap-4 md:gap-8 flex-wrap">
        {items.map(item => {
          const Icon = item.icon
          return (
            <div key={item.label} className="flex items-center gap-2">
              <Icon size={16} className={statusColor(item.value)} />
              <div>
                <div className="text-gray-400">{item.label}</div>
                <div className={`font-semibold ${statusColor(item.value)}`}>{item.value}</div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="ml-auto" />

      <button 
        type="button"
        onClick={() => setPage('settings')}
        className="flex items-center gap-2 text-gray-300 hover:text-electric-400 transition-colors"
      >
        <Settings size={16} />
        <span className="font-medium">CONFIGURACIÓN</span>
      </button>
    </footer>
  )
}
