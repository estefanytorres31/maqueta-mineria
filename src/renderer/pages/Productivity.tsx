import { 
  BarChart3, 
  TrendingUp, 
  Target, 
  Timer,
  Truck,
  Activity
} from 'lucide-react'
import { useTelemetryStore } from '../stores/telemetryStore'
import Panel from '../components/Panel'
import KpiCard from '../components/KpiCard'
import ProgressBar from '../components/ProgressBar'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, ComposedChart, Area,
  Legend
} from 'recharts'

export default function Productivity() {
  const { telemetry } = useTelemetryStore()
  const { productivity, operation } = telemetry

  const hourlyData = productivity.hourlyProductivity
  const dailyData = productivity.dailyProductivity

  const objective = 1500
  const comparativeData = dailyData.map(d => ({
    ...d,
    objetivo: objective,
    diferencia: d.tons - objective
  }))

  return (
    <div className="w-full h-full flex flex-col gap-3 lg:gap-4">
      <div className="flex items-center gap-2 mb-0.5">
        <BarChart3 size={22} className="text-status-ok" />
        <h2 className="text-xl md:text-2xl font-bold text-white">PRODUCTIVIDAD</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2 md:gap-3">
        <KpiCard label="TONELADAS MOVIDAS" value={productivity.tonsMoved.toLocaleString()} unit="ton" highlight />
        <KpiCard label="CICLOS REALIZADOS" value={productivity.cyclesCompleted.toLocaleString()} unit="ciclos" />
        <KpiCard label="RENDIMIENTO" value={productivity.performance.toFixed(0)} unit="ton/h" color="text-status-ok" />
        <KpiCard label="TON/CICLO" value={(productivity.tonsMoved / Math.max(1, productivity.cyclesCompleted)).toFixed(1)} unit="ton" />
        <KpiCard label="TIEMPO PROM. CICLO" value={`00:${String(Math.floor(productivity.avgCycleTime)).padStart(2, '0')}`} unit="min" />
        <KpiCard label="CONSUMO POR TON" value={productivity.consumptionPerTon.toFixed(3)} unit="gal/ton" color="text-fuel-primary" />
        <KpiCard label="CONSUMO POR CICLO" value={productivity.consumptionPerCycle.toFixed(2)} unit="gal/ciclo" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-4 flex-1 min-h-0">
        <div className="lg:col-span-8 flex flex-col gap-3 lg:gap-4">
          <Panel title="PRODUCTIVIDAD POR HORA" icon={Activity}>
            <ResponsiveContainer width="100%" height={180}>
              <ComposedChart data={hourlyData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1C2B3F" vertical={false} />
                <XAxis dataKey="hour" stroke="#4B5563" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis yAxisId="left" stroke="#4B5563" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis yAxisId="right" orientation="right" stroke="#4B5563" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#0D141E', border: '1px solid #253A54', borderRadius: 8, fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar yAxisId="left" dataKey="tons" name="Toneladas" fill="#10B981" radius={[4, 4, 0, 0]} barSize={20} />
                <Line yAxisId="right" type="monotone" dataKey="cycles" name="Ciclos" stroke="#1E88E5" strokeWidth={2.5} dot={{ r: 3, fill: '#1E88E5' }} />
              </ComposedChart>
            </ResponsiveContainer>
          </Panel>

          <Panel title="PRODUCTIVIDAD DIARIA (ton)" icon={Truck}>
            <ResponsiveContainer width="100%" height={170}>
              <BarChart data={dailyData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1C2B3F" vertical={false} />
                <XAxis dataKey="day" stroke="#4B5563" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis stroke="#4B5563" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#0D141E', border: '1px solid #253A54', borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="tons" name="Toneladas" fill="#F59E0B" radius={[4, 4, 0, 0]} barSize={35}>
                  {dailyData.map((_, i) => (
                    <rect key={i} fill={i === dailyData.length - 1 ? '#10B981' : '#F59E0B'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Panel>

          <Panel title="COMPARATIVA OBJETIVO vs REAL" icon={Target}>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={comparativeData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#1C2B3F" horizontal={false} />
                <XAxis type="number" stroke="#4B5563" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="day" stroke="#4B5563" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} width={70} />
                <Tooltip contentStyle={{ backgroundColor: '#0D141E', border: '1px solid #253A54', borderRadius: 8, fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="tons" name="Real" fill="#1E88E5" barSize={14} radius={[0, 4, 4, 0]} />
                <Bar dataKey="objetivo" name="Objetivo" fill="#6366F1" barSize={14} radius={[0, 4, 4, 0]} opacity={0.6} />
              </BarChart>
            </ResponsiveContainer>
          </Panel>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-3 lg:gap-4">
          <Panel title="CICLOS POR HORA">
            <ResponsiveContainer width="100%" height={160}>
              <LineChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1C2B3F" vertical={false} />
                <XAxis dataKey="hour" stroke="#4B5563" tick={{ fontSize: 9 }} axisLine={false} tickLine={false} />
                <YAxis stroke="#4B5563" tick={{ fontSize: 9 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#0D141E', border: '1px solid #253A54', borderRadius: 8, fontSize: 12 }} />
                <Line type="monotone" dataKey="cycles" stroke="#10B981" strokeWidth={2.5} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </Panel>

          <Panel title="TONELADAS POR HORA">
            <ResponsiveContainer width="100%" height={160}>
              <LineChart data={hourlyData}>
                <defs>
                  <linearGradient id="tonsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1C2B3F" vertical={false} />
                <XAxis dataKey="hour" stroke="#4B5563" tick={{ fontSize: 9 }} axisLine={false} tickLine={false} />
                <YAxis stroke="#4B5563" tick={{ fontSize: 9 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#0D141E', border: '1px solid #253A54', borderRadius: 8, fontSize: 12 }} />
                <Area type="monotone" dataKey="tons" stroke="#F59E0B" strokeWidth={2.5} fill="url(#tonsGrad)" />
              </LineChart>
            </ResponsiveContainer>
          </Panel>

          <Panel title="EFICIENCIA" className="flex-1">
            <div className="space-y-5">
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs font-semibold text-gray-300 flex items-center gap-1.5">
                    <Target size={13} className="text-status-ok" />
                    CUMPLIMIENTO OBJETIVO
                  </span>
                  <span className="font-mono font-bold text-status-ok">
                    {((productivity.tonsMoved / objective) * 100).toFixed(0)}%
                  </span>
                </div>
                <ProgressBar value={(productivity.tonsMoved / objective) * 100} color="bg-status-ok" showValue={false} />
                <div className="flex justify-between text-[10px] text-gray-500 mt-1 font-mono">
                  <span>{productivity.tonsMoved.toLocaleString()} ton</span>
                  <span>Meta: {objective.toLocaleString()} ton</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs font-semibold text-gray-300 flex items-center gap-1.5">
                    <TrendingUp size={13} className="text-electric-400" />
                    EFICIENCIA OPERACIONAL
                  </span>
                  <span className="font-mono font-bold text-electric-400">
                    {operation.utilization.toFixed(0)}%
                  </span>
                </div>
                <ProgressBar value={operation.utilization} color="bg-electric-500" showValue={false} />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs font-semibold text-gray-300 flex items-center gap-1.5">
                    <Timer size={13} className="text-status-warning" />
                    TIEMPO UTIL VS RALENTÍ
                  </span>
                  <span className="font-mono font-bold text-white">
                    {((operation.effectiveHours / (operation.effectiveHours + operation.idleHours)) * 100).toFixed(0)}%
                  </span>
                </div>
                <div className="flex h-3 rounded-full overflow-hidden bg-industrial-700">
                  <div className="bg-status-ok transition-all" style={{ width: `${(operation.effectiveHours / (operation.effectiveHours + operation.idleHours)) * 100}%` }} />
                  <div className="bg-status-warning transition-all" style={{ width: `${(operation.idleHours / (operation.effectiveHours + operation.idleHours)) * 100}%` }} />
                </div>
                <div className="flex gap-3 mt-1 text-[10px] text-gray-400">
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-status-ok" />Trabajo</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-status-warning" />Ralentí</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-industrial-700">
                <div className="bg-industrial-850 border border-industrial-700 rounded-lg p-2">
                  <div className="text-[9px] text-gray-400 uppercase tracking-wider font-medium mb-0.5">GAL/TON ÓPTIMO</div>
                  <div className="font-mono font-bold text-status-ok text-sm">0.085</div>
                </div>
                <div className="bg-industrial-850 border border-industrial-700 rounded-lg p-2">
                  <div className="text-[9px] text-gray-400 uppercase tracking-wider font-medium mb-0.5">GAL/TON ACTUAL</div>
                  <div className="font-mono font-bold text-fuel-primary text-sm">{productivity.consumptionPerTon.toFixed(3)}</div>
                </div>
              </div>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  )
}
