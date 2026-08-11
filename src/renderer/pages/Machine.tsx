import { 
  Cog, 
  Cpu, 
  Droplets, 
  Fuel, 
  Thermometer,
  MapPin,
  Activity,
  Gauge as GaugeIcon,
  Zap,
  CircleDot
} from 'lucide-react'
import { useTelemetryStore } from '../stores/telemetryStore'
import { useSettingsStore } from '../stores/settingsStore'
import Panel from '../components/Panel'
import Gauge from '../components/Gauge'
import MetricCard from '../components/MetricCard'
import { SensorStatus } from '../types'

interface StatusDotProps {
  status: SensorStatus
}

const StatusDot = ({ status }: StatusDotProps) => {
  const colors: Record<SensorStatus, string> = {
    OK: 'bg-status-ok shadow-glow-green',
    WARNING: 'bg-status-warning shadow-glow-orange',
    ERROR: 'bg-status-danger shadow-glow-red animate-pulse',
    OFFLINE: 'bg-status-offline'
  }
  return <span className={`status-dot ${colors[status]}`} />
}

export default function Machine() {
  const { telemetry } = useTelemetryStore()
  const { engine, hydraulic, fuel, gps, imu, sensors } = telemetry
  const { sensors: sensorConfig } = useSettingsStore()

  return (
    <div className="w-full h-full flex flex-col gap-3 lg:gap-4">
      <div className="flex items-center gap-2 mb-0.5">
        <Cog size={22} className="text-electric-400" />
        <h2 className="text-xl md:text-2xl font-bold text-white">MÁQUINA</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-4 flex-1 min-h-0">
        <div className="lg:col-span-6 flex flex-col gap-3 lg:gap-4">
          <Panel title="MOTOR" icon={Cpu}>
            <div className="flex items-center gap-6">
              <Gauge 
                value={engine.rpm} 
                max={3000} 
                label="RPM MOTOR" 
                unit="RPM"
                size={150} 
                warningThreshold={2400}
                dangerThreshold={2700}
              />
              <div className="flex-1 grid grid-cols-3 gap-3">
                <MetricCard 
                  label="TEMP. REFRIGERANTE" 
                  value={engine.coolantTemp.toFixed(0)} 
                  unit="°C"
                  icon={Thermometer}
                  iconColor={engine.coolantTemp > 90 ? 'text-status-danger' : 'text-status-ok'}
                  className="!p-3"
                />
                <MetricCard 
                  label="PRESIÓN ACEITE" 
                  value={engine.oilPressure.toFixed(1)} 
                  unit="bar"
                  icon={Droplets}
                  iconColor={engine.oilPressure < 3 ? 'text-status-warning' : 'text-electric-400'}
                  className="!p-3"
                />
                <MetricCard 
                  label="TEMP. ACEITE" 
                  value={engine.oilTemp.toFixed(0)} 
                  unit="°C"
                  icon={GaugeIcon}
                  iconColor={engine.oilTemp > 85 ? 'text-status-warning' : 'text-status-ok'}
                  className="!p-3"
                />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 px-3 py-2 rounded-lg bg-industrial-850 border border-industrial-700">
              <StatusDot status={engine.status} />
              <span className="text-xs text-gray-400 uppercase font-semibold tracking-wider">ESTADO MOTOR</span>
              <span className={`font-bold text-sm ml-auto ${engine.status === 'OK' ? 'text-status-ok' : engine.status === 'WARNING' ? 'text-status-warning' : 'text-status-danger'}`}>
                {engine.status}
              </span>
            </div>
          </Panel>

          <Panel title="HIDRÁULICA" icon={Droplets}>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center">
                <div className="metric-label mb-1 text-center">PRESIÓN PRINCIPAL</div>
                <Gauge value={hydraulic.mainPressure} max={350} label="bar" size={110} warningThreshold={300} />
              </div>
              <div className="flex flex-col items-center">
                <div className="metric-label mb-1 text-center">PRESIÓN BRAZO</div>
                <Gauge value={hydraulic.armPressure} max={350} label="bar" size={110} warningThreshold={300} />
              </div>
              <div className="flex flex-col items-center">
                <div className="metric-label mb-1 text-center">PRESIÓN GIRO</div>
                <Gauge value={hydraulic.swingPressure} max={300} label="bar" size={110} warningThreshold={260} />
              </div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <MetricCard 
                label="TEMP. ACEITE HIDRÁULICO" 
                value={hydraulic.oilTemp.toFixed(0)} 
                unit="°C"
                className="!p-3"
              />
              <MetricCard 
                label="CARGA HIDRÁULICA" 
                value={hydraulic.load.toFixed(0)} 
                unit="%"
                className="!p-3"
              />
            </div>
          </Panel>

          <Panel title="COMBUSTIBLE" icon={Fuel}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <MetricCard 
                label="NIVEL TANQUE" 
                value={fuel.tankLevel.toFixed(0)} 
                unit="%"
                icon={Fuel}
                iconColor="text-fuel-primary"
                className="!p-3"
              />
              <MetricCard 
                label="CONSUMO INST." 
                value={fuel.instantConsumption.toFixed(1)} 
                unit="gal/h"
                className="!p-3"
              />
              <MetricCard 
                label="CONSUMO HOY" 
                value={fuel.todayConsumption.toFixed(1)} 
                unit="gal"
                className="!p-3"
              />
              <MetricCard 
                label="AUTONOMÍA" 
                value={fuel.autonomy.toFixed(1)} 
                unit="h"
                icon={GaugeIcon}
                iconColor={fuel.autonomy < 8 ? 'text-status-warning' : 'text-status-ok'}
                className="!p-3"
              />
            </div>
          </Panel>
        </div>

        <div className="lg:col-span-6 flex flex-col gap-3 lg:gap-4">
          <Panel title="SENSORES" icon={Zap} className="flex-1 min-h-0">
            <div className="h-full overflow-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs text-gray-400 uppercase tracking-wider border-b border-industrial-700">
                    <th className="text-left py-2 px-2 font-semibold">SENSOR</th>
                    <th className="text-left py-2 px-2 font-semibold">CATEGORÍA</th>
                    <th className="text-center py-2 px-2 font-semibold">VALOR</th>
                    <th className="text-center py-2 px-2 font-semibold">CONFIG</th>
                    <th className="text-right py-2 px-2 font-semibold">ESTADO</th>
                  </tr>
                </thead>
                <tbody>
                  {sensors.map(sensor => {
                    const cfgStatus = 
                      sensor.id === 'gps' ? sensorConfig.gps :
                      sensor.id === 'imu' ? sensorConfig.imu :
                      sensor.id.includes('flow') || sensor.id === 'level-tank' ? sensorConfig.fuel :
                      sensor.id.includes('pres-') ? sensorConfig.hydraulic :
                      sensor.id === 'rpm' ? sensorConfig.rpm : 'OK'

                    const displayValue = 
                      sensor.id === 'gps' ? `${gps.latitude}` :
                      sensor.id === 'imu' ? `P:${imu.pitch.toFixed(1)}° R:${imu.roll.toFixed(1)}°` :
                      sensor.id === 'rpm' ? `${engine.rpm} RPM` :
                      sensor.id === 'temp-cool' ? `${engine.coolantTemp}°C` :
                      sensor.id === 'pres-oil' ? `${engine.oilPressure} bar` :
                      sensor.id === 'temp-oil' ? `${engine.oilTemp}°C` :
                      sensor.id === 'flow-supply' ? `${fuel.supplyFlow.toFixed(1)} gal/h` :
                      sensor.id === 'flow-return' ? `${fuel.returnFlow.toFixed(1)} gal/h` :
                      sensor.id === 'level-tank' ? `${fuel.tankLevel.toFixed(0)}%` :
                      sensor.id === 'pres-main' ? `${hydraulic.mainPressure} bar` :
                      sensor.id === 'pres-arm' ? `${hydraulic.armPressure} bar` :
                      sensor.id === 'pres-swing' ? `${hydraulic.swingPressure} bar` : '—'

                    return (
                      <tr key={sensor.id} className="border-b border-industrial-750 hover:bg-industrial-800/50 transition-colors">
                        <td className="py-2.5 px-2 font-medium text-gray-200">{sensor.name}</td>
                        <td className="py-2.5 px-2 text-xs text-gray-500">{sensor.category}</td>
                        <td className="py-2.5 px-2 text-center font-mono text-xs text-gray-300">{displayValue}</td>
                        <td className="py-2.5 px-2 text-center">
                          <StatusDot status={cfgStatus} />
                        </td>
                        <td className="py-2.5 px-2 text-right">
                          <div className="inline-flex items-center gap-1.5">
                            <StatusDot status={sensor.status} />
                            <span className={`font-bold text-xs ${
                              sensor.status === 'OK' ? 'text-status-ok' :
                              sensor.status === 'WARNING' ? 'text-status-warning' :
                              sensor.status === 'ERROR' ? 'text-status-danger' : 'text-status-offline'
                            }`}>
                              {sensor.status}
                            </span>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </Panel>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
            <Panel title="GPS" icon={MapPin}>
              <div className="space-y-2">
                <div className="flex justify-between items-center bg-industrial-850 rounded-lg p-2.5 border border-industrial-700">
                  <div className="flex items-center gap-2 text-gray-400 text-xs font-medium uppercase tracking-wider">
                    <MapPin size={13} className="text-electric-400" />
                    LATITUD
                  </div>
                  <span className="font-mono text-sm text-white">{gps.latitude}</span>
                </div>
                <div className="flex justify-between items-center bg-industrial-850 rounded-lg p-2.5 border border-industrial-700">
                  <div className="flex items-center gap-2 text-gray-400 text-xs font-medium uppercase tracking-wider">
                    <MapPin size={13} className="text-electric-400" />
                    LONGITUD
                  </div>
                  <span className="font-mono text-sm text-white">{gps.longitude}</span>
                </div>
                <div className="flex justify-between items-center bg-industrial-850 rounded-lg p-2.5 border border-industrial-700">
                  <div className="flex items-center gap-2 text-gray-400 text-xs font-medium uppercase tracking-wider">
                    <CircleDot size={13} className={gps.status === 'OK' ? 'text-status-ok' : 'text-status-warning'} fill={gps.status === 'OK' ? 'currentColor' : 'none'} />
                    ESTADO
                  </div>
                  <span className={`font-bold text-sm ${gps.status === 'OK' ? 'text-status-ok' : 'text-status-warning'}`}>{gps.status}</span>
                </div>
              </div>
            </Panel>

            <Panel title="IMU 9 EJES" icon={Activity}>
              <div className="space-y-2">
                <div className="flex justify-between items-center bg-industrial-850 rounded-lg p-2.5 border border-industrial-700">
                  <span className="text-gray-400 text-xs font-medium uppercase tracking-wider">PITCH</span>
                  <span className={`font-mono text-sm font-bold ${Math.abs(imu.pitch) > 4 ? 'text-status-warning' : 'text-white'}`}>
                    {imu.pitch > 0 ? '+' : ''}{imu.pitch.toFixed(2)}°
                  </span>
                </div>
                <div className="flex justify-between items-center bg-industrial-850 rounded-lg p-2.5 border border-industrial-700">
                  <span className="text-gray-400 text-xs font-medium uppercase tracking-wider">ROLL</span>
                  <span className={`font-mono text-sm font-bold ${Math.abs(imu.roll) > 4 ? 'text-status-warning' : 'text-white'}`}>
                    {imu.roll > 0 ? '+' : ''}{imu.roll.toFixed(2)}°
                  </span>
                </div>
                <div className="flex justify-between items-center bg-industrial-850 rounded-lg p-2.5 border border-industrial-700">
                  <span className="text-gray-400 text-xs font-medium uppercase tracking-wider">YAW</span>
                  <span className="font-mono text-sm font-bold text-white">{imu.yaw.toFixed(1)}°</span>
                </div>
              </div>
            </Panel>
          </div>
        </div>
      </div>
    </div>
  )
}
