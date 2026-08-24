import { 
  User,
} from 'lucide-react'
import { useTelemetryStore } from '../stores/telemetryStore'
import { useNavigationStore } from '../stores/navigationStore'

import EnginePanel from '../components/dashboard/EnginePanel'
import FuelPanel from '../components/dashboard/FuelPanel'
import TodayPanel from '../components/dashboard/TodayPanel'
import ProductivityPanel from '../components/dashboard/ProductivityPanel'
import MovementPanel from '../components/dashboard/MovementPanel'
import LoaderPanel from '../components/dashboard/LoaderPanel'
import Co2Panel from '../components/dashboard/Co2Panel'

/* ================================================================
   LÓGICA CONDICIONAL DE LAYOUT DASHBOARD (2 variantes según tipo máquina)
   ————————————————————————————————————————————————————————————————
   ✅ REGLA SELECCIÓN:
        selectedMachine.type === 'loader'  → LAYOUT FOTO 1 (Cargador Frontal)
        cualquier otro type                 → LAYOUT FOTO 3 (Resto 6 máquinas)

   ┌─────────────────────────────── LAYOUT FOTO 1 (LOADER) ─────────────────────────────────┐
   │ F1C1: EnginePanel       │ F1C2: LoaderPanel (CAT 950 modo actual + foto) │ F1C3: TodayPanel variant=loader (6 KPIs: horas + consumo/ren/ciclos) │
   │ F2C1: FuelPanel variant=compact (3 rows: ConsInst/Acum/NivelTanque)       │ F2C2: ProductivityPanel loader SVG BarChart + 3KPIs │ F2C3: MovementPanel Pitch&Roll │
   └──────────────────────────────────────────────────────────────────────────────────────┘

   ┌─────────────────────────────── LAYOUT FOTO 3 (NO-LOADER) ─────────────────────────────┐
   │ F1C1: EnginePanel       │ F1C2: FuelPanel variant=large (2 cols Foto2: 4 métr izq + nivel/autonomía/imgCAT der) │ F1C3: TodayPanel variant=other (3 KPIs new: Inoperativo/UtilizaciónDonut75%/Horómetro4256) │
   │ F2C1: Co2Panel (CO₂ EMISIONES HOY 0.98t + sparkline)                                │ F2C2: ProductivityPanel (genérico KPIs cols + ciclo4pasos / Tprom) │ F2C3: MovementPanel Pitch&Roll │
   └──────────────────────────────────────────────────────────────────────────────────────┘

   Nota: PANELES INVARIABLES (iguales en 7 máquinas) = EnginePanel / ProductivityPanel / MovementPanel
         PANELES VARIABLES SWAP 1↔3 = LoaderPanel ↔ FuelPanel(large)   Today(loader) ↔ Today(other)  FuelPanel(compact) ↔ Co2Panel
   ================================================================ */

export default function Dashboard() {
  const { telemetry } = useTelemetryStore()
  const { engine, fuel, gps, imu, productivity, operation } = telemetry
  const selectedMachine = useNavigationStore(s => s.selectedMachine)

  // Variable clave que decide el layout: si el tipo del estado global hidratado es loader → FOTO1
  const isLoaderLayout = selectedMachine?.type === 'loader'
  const isExcavatorLayout = selectedMachine?.type === 'excavator'

  return (
    <div className="w-full h-full flex flex-col gap-[3px] md:gap-[4px] lg:gap-[5px] min-h-0 p-[3px] md:p-[4px] lg:p-[5px]">
      {/* Operador bar (igual los 7 layouts) */}
      <div className="flex-shrink-0 w-full max-w-md mx-auto mb-[2px] md:mb-[3px]">
        <div className="rounded-lg border border-status-warning/60 bg-industrial-900/80 shadow-[0_0_32px_-10px_rgba(245,158,11,0.15)] px-2 md:px-2 py-[3px] md:py-[4px] flex items-center justify-center gap-1 md:gap-1.5 min-w-0">
          <User size={14} className="text-white md:size-[14px] lg:size-[16px] flex-shrink-0" strokeWidth={1.5} />
          <span className="text-[8px] md:text-[9px] lg:text-sm xl:text-lg uppercase font-black tracking-[0.18em] text-white whitespace-nowrap">
            OPERADOR: OP-0245
          </span>
        </div>
      </div>

      {/* Grid 2×3: misma estructura, items/gap en los 7 layouts — SOLO se estira la COLUMNA CENTRAL (1.3fr) respecto a laterales (1fr c/u) — JSX interno de 3 slots sigue siendo variable */}
      <div className={`grid grid-cols-1 gap-[2px] md:gap-[4px] lg:gap-[5px] flex-1 min-h-0 lg:items-stretch ${
        isExcavatorLayout ? 'lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)_minmax(0,1fr)] xl:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)_minmax(0,1fr)] lg:grid-rows-[minmax(0,1.4fr)_minmax(0,1fr)]' : 'lg:grid-rows-[minmax(0,1.25fr)_minmax(0,1fr)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)_minmax(0,1fr)] xl:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)_minmax(0,1fr)]'
      }`}>
        {/* ============== FILA 1 COL 1: MOTOR (INVARIABLE 7/7) ============== */}
        {selectedMachine && <EnginePanel engine={engine} machine={selectedMachine} />}

        {/* ============== FILA 1 COL 2: SWAP LoaderPanel (FOTO1) ↔ FuelPanel Large (FOTO3 F2) ============== */}
        {isLoaderLayout
          ? (selectedMachine && (
              <LoaderPanel productivity={productivity} operation={operation} fuel={fuel} machine={selectedMachine} />
            ))
          : (selectedMachine && (
              <FuelPanel
                variant="large"
                fuel={fuel}
                totalHours={operation.totalHours}
                machine={selectedMachine}
              />
            ))}

        {/* ============== FILA 1 COL 3: SWAP TodayPanel loader (FOTO1) ↔ TodayPanel other (FOTO3) ============== */}
        <TodayPanel
          variant={isLoaderLayout ? 'loader' : 'other'}
          operation={operation}
          fuel={fuel}
          productivity={productivity}
        />

        {/* ============== FILA 2 COL 1: SWAP FuelPanel compact (FOTO1) ↔ Co2Panel (FOTO3 L2C1) ============== */}
        {isLoaderLayout ? (
          <FuelPanel variant="compact" fuel={fuel} totalHours={operation.totalHours} />
        ) : (
          <Co2Panel fuel={fuel} />
        )}

        {/* ============== FILA 2 COL 2: PRODUCTIVIDAD (INVARIABLE) — interior dinámico condicional por tipo (ProductivityPanel.tsx) ============== */}
        {selectedMachine && (
          <ProductivityPanel productivity={productivity} machine={selectedMachine} />
        )}

        {/* ============== FILA 2 COL 3: PITCH & ROLL (MOVEMENT PANEL) (INVARIABLE 7/7) ============== */}
        <MovementPanel imu={imu} />
      </div>
    </div>
  )
}
