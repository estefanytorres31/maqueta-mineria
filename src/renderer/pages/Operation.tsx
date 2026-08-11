import { 
  Activity,
  Clock,
  BarChart3,
  TrendingUp,
  Timer
} from 'lucide-react'
import { useTelemetryStore } from '../stores/telemetryStore'
import Panel from '../components/Panel'
import KpiCard from '../components/KpiCard'
import MetricCard from '../components/MetricCard'
import ProgressBar from '../components/ProgressBar'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Legend,
  AreaChart, Area
} from 'recharts'
import { OperationMode } from '../types'

export default function Operation() {
  const { telemetry } = useTelemetryStore()
  const { operation, engine, gps } = telemetry

  const stateColorMap: Record<OperationMode, string> = {
    TRABAJANDO: '#10B981',
    RALENTÍ: '#F59E0B',
    INOPERATIVO: '#3B82F6'
  }

  return (
    <div className="w-full h-full flex flex-col gap-3 lg:gap-4">
      <div className="flex items-center gap-2 mb-0.5">
        <Activity size={22} className="text-electric-400" />
        <h2 className="text-xl md:text-2xl font-bold text-white">OPERACIÓN</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-3">
        <KpiCard label="ESTADO ACTUAL" value={operation.mode} color={stateColorMap[operation.mode] as any} />
        <KpiCard label="HORAS MOTOR" value={operation.engineHours.toFixed(1)} unit="h" />
        <KpiCard label="HORAS TRABAJANDO" value={operation.effectiveHours.toFixed(1)} unit="h" color="text-status-ok" />
        <KpiCard label="HORAS RALENTÍ" value={operation.idleHours.toFixed(1)} unit="h" color="text-status-warning" />
        <KpiCard label="HORAS INOPERATIVAS" value={operation.inoperativeHours.toFixed(1)} unit="h" />
        <KpiCard label="UTILIZACIÓN" value={operation.utilization.toFixed(0)} unit="%" highlight />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-4 flex-1 min-h-0">
        <div className="lg:col-span-8 flex flex-col gap-3 lg:gap-4">
          <Panel title="HORAS DE OPERACIÓN POR HORA">
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={operation.hourlyOperation} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1C2B3F" vertical={false} />
                <XAxis dataKey="hour" stroke="#4B5563" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis stroke="#4B5563" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#0D141E', border: '1px solid #253A54', borderRadius: 8, fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="working" name="Trabajando" stackId="a" fill="#10B981" radius={[0, 0, 0, 0]} />
                <Bar dataKey="idle" name="Ralentí" stackId="a" fill="#F59E0B" />
                <Bar dataKey="inoperative" name="Inoperativo" stackId="a" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Panel>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
            <Panel title="RPM" icon={BarChart3}>
              <ResponsiveContainer width="100%" height={150}>
                <AreaChart data={operation.rpmHistory}>
                  <defs>
                    <linearGradient id="rpmGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1E88E5" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#1E88E5" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1C2B3F" vertical={false} />
                  <XAxis dataKey="time" stroke="#4B5563" tick={{ fontSize: 9 }} axisLine={false} tickLine={false} />
                  <YAxis stroke="#4B5563" tick={{ fontSize: 9 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#0D141E', border: '1px solid #253A54', borderRadius: 8, fontSize: 12 }} />
                  <Area type="monotone" dataKey="value" stroke="#1E88E5" strokeWidth={2} fill="url(#rpmGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </Panel>

            <Panel title="VELOCIDAD" icon={TrendingUp}>
              <ResponsiveContainer width="100%" height={150}>
                <AreaChart data={operation.speedHistory}>
                  <defs>
                    <linearGradient id="spdGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1C2B3F" vertical={false} />
                  <XAxis dataKey="time" stroke="#4B5563" tick={{ fontSize: 9 }} axisLine={false} tickLine={false} />
                  <YAxis stroke="#4B5563" tick={{ fontSize: 9 }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#0D141E', border: '1px solid #253A54', borderRadius: 8, fontSize: 12 }} />
                  <Area type="monotone" dataKey="value" stroke="#10B981" strokeWidth={2} fill="url(#spdGrad)" unit=" km/h" />
                </AreaChart>
              </ResponsiveContainer>
            </Panel>
          </div>

          <Panel title="TIEMPO DE CICLO (seg)" icon={Timer}>
            <ResponsiveContainer width="100%" height={140}>
              <LineChart data={operation.cycleTimeHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1C2B3F" vertical={false} />
                <XAxis dataKey="time" stroke="#4B5563" tick={{ fontSize: 9 }} axisLine={false} tickLine={false} />
                <YAxis stroke="#4B5563" tick={{ fontSize: 9 }} axisLine={false} tickLine={false} domain={[30, 70]} />
                <Tooltip contentStyle={{ backgroundColor: '#0D141E', border: '1px solid #253A54', borderRadius: 8, fontSize: 12 }} />
                <Line type="monotone" dataKey="value" stroke="#F59E0B" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </Panel>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-3 lg:gap-4">
          <Panel title="DISTRIBUCIÓN DE ESTADOS">
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={operation.stateDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={70}
                  dataKey="value"
                  paddingAngle={3}
                >
                  {operation.stateDistribution.map((entry, i) => (
                    <Cell key={`cell-${i}`} fill={entry.color} stroke="#0D141E" strokeWidth={2} />
                  ))}
                </Pie>
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ backgroundColor: '#0D141E', border: '1px solid #253A54', borderRadius: 8, fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </Panel>

          <Panel title="PARÁMETROS ACTUALES" className="flex-1">
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <MetricCard label="RPM ACTUAL" value={engine.rpm.toLocaleString()} unit="RPM" className="!p-2" />
                <MetricCard label="VELOCIDAD" value={gps.speed.toFixed(1)} unit="km/h" className="!p-2" />
                <MetricCard label="TEMP. REFRIGERANTE" value={engine.coolantTemp.toFixed(0)} unit="°C" className="!p-2" />
                <MetricCard label="TEMP. ACEITE" value={engine.oilTemp.toFixed(0)} unit="°C" className="!p-2" />
              </div>
              <div className="space-y-2 pt-2 border-t border-industrial-700">
                <div>
                  <ProgressBar 
                    label="CARGA DE TRABAJO" 
                    value={operation.utilization} 
                    color="bg-electric-500"
                  />
                </div>
                <div>
                  <ProgressBar 
                    label="EFICIENCIA OPERACIONAL" 
                    value={(operation.effectiveHours / operation.engineHours) * 100} 
                    color="bg-status-ok"
                  />
                </div>
                <div>
                  <ProgressBar 
                    label="% RALENTÍ" 
                    value={(operation.idleHours / operation.engineHours) * 100} 
                    color="bg-status-warning"
                  />
                </div>
              </div>
            </div>
          </Panel>
        </div>
      </div>

      <Panel title="TIMELINE DE OPERACIÓN">
        <div className="relative">
          <div className="flex gap-1 items-end overflow-x-auto pb-2">
            {operation.timeline.map((item, i) => (
              <div key={i} className="flex flex-col items-center min-w-[70px]">
                <div className="text-[9px] text-gray-500 mb-1 font-mono">{item.time}</div>
                <div
                  className="w-full rounded-t-sm transition-all duration-500"
                  style={{
                    height: `${Math.max(20, item.duration * 0.8)}px`,
                    backgroundColor: stateColorMap[item.state],
                    boxShadow: `0 0 8px ${stateColorMap[item.state]}50`
                  }}
                  title={`${item.state} - ${item.duration} min`}
                />
                <div
                  className="w-full h-1.5 rounded-b-sm -mt-0.5"
                  style={{ backgroundColor: stateColorMap[item.state], opacity: 0.5 }}
                />
                <div className="text-[8px] text-gray-400 mt-1 font-semibold">
                  {item.state.substring(0, 3)}
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-4 mt-3 pt-2 border-t border-industrial-700 text-xs">
            {(['TRABAJANDO', 'RALENTÍ', 'INOPERATIVO'] as OperationMode[]).map(state => (
              <div key={state} className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded" style={{ backgroundColor: stateColorMap[state] }} />
                <span className="text-gray-400 font-medium">{state}</span>
              </div>
            ))}
          </div>
        </div>
      </Panel>
    </div>
  )
}
