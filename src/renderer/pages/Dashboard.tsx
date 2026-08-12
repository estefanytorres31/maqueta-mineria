import { 
  Thermometer, 
  Droplets, 
  Gauge as GaugeIcon, 
  Fuel as FuelIcon, 
  Activity,
  MapPin,
  Cpu,
  Zap,
  Settings as SettingsIcon,
  Cloud
} from 'lucide-react'
import { useTelemetryStore } from '../stores/telemetryStore'
import { useNavigationStore } from '../stores/navigationStore'
import { OperationMode, SensorStatus } from '../types'

import EnginePanel from '../components/dashboard/EnginePanel'
import FuelPanel from '../components/dashboard/FuelPanel'
import HydraulicPanel from '../components/dashboard/HydraulicPanel'
import CenterMachinePanel from '../components/dashboard/CenterMachinePanel'
import MovementPanel from '../components/dashboard/MovementPanel'
import TodayPanel from '../components/dashboard/TodayPanel'
import ProductivityPanel from '../components/dashboard/ProductivityPanel'
import EfficiencyPanel from '../components/dashboard/EfficiencyPanel'

const statusMode: Record<OperationMode, { label: string; color: string; border: string; iconColor: string; bg: string }> = {
  TRABAJANDO: { label: 'TRABAJANDO', color: 'text-status-ok', border: 'border-status-ok/50', iconColor: 'text-status-ok', bg: 'bg-status-ok/10' },
  RALENTÍ: { label: 'RALENTÍ', color: 'text-status-warning', border: 'border-status-warning/50', iconColor: 'text-status-warning', bg: 'bg-status-warning/10' },
  INOPERATIVO: { label: 'INOPERATIVO', color: 'text-gray-400', border: 'border-gray-500/50', iconColor: 'text-gray-400', bg: 'bg-gray-500/10' }
}

export default function Dashboard() {
  const { telemetry } = useTelemetryStore()
  const selectedMachine = useNavigationStore(s => s.selectedMachine)
  const { engine, fuel, hydraulic, gps, imu, productivity, operation } = telemetry
  const modeConfig = statusMode[operation.mode]

  const systemStatusesTop = [
    { label: 'MOTOR', icon: Cpu, status: engine.status as SensorStatus },
    { label: 'COMBUSTIBLE', icon: FuelIcon, status: 'OK' as SensorStatus },
    { label: 'HIDRÁULICA', icon: Droplets, status: hydraulic.status as SensorStatus },
    { label: 'PRESIÓN', icon: GaugeIcon, status: hydraulic.mainPressure > 310 ? 'WARNING' as SensorStatus : 'OK' as SensorStatus },
    { label: 'TEMPERATURAS', icon: Thermometer, status: engine.coolantTemp > 95 ? 'WARNING' as SensorStatus : 'OK' as SensorStatus }
  ]
  const systemStatusesBottom = [
    { label: 'GPS', icon: MapPin, status: gps.status as SensorStatus },
    { label: 'IMU 9 EJES', icon: Activity, status: imu.status as SensorStatus },
    { label: 'SENSORES', icon: Zap, status: 'OK' as SensorStatus },
    { label: 'COMUNICACIÓN', icon: SettingsIcon, status: 'OK' as SensorStatus },
    { label: 'EDGE / CLOUD', icon: Cloud, status: 'OK' as SensorStatus }
  ]

  return (
    <div className="w-full h-full flex flex-col gap-3">
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-3 flex-1 min-h-0 content-start">

        {/* ============= COLUMNA IZQUIERDA 3/12: MOTOR + COMBUSTIBLE + HIDRÁULICA ============= */}
        <div className="xl:col-span-3 flex flex-col gap-3 min-w-0">
          <EnginePanel engine={engine} />
          <FuelPanel fuel={fuel} />
          <HydraulicPanel hydraulic={hydraulic} />
        </div>

        {/* ============= COLUMNA CENTRAL 6/12: banner + máquina + status + MOVIMIENTO ============= */}
        <div className="xl:col-span-6 flex flex-col gap-2 min-h-0 min-w-0">
          <CenterMachinePanel
            selectedMachine={selectedMachine ?? undefined}
            systemStatusesTop={systemStatusesTop}
            systemStatusesBottom={systemStatusesBottom}
            modeConfig={modeConfig}
          />
          <MovementPanel gps={gps} imu={imu} />
        </div>

        {/* ============= COLUMNA DERECHA 3/12: HOY + PRODUCTIVIDAD + EFICIENCIA ============= */}
        <div className="xl:col-span-3 flex flex-col gap-3 min-w-0">
          <TodayPanel operation={operation} />
          <ProductivityPanel productivity={productivity} />
          <EfficiencyPanel productivity={productivity} />
        </div>

      </div>
    </div>
  )
}
