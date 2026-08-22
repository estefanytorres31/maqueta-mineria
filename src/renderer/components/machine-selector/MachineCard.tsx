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
      data-machine-id={machine.id}
      onClick={onClick}
      className={`group snap-center ${isGrid ? 'my-0' : 'shrink-0'} ${isGrid ? 'w-full h-auto aspect-[3/4] xl:aspect-[1/1] 2xl:aspect-[1/2]' : 'w-[44%] sm:w-[38%] md:w-[30%] lg:w-[25%] h-full min-h-0'} relative rounded-lg md:rounded-xl border-2 p-1 sm:p-1.5 md:p-2 lg:p-2.5 xl:p-2 2xl:p-2.5 flex flex-col items-center justify-between gap-0.5 sm:gap-1 md:gap-1.5 xl:gap-1 2xl:gap-1.5 transition-all overflow-hidden ${
        isSelected
          ? `bg-industrial-800/80 border-electric-500 shadow-[0_0_28px_rgba(20,184,255,0.35)] ${isGrid ? 'border-[3px]' : 'scale-[1.02]'}`
          : 'bg-industrial-850/60 border-industrial-700 hover:border-industrial-500 hover:bg-industrial-800/80'
      }`}
    >

      <div className="w-full text-left flex-shrink-0 px-1 sm:px-1.5 md:px-1.5 lg:px-1.5 xl:px-2 2xl:px-2.5">
        <div className={`${isGrid ? 'text-[9px] sm:text-[10px] md:text-xs lg:text-xs xl:text-[12px] 2xl:text-[12px]' : 'text-[8px] sm:text-[10px] md:text-xs xl:text-sm 2xl:text-base'} font-bold text-gray-200 uppercase tracking-wide sm:tracking-wider md:tracking-[0.08em] xl:tracking-wide 2xl:tracking-wide truncate leading-tight`}>
          {machine.name} 
        </div>
      </div>

      <div className="w-full flex-1 min-h-0 flex items-center justify-center py-0">
        <div className="w-full h-full max-w-[210px] max-h-[210px] sm:max-w-[250px] sm:max-h-[250px] md:max-w-[300px] md:max-h-[300px] lg:max-w-[340px] lg:max-h-[340px] xl:max-w-none xl:max-h-none 2xl:max-w-none 2xl:max-h-none rounded-md sm:rounded-lg bg-gradient-to-b from-industrial-750/55 via-industrial-850/62 to-industrial-900 border border-industrial-700 flex items-center justify-center overflow-hidden p-1.5 sm:p-2 md:p-2.5 lg:p-3 xl:p-0 2xl:p-0">
          <img
            src={machine.imageUrl}
            alt={machine.name}
            className="max-w-full max-h-full w-auto h-auto xl:w-[90%] xl:h-[90%] xl:object-contain 2xl:scale-y-125 scale-x-110 2xl:object-contain object-contain select-none pointer-events-none drop-shadow-[0_3px_12px_rgba(0,0,0,0.68)]"
          />
        </div>
      </div>

      <div className={`w-full rounded-md py-0.5 sm:py-0.5 md:py-0.5 lg:py-0.5 xl:py-0 2xl:py-0.5 ${isGrid ? 'h-8 sm:h-9 md:h-11 lg:h-12 xl:h-8 2xl:h-9' : 'h-8 sm:h-9 md:h-11 lg:h-12 xl:h-8 2xl:h-9'} flex items-center justify-center transition-all flex-shrink-0 ${
        isSelected 
          ? 'bg-electric-500/15 border border-electric-500/30' 
          : 'bg-industrial-750/50 group-hover:border-electric-500/20 border border-transparent'
      }`}>
        <img
          src={machine.iconUrl}
          alt={`${machine.name} icon`}
          className={`${isGrid ? 'h-5 sm:h-6 md:h-8 lg:h-9 xl:h-6 2xl:h-10' : 'h-5 sm:h-6 md:h-8 lg:h-9 xl:h-6 2xl:h-7'} w-auto max-h-full max-w-[90%] object-contain select-none pointer-events-none`}
          style={{
            filter: isSelected
              ? 'drop-shadow(0 0 3px rgba(20, 184, 255, 0.6)) brightness(1.08)'
              : 'drop-shadow(0 1px 3px rgba(0,0,0,0.52)) brightness(0.94)'
          }}
        />
      </div>
    </button>
  )
}
