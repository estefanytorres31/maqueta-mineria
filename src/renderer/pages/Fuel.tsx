import { useState } from 'react'
import { 
  Fuel as FuelIcon, 
  ArrowDownToLine, 
  ArrowUpFromLine,
  Info,
  CircleDot,
  ToggleLeft,
  ToggleRight
} from 'lucide-react'
import { useTelemetryStore } from '../stores/telemetryStore'
import { useSettingsStore } from '../stores/settingsStore'
import Panel from '../components/Panel'
import FuelTank from '../components/FuelTank'
import KpiCard from '../components/KpiCard'
import ProgressBar from '../components/ProgressBar'
import { useDateTime } from '../hooks/useDateTime'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend,
  BarChart, Bar
} from 'recharts'

type TimeRange = '1H' | '6H' | '12H' | '24H'

export default function Fuel() {
  const { telemetry } = useTelemetryStore()
  const { fuel } = telemetry
  const { display, updateDisplay } = useSettingsStore()
  const [timeRange, setTimeRange] = useState<TimeRange>(display.timeRange as TimeRange)
  const { time24 } = useDateTime()

  const timeRanges: TimeRange[] = ['1H', '6H', '12H', '24H']

  const pieData = [
    { name: 'TRABAJANDO', value: fuel.workingConsumption, color: '#10B981', pct: 73.8 },
    { name: 'RALENTÍ', value: fuel.idleConsumption, color: '#F59E0B', pct: 8.8 },
    { name: 'INOPERATIVO', value: fuel.inoperativeConsumption, color: '#3B82F6', pct: 17.4 }
  ]

  const distributionData = [
    { name: 'TRABAJANDO', value: fuel.workingConsumption, color: '#10B981' },
    { name: 'RALENTÍ', value: fuel.idleConsumption, color: '#F59E0B' },
    { name: 'INOPERATIVO', value: fuel.inoperativeConsumption, color: '#3B82F6' }
  ]

  return (
    <div className="w-full h-full flex flex-col gap-3 lg:gap-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <FuelIcon size={22} className="text-fuel-primary" />
            <h2 className="text-xl md:text-2xl font-bold text-white">COMBUSTIBLE</h2>
          </div>
          <p className="text-gray-400 text-sm">Monitoreo y control de combustible en tiempo real.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-xs text-gray-400">
            ÚLTIMA ACTUALIZACIÓN: <span className="text-gray-200 font-mono font-semibold">{time24}</span>
          </div>
          <div className="flex items-center gap-2 bg-industrial-800 border border-industrial-700 rounded-lg px-3 py-2">
            <span className="text-xs text-gray-400">AUTO</span>
            {display.autoRefresh ? (
              <ToggleRight size={22} className="text-electric-400 cursor-pointer" onClick={() => updateDisplay({ autoRefresh: false })} />
            ) : (
              <ToggleLeft size={22} className="text-gray-500 cursor-pointer" onClick={() => updateDisplay({ autoRefresh: true })} />
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-3">
        <KpiCard label="CONSUMO INSTANTÁNEO" value={fuel.instantConsumption.toFixed(1)} unit="gal/h" color="text-fuel-primary" />
        <KpiCard label="CONSUMO PROMEDIO" value={fuel.avgConsumption.toFixed(1)} unit="gal/h" subValue="Últ. 1 hora" />
        <KpiCard label="CONSUMO HOY" value={fuel.todayConsumption.toFixed(1)} unit="gal" subValue="Total día" />
        <KpiCard label="CONSUMO EN RALENTÍ HOY" value={fuel.idleTodayConsumption.toFixed(1)} unit="gal" subValue={`${((fuel.idleTodayConsumption/fuel.todayConsumption)*100).toFixed(1)}%`} />
        <KpiCard label="AUTONOMÍA ESTIMADA" value={fuel.autonomy.toFixed(1)} unit="h" color="text-status-ok" />
        <KpiCard label="NIVEL TANQUE" value={fuel.tankLevel.toFixed(0)} unit="%" color={fuel.tankLevel < 30 ? 'text-status-danger' : 'text-fuel-primary'} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-4 flex-1 min-h-0">
        <Panel title="NIVEL DE COMBUSTIBLE" className="lg:col-span-3">
          <div className="flex flex-col items-center h-full justify-center">
            <FuelTank level={fuel.tankLevel} capacity={fuel.tankCapacity} width={120} height={200} />
            <div className="w-full mt-4 pt-3 border-t border-industrial-700 text-xs text-gray-500 flex items-center gap-1.5">
              <Info size={12} />
              ÚLTIMA CALIBRACIÓN <span className="text-gray-300 font-mono ml-auto">18/05/2024</span>
            </div>
          </div>
        </Panel>

        <Panel 
          title="CONSUMO DE COMBUSTIBLE (gal/h)" 
          className="lg:col-span-6"
          actions={
            <div className="flex gap-1">
              {timeRanges.map(r => (
                <button
                  key={r}
                  onClick={() => {
                    setTimeRange(r)
                    updateDisplay({ timeRange: r })
                  }}
                  className={`px-2.5 py-1 text-xs font-bold rounded transition-all ${
                    timeRange === r
                      ? 'bg-electric-500 text-white'
                      : 'bg-industrial-700 text-gray-400 hover:text-white'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          }
        >
          <ResponsiveContainer width="100%" height="100%" minHeight={200}>
            <LineChart data={fuel.consumptionHistory} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1C2B3F" vertical={false} />
              <XAxis dataKey="time" stroke="#4B5563" tick={{ fontSize: 10, fill: '#4B5563' }} axisLine={false} tickLine={false} />
              <YAxis stroke="#4B5563" tick={{ fontSize: 10, fill: '#4B5563' }} axisLine={false} tickLine={false} domain={[0, 30]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0D141E',
                  border: '1px solid #253A54',
                  borderRadius: 8,
                  fontSize: 12,
                  color: '#E5E7EB'
                }}
                labelStyle={{ color: '#9CA3AF', marginBottom: 4 }}
                itemStyle={{ color: '#F59E0B' }}
              />
              <Line
                type="monotone"
                dataKey="value"
                name="Consumo instantáneo (gal/h)"
                stroke="#F59E0B"
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 4, fill: '#F59E0B', stroke: '#0D141E', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Panel>

        <Panel title="CONSUMO POR MODO" className="lg:col-span-3">
          <div className="flex flex-col h-full">
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  dataKey="value"
                  paddingAngle={2}
                >
                  {pieData.map((entry, i) => (
                    <Cell key={`cell-${i}`} fill={entry.color} stroke="#0D141E" strokeWidth={2} />
                  ))}
                </Pie>
                <Legend
                  layout="vertical"
                  align="right"
                  verticalAlign="middle"
                  iconType="rect"
                  wrapperStyle={{ fontSize: 11, color: '#9CA3AF' }}
                  formatter={(value: any, entry: any) => (
                    <span className="text-gray-300">
                      <span style={{ color: entry.color }} className="font-bold">{value}</span>
                      <span className="text-gray-500 ml-1">
                        {entry.payload.value.toFixed(1)} ({entry.payload.pct}%)
                      </span>
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-auto pt-3 border-t border-industrial-700 text-center">
              <div className="text-xs text-gray-500">TOTAL</div>
              <div className="text-xl font-mono font-bold text-white">
                {fuel.todayConsumption.toFixed(1)} <span className="text-sm text-gray-400">gal</span>
              </div>
            </div>
          </div>
        </Panel>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-4">
        <Panel title="FLUJO DE COMBUSTIBLE" className="lg:col-span-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-industrial-850 rounded-lg border border-industrial-700 p-3">
              <div className="flex items-center gap-1.5 mb-2">
                <ArrowDownToLine size={14} className="text-status-ok" />
                <span className="text-[10px] uppercase text-gray-400 tracking-wider font-semibold">INGRESO (SUMINISTRO)</span>
              </div>
              <div className="font-mono font-bold text-2xl text-status-ok">
                {fuel.supplyFlow.toFixed(1)} <span className="text-xs text-gray-400">gal/h</span>
              </div>
              <div className="text-3xl text-center mt-2 opacity-50">⚙️</div>
              <ProgressBar value={fuel.supplyFlow / 20 * 100} color="bg-status-ok" height="h-1.5" showValue={false} />
            </div>
            <div className="bg-industrial-850 rounded-lg border border-industrial-700 p-3">
              <div className="flex items-center gap-1.5 mb-2">
                <ArrowUpFromLine size={14} className="text-electric-400" />
                <span className="text-[10px] uppercase text-gray-400 tracking-wider font-semibold">RETORNO</span>
              </div>
              <div className="font-mono font-bold text-2xl text-electric-400">
                {fuel.returnFlow.toFixed(1)} <span className="text-xs text-gray-400">gal/h</span>
              </div>
              <div className="text-3xl text-center mt-2 opacity-50">⚙️</div>
              <ProgressBar value={fuel.returnFlow / 1 * 100} color="bg-electric-400" height="h-1.5" showValue={false} />
            </div>
          </div>
        </Panel>

        <Panel title="DISTRIBUCIÓN DE CONSUMO HOY" className="lg:col-span-5">
          <div className="space-y-4">
            {distributionData.map(item => (
              <div key={item.name}>
                <div className="flex justify-between items-center mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded" style={{ backgroundColor: item.color }} />
                    <span className="text-xs font-semibold text-gray-300 uppercase">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-white text-sm">
                      {item.value.toFixed(1)} <span className="text-xs text-gray-400">gal</span>
                    </span>
                    <span className="text-xs text-gray-500 font-mono w-14 text-right">
                      {((item.value / fuel.todayConsumption) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
                <div className="h-5 rounded-md bg-industrial-750 overflow-hidden border border-industrial-700">
                  <div
                    className="h-full rounded-md transition-all duration-700 flex items-center justify-end px-2"
                    style={{
                      width: `${(item.value / fuel.todayConsumption) * 100}%`,
                      backgroundColor: item.color,
                      boxShadow: `0 0 10px ${item.color}60`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="HISTORIAL DE CONSUMO DIARIO (gal)" className="lg:col-span-4">
          <div className="space-y-3">
            <ResponsiveContainer width="100%" height={150}>
              <BarChart data={fuel.dailyHistory} layout="vertical" margin={{ top: 0, right: 20, left: 60, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1C2B3F" horizontal={false} />
                <XAxis type="number" stroke="#4B5563" tick={{ fontSize: 10, fill: '#4B5563' }} axisLine={false} tickLine={false} />
                <YAxis dataKey="date" type="category" stroke="#4B5563" tick={{ fontSize: 10, fill: '#9CA3AF' }} axisLine={false} tickLine={false} width={60} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0D141E', border: '1px solid #253A54', borderRadius: 8, fontSize: 12 }}
                  cursor={{ fill: '#162233' }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={12}>
                  {fuel.dailyHistory.map((entry, i) => (
                    <Cell 
                      key={`cell-${i}`} 
                      fill={i === fuel.dailyHistory.length - 1 ? '#F59E0B' : '#253A54'} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>
      </div>

      <div className="bg-industrial-800 border border-industrial-700 rounded-lg px-4 py-2.5 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2 text-status-ok">
          <Info size={18} className="flex-shrink-0" />
          <div>
            <div className="text-sm font-bold">SIN ALERTAS DE COMBUSTIBLE</div>
            <div className="text-xs text-gray-400">Todos los parámetros dentro de rango normal.</div>
          </div>
        </div>
        <div className="flex items-center gap-4 md:gap-6 text-xs">
          {['FLUJÓMETROS', 'NIVEL TANQUE', 'FILTRO COMBUSTIBLE', 'SENSOR TEMP.'].map(l => (
            <div key={l} className="flex items-center gap-1.5">
              <span className="text-gray-400">{l}</span>
              <div className="flex items-center gap-1">
                <CircleDot size={10} className="text-status-ok" fill="currentColor" />
                <span className="text-status-ok font-bold">OK</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
