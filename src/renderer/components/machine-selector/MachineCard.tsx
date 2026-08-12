import { Machine } from '../../types'

interface MachineCardProps {
  machine: Machine
  isSelected: boolean
  onClick: () => void
  variant?: 'grid' | 'carousel'
}

export default function MachineCard({ machine, isSelected, onClick, variant = 'grid' }: MachineCardProps) {
  const isGrid = variant === 'grid'

  return (
    <button
      type="button"
      data-machine-card={isGrid ? undefined : true}
      onClick={onClick}
      className={`group snap-center ${isGrid ? 'my-0.5 xl:my-1 2xl:my-1.5' : 'shrink-0'} ${isGrid ? 'aspect-[3/4] xl:aspect-[3/4] h-auto max-h-full w-full' : 'w-[48%] sm:w-[42%] md:w-[34%] lg:w-[29%] h-full min-h-0'} relative rounded-lg md:rounded-xl border-2 p-1.5 sm:p-2 md:p-2.5 lg:p-3 xl:p-4 2xl:p-5 flex flex-col items-center justify-between gap-1 sm:gap-1.5 md:gap-2 xl:gap-2.5 transition-all duration-200 overflow-hidden ${
        isSelected
          ? `bg-industrial-800/80 border-electric-500 shadow-glow-blue ${isGrid ? 'shadow-[0_0_28px_rgba(20,184,255,0.35)] border-[3px] xl:border-[3px]' : 'scale-[1.02]'}`
          : 'bg-industrial-850/60 border-industrial-700 hover:border-industrial-500 hover:bg-industrial-800/80'
      }`}
    >

      <div className="w-full text-left flex-shrink-0 px-0.5">
        <div className={`${isGrid ? 'text-[9px] sm:text-[10px] md:text-xs xl:text-[13px] 2xl:text-sm' : 'text-[8px] sm:text-[10px] md:text-xs xl:text-sm 2xl:text-base'} font-bold text-gray-200 uppercase tracking-wider truncate leading-tight`}>
          {machine.name}
        </div>
      </div>

      <div className="w-full flex-1 min-h-0 flex items-center justify-center">
        <div className="w-full h-full max-w-[170px] max-h-[170px] xl:max-w-[210px] xl:max-h-[210px] 2xl:max-w-[260px] 2xl:max-h-[260px] rounded-md xl:rounded-lg bg-gradient-to-b from-industrial-750/40 via-industrial-850/60 to-industrial-900 border border-industrial-700 flex items-center justify-center overflow-hidden p-1.5 sm:p-2 md:p-2.5 xl:p-3 2xl:p-4">
          <img
            src={machine.imageUrl}
            alt={machine.name}
            loading="lazy"
            className="max-w-full max-h-full w-auto h-auto object-contain select-none pointer-events-none drop-shadow-[0_3px_10px_rgba(0,0,0,0.62)]"
            style={{
              filter: isSelected
                ? 'drop-shadow(0 0 10px rgba(20, 184, 255, 0.55))'
                : 'drop-shadow(0 3px 10px rgba(0,0,0,0.62))'
            }}
          />
        </div>
      </div>

      <div className={`w-full rounded-md py-0 xl:py-0.5 2xl:py-1 ${isGrid ? 'h-6 sm:h-7 md:h-8 xl:h-10 2xl:h-12' : 'h-5 sm:h-7 md:h-8 xl:h-10 2xl:h-12'} flex items-center justify-center transition-all flex-shrink-0 ${
        isSelected 
          ? 'bg-electric-500/15 border border-electric-500/30' 
          : 'bg-industrial-750/50 group-hover:border-electric-500/20 border border-transparent'
      }`}>
        <img
          src={machine.iconUrl}
          alt={`${machine.name} icon`}
          loading="lazy"
          className={`${isGrid ? 'h-3 sm:h-4 md:h-5 xl:h-7 2xl:h-8' : 'h-2.5 sm:h-4 md:h-5 xl:h-7 2xl:h-8'} w-auto max-h-full object-contain select-none pointer-events-none`}
          style={{
            filter: isSelected
              ? 'drop-shadow(0 0 3px rgba(20, 184, 255, 0.5)) brightness(1.05)'
              : 'drop-shadow(0 1px 2px rgba(0,0,0,0.45)) brightness(0.92)'
          }}
        />
      </div>
    </button>
  )
}
