import { 
  Home, 
  Fuel, 
  Activity, 
  BarChart3, 
  Cog, 
  MapPin, 
  Bell, 
  Settings,
  SignalHigh,
  Cloud,
  Calendar,
  Clock,
  CircleDot
} from 'lucide-react'
import { useNavigationStore } from '../stores/navigationStore'
import { useTelemetryStore } from '../stores/telemetryStore'
import { useDateTime } from '../hooks/useDateTime'


export default function Header() {
  const { selectedMachine, setPage, currentPage } = useNavigationStore()
  const { telemetry } = useTelemetryStore()
  const { date, time } = useDateTime()
  const alertsCount = useTelemetryStore(s => s.getUnresolvedAlertsCount())

  if (!selectedMachine) return null

  return (
    <header className="bg-industrial-850 border-b border-industrial-700 px-2 md:px-3 lg:px-4 py-1 md:py-1.5 lg:py-2 flex items-center gap-2 md:gap-2 lg:gap-3 xl:gap-4 flex-shrink-0">
      <div 
        className="flex flex-col rounded px-1 py-1 cursor-pointer hover:opacity-80 transition-opacity"
        onClick={() => setPage('selector')}
      >
        <div className="font-black text-lg md:text-xl lg:text-2xl xl:text-3xl tracking-tight leading-none">
          <span className="text-white">EDGE</span>
        </div>    
        <div className="font-black text-xs md:text-xs lg:text-sm xl:text-lg tracking-tight leading-none text-end">
          <span className="text-blue-700">SMART</span>
        </div>    
      </div>

      <div className="h-7 md:h-8 w-px bg-industrial-700 mx-0.5 md:mx-1 lg:mx-2" />

      <div className="flex items-center gap-2 md:gap-3">
        <div className="text-amber-500 font-black text-base md:text-lg lg:text-xl leading-tight tracking-wide">{selectedMachine.model}</div>
        <div className="flex flex-col leading-tight">
          <span className="text-gray-200 text-[10px] md:text-xs lg:text-xs font-medium">{selectedMachine.category}</span>
          <span className="text-gray-500 font-mono text-[9px] md:text-[10px]">{selectedMachine.code}</span>
        </div>
      </div>

      <div className="flex-1" />

      <div className="hidden md:flex items-center gap-3 md:gap-4 lg:gap-5 text-xs md:text-[9px] lg:text-xs">
        <div className="flex items-center gap-1.5 text-status-ok">
          <MapPin size={15} />
          <span className="text-gray-200 font-semibold">GPS</span>
        </div>
        <div className="flex items-center gap-1.5 text-status-ok">
          <SignalHigh size={15} />
          <span className="text-gray-200 font-semibold">4G</span>
        </div>
        <div className="flex items-center gap-1.5 text-status-ok">
          <Cloud size={15} />
          <span className="text-gray-200 font-semibold">CLOUD</span>
        </div>
      </div>

      <div className="h-6 w-px bg-industrial-700 mx-1 hidden md:block" />

      <div className="hidden md:flex items-center gap-3 md:gap-4 text-xs md:text-[9px] lg:text-xs text-gray-300 font-mono">
        <div className="flex items-center gap-1.5">
          <Calendar size={13} className="text-gray-400" />
          <span>{date}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock size={13} className="text-gray-400" />
          <span>{time}</span>
        </div>
      </div>

      <div className="h-6 w-px bg-industrial-700 mx-1 hidden md:block" />

      <div className="flex items-center gap-1.5 md:gap-2">
        <CircleDot size={10} className="text-status-ok animate-pulse" fill="currentColor" />
        <span className="text-xs md:text-xs lg:text-sm font-bold text-gray-100">
          {telemetry.online ? 'ONLINE' : 'OFFLINE'}
        </span>
      </div>
    </header>
  )
}