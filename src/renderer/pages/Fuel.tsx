import { Fuel as FuelIcon, ToggleRight, ToggleLeft } from 'lucide-react'
import { useTelemetryStore } from '../stores/telemetryStore'
import { useSettingsStore } from '../stores/settingsStore'
import { useDateTime } from '../hooks/useDateTime'
import FuelKPIs from '../components/fuel/FuelKPIs'
import TankLevel from '../components/fuel/TankLevel'
import FuelConsumptionChart, { type TimeRange } from '../components/fuel/FuelConsumptionChart'
import ConsumptionModeChart, { type ModeSlice } from '../components/fuel/ConsumptionModeChart'
import FuelFlow from '../components/fuel/FuelFlow'
import ConsumptionDistribution from '../components/fuel/ConsumptionDistribution'
import DailyHistory from '../components/fuel/DailyHistory'
import FuelStatusFooter from '../components/fuel/FuelStatusFooter'
import Flujometro from '../../../public/combustible/flujometro.png'


export default function Fuel() {
  const { telemetry } = useTelemetryStore()
  const { fuel } = telemetry
  const { display, updateDisplay } = useSettingsStore()
  const { time24 } = useDateTime()

  const total = fuel.todayConsumption
  const modes: ModeSlice[] = [
    { name: 'TRABAJANDO', value: fuel.workingConsumption, pct: (fuel.workingConsumption / total) * 100, color: '#7CB518' },
    { name: 'RALENTÍ', value: fuel.idleConsumption, pct: (fuel.idleConsumption / total) * 100, color: '#F59E0B' },
    { name: 'INOPERATIVO', value: fuel.inoperativeConsumption, pct: (fuel.inoperativeConsumption / total) * 100, color: '#2F86E8' }
  ]

  return (
    /* Zero-scroll: la página ocupa exactamente el alto disponible entre Header y BottomNavigation */
    <div className="flex h-full w-full flex-col gap-2 overflow-hidden p-2 xl:gap-3 xl:p-3">

      {/* Encabezado del contenedor central */}
      <div className="flex flex-none items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <FuelIcon size={24} className="text-fuel-primary" />
          <div>
            <h2 className="text-lg font-bold leading-none tracking-wide text-white xl:text-xl 2xl:text-[22px]">COMBUSTIBLE</h2>
            <p className="mt-0.5 text-[10px] text-gray-400 xl:text-[11px]">Monitoreo y control de combustible en tiempo real</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-[10px] tracking-wide text-gray-400">
            ÚLTIMA ACTUALIZACIÓN: <span className="font-mono font-semibold text-gray-200">{time24}</span>
          </div>
          <button
            onClick={() => updateDisplay({ autoRefresh: !display.autoRefresh })}
            className="flex items-center gap-2 rounded-lg border border-industrial-700 bg-industrial-800 px-2.5 py-1.5"
          >
            <span className="text-[10px] tracking-wide text-gray-400">AUTO</span>
            {display.autoRefresh
              ? <ToggleRight size={20} className="text-status-ok" />
              : <ToggleLeft size={20} className="text-gray-500" />}
          </button>
        </div>
      </div>

      <FuelKPIs
        instant={fuel.instantConsumption}
        average={fuel.avgConsumption}
        today={fuel.todayConsumption}
        idleToday={fuel.idleTodayConsumption}
        idlePct={(fuel.idleTodayConsumption / total) * 100}
        autonomy={fuel.autonomy}
        tankLevel={fuel.tankLevel}
      />

      {/* Dos filas que reparten el alto restante: sin scroll en md+ */}
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-2 md:grid-cols-12 md:grid-rows-[1.06fr_1fr] xl:gap-3">
        <TankLevel level={fuel.tankLevel} capacity={fuel.tankCapacity} />
        <FuelConsumptionChart
          data={fuel.consumptionHistory}
          range={display.timeRange as TimeRange}
          onRangeChange={r => updateDisplay({ timeRange: r })}
        />
        <ConsumptionModeChart data={modes} total={total} />
        <FuelFlow supply={fuel.supplyFlow} supplyImg={Flujometro} returnFlow={fuel.returnFlow} returnImg={Flujometro} />
        <ConsumptionDistribution data={modes} />
        <DailyHistory data={fuel.dailyHistory} />
      </div>

      <FuelStatusFooter />
    </div>
  )
}
