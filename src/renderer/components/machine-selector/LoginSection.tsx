import { User, LogIn, Users } from 'lucide-react'

export default function LoginSection() {
  return (
    <div className="max-w-5xl mx-auto w-full flex-shrink-0">
      <div className="bg-industrial-850/70 border border-industrial-700 rounded-lg md:rounded-xl px-2 md:px-4 xl:px-5 py-1.5 md:py-2 xl:py-3 flex flex-col md:flex-row items-stretch md:items-center gap-1.5 md:gap-2.5 xl:gap-4">
        <div className="flex-1 flex items-center gap-2 md:gap-3">
          <div className="w-8 h-8 md:w-10 md:h-10 xl:w-11 xl:h-11 rounded-full bg-industrial-750 border border-industrial-600 flex items-center justify-center flex-shrink-0">
            <User size={16} className="text-electric-400" />
          </div>
          <div className="min-w-0">
            <div className="text-white font-bold text-xs md:text-sm xl:text-base leading-none md:mb-0.5 truncate">INICIAR SESIÓN</div>
            <div className="text-gray-400 text-[9px] md:text-[11px] xl:text-xs leading-snug truncate">
              Inicie sesión para acceder a todas las funciones del sistema.
            </div>
          </div>
        </div>

        <div className="flex gap-1.5 md:gap-2 xl:gap-3 flex-col sm:flex-row flex-shrink-0">
          <button
            type="button"
            className="btn-primary flex items-center justify-center gap-1.5 md:gap-2 px-3 md:px-5 xl:px-6 py-1.5 md:py-2 text-[11px] md:text-sm font-bold min-h-[34px] md:min-h-[40px] cursor-pointer"
          >
            <LogIn size={14} />
            INICIAR SESIÓN
          </button>
          <button
            type="button"
            className="btn-secondary flex items-center justify-center gap-1.5 md:gap-2 px-3 md:px-4 xl:px-5 py-1.5 md:py-2 min-h-[34px] md:min-h-[40px] cursor-pointer"
          >
            <Users size={14} />
            <div className="text-left leading-tight">
              <div className="font-bold text-[10px] md:text-xs xl:text-sm">USUARIO INVITADO</div>
              <div className="text-[8px] md:text-[9px] xl:text-[10px] text-gray-400 font-normal hidden sm:block">Acceso limitado</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
