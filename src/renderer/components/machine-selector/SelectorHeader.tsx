import { MapPin, Wifi, Cloud, Clock } from 'lucide-react'
import { useDateTime } from '../../hooks/useDateTime'

export default function SelectorHeader() {
  const { time } = useDateTime()

  return (
    <header className="flex items-center justify-between px-3 md:px-6 xl:px-10 py-2 md:py-3 xl:py-4 border-b border-industrial-800 bg-industrial-900/50 backdrop-blur flex-shrink-0">
      <div className="flex items-center gap-3 md:gap-4 xl:gap-6">
        <button 
          type="button"
          className="flex flex-col rounded px-0.5 py-0.5 cursor-pointer hover:opacity-80 transition-opacity text-left bg-transparent border-none p-0 outline-none"
          onClick={() => window.electronAPI?.window.minimize()}
        >
          <div className="font-black text-lg md:text-xl lg:text-3xl xl:text-4xl tracking-tight leading-none">
            <span className="text-white">EDGE</span>
          </div>    
          <div className="font-black text-xs md:text-xs lg:text-lg xl:text-xl tracking-tight leading-none text-end">
            <span className="text-blue-700">SMART</span>
          </div> 
        </button>
        <div className="hidden md:block h-12 xl:h-24 w-px bg-industrial-700" />
        <div className="hidden md:block">
          <div className="text-gray-200 font-semibold text-xs md:text-sm lg:text-[17px] xl:text-xl 2xl:text-3xl tracking-wider">MONITOREO INTELIGENTE</div>
          <div className="text-electric-400 text-[10px] md:text-xs lg:text-[14px] xl:text-[14px] 2xl:text-[16px] font-medium tracking-wide">PARA MAQUINARIA MINERA</div>
        </div>
      </div>

      <div className="hidden md:flex items-center justify-center flex-1 min-w-0">
        <div className="text-white font-black text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl tracking-widest uppercase leading-none text-center">
          Peru Controls System S.A.C.
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-3 xl:gap-6 text-[10px] md:text-xs xl:text-sm">
        <div className="hidden lg:flex items-center gap-1.5 text-status-ok">
          <MapPin size={14} />
        </div>
        <div className="hidden lg:flex items-center gap-1.5 text-electric-400">
          <Wifi size={14} />
          <span className="text-gray-300">4G</span>
        </div>
        <div className="hidden lg:flex items-center gap-1.5 text-electric-400">
          <Cloud size={14} />
        </div>
        <div className="flex items-center gap-1 md:gap-1.5 text-gray-300 font-mono">
          <Clock size={14} className="text-electric-400" />
          <span className="font-semibold">{time}</span>
        </div>
      </div>
    </header>
  )
}
