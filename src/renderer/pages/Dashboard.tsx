import { 
  Thermometer, 
  Droplets, 
  Gauge as GaugeIcon, 
  Fuel as FuelIcon, 
  Pickaxe, 
  TrendingUp, 
  Activity,
  MapPin,
  BarChart3,
  Cpu,
  Zap,
  CircleDot
} from 'lucide-react'
import { useTelemetryStore } from '../stores/telemetryStore'
import { useNavigationStore } from '../stores/navigationStore'
import Panel from '../components/Panel'
import Gauge from '../components/Gauge'
import MetricCard from '../components/MetricCard'
import StatusIndicator from '../components/StatusIndicator'
import ProgressBar from '../components/ProgressBar'
import KpiCard from '../components/KpiCard'
import { OperationMode, SensorStatus } from '../types'

const statusMode: Record<OperationMode, { label: string; color: string; border: string; iconColor: string }> = {
  TRABAJANDO: { label: 'TRABAJANDO', color: 'text-status-ok', border: 'border-status-ok/50 bg-status-ok/10', iconColor: 'text-status-ok' },
  RALENTÍ: { label: 'RALENTÍ', color: 'text-status-warning', border: 'border-status-warning/50 bg-status-warning/10', iconColor: 'text-status-warning' },
  INOPERATIVO: { label: 'INOPERATIVO', color: 'text-gray-400', border: 'border-gray-500/50 bg-gray-500/10', iconColor: 'text-gray-400' }
}

export default function Dashboard() {
  const { telemetry } = useTelemetryStore()
  const selectedMachine = useNavigationStore(s => s.selectedMachine)
  const { engine, fuel, hydraulic, gps, imu, productivity, operation } = telemetry
  const modeConfig = statusMode[operation.mode]

  const systemStatuses = [
    { label: 'MOTOR', icon: Cpu, status: engine.status as SensorStatus },
    { label: 'COMBUSTIBLE', icon: FuelIcon, status: 'OK' as SensorStatus },
    { label: 'HIDRÁULICA', icon: Droplets, status: hydraulic.status as SensorStatus },
    { label: 'PRESIÓN', icon: GaugeIcon, status: hydraulic.mainPressure > 310 ? 'WARNING' as SensorStatus : 'OK' as SensorStatus },
    { label: 'TEMPERATURAS', icon: Thermometer, status: engine.coolantTemp > 95 ? 'WARNING' as SensorStatus : 'OK' as SensorStatus },
    { label: 'GPS', icon: MapPin, status: gps.status as SensorStatus },
    { label: 'IMU 9 EJES', icon: Activity, status: imu.status as SensorStatus },
    { label: 'SENSORES', icon: Zap, status: 'OK' as SensorStatus },
    { label: 'COMUNICACIÓN', icon: BarChart3, status: 'OK' as SensorStatus },
    { label: 'EDGE / CLOUD', icon: TrendingUp, status: 'OK' as SensorStatus }
  ]

  return (
    <div className="w-full h-full flex flex-col gap-3 lg:gap-4">
      <div className={`rounded-xl border-2 px-5 py-3 flex items-center justify-center gap-4 ${modeConfig.border}`}>
        <Pickaxe size={36} className={modeConfig.iconColor} />
        <div className="text-center">
          <div className={`text-3xl md:text-4xl lg:text-5xl font-black ${modeConfig.color} leading-none tracking-wide`}>
            {modeConfig.label}
          </div>
          <div className="text-gray-400 text-xs md:text-sm mt-1">Modo de operación actual</div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-3 lg:gap-4 flex-1 min-h-0">
        <div className="xl:col-span-3 flex flex-col gap-3 lg:gap-4">
          <Panel title="MOTOR" icon={Cpu}>
            <div className="flex flex-col items-center">
              <Gauge 
                value={engine.rpm} 
                max={3000} 
                label="x1000 RPM" 
                size={150}
                color="#1E88E5"
                warningThreshold={2400}
                dangerThreshold={2700}
              />
            </div>
            <div className="grid grid-cols-3 gap-2 mt-3">
              <div className="bg-industrial-850 rounded-lg p-2 border border-industrial-700">
                <div className="flex items-center gap-1 text-gray-400 mb-0.5">
                  <Thermometer size={11} className="text-status-warning" />
                  <span className="text-[9px] uppercase tracking-wider font-medium">TEMP. REFR.</span>
                </div>
                <div className="font-mono font-bold text-lg text-white">{engine.coolantTemp} <span className="text-xs text-gray-400">°C</span></div>
              </div>
              <div className="bg-industrial-850 rounded-lg p-2 border border-industrial-700">
                <div className="flex items-center gap-1 text-gray-400 mb-0.5">
                  <Droplets size={11} className="text-electric-400" />
                  <span className="text-[9px] uppercase tracking-wider font-medium">PRES. ACEITE</span>
                </div>
                <div className="font-mono font-bold text-lg text-white">{engine.oilPressure} <span className="text-xs text-gray-400">bar</span></div>
              </div>
              <div className="bg-industrial-850 rounded-lg p-2 border border-industrial-700">
                <div className="flex items-center gap-1 text-gray-400 mb-0.5">
                  <GaugeIcon size={11} className="text-status-warning" />
                  <span className="text-[9px] uppercase tracking-wider font-medium">TEMP. ACEITE</span>
                </div>
                <div className="font-mono font-bold text-lg text-white">{engine.oilTemp} <span className="text-xs text-gray-400">°C</span></div>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between px-2 py-2 rounded-lg bg-industrial-850 border border-industrial-700">
              <span className="text-xs text-gray-400 uppercase font-medium tracking-wider">ESTADO MOTOR</span>
              <div className="flex items-center gap-1.5">
                <CircleDot size={10} className="text-status-ok" fill="currentColor" />
                <span className="text-status-ok font-bold text-sm">{engine.status}</span>
              </div>
            </div>
          </Panel>

          <Panel title="COMBUSTIBLE" icon={FuelIcon}>
            <div className="grid grid-cols-2 gap-3">
              <MetricCard 
                label="CONSUMO INSTANTÁNEO" 
                value={fuel.instantConsumption.toFixed(1)}
                unit="gal/h"
                className="!p-0 !bg-transparent !border-0"
              />
              <div className="flex flex-col justify-between">
                <div className="metric-label mb-1">NIVEL TANQUE</div>
                <div className="flex items-baseline gap-1">
                  <span className="metric-value text-2xl md:text-3xl text-fuel-primary">{fuel.tankLevel.toFixed(0)}</span>
                  <span className="text-sm text-gray-400 font-medium">%</span>
                </div>
                <ProgressBar value={fuel.tankLevel} color="bg-fuel-primary" height="h-2.5" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-4">
              <div className="bg-industrial-850 rounded-lg p-2 border border-industrial-700">
                <div className="text-[9px] text-gray-400 uppercase tracking-wider font-medium mb-0.5">CONSUMO HOY</div>
                <div className="font-mono font-bold text-white">{fuel.todayConsumption.toFixed(1)} <span className="text-xs text-gray-400">gal</span></div>
              </div>
              <div className="bg-industrial-850 rounded-lg p-2 border border-industrial-700">
                <div className="text-[9px] text-gray-400 uppercase tracking-wider font-medium mb-0.5">RALENTÍ HOY</div>
                <div className="font-mono font-bold text-white">{fuel.idleTodayConsumption.toFixed(1)} <span className="text-xs text-gray-400">gal</span></div>
              </div>
              <div className="bg-industrial-850 rounded-lg p-2 border border-industrial-700">
                <div className="text-[9px] text-gray-400 uppercase tracking-wider font-medium mb-0.5">AUTONOMÍA</div>
                <div className="font-mono font-bold text-status-ok">{fuel.autonomy.toFixed(1)} <span className="text-xs text-gray-400">h</span></div>
              </div>
            </div>
          </Panel>

          <Panel title="HIDRÁULICA" icon={Droplets}>
            <div className="grid grid-cols-3 gap-2 mb-3">
              <div>
                <div className="metric-label mb-1 text-center">P. PRINCIPAL</div>
                <Gauge value={hydraulic.mainPressure} max={350} label="bar" size={80} warningThreshold={300} dangerThreshold={330} />
              </div>
              <div>
                <div className="metric-label mb-1 text-center">P. BRAZO</div>
                <Gauge value={hydraulic.armPressure} max={350} label="bar" size={80} warningThreshold={300} dangerThreshold={330} />
              </div>
              <div>
                <div className="metric-label mb-1 text-center">P. GIRO</div>
                <Gauge value={hydraulic.swingPressure} max={300} label="bar" size={80} warningThreshold={260} dangerThreshold={280} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="bg-industrial-850 rounded-lg p-2 border border-industrial-700">
                <div className="text-[9px] text-gray-400 uppercase tracking-wider font-medium mb-0.5">TEMP. ACEITE HIDR.</div>
                <div className="font-mono font-bold text-white">{hydraulic.oilTemp.toFixed(0)} <span className="text-xs text-gray-400">°C</span></div>
              </div>
              <div className="bg-industrial-850 rounded-lg p-2 border border-industrial-700">
                <div className="text-[9px] text-gray-400 uppercase tracking-wider font-medium mb-0.5">CARGA HIDRÁULICA</div>
                <div className="font-mono font-bold text-white">{hydraulic.load.toFixed(0)} <span className="text-xs text-gray-400">%</span></div>
              </div>
            </div>
            <ProgressBar value={hydraulic.load} color="bg-electric-500" />
          </Panel>
        </div>

        <div className="xl:col-span-6 flex flex-col gap-3 lg:gap-4 min-h-0">
          <Panel className="flex-1 min-h-0">
            <div className="h-full flex flex-col">
              <div className="flex-1 flex items-center justify-center min-h-0 py-2">
                <div className="relative w-full max-w-3xl max-h-full flex items-center justify-center px-4">
                  {selectedMachine?.imageUrl ? (
                    <img
                      src={selectedMachine.imageUrl}
                      alt={selectedMachine.name}
                      className="max-h-full max-w-full object-contain select-none pointer-events-none"
                      style={{
                        filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.65)) drop-shadow(0 0 25px rgba(20, 184, 255, 0.22))'
                      }}
                    />
                  ) : (
                    <div className="text-[180px] md:text-[220px] leading-none drop-shadow-2xl">🚜</div>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-5 md:grid-cols-10 gap-1.5 md:gap-2 mt-3 pt-3 border-t border-industrial-700">
                {systemStatuses.map((s) => (
                  <StatusIndicator 
                    key={s.label} 
                    label={s.label}
                    icon={s.icon}
                    status={s.status}
                    size="sm"
                  />
                ))}
              </div>
            </div>
          </Panel>

          <Panel title="MOVIMIENTO" icon={Activity}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-industrial-850 border border-industrial-700 rounded-lg p-3">
                <div className="metric-label mb-2">VELOCIDAD</div>
                <div className="flex items-end gap-3">
                  <Gauge value={gps.speed} max={10} label="km/h" size={90} />
                </div>
              </div>
              <div className="bg-industrial-850 border border-industrial-700 rounded-lg p-3">
                <div className="metric-label mb-2">INCLINACIÓN (IMU)</div>
                <div className="space-y-2 mt-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">PITCH</span>
                    <span className={`font-mono font-bold text-sm ${imu.pitch > 3 ? 'text-status-warning' : 'text-white'}`}>
                      {imu.pitch > 0 ? '+' : ''}{imu.pitch.toFixed(1)}°
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">ROLL</span>
                    <span className={`font-mono font-bold text-sm ${Math.abs(imu.roll) > 3 ? 'text-status-warning' : 'text-white'}`}>
                      {imu.roll > 0 ? '+' : ''}{imu.roll.toFixed(1)}°
                    </span>
                  </div>
                  <div className="mt-3 flex justify-center gap-3 text-xs">
                    <div className="text-status-warning">⬆ Pitch {imu.pitch > 0 ? '+' : ''}{imu.pitch.toFixed(1)}°</div>
                    <div className="text-status-ok">⬇ Roll {imu.roll > 0 ? '+' : ''}{imu.roll.toFixed(1)}°</div>
                  </div>
                </div>
              </div>
              <div className="bg-industrial-850 border border-industrial-700 rounded-lg p-3 md:col-span-2">
                <div className="metric-label mb-2 flex items-center gap-1">
                  <MapPin size={12} className="text-electric-400" />
                  UBICACIÓN GPS
                </div>
                <div className="bg-industrial-900 rounded-md p-3 border border-industrial-700">
                  <div className="grid grid-cols-2 gap-2 font-mono text-sm">
                    <div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-0.5">LATITUD</div>
                      <div className="text-white font-semibold">{gps.latitude}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-0.5">LONGITUD</div>
                      <div className="text-white font-semibold">{gps.longitude}</div>
                    </div>
                  </div>
                  <div className="mt-2 h-20 rounded-md bg-industrial-950 border border-industrial-800 flex flex-col items-center justify-center text-gray-500 text-xs gap-1">
                    <MapPin size={16} className="text-electric-500/70" />
                    <span>Vista previa — abrir pestaña GPS para mapa completo</span>
                  </div>
                </div>
              </div>
            </div>
          </Panel>
        </div>

        <div className="xl:col-span-3 flex flex-col gap-3 lg:gap-4">
          <Panel title="HOY" icon={Activity}>
            <div className="grid grid-cols-3 gap-2 mb-3">
              <KpiCard label="HORAS MOTOR" value={operation.engineHours.toFixed(1)} unit="h" />
              <KpiCard label="HORAS EFECTIVAS" value={operation.effectiveHours.toFixed(1)} unit="h" />
              <KpiCard label="RALENTÍ" value={operation.idleHours.toFixed(1)} unit="h" />
              <KpiCard label="INOPERATIVO" value={operation.inoperativeHours.toFixed(1)} unit="h" />
              <div className="bg-industrial-850 border border-industrial-700 rounded-lg p-3 flex flex-col items-center justify-center">
                <div className="w-16 h-16 relative">
                  <svg viewBox="0 0 64 64" className="w-full h-full -rotate-90">
                    <circle cx="32" cy="32" r="26" fill="none" stroke="#1C2B3F" strokeWidth="6" />
                    <circle 
                      cx="32" cy="32" r="26" fill="none" 
                      stroke="url(#utilGrad)" strokeWidth="6" strokeLinecap="round"
                      strokeDasharray={`${(operation.utilization / 100) * 163.36} 163.36`}
                      style={{ filter: 'drop-shadow(0 0 4px #1E88E580)', transition: 'all 0.5s' }}
                    />
                    <defs>
                      <linearGradient id="utilGrad">
                        <stop offset="0%" stopColor="#10B981" />
                        <stop offset="100%" stopColor="#1E88E5" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-mono font-bold text-sm text-white">{operation.utilization.toFixed(0)}<span className="text-xs text-gray-400">%</span></span>
                  </div>
                </div>
                <div className="metric-label mt-1 text-center">UTILIZACIÓN</div>
              </div>
              <KpiCard label="HORÓMETRO TOTAL" value={operation.totalHours.toLocaleString(undefined, { maximumFractionDigits: 0 })} unit="h" />
            </div>
          </Panel>

          <Panel title="PRODUCTIVIDAD HOY" icon={BarChart3}>
            <div className="grid grid-cols-3 gap-2 mb-3">
              <KpiCard label="CICLOS REALIZADOS" value={productivity.cyclesCompleted.toLocaleString()} unit="ciclos" />
              <KpiCard label="TONELADAS MOVIDAS" value={productivity.tonsMoved.toLocaleString()} unit="ton" highlight />
              <KpiCard label="RENDIMIENTO" value={productivity.performance.toFixed(0)} unit="ton/h" />
            </div>
            <div className="bg-industrial-850 border border-industrial-700 rounded-lg p-3 flex items-center justify-between">
              <div>
                <div className="metric-label mb-1">TIEMPO PROMEDIO POR CICLO</div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-xl text-white">
                    00:{String(Math.floor(productivity.avgCycleTime)).padStart(2, '0')}
                  </span>
                  <span className="text-sm text-gray-400">min</span>
                </div>
              </div>
              <div className="text-4xl opacity-60">⏱️</div>
            </div>
          </Panel>

          <Panel title="EFICIENCIA" icon={TrendingUp}>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-industrial-850 border border-fuel-primary/30 rounded-lg p-3">
                  <div className="metric-label mb-1 text-fuel-primary">CONSUMO POR TONELADA</div>
                  <div className="flex items-baseline gap-1">
                    <span className="font-mono font-bold text-2xl md:text-3xl text-fuel-primary">
                      {productivity.consumptionPerTon.toFixed(3)}
                    </span>
                    <span className="text-xs text-gray-400">gal/ton</span>
                  </div>
                </div>
                <div className="bg-industrial-850 border border-industrial-700 rounded-lg p-3">
                  <div className="metric-label mb-1">CONSUMO POR CICLO</div>
                  <div className="flex items-baseline gap-1">
                    <span className="font-mono font-bold text-xl md:text-2xl text-white">
                      {productivity.consumptionPerCycle.toFixed(2)}
                    </span>
                    <span className="text-xs text-gray-400">gal/ciclo</span>
                  </div>
                </div>
              </div>
              <div className="bg-industrial-850 border border-status-warning/30 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div className="metric-label mb-0.5 text-status-warning">COMBUSTIBLE IMPRODUCTIVO</div>
                    <div className="flex items-baseline gap-1">
                      <span className="font-mono font-bold text-2xl text-status-warning">
                        {productivity.unproductiveFuel.toFixed(1)}
                      </span>
                      <span className="text-xs text-gray-400">%</span>
                    </div>
                  </div>
                  <div className="text-3xl opacity-60">📊</div>
                </div>
                <ProgressBar value={productivity.unproductiveFuel} max={100} color="bg-status-warning" />
              </div>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  )
}
