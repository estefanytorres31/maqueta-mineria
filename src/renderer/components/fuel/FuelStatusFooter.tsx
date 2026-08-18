import { Info, CheckCircle2 } from 'lucide-react'

type SensorState = 'OK' | 'ALERTA' | 'FALLA'

interface Props {
  title?: string
  subtitle?: string
  sensors?: { label: string; state: SensorState }[]
}

const DEFAULT_SENSORS: { label: string; state: SensorState }[] = [
  { label: 'FLUJÓMETROS', state: 'OK' },
  { label: 'NIVEL TANQUE', state: 'OK' },
  { label: 'FILTRO COMBUSTIBLE', state: 'OK' },
  { label: 'SENSOR TEMP.', state: 'OK' }
]

export default function FuelStatusFooter({
  title = 'SIN ALERTAS DE COMBUSTIBLE',
  subtitle = 'Todos los parámetros dentro de rango normal.',
  sensors = DEFAULT_SENSORS
}: Props) {
  return (
    <div className="flex flex-none items-center justify-between gap-4 rounded-lg border border-industrial-700 bg-industrial-800 px-3 py-2 xl:px-4">
      <div className="flex items-center gap-2.5">
        <Info size={20} className="flex-none text-gray-300" />
        <div>
          <div className="text-[11px] font-bold tracking-wide text-lime-500 xl:text-xs">{title}</div>
          <div className="text-[10px] text-gray-400">{subtitle}</div>
        </div>
      </div>
      <div className="flex flex-none items-center gap-5 whitespace-nowrap xl:gap-8">
        {sensors.map(s => (
          <div key={s.label}>
            <div className="text-[9px] tracking-wider text-gray-400 xl:text-[10px]">{s.label}</div>
            <div className="mt-0.5 flex items-center gap-1.5">
              <CheckCircle2 size={12} className={s.state === 'OK' ? 'text-status-ok' : 'text-status-warning'} />
              <span className={`text-[11px] font-bold ${s.state === 'OK' ? 'text-status-ok' : 'text-status-warning'}`}>{s.state}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
