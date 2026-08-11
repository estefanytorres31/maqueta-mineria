import { 
  Settings as SettingsIcon, 
  Cpu, 
  Radio, 
  Zap, 
  Cloud, 
  Monitor,
  HardDrive,
  RefreshCw,
  Pencil,
  Save,
  RotateCcw,
  Globe,
  Shield,
  Clock,
  Power
} from 'lucide-react'
import { useState } from 'react'
import { useSettingsStore } from '../stores/settingsStore'
import { useNavigationStore } from '../stores/navigationStore'
import Panel from '../components/Panel'
import { SensorStatus } from '../types'

const statusDot = (status: SensorStatus | 'CONNECTED' | 'DISCONNECTED' | 'SYNCING' | boolean) => {
  const ok = status === 'OK' || status === 'CONNECTED' || status === true
  const warn = status === 'WARNING' || status === 'SYNCING'
  const err = status === 'ERROR'
  if (ok) return <span className="status-dot status-ok" />
  if (warn) return <span className="status-dot status-warning" />
  if (err) return <span className="status-dot status-danger" />
  return <span className="status-dot status-offline" />
}

export default function Settings() {
  const s = useSettingsStore()
  const [editing, setEditing] = useState<string | null>(null)
  const [form, setForm] = useState({
    machineName: s.general.machineName,
    equipmentId: s.general.equipmentId,
    ip: s.communication.ip,
    port: s.communication.port.toString()
  })
  const [syncing, setSyncing] = useState(false)
  const { systemStatus } = useNavigationStore()

  const handleEdit = (field: string, value: string) => {
    setEditing(field)
    setForm(f => ({ ...f, [field]: value }))
  }

  const handleSave = (field: string) => {
    switch (field) {
      case 'machineName':
        s.updateGeneral({ machineName: form.machineName })
        break
      case 'equipmentId':
        s.updateGeneral({ equipmentId: form.equipmentId })
        break
      case 'ip':
        s.updateCommunication({ ip: form.ip })
        break
      case 'port':
        s.updateCommunication({ port: parseInt(form.port) || 1883 })
        break
    }
    setEditing(null)
  }

  const handleSync = () => {
    setSyncing(true)
    setTimeout(() => {
      s.updateCloud({ lastSync: new Date() })
      setSyncing(false)
    }, 2000)
  }

  const renderField = (field: keyof typeof form, label: string, value: string, type = 'text') => {
    const isEditing = editing === field
    return (
      <div className="flex items-center justify-between bg-industrial-850 rounded-lg p-3 border border-industrial-700 hover:border-industrial-600 transition-colors">
        <div>
          <div className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold mb-0.5">{label}</div>
          {isEditing ? (
            <input
              type={type}
              value={form[field]}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, [field]: e.target.value }))}
              className="bg-industrial-900 border border-electric-500 rounded px-2 py-1 text-sm font-mono text-white focus:outline-none min-w-[140px]"
              autoFocus
            />
          ) : (
            <div className="text-sm font-mono text-gray-200 font-semibold">{value}</div>
          )}
        </div>
        {isEditing ? (
          <button
            onClick={() => handleSave(field)}
            className="p-2 rounded-md bg-status-ok/20 border border-status-ok/40 text-status-ok hover:bg-status-ok/30 transition-colors"
          >
            <Save size={14} />
          </button>
        ) : (
          <button
            onClick={() => handleEdit(field, value)}
            className="p-2 rounded-md bg-industrial-750 border border-industrial-600 text-gray-400 hover:text-electric-400 hover:border-electric-500/40 transition-colors"
          >
            <Pencil size={14} />
          </button>
        )}
      </div>
    )
  }

  const SensorToggle = ({ label, status, onToggle }: { label: string; status: SensorStatus; onToggle: () => void }) => (
    <div className="flex items-center justify-between bg-industrial-850 rounded-lg p-2.5 border border-industrial-700">
      <div className="flex items-center gap-2.5 min-w-0">
        {statusDot(status)}
        <span className="text-sm text-gray-200 font-medium truncate">{label}</span>
      </div>
      <button
        onClick={onToggle}
        className={`px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider transition-colors ${
          status !== 'OFFLINE'
            ? 'bg-status-ok/15 text-status-ok border border-status-ok/30'
            : 'bg-status-offline/20 text-status-offline border border-status-offline/40'
        }`}
      >
        {status !== 'OFFLINE' ? 'ON' : 'OFF'}
      </button>
    </div>
  )

  return (
    <div className="w-full h-full flex flex-col gap-3 lg:gap-4">
      <div className="flex items-center gap-2 mb-0.5 flex-wrap">
        <SettingsIcon size={22} className="text-electric-400" />
        <h2 className="text-xl md:text-2xl font-bold text-white">CONFIGURACIÓN</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-4 flex-1 min-h-0 overflow-auto pb-4">
        <div className="lg:col-span-6 flex flex-col gap-3 lg:gap-4">
          <Panel title="GENERAL" icon={Monitor}>
            <div className="space-y-3">
              {renderField('machineName', 'NOMBRE DE MÁQUINA', s.general.machineName)}
              {renderField('equipmentId', 'ID DE EQUIPO', s.general.equipmentId)}
              <div className="flex items-center justify-between bg-industrial-850 rounded-lg p-3 border border-industrial-700">
                <div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold mb-0.5">UNIDAD DE MEDIDA</div>
                  <div className="flex gap-2 mt-1">
                    <button
                      onClick={() => s.updateGeneral({ unitSystem: 'imperial' })}
                      className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                        s.general.unitSystem === 'imperial'
                          ? 'bg-electric-500 text-white shadow-glow-blue'
                          : 'bg-industrial-750 text-gray-400 hover:text-white border border-industrial-600'
                      }`}
                    >
                      IMPERIAL (gal, mi)
                    </button>
                    <button
                      onClick={() => s.updateGeneral({ unitSystem: 'metric' })}
                      className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                        s.general.unitSystem === 'metric'
                          ? 'bg-electric-500 text-white shadow-glow-blue'
                          : 'bg-industrial-750 text-gray-400 hover:text-white border border-industrial-600'
                      }`}
                    >
                      MÉTRICO (L, km)
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Panel>

          <Panel title="COMUNICACIÓN" icon={Radio}>
            <div className="space-y-3">
              <div className="flex items-center justify-between bg-industrial-850 rounded-lg p-3 border border-industrial-700">
                <div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold mb-0.5">PROTOCOLO</div>
                  <div className="flex gap-2 mt-1">
                    {['MQTT', 'REST', 'WS'].map(p => (
                      <button
                        key={p}
                        onClick={() => s.updateCommunication({ protocol: p as any })}
                        className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                          s.communication.protocol === p
                            ? 'bg-electric-500 text-white shadow-glow-blue'
                            : 'bg-industrial-750 text-gray-400 hover:text-white border border-industrial-600'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {statusDot(s.communication.connected)}
                  <span className={`font-bold text-sm ${s.communication.connected ? 'text-status-ok' : 'text-status-offline'}`}>
                    {s.communication.connected ? 'CONECTADO' : 'DESCONECTADO'}
                  </span>
                </div>
              </div>
              {renderField('ip', 'DIRECCIÓN IP / HOST', s.communication.ip)}
              {renderField('port', 'PUERTO', s.communication.port.toString(), 'number')}
              <button
                onClick={() => s.updateCommunication({ connected: !s.communication.connected })}
                className={`w-full py-2.5 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                  s.communication.connected
                    ? 'bg-status-danger/20 border border-status-danger/40 text-status-danger hover:bg-status-danger/30'
                    : 'bg-status-ok/20 border border-status-ok/40 text-status-ok hover:bg-status-ok/30'
                }`}
              >
                <Power size={16} />
                {s.communication.connected ? 'DESCONECTAR' : 'CONECTAR'}
              </button>
            </div>
          </Panel>

          <Panel title="SENSORES" icon={Zap}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <SensorToggle
                label="GPS"
                status={s.sensors.gps}
                onToggle={() => s.updateSensors({ gps: s.sensors.gps !== 'OFFLINE' ? 'OFFLINE' : 'OK' })}
              />
              <SensorToggle
                label="IMU 9 Ejes"
                status={s.sensors.imu}
                onToggle={() => s.updateSensors({ imu: s.sensors.imu !== 'OFFLINE' ? 'OFFLINE' : 'OK' })}
              />
              <SensorToggle
                label="Combustible"
                status={s.sensors.fuel}
                onToggle={() => s.updateSensors({ fuel: s.sensors.fuel !== 'OFFLINE' ? 'OFFLINE' : 'OK' })}
              />
              <SensorToggle
                label="Hidráulica"
                status={s.sensors.hydraulic}
                onToggle={() => s.updateSensors({ hydraulic: s.sensors.hydraulic !== 'OFFLINE' ? 'OFFLINE' : 'OK' })}
              />
              <SensorToggle
                label="RPM Motor"
                status={s.sensors.rpm}
                onToggle={() => s.updateSensors({ rpm: s.sensors.rpm !== 'OFFLINE' ? 'OFFLINE' : 'OK' })}
              />
              <div className="md:col-span-2 flex items-center gap-2 px-3 py-2 bg-industrial-800/40 rounded-lg border border-dashed border-industrial-700 text-xs text-gray-500">
                <Shield size={14} className="text-electric-400 flex-shrink-0" />
                <span>Estado global de sensores: Almacenamiento <b className="text-status-ok ml-1">{systemStatus.storage}</b> · Comunicaciones <b className="text-status-ok ml-1">{systemStatus.communications}</b></span>
              </div>
            </div>
          </Panel>
        </div>

        <div className="lg:col-span-6 flex flex-col gap-3 lg:gap-4">
          <Panel title="CLOUD / EDGE" icon={Cloud}>
            <div className="space-y-3">
              <div className="flex items-center justify-between bg-industrial-850 rounded-lg p-3 border border-industrial-700">
                <div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold mb-0.5">ESTADO SINCRONIZACIÓN</div>
                  <div className="flex items-center gap-2 mt-0.5">
                    {statusDot(s.cloud.status)}
                    <span className={`font-bold text-sm ${
                      s.cloud.status === 'CONNECTED' ? 'text-status-ok' :
                      s.cloud.status === 'SYNCING' ? 'text-status-warning' : 'text-status-offline'
                    }`}>
                      {s.cloud.status === 'CONNECTED' ? 'CONECTADO A CLOUD' :
                       s.cloud.status === 'SYNCING' ? 'SINCRONIZANDO...' : 'DESCONECTADO'}
                    </span>
                  </div>
                </div>
                <Globe size={24} className={s.cloud.status === 'CONNECTED' ? 'text-electric-400' : 'text-gray-600'} />
              </div>
              <div className="flex items-center justify-between bg-industrial-850 rounded-lg p-3 border border-industrial-700">
                <div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold mb-0.5">ÚLTIMA SINCRONIZACIÓN</div>
                  <div className="flex items-center gap-1.5 text-sm font-mono text-gray-200 mt-0.5">
                    <Clock size={13} className="text-electric-400" />
                    {new Date(s.cloud.lastSync).toLocaleString('es-ES')}
                  </div>
                </div>
                <button
                  onClick={handleSync}
                  disabled={syncing}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-xs transition-all ${
                    syncing
                      ? 'bg-industrial-700 text-gray-400 cursor-wait'
                      : 'bg-electric-500 text-white hover:bg-electric-600 shadow-glow-blue active:scale-95'
                  }`}
                >
                  <RefreshCw size={14} className={syncing ? 'animate-spin' : ''} />
                  {syncing ? 'SINCRONIZANDO...' : 'SINCRONIZAR'}
                </button>
              </div>
            </div>
          </Panel>

          <Panel title="SISTEMA" icon={Cpu}>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-industrial-850 rounded-lg p-3 border border-industrial-700">
                  <div className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold mb-0.5">VERSIÓN</div>
                  <div className="text-lg font-black font-mono text-electric-400">v{s.system.version}</div>
                </div>
                <div className="bg-industrial-850 rounded-lg p-3 border border-industrial-700">
                  <div className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold mb-0.5">ALMACENAMIENTO</div>
                  <div className="text-sm font-bold font-mono text-white mb-1">
                    {s.system.storageUsed} / {s.system.storageTotal} <span className="text-xs text-gray-400">GB</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-industrial-700 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${(s.system.storageUsed / s.system.storageTotal) * 100}%`,
                        backgroundColor:
                          (s.system.storageUsed / s.system.storageTotal) > 0.85 ? '#EF4444' :
                          (s.system.storageUsed / s.system.storageTotal) > 0.7 ? '#F59E0B' : '#10B981'
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between bg-industrial-850 rounded-lg p-3 border border-industrial-700">
                <div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold mb-0.5">ACTUALIZACIONES</div>
                  <div className="text-sm font-mono text-gray-200">Actualizaciones automáticas</div>
                </div>
                <button
                  onClick={() => s.updateSystem({ autoUpdate: !s.system.autoUpdate })}
                  className={`w-12 h-7 rounded-full transition-all relative ${
                    s.system.autoUpdate ? 'bg-status-ok' : 'bg-industrial-600'
                  }`}
                >
                  <div className={`absolute top-0.5 w-6 h-6 rounded-full bg-white transition-all shadow ${
                    s.system.autoUpdate ? 'left-[22px]' : 'left-0.5'
                  }`} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button className="py-3 rounded-lg bg-industrial-850 border border-industrial-700 text-gray-300 hover:text-white hover:bg-industrial-800 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all">
                  <HardDrive size={16} className="text-electric-400" />
                  VER LOGS
                </button>
                <button className="py-3 rounded-lg bg-industrial-850 border border-industrial-700 text-gray-300 hover:text-white hover:bg-industrial-800 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all">
                  <Monitor size={16} className="text-status-ok" />
                  DIAGNÓSTICO
                </button>
              </div>
            </div>
          </Panel>

          <Panel title="ACCIONES DEL SISTEMA" className="flex-1">
            <div className="space-y-3">
              <div className="rounded-xl p-4 border border-status-warning/30 bg-status-warning/5">
                <div className="flex items-start gap-3">
                  <RefreshCw size={20} className="text-status-warning mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="font-bold text-sm text-white mb-0.5">REINICIAR APLICACIÓN</div>
                    <div className="text-xs text-gray-400 mb-3">Cierra y reinicia la aplicación EDGE SMART. Los datos no guardados se perderán.</div>
                    <button className="w-full py-2.5 rounded-lg bg-status-warning/20 border border-status-warning/40 text-status-warning font-bold text-xs uppercase tracking-wider hover:bg-status-warning/30 transition-all flex items-center justify-center gap-2">
                      <RotateCcw size={14} />
                      REINICIAR
                    </button>
                  </div>
                </div>
              </div>

              <div className="rounded-xl p-4 border border-status-danger/30 bg-status-danger/5">
                <div className="flex items-start gap-3">
                  <Power size={20} className="text-status-danger mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="font-bold text-sm text-white mb-0.5">CERRAR APLICACIÓN</div>
                    <div className="text-xs text-gray-400 mb-3">Cierra completamente la aplicación. Asegúrate de sincronizar datos primero.</div>
                    <button className="w-full py-2.5 rounded-lg bg-status-danger/20 border border-status-danger/40 text-status-danger font-bold text-xs uppercase tracking-wider hover:bg-status-danger/30 transition-all flex items-center justify-center gap-2">
                      <Power size={14} />
                      CERRAR EDGE SMART
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  )
}
