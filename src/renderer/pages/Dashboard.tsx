import { 
  User,
} from 'lucide-react'
import { useTelemetryStore } from '../stores/telemetryStore'

import EnginePanel from '../components/dashboard/EnginePanel'
import FuelPanel from '../components/dashboard/FuelPanel'
import TodayPanel from '../components/dashboard/TodayPanel'
import ProductivityPanel from '../components/dashboard/ProductivityPanel'
import MovementPanel from '../components/dashboard/MovementPanel'
import Co2Panel from '../components/dashboard/Co2Panel'

export default function Dashboard() {
  const { telemetry } = useTelemetryStore()
  const { engine, fuel, gps, imu, productivity, operation } = telemetry

  return (
    <div className="w-full h-full flex flex-col gap-1 md:gap-1 lg:gap-1.5 xl:gap-2 min-h-0 p-0.5 md:p-0.5 lg:p-0.75 xl:p-1">
      <div className="flex-shrink-0 w-full max-w-md mx-auto mb-0.5 md:mb-0.5 lg:mb-1">
        <div className="rounded-lg border border-status-warning/60 bg-industrial-900/80 shadow-[0_0_32px_-10px_rgba(245,158,11,0.15)] px-2 md:px-3 py-1 md:py-1 flex items-center justify-center gap-1.5 md:gap-2 min-w-0">
          <User size={16} className="text-white md:size-[16px] lg:size-[18px] xl:size-[20px] flex-shrink-0" strokeWidth={1.5} />
          <span className="text-[9px] md:text-[10px] lg:text-xs xl:text-sm uppercase font-black tracking-[0.2em] text-white whitespace-nowrap">
            OPERADOR: OP-0245
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-1 md:gap-1 lg:gap-1.5 xl:gap-2 flex-1 min-h-0 lg:items-stretch lg:auto-rows-fr">
        {/* ============== FILA 1 COL 1: MOTOR ============== */}
        <EnginePanel engine={engine} />

        {/* ============== FILA 1 COL 2: COMBUSTIBLE ============== */}
        <FuelPanel fuel={fuel} totalHours={operation.totalHours} />

        {/* ============== FILA 1 COL 3: RESUMEN HOY ============== */}
        <TodayPanel operation={operation} />

        {/* ============== FILA 2 COL 1: CO2 EMISIONES HOY ============== */}
        <Co2Panel fuel={fuel} />

        {/* ============== FILA 2 COL 2: PRODUCTIVIDAD ============== */}
        <ProductivityPanel productivity={productivity} />

        {/* ============== FILA 2 COL 3: PITCH & ROLL (MOVEMENT PANEL) ============== */}
        <MovementPanel gps={gps} imu={imu} />
      </div>
    </div>
  )
}
