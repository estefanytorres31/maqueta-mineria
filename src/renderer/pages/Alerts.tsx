import { useState } from 'react'
import { 
  Bell, 
  AlertTriangle, 
  AlertOctagon, 
  Info, 
  Check,
  Clock,
  Filter,
  Search,
  ChevronDown
} from 'lucide-react'
import { useTelemetryStore } from '../stores/telemetryStore'
import { useSettingsStore } from '../stores/settingsStore'
import Panel from '../components/Panel'
import AlertBadge from '../components/AlertBadge'
import { AlertType, AlertStatus } from '../types'

type FilterType = 'ALL' | AlertType

const filterConfig: Record<FilterType, { label: string; icon: React.ElementType }> = {
  ALL: { label: 'TODAS', icon: Filter },
  CRÍTICA: { label: 'CRÍTICAS', icon: AlertOctagon },
  ADVERTENCIA: { label: 'ADVERTENCIAS', icon: AlertTriangle },
  INFORMACIÓN: { label: 'INFORMACIÓN', icon: Info }
}

const typeConfig: Record<AlertType, { icon: React.ElementType; bgColor: string; borderColor: string }> = {
  CRÍTICA: { icon: AlertOctagon, bgColor: 'bg-status-danger/10', borderColor: 'border-status-danger/30' },
  ADVERTENCIA: { icon: AlertTriangle, bgColor: 'bg-status-warning/10', borderColor: 'border-status-warning/30' },
  INFORMACIÓN: { icon: Info, bgColor: 'bg-electric-500/10', borderColor: 'border-electric-500/30' }
}

const statusColors: Record<AlertStatus, string> = {
  PENDIENTE: 'bg-status-warning/20 text-status-warning border-status-warning/40',
  ACKNOWLEDGED: 'bg-electric-500/20 text-electric-400 border-electric-500/40',
  RESUELTA: 'bg-status-ok/20 text-status-ok border-status-ok/40'
}

export default function Alerts() {
  const { alerts, acknowledgeAlert, updateAlert } = useTelemetryStore()
  const { display, updateDisplay } = useSettingsStore()
  const [filter, setFilter] = useState<FilterType>(display.alertsFilter as FilterType)
  const [search, setSearch] = useState('')

  const counts = {
    ALL: alerts.length,
    CRÍTICA: alerts.filter(a => a.type === 'CRÍTICA').length,
    ADVERTENCIA: alerts.filter(a => a.type === 'ADVERTENCIA').length,
    INFORMACIÓN: alerts.filter(a => a.type === 'INFORMACIÓN').length
  }

  const filteredAlerts = alerts
    .filter(a => filter === 'ALL' || a.type === filter)
    .filter(a => 
      search === '' || 
      a.description.toLowerCase().includes(search.toLowerCase()) ||
      a.sensor.toLowerCase().includes(search.toLowerCase())
    )

  const pending = alerts.filter(a => a.status === 'PENDIENTE').length
  const critical = alerts.filter(a => a.type === 'CRÍTICA' && a.status === 'PENDIENTE').length

  const formatDate = (d: Date) => {
    const date = new Date(d)
    return `${String(date.getDate()).padStart(2,'0')}/${String(date.getMonth()+1).padStart(2,'0')}/${date.getFullYear()}`
  }
  const formatTime = (d: Date) => {
    const date = new Date(d)
    return `${String(date.getHours()).padStart(2,'0')}:${String(date.getMinutes()).padStart(2,'0')}`
  }

  const handleFilterChange = (f: FilterType) => {
    setFilter(f)
    updateDisplay({ alertsFilter: f })
  }

  return (
    <div className="w-full h-full flex flex-col gap-3 lg:gap-4">
      <div className="flex items-center gap-2 mb-0.5">
        <Bell size={22} className="text-status-warning" />
        <h2 className="text-xl md:text-2xl font-bold text-white">ALERTAS</h2>
        {pending > 0 && (
          <span className="px-2.5 py-0.5 rounded-full bg-status-danger text-white text-xs font-bold animate-pulse">
            {pending} PENDIENTES
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
        {(['ALL', 'CRÍTICA', 'ADVERTENCIA', 'INFORMACIÓN'] as FilterType[]).map(f => {
          const Icon = filterConfig[f].icon
          const isActive = filter === f
          const isCritical = f === 'CRÍTICA' && counts[f] > 0
          return (
            <button
              key={f}
              onClick={() => handleFilterChange(f)}
              className={`px-3 md:px-4 py-2.5 md:py-3 rounded-xl border flex items-center justify-between transition-all ${
                isActive
                  ? 'bg-electric-500/20 border-electric-500/50 shadow-glow-blue'
                  : 'bg-industrial-800 border-industrial-700 hover:border-industrial-600'
              } ${isCritical ? 'animate-pulse' : ''}`}
            >
              <div className="flex items-center gap-2">
                <Icon size={18} className={
                  f === 'CRÍTICA' ? 'text-status-danger' :
                  f === 'ADVERTENCIA' ? 'text-status-warning' :
                  f === 'INFORMACIÓN' ? 'text-electric-400' : 'text-gray-400'
                } />
                <span className={`text-xs md:text-sm font-bold uppercase tracking-wide ${
                  isActive ? 'text-white' : 'text-gray-300'
                }`}>
                  {filterConfig[f].label}
                </span>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-xs font-black ${
                isCritical ? 'bg-status-danger text-white' :
                f === 'ADVERTENCIA' ? 'bg-status-warning/20 text-status-warning' :
                f === 'INFORMACIÓN' ? 'bg-electric-500/20 text-electric-400' :
                'bg-industrial-700 text-gray-300'
              }`}>
                {counts[f]}
              </span>
            </button>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-4 flex-1 min-h-0">
        <div className="lg:col-span-3 flex flex-col gap-3 lg:gap-4">
          <Panel title="RESUMEN">
            <div className="space-y-3">
              <div className={`rounded-xl p-4 border ${critical > 0 ? 'bg-status-danger/10 border-status-danger/30' : 'bg-industrial-850 border-industrial-700'}`}>
                <div className="flex items-center gap-3">
                  <AlertOctagon size={28} className={critical > 0 ? 'text-status-danger animate-pulse' : 'text-gray-500'} />
                  <div className="flex-1">
                    <div className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">CRÍTICAS PENDIENTES</div>
                    <div className={`text-3xl font-black font-mono ${critical > 0 ? 'text-status-danger' : 'text-white'}`}>
                      {critical}
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-industrial-850 rounded-lg border border-industrial-700 p-3 text-center">
                  <div className="text-[9px] text-gray-500 uppercase font-semibold mb-0.5">ÚLT. HORA</div>
                  <div className="text-xl font-black font-mono text-status-danger">2</div>
                </div>
                <div className="bg-industrial-850 rounded-lg border border-industrial-700 p-3 text-center">
                  <div className="text-[9px] text-gray-500 uppercase font-semibold mb-0.5">HOY</div>
                  <div className="text-xl font-black font-mono text-status-warning">{alerts.length}</div>
                </div>
                <div className="bg-industrial-850 rounded-lg border border-industrial-700 p-3 text-center">
                  <div className="text-[9px] text-gray-500 uppercase font-semibold mb-0.5">RESUELTAS</div>
                  <div className="text-xl font-black font-mono text-status-ok">
                    {alerts.filter(a => a.status === 'RESUELTA').length}
                  </div>
                </div>
              </div>
            </div>
          </Panel>

          <Panel title="BÚSQUEDA">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                value={search}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                placeholder="Buscar alerta, sensor..."
                className="w-full pl-10 pr-4 py-2.5 bg-industrial-850 border border-industrial-700 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-electric-500 transition-colors"
              />
            </div>
          </Panel>

          <Panel title="TOP SENSORES" className="flex-1">
            <div className="space-y-2">
              {['Temp. Aceite Hidráulico', 'Filtro Combustible', 'Mantenimiento', 'Presión Brazo', 'RPM Motor'].map((s, i) => (
                <div key={s} className="flex items-center justify-between bg-industrial-850 rounded-lg p-2.5 border border-industrial-700 hover:bg-industrial-800 transition-colors cursor-pointer">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className={`w-2 h-2 rounded-full flex-shrink-0 ${i === 0 ? 'bg-status-warning shadow-glow-orange' : i === 2 ? 'bg-electric-400' : 'bg-gray-500'}`} />
                    <span className="text-xs text-gray-300 truncate font-medium">{s}</span>
                  </div>
                  <span className="text-xs font-bold text-gray-400 font-mono flex-shrink-0 ml-2">{i + 1}</span>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        <Panel 
          title={`LISTADO DE ALERTAS (${filteredAlerts.length})`} 
          icon={Bell} 
          className="lg:col-span-9 flex flex-col min-h-0"
          bodyClassName="flex-1 flex flex-col min-h-0 p-0"
        >
          <div className="hidden md:grid grid-cols-12 gap-2 px-4 py-2.5 border-b border-industrial-700 bg-industrial-850/50 text-[10px] uppercase tracking-wider font-bold text-gray-400">
            <div className="col-span-1 text-center">TIPO</div>
            <div className="col-span-2">FECHA / HORA</div>
            <div className="col-span-2">SENSOR</div>
            <div className="col-span-4">DESCRIPCIÓN</div>
            <div className="col-span-1 text-center">VALOR</div>
            <div className="col-span-1 text-center">ESTADO</div>
            <div className="col-span-1 text-right">ACCIONES</div>
          </div>

          <div className="flex-1 overflow-auto px-2 py-2">
            {filteredAlerts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-500 py-10">
                <Check size={48} className="mb-3 text-status-ok/60" />
                <div className="text-lg font-bold mb-1 text-gray-300">Sin alertas</div>
                <div className="text-sm text-gray-500">No hay alertas que coincidan con los filtros seleccionados</div>
              </div>
            ) : (
              filteredAlerts.map(alert => {
                const cfg = typeConfig[alert.type]
                const Icon = cfg.icon
                return (
                  <div 
                    key={alert.id} 
                    className={`grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-2 items-center px-2 md:px-4 py-3 mb-1.5 rounded-xl border transition-all hover:bg-industrial-800/50 ${cfg.bgColor} ${cfg.borderColor} ${alert.status === 'PENDIENTE' && alert.type === 'CRÍTICA' ? 'animate-pulse' : ''}`}
                  >
                    <div className="col-span-1 flex justify-center">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-industrial-800/70 border border-industrial-700">
                        <Icon size={18} className={
                          alert.type === 'CRÍTICA' ? 'text-status-danger' :
                          alert.type === 'ADVERTENCIA' ? 'text-status-warning' :
                          'text-electric-400'
                        } />
                      </div>
                    </div>

                    <div className="col-span-2">
                      <div className="md:hidden">
                        <AlertBadge type={alert.type} size="sm" className="mb-1" />
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-0.5">
                        <Clock size={11} />
                        FECHA
                      </div>
                      <div className="text-sm text-white font-mono font-semibold">{formatDate(alert.timestamp)}</div>
                      <div className="text-xs text-electric-400 font-mono">{formatTime(alert.timestamp)}</div>
                    </div>

                    <div className="col-span-2">
                      <div className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold mb-0.5">SENSOR</div>
                      <div className="text-sm text-white font-semibold">{alert.sensor}</div>
                      <div className="text-[10px] text-gray-500 font-mono">Prioridad: {alert.priority}</div>
                    </div>

                    <div className="col-span-4">
                      <div className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold mb-0.5">DESCRIPCIÓN</div>
                      <div className="text-sm text-gray-100 leading-snug">{alert.description}</div>
                      {alert.threshold && (
                        <div className="text-[10px] text-gray-500 mt-0.5">
                          Límite: <span className="font-mono text-status-warning">{alert.threshold}</span>
                        </div>
                      )}
                    </div>

                    <div className="col-span-1 flex md:justify-center">
                      {alert.value && (
                        <div className="text-center">
                          <div className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold mb-0.5 md:hidden">VALOR</div>
                          <div className="font-mono font-bold text-sm text-white bg-industrial-800 px-2 py-1 rounded border border-industrial-700 inline-block">
                            {alert.value}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="col-span-1 flex md:justify-center">
                      <span className={`inline-flex items-center px-2 py-1 rounded-md border text-[10px] font-bold uppercase tracking-wider ${statusColors[alert.status]}`}>
                        {alert.status === 'PENDIENTE' ? 'PEND.' : alert.status.substring(0, 4)}
                      </span>
                    </div>

                    <div className="col-span-1 flex justify-end gap-1.5">
                      {alert.status === 'PENDIENTE' && (
                        <button
                          onClick={() => acknowledgeAlert(alert.id)}
                          className="p-2 rounded-lg bg-electric-500/20 border border-electric-500/40 text-electric-400 hover:bg-electric-500/30 transition-colors"
                          title="Marcar como reconocida"
                        >
                          <Check size={14} />
                        </button>
                      )}
                      {alert.status !== 'RESUELTA' && (
                        <button
                          onClick={() => updateAlert(alert.id, { status: 'RESUELTA' })}
                          className="p-2 rounded-lg bg-status-ok/20 border border-status-ok/40 text-status-ok hover:bg-status-ok/30 transition-colors"
                          title="Marcar como resuelta"
                        >
                          <Check size={14} strokeWidth={3} />
                        </button>
                      )}
                      <button className="p-2 rounded-lg bg-industrial-700/70 border border-industrial-600 text-gray-400 hover:text-white transition-colors md:hidden">
                        <ChevronDown size={14} />
                      </button>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </Panel>
      </div>
    </div>
  )
}
