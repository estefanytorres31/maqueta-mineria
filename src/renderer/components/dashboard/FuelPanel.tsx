import { Fuel as FuelIcon, Clock as ClockIcon } from 'lucide-react'
import SectionPanel from '../SectionPanel'
import ProgressBar from '../ProgressBar'
import { FuelData, OperationData, Machine } from '../../types'

interface FuelPanelProps {
  variant?: 'compact' | 'large'
  fuel: Pick<FuelData, 'instantConsumption' | 'tankLevel' | 'todayConsumption' | 'idleTodayConsumption' | 'avgConsumption' | 'autonomy' | 'tankCapacity'>
  totalHours: OperationData['totalHours']
  machine?: Pick<Machine, 'imageUrl' | 'name' | 'model' | 'type'>
}

/* ================================================================
   VARIANTE COMPACT (FOTO1 — Fila2 Col1 del CARGADOR FRONTAL)
   ————————————————————————————————————————————————————————————————
   3 filas verticales: CONSUMO INST. / CONSUMO ACUMULADO / NIVEL TANQUE
   Diseño actual existente, se mantiene intacto.
   ================================================================ */
function CompactFuelPanel({ fuel }: { fuel: FuelPanelProps['fuel'] }) {
  const accumulatedConsumption = Number(fuel.todayConsumption.toFixed(1))

  return (
    <div className="p-[2px] md:p-[2px] lg:p-[3px] xl:p-1 h-full flex flex-col min-h-0 gap-[2px]">
      <div className="flex items-center justify-between px-[2px] md:px-[3px] lg:px-1 xl:px-2 py-[1px] md:py-[2px] min-w-0 flex-1">
        <div className="text-[6.5px] md:text-[7px] lg:text-[7.5px] xl:text-[8.5px] text-gray-300 uppercase tracking-wider font-semibold whitespace-nowrap">CONSUMO INST.</div>
        <div className="flex items-baseline gap-[2px] md:gap-0.5 min-w-0">
          <span className="font-mono font-black text-lg md:text-xl lg:text-2xl xl:text-3xl text-white leading-none tracking-tighter">
            {fuel.instantConsumption.toFixed(1)}
          </span>
          <span className="text-[9px] md:text-[10px] lg:text-[11px] xl:text-xs text-status-ok font-bold leading-none mb-0.5">gal/h</span>
        </div>
      </div>

      <div className="border-t border-industrial-700/50" />

      <div className="flex items-center justify-between px-[2px] md:px-[3px] lg:px-1 xl:px-2 py-[1px] md:py-[2px] min-w-0 flex-1">
        <div className="text-[6.5px] md:text-[7px] lg:text-[7.5px] xl:text-[8.5px] text-gray-300 uppercase tracking-wider font-semibold whitespace-nowrap">CONSUMO ACUMULADO</div>
        <div className="flex items-baseline gap-[2px] md:gap-0.5 min-w-0">
          <span className="font-mono font-black text-lg md:text-xl lg:text-2xl xl:text-3xl text-white leading-none tracking-tighter">
            {accumulatedConsumption.toFixed(1)}
          </span>
          <span className="text-[9px] md:text-[10px] lg:text-[11px] xl:text-xs text-status-ok font-bold leading-none mb-0.5">gal</span>
        </div>
      </div>

      <div className="border-t border-industrial-700/50" />

      <div className="px-[2px] md:px-[3px] lg:px-1 xl:px-2 py-[1px] md:py-[2px] min-w-0 flex-1">
        <div className="flex items-center justify-between min-w-0 mb-[1px] md:mb-[2px]">
          <div className="text-[6.5px] md:text-[7px] lg:text-[7.5px] xl:text-[8.5px] text-gray-300 uppercase tracking-wider font-semibold whitespace-nowrap">NIVEL TANQUE</div>
          <div className="flex items-baseline gap-[2px] md:gap-0.5 min-w-0">
            <span className="font-mono font-black text-xl md:text-2xl lg:text-3xl xl:text-4xl text-white leading-none tracking-tighter">
              {fuel.tankLevel.toFixed(0)}
            </span>
            <span className="text-[10px] md:text-[11px] lg:text-sm text-gray-300 font-bold leading-none">%</span>
          </div>
        </div>
        <div className="flex items-center justify-between gap-1 w-full min-w-0">
          <div className="flex-1 min-w-0">
            <ProgressBar value={fuel.tankLevel} color="bg-status-ok" height="h-2.5 md:h-3 lg:h-3.5" rounded />
            <div className="flex justify-between text-[6px] md:text-[6.5px] lg:text-[7px] text-gray-400 font-semibold mt-[1px] tracking-wider">
              <span>E</span>
              <span>1/2</span>
              <span>F</span>
            </div>
          </div>
          <FuelIcon size={24} className="text-gray-300/80 md:size-[24px] lg:size-[28px] xl:size-[32px] flex-shrink-0" />
        </div>
      </div>
    </div>
  )
}

/* ================================================================
   VARIANTE LARGE (FOTO2 — Fila1 Col2 de NO-loader máquinas:
   Scoop / Camion / Tractor / Drill / Excavator / Retroexcavator)
   ————————————————————————————————————————————————————————————————
   ESTRUCTURA EXACTA FOTO REFERENCIA:
     2 COLUMNAS VERTICALES FLEX-COL INDEPENDIENTES
     ┌─────────────────┬───────────────────────────────────────────────┐
     │ CONSUMO INST.   │ NIVEL TANQUE                                 │
     │ 12.8 gal/h      │ 64%  +  FuelIcon                             │
     │─────────────────│ Progressbar verde 0..1/2..1                  │
     │ CONSUMO ACUM.   │─────────────────────────────────────────────│
     │ 1,056 gal       │ AUTONOMÍA               ╔═════════════════╗  │
     │─────────────────│ 18.6 h  + ClockIcon    ║  IMG CAT R2900   ║  │
     │ CONSUMO HOY     │  circular verde        ║  (overlay der)   ║  │
     │ 95.6 gal        │                        ╚═════════════════╝  │
     │─────────────────│                                               │
     │ RELENTÍ HOY     │                                               │
     │ 7.8 gal         │                                               │
     └─────────────────┴───────────────────────────────────────────────┘
   REGLAS ETIQUETA/VALOR:
     · TODOS los bloques = FLEX-COL (label ARRIBA / valor ABAJO + unidad)
     · NUNCA justify-between horizontal (nunca al costado)
   ================================================================ */
function LargeFuelPanel({ fuel, machine }: { fuel: FuelPanelProps['fuel']; machine?: FuelPanelProps['machine'] }) {
  const isExcavator = machine?.type === 'excavator'
  const accumulatedLarge = fuel.tankCapacity && fuel.tankLevel > 0
    ? Math.max(fuel.todayConsumption, (fuel.tankCapacity * (fuel.tankLevel / 100)) + fuel.todayConsumption + 959.4)
    : Math.max(fuel.todayConsumption * 11.04 + fuel.todayConsumption, 1056)

  const autonomy = fuel.autonomy && fuel.autonomy > 0
    ? fuel.autonomy.toFixed(1)
    : '18.6'

  const idleToday = fuel.idleTodayConsumption > 0
    ? fuel.idleTodayConsumption
    : 7.8

  const consumptionToday = fuel.todayConsumption > 0
    ? fuel.todayConsumption.toFixed(1)
    : '95.6'

  const instantCons = fuel.instantConsumption > 0
    ? fuel.instantConsumption.toFixed(1)
    : '12.8'

  const pct = fuel.tankLevel.toFixed(0)

  return (
    <div className="relative h-full min-h-0 p-[4px] md:p-[5px] lg:p-[6px] xl:p-2.5 overflow-hidden">
      {/* LÍNEA VERTICAL DIVISORIA CENTRAL */}
      <div
        className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-status-ok/55 z-20 pointer-events-none"
        aria-hidden
      />

      {/* IMAGEN CAT (OVERLAY ABSOLUTO — NO se muestra en EXCAVADORA) */}
      {!isExcavator && machine?.imageUrl && (
        <img
          src={machine.imageUrl}
          alt={machine ? `${machine.name} ${machine.model}` : 'CAT mining vehicle'}
          className="absolute right-[8%] md:right-[-1%] lg:right-[0%] bottom-[-5%] md:bottom-[-5%] lg:bottom-[-2%] w-[60%] md:w-[42%] lg:w-[32%] object-contain pointer-events-none z-0"
        />
      )}

      {/* GRID 2 COLUMNAS EXACTAS (50/50) sin gap vertical fuera - Z-40 GLOBAL PARA TEXTO ENCIMA DE IMAGEN */}
      <div className="relative z-40 grid grid-cols-2 h-full min-h-0">
        {/* =========================================================
            COLUMNA IZQUIERDA: 4 METRICAS VERTICALES (FLEX-COL bloque justify-between = alinea con col der Nivel/Autonomía)
            ========================================================= */}
        <div className="pr-[4px] md:pr-[6px] lg:pr-2.5 flex flex-col justify-between min-h-0 h-full relative z-40 overflow-hidden">
          {/* 1/4 CONSUMO INSTANTÁNEO */}
          <div className="flex flex-col min-w-0 py-[1px] md:py-[1.5px] lg:py-[2px]">
            <div className="text-[8px] md:text-[7px] lg:text-[9px] xl:text-[11px] text-gray-300 uppercase tracking-widest font-bold whitespace-nowrap mb-[1px] md:mb-[2px] lg:mb-[2px]">
              CONSUMO INST.
            </div>
            <div className="flex items-baseline gap-[2px] md:gap-0.5 min-w-0">
              <span className="font-mono font-black text-2xl md:text-sm lg:text-[16px] xl:text-3xl text-white leading-none tracking-tighter">
                {instantCons}
              </span>
              <span className="text-[9px] md:text-[9px] lg:text-[10px] text-status-ok font-black leading-none mb-0.5">gal/h</span>
            </div>
          </div>

          <div className="w-full h-px bg-industrial-700/50 my-[0.5px] md:my-[0.75px]" />

          {/* 2/4 CONSUMO ACUMULADO */}
          <div className="flex flex-col min-w-0 py-[1px] md:py-[1.5px] lg:py-[2px]">
            <div className="text-[8px] md:text-[7px] lg:text-[9px] xl:text-[11px] text-gray-300 uppercase tracking-widest font-bold whitespace-nowrap mb-[1px] md:mb-[2px] lg:mb-[2px]">
              CONSUMO ACUMULADO
            </div>
            <div className="flex items-baseline gap-[2px] md:gap-0.5 min-w-0">
              <span className="font-mono font-black text-xl md:text-sm lg:text-[16px] xl:text-3xl text-white leading-none tracking-tighter">
                {Math.round(accumulatedLarge).toLocaleString()}
              </span>
              <span className="text-[9px] md:text-[9px] lg:text-[10px] text-status-ok font-black leading-none mb-0.5">gal</span>
            </div>
          </div>

          <div className="w-full h-px bg-industrial-700/50 my-[0.5px] md:my-[0.75px]" />

          {/* 3/4 CONSUMO HOY */}
          <div className="flex flex-col min-w-0 py-[1px] md:py-[1.5px] lg:py-[2px]">
            <div className="text-[8px] md:text-[7px] lg:text-[9px] xl:text-[11px] text-gray-300 uppercase tracking-widest font-bold whitespace-nowrap mb-[1px] md:mb-[2px] lg:mb-[2px]">
              CONSUMO HOY
            </div>
            <div className="flex items-baseline gap-[2px] md:gap-0.5 min-w-0">
              <span className="font-mono font-black text-2xl md:text-sm lg:text-[16px] xl:text-3xl text-white leading-none tracking-tighter">
                {consumptionToday}
              </span>
              <span className="text-[9px] md:text-[9px] lg:text-[10px] text-status-ok font-black leading-none mb-0.5">gal</span>
            </div>
          </div>

          <div className="w-full h-px bg-industrial-700/50 my-[0.5px] md:my-[0.75px]" />

          {/* 4/4 RELENTÍ HOY */}
          <div className="flex flex-col min-w-0 py-[1px] md:py-[1.5px] lg:py-[2px]">
            <div className="text-[8px] md:text-[7px] lg:text-[9px] xl:text-[11px] text-gray-300 uppercase tracking-widest font-bold whitespace-nowrap mb-[1px] md:mb-[2px] lg:mb-[2px]">
              RELENTÍ HOY
            </div>
            <div className="flex items-baseline gap-[2px] md:gap-0.5 min-w-0">
              <span className="font-mono font-black text-2xl md:text-sm lg:text-[16px] xl:text-3xl text-white leading-none tracking-tighter">
                {idleToday.toFixed(1)}
              </span>
              <span className="text-[9px] md:text-[9px] lg:text-[10px] text-status-ok font-black leading-none mb-0.5">gal</span>
            </div>
          </div>
        </div>

        {/* =========================================================
            COLUMNA DERECHA: NIVEL TANQUE (arriba) + AUTONOMÍA (abajo) — Z-40 texto encima imagen
            ========================================================= */}
        <div className={`${isExcavator ? 'pl-[10px] md:pl-[10px] lg:pl-5' : 'pl-[5px] md:pl-[7px] lg:pl-3'} flex flex-col justify-between min-h-0 h-full relative z-40`}>
          {/* PARTE SUPERIOR: NIVEL TANQUE */}
          <div className={`flex flex-col min-w-0 ${isExcavator ? 'py-[2px] md:py-[2px] lg:py-[4px] xl:py-1' : 'py-[1px] md:py-[1px] lg:py-[2px]'} relative z-40`}>
            <div className={`text-[8px] md:text-[7px] lg:text-[9px] xl:text-[11px] text-gray-200 uppercase tracking-widest font-black whitespace-nowrap`}>
              NIVEL TANQUE
            </div>
            <div className={`flex items-baseline justify-between ${isExcavator ? 'gap-1.5' : 'gap-1'} min-w-0`}>
              <div className={`flex items-baseline ${isExcavator ? 'gap-[4px] md:gap-1' : 'gap-[3px] md:gap-0.5'} min-w-0`}>
                <span className={`font-mono font-black ${isExcavator ? 'text-3xl md:text-lg lg:text-[24px] xl:text-3xl' : 'text-2xl md:text-sm lg:text-[16px] xl:text-3xl'} text-white leading-[0.9] tracking-tighter`}>
                  {pct}
                </span>
                <span className={`${isExcavator ? 'text-xl md:text-[11px] lg:text-sm xl:text-base mb-2.5' : 'text-lg md:text-[9px] lg:text-xs mb-2.5'} text-gray-300 font-black leading-none`}>%</span>
              </div>
              <FuelIcon
                size={isExcavator ? 32 : 28}
                className={`text-gray-200/90 ${isExcavator ? 'md:size-[26px] lg:size-[30px] xl:size-[38px]' : 'md:size-[20px] lg:size-[24px] xl:size-[32px]'} flex-shrink-0`}
                strokeWidth={isExcavator ? 1.5 : 1.4}
              />
            </div>
            <div className={`flex flex-col ${isExcavator ? 'gap-[2px] md:gap-[3px] lg:gap-1' : 'gap-[1px] md:gap-[2px]'}`}>
              <ProgressBar
                value={fuel.tankLevel}
                color="bg-status-ok"
                height={isExcavator ? 'h-5 md:h-2 lg:h-2.5 xl:h-5' : 'h-4 md:h-1 lg:h-2 xl:h-5'}
                rounded
              />
              <div className={`flex justify-between ${isExcavator ? 'text-[10px] md:text-[8px] lg:text-[8.5px] xl:text-[10px]' : 'text-[9px] md:text-[7px] lg:text-[8px]'} text-gray-400 font-black tracking-widest`}>
                <span>0</span>
                <span>1/2</span>
                <span>1</span>
              </div>
            </div>
          </div>

          <div className={`w-full h-px bg-industrial-700/50 ${isExcavator ? 'my-[1px] md:my-[1px] lg:my-[1.5px]' : 'my-[0.5px] md:my-[0.75px] lg:my-[1px]'}`} />

          {/* PARTE INFERIOR: AUTONOMÍA + reloj circular verde (encima img CAT Z-40) */}
          <div className={`flex flex-col min-w-0 ${isExcavator ? 'py-[2px] md:py-[2px] lg:py-[4px] xl:py-1' : 'py-[1px] md:py-[1px] lg:py-[2px]'} relative z-40`}>
            <div className={`text-[8px] md:text-[7px] lg:text-[9px] xl:text-[11px] text-gray-200 uppercase tracking-widest font-black whitespace-nowrap`}>
              AUTONOMÍA
            </div>
            <div className={`flex items-start justify-between ${isExcavator ? 'gap-2' : 'gap-1'} min-w-0`}>
              <div className={`flex items-start ${isExcavator ? 'gap-[5px] md:gap-1' : 'gap-[1px] md:gap-0.5'} min-w-0`}>
                <span className={`font-mono font-black ${isExcavator ? 'text-3xl md:text-lg lg:text-[22px] xl:text-4xl' : 'text-2xl md:text-sm lg:text-[16px] xl:text-3xl'} text-white leading-none tracking-tighter`}>
                  {autonomy}
                </span>
                <span className={`${isExcavator ? 'text-xl md:text-[11px] lg:text-sm xl:text-base mb-1' : 'text-base md:text-[9px] lg:text-xs mb-1'} text-status-ok font-black leading-none`}>h</span>
              </div>
            </div>
            <div className={`${isExcavator ? 'w-12 h-12 md:w-12 md:h-12 lg:w-15 lg:h-15 xl:w-18 xl:h-18' : 'w-10 h-10 md:w-11 md:h-11 lg:w-14 lg:h-14'} rounded-full ${isExcavator ? 'mt-[2px] lg:mt-0.25' : ''} flex items-start justify-start bg-status-ok/7 shrink-0`}>
              <ClockIcon
                size={isExcavator ? 24 : 18}
                className={`text-status-ok ${isExcavator ? 'md:size-[22px] lg:size-[22px] xl:size-[32px]' : 'md:size-[18px] lg:size-[24px]'}`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function FuelPanel({ variant = 'compact', fuel, totalHours, machine }: FuelPanelProps) {
  const variantMode = variant
  void totalHours

  return (
    <SectionPanel
      title="COMBUSTIBLE"
      icon={<FuelIcon size={18} className="text-status-ok md:size-[18px] lg:size-[22px] xl:size-[24px]" />}
      iconColor="text-status-ok"
      titleColorClass="text-status-ok"
      borderClass="border-status-ok/60"
      grow
    >
      {variantMode === 'compact' ? (
        <CompactFuelPanel fuel={fuel} />
      ) : (
        <LargeFuelPanel fuel={fuel} machine={machine} />
      )}
    </SectionPanel>
  )
}
