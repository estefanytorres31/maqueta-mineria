import { useState } from 'react'
import { 
  Pickaxe, 
  Loader2, 
  Truck, 
  Wrench, 
  HardHat, 
  Settings, 
  User, 
  LogIn, 
  Users,
  MapPin,
  Wifi,
  Cloud,
  Clock
} from 'lucide-react'
import { useNavigationStore } from '../stores/navigationStore'
import { MACHINES } from '../data/machines'
import { Machine, MachineType } from '../types'
import StatusBar from '../components/StatusBar'
import { useDateTime } from '../hooks/useDateTime'

const machineIcons: Record<MachineType, React.ElementType> = {
  excavator: Pickaxe,
  loader: Loader2,
  scoop: Truck,
  tractor: HardHat,
  drill: Wrench,
  other: Settings
}

const machinePlaceholders: Record<MachineType, string> = {
  excavator: '🚜',
  loader: '🚛',
  scoop: '🚚',
  tractor: '🚜',
  drill: '⛏️',
  other: '🚧'
}

export default function MachineSelector() {
  const [selected, setSelected] = useState<Machine | null>(MACHINES[0])
  const goToDashboard = useNavigationStore(s => s.goToDashboard)
  const systemStatus = useNavigationStore(s => s.systemStatus)
  const { time } = useDateTime()

  const handleCardClick = (machine: Machine) => {
    setSelected(machine)
    goToDashboard(machine)
  }

  const handleLogin = () => {
    if (!selected) return
    goToDashboard(selected)
  }

  const handleGuest = () => {
    if (!selected) return
    goToDashboard(selected)
  }

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-br from-industrial-950 via-industrial-900 to-industrial-950">
      <header className="flex items-center justify-between px-6 md:px-10 py-4 border-b border-industrial-800 bg-industrial-900/50 backdrop-blur">
        <div className="flex items-center gap-4 md:gap-6">
          <div className="flex items-center gap-1.5">
            <div className="text-electric-400 font-black text-3xl md:text-4xl tracking-tight leading-none">
              EDGE
              <span className="text-white block text-xl md:text-2xl mt-0.5 tracking-[0.2em]">SMART</span>
            </div>
          </div>
          <div className="hidden sm:block h-12 w-px bg-industrial-700" />
          <div className="hidden sm:block">
            <div className="text-gray-200 font-semibold text-sm md:text-base tracking-wider">MONITOREO INTELIGENTE</div>
            <div className="text-electric-400 text-xs md:text-sm font-medium tracking-wide">PARA MAQUINARIA MINERA</div>
          </div>
        </div>

        <div className="flex items-center gap-3 md:gap-6 text-xs md:text-sm">
          <div className="hidden md:flex items-center gap-1.5 text-status-ok">
            <MapPin size={16} />
          </div>
          <div className="hidden md:flex items-center gap-1.5 text-electric-400">
            <Wifi size={16} />
            <span className="text-gray-300">4G</span>
          </div>
          <div className="hidden md:flex items-center gap-1.5 text-electric-400">
            <Cloud size={16} />
          </div>
          <div className="flex items-center gap-1.5 text-gray-300 font-mono">
            <Clock size={16} className="text-electric-400" />
            <span className="font-semibold">{time}</span>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-auto px-4 md:px-10 py-6 md:py-10 flex flex-col">
        <div className="text-center mb-6 md:mb-10">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-2 md:mb-3">
            BIENVENIDO A <span className="text-electric-400">EDGE SMART</span>
          </h1>
          <p className="text-gray-400 text-base md:text-xl">
            Seleccione el tipo de máquina para continuar
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 md:gap-4 mb-8 md:mb-12 flex-1 content-start">
          {MACHINES.map(machine => {
            const Icon = machineIcons[machine.type]
            const isSelected = selected?.id === machine.id
            return (
              <button
                key={machine.id}
                type="button"
                onClick={() => handleCardClick(machine)}
                className={`group relative aspect-[3/4] rounded-xl border-2 p-3 md:p-4 flex flex-col items-center justify-between transition-all duration-200 ${
                  isSelected
                    ? 'bg-industrial-800/80 border-electric-500 shadow-glow-blue scale-[1.02]'
                    : 'bg-industrial-850/60 border-industrial-700 hover:border-industrial-500 hover:bg-industrial-800/80'
                }`}
              >
                {isSelected && (
                  <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-electric-500 border-2 border-industrial-900 flex items-center justify-center shadow-glow-blue">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="white">
                      <path d="M8.5 2.5L3.8 7.2L1.5 4.9" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}

                <div className="w-full text-left">
                  <div className="text-xs md:text-sm font-bold text-gray-200 uppercase tracking-wider">
                    {machine.name}
                  </div>
                </div>

                <div className="flex-1 flex items-center justify-center w-full my-2 md:my-3">
                  <div className="w-full aspect-square max-w-[160px] rounded-lg bg-gradient-to-b from-industrial-750/50 to-industrial-900 border border-industrial-700 flex items-center justify-center overflow-hidden">
                    <div className="text-5xl md:text-6xl lg:text-7xl drop-shadow-2xl filter grayscale-[10%]">
                      {machinePlaceholders[machine.type]}
                    </div>
                  </div>
                </div>

                <div className={`w-full rounded-md py-2 flex items-center justify-center transition-all ${
                  isSelected 
                    ? 'bg-electric-500/15 border border-electric-500/30 text-electric-400' 
                    : 'bg-industrial-750/50 text-gray-400 group-hover:text-electric-400 group-hover:border-electric-500/20 border border-transparent'
                }`}>
                  <Icon size={28} />
                </div>
              </button>
            )
          })}
        </div>

        <div className="max-w-5xl mx-auto w-full mt-auto">
          <div className="bg-industrial-850/70 border border-industrial-700 rounded-2xl p-4 md:p-6 flex flex-col md:flex-row items-stretch md:items-center gap-4 md:gap-6">
            <div className="flex-1 flex items-center gap-4">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-industrial-750 border border-industrial-600 flex items-center justify-center flex-shrink-0">
                <User size={28} className="text-electric-400" />
              </div>
              <div>
                <div className="text-white font-bold text-base md:text-lg mb-0.5">INICIAR SESIÓN</div>
                <div className="text-gray-400 text-xs md:text-sm">
                  Inicie sesión para acceder a todas las funciones del sistema.
                </div>
              </div>
            </div>

            <div className="flex gap-3 md:gap-4 flex-col sm:flex-row">
              <button
                type="button"
                onClick={handleLogin}
                className="btn-primary flex items-center justify-center gap-2 md:px-8 md:py-4 text-base font-bold min-h-[52px] cursor-pointer"
              >
                <LogIn size={20} />
                INICIAR SESIÓN
              </button>
              <button
                type="button"
                onClick={handleGuest}
                className="btn-secondary flex items-center justify-center gap-2 md:px-6 md:py-4 min-h-[52px] cursor-pointer"
              >
                <Users size={20} />
                <div className="text-left">
                  <div className="font-bold text-sm md:text-base">USUARIO INVITADO</div>
                  <div className="text-[10px] md:text-xs text-gray-400 font-normal">Acceso limitado</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </main>

      <StatusBar />
    </div>
  )
}
