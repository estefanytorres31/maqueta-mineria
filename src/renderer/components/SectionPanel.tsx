import { ReactNode } from 'react'

export default function SectionPanel({ 
  title, 
  icon, 
  iconColor = 'text-electric-400', 
  children, 
  grow, 
  extraHeader,
  borderClass = 'border-industrial-700',
  titleColorClass = 'text-gray-200',
  headerBgClass = 'bg-transparent',
  bodyClass = '',
  centerTitle,
}: { 
  title: string; 
  icon?: ReactNode; 
  iconColor?: string; 
  children: ReactNode; 
  grow?: boolean; 
  extraHeader?: ReactNode;
  borderClass?: string;
  titleColorClass?: string;
  headerBgClass?: string;
  bodyClass?: string;
  centerTitle?: boolean;
}) {
  return (
    <div className={`flex flex-col rounded-lg border ${borderClass} bg-industrial-850/60 overflow-hidden ${bodyClass} ${grow ? 'flex-1 min-h-0 h-full' : 'flex-shrink-0'}`}>
      <div className={`px-[6px] md:px-2 lg:px-2 py-[2px] md:py-[3px] border-b border-industrial-700/80 flex items-center gap-1 ${centerTitle ? 'justify-center relative' : 'justify-between'} ${headerBgClass}`}>
        
        {centerTitle ? (
          <>
            <div className="invisible flex items-center gap-1">
              {icon && <span className={iconColor}>{icon}</span>}
              <span className={`text-[8px] md:text-[10px] lg:text-[14px] xl:text-[15px] font-bold uppercase tracking-[0.1em]`}>{title}</span>
            </div>
            <div className="absolute inset-0 flex items-center justify-center gap-1 pointer-events-none">
              {icon && <span className={iconColor}>{icon}</span>}
              <span className={`text-[8px] md:text-[10px] lg:text-[14px] xl:text-[15px] font-bold uppercase tracking-[0.1em] ${titleColorClass}`}>{title}</span>
            </div>
          </>
        ) : (
          <div className="flex items-center gap-1">
            {icon && <span className={iconColor}>{icon}</span>}
            <span className={`text-[8px] md:text-[10px] lg:text-[14px] xl:text-[15px] font-bold uppercase tracking-[0.1em] ${titleColorClass}`}>{title}</span>
          </div>
        )}
        
        {extraHeader && <div className="z-10">{extraHeader}</div>}
      </div>
      {children}
    </div>
  )
}
