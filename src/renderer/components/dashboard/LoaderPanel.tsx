import { Target } from 'lucide-react'
import SectionPanel from '../SectionPanel'
import ProgressBar from '../ProgressBar'
import { GiMineTruck as LoaderIcon } from 'react-icons/gi'
import { ProductivityData, OperationData, FuelData, Machine } from '../../types'

interface LoaderPanelProps {
  productivity: Pick<ProductivityData, 'cyclesCompleted' | 'tonsMoved' | 'avgCycleTime' | 'performance'>
  operation: Pick<OperationData, 'mode'>
  fuel: Pick<FuelData, 'todayConsumption'>
  machine: Pick<Machine, 'category' | 'name' | 'model' | 'imageUrl' | 'type'>
}

export default function LoaderPanel({ productivity, operation, fuel, machine }: LoaderPanelProps) {
  const targetPayload = 5.0
  const currentPayload = 4.8
  const payloadPct = Math.round((currentPayload / targetPayload) * 100)
  const actualMode = operation.mode === 'TRABAJANDO' ? 'CARGANDO' : operation.mode

  return (
    <SectionPanel
      title={machine.category}
      icon={<LoaderIcon size={18} style={{ color: '#F59E0B' }} className="md:w-[18px] md:h-[18px] lg:w-[22px] lg:h-[22px] xl:w-[24px] xl:h-[24px]" />}
      iconColor="text-status-warning"
      titleColorClass="text-status-warning"
      borderClass="border-status-warning/60"
      grow
      centerTitle
    >
      <div className="p-[2px] md:p-[2px] lg:p-[3px] xl:p-1 h-full flex flex-col min-h-0 gap-[2px] md:gap-[3px] lg:gap-0.5">
        <div className="grid grid-cols-2 flex-1 min-h-0 gap-[2px] md:gap-[3px] lg:gap-0.5">
          {/* ========== COL IZQUIERDA: DATOS OPERATIVOS ========== */}
          <div className="flex flex-col min-w-0 h-full px-[2px] md:px-[3px] lg:px-1 py-[1px] md:py-[2px] gap-[2px] md:gap-[3px] lg:gap-0.5">
            <div className="flex flex-col gap-[1px] min-w-0">
              <div className="text-[6.5px] md:text-[7px] lg:text-[7.5px] xl:text-[8.5px] text-gray-300 uppercase tracking-wider font-semibold whitespace-nowrap">MODO ACTUAL</div>
              <div className="flex items-center gap-0.5 min-w-0">
                <div className="w-1.5 h-1.5 rounded-full bg-status-ok animate-pulse shadow-[0_0_6px_rgba(16,185,129,0.7)]" />
                <span className="text-base md:text-lg lg:text-xl xl:text-2xl font-black uppercase tracking-wide leading-none" style={{ color: '#10B981' }}>
                  {actualMode}
                </span>
              </div>
            </div>

            <div className="border-t border-industrial-700/60" />

            <div className="flex flex-col gap-[1px] min-w-0">
              <div className="text-[6.5px] md:text-[7px] lg:text-[7.5px] xl:text-[8.5px] text-gray-300 uppercase tracking-wider font-semibold whitespace-nowrap">CICLO ACTUAL</div>
              <div className="flex items-baseline gap-0.5 min-w-0">
                <span className="font-mono font-black text-xl md:text-2xl lg:text-3xl xl:text-4xl text-white leading-none tracking-tighter">
                  {productivity.cyclesCompleted % 100}
                </span>
              </div>
            </div>

            <div className="border-t border-industrial-700/60" />

            <div className="flex flex-col gap-[1px] min-w-0">
              <div className="text-[6.5px] md:text-[7px] lg:text-[7.5px] xl:text-[8.5px] text-gray-300 uppercase tracking-wider font-semibold whitespace-nowrap">CARGA ÚTIL ESTIMADA</div>
              <div className="flex items-baseline gap-0.5 min-w-0">
                <span className="font-mono font-black text-xl md:text-2xl lg:text-3xl xl:text-4xl text-white leading-none tracking-tighter">
                  {currentPayload.toFixed(1)}
                </span>
                <span className="text-[10px] md:text-xs lg:text-sm font-bold leading-none mb-0.5" style={{ color: '#F59E0B' }}>ton</span>
              </div>
            </div>

            <div className="border-t border-industrial-700/60" />

            <div className="flex flex-col gap-[1px] min-w-0">
              <div className="text-[6.5px] md:text-[7px] lg:text-[7.5px] xl:text-[8.5px] text-gray-300 uppercase tracking-wider font-semibold whitespace-nowrap">TIEMPO CICLO</div>
              <div className="flex items-baseline gap-0.5 min-w-0">
                <span className="font-mono font-black text-xl md:text-2xl lg:text-3xl xl:text-4xl text-white leading-none tracking-tighter">
                  {Math.round(productivity.avgCycleTime)}
                </span>
                <span className="text-[10px] md:text-xs lg:text-sm text-gray-400 font-bold leading-none mb-0.5">seg</span>
              </div>
            </div>
          </div>

          {/* ========== COL DERECHA: IMAGEN CARGADOR + PESO OBJETIVO ========== */}
          <div className="flex flex-col min-w-0 h-full px-[2px] md:px-[3px] lg:px-1 py-[1px] md:py-[2px] gap-[2px] md:gap-[3px] lg:gap-0.5">
            <div className="flex flex-col gap-[1px] min-w-0">
              <div className="flex items-center justify-between gap-0.5 min-w-0">
                <div className="text-[6.5px] md:text-[7px] lg:text-[7.5px] xl:text-[8.5px] text-gray-300 uppercase tracking-wider font-semibold whitespace-nowrap">PESO OBJETIVO</div>
                <Target size={16} className="text-white/80 md:w-[16px] md:h-[16px] lg:w-[18px] lg:h-[18px] flex-shrink-0" />
              </div>
              <div className="flex items-center justify-between gap-1 min-w-0">
                <div className="flex items-baseline gap-0.5 min-w-0">
                  <span className="font-mono font-black text-lg md:text-xl lg:text-2xl xl:text-3xl text-white leading-none tracking-tighter">
                    {targetPayload.toFixed(1)}
                  </span>
                  <span className="text-[9px] md:text-[10px] lg:text-xs text-gray-400 font-bold leading-none mb-0.5">ton</span>
                </div>
              </div>
              <div className="w-full min-w-0 mt-[1px]">
                <ProgressBar value={payloadPct} color="bg-status-ok" height="h-2 md:h-2.5 lg:h-3" rounded />
                <div className="flex justify-between text-[6px] md:text-[6.5px] lg:text-[7px] text-gray-400 font-semibold mt-[1px] tracking-wider">
                  <span>0</span>
                  <span>2.5</span>
                  <span>5.0</span>
                </div>
              </div>
            </div>

            <div className="flex-1 min-h-0 flex items-center justify-center w-full overflow-hidden relative bg-industrial-900/30 rounded-md">
              <img
                src={machine.imageUrl}
                alt={`${machine.name} ${machine.model}`}
                className="absolute right-[8%] md:right-[-1%] lg:right-[6%] bottom-[-5%] md:bottom-[-5%] lg:bottom-[-2%] w-[60%] md:w-[42%] lg:w-[65%] object-contain pointer-events-none z-0"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </SectionPanel>
  )
}
