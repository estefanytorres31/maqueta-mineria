import { ReactNode } from 'react'

export default function SectionPanel({ title, icon, iconColor = 'text-electric-400', children, grow, extraHeader }: { title: string; icon?: ReactNode; iconColor?: string; children: ReactNode; grow?: boolean; extraHeader?: ReactNode }) {
  return (
    <div className={`flex flex-col rounded-lg border border-industrial-700 bg-industrial-850/60 overflow-hidden ${grow ? 'flex-1 min-h-0 h-full' : 'flex-shrink-0'}`}>
      <div className="px-1.5 lg:px-1.5 md:px-1.5 py-0.5 lg:py-0.5 md:py-0.5 xl:py-1 border-b border-industrial-700 flex items-center gap-1.5 justify-between">
        <div className="flex items-center gap-1 lg:gap-2 md:gap-1">
          {icon && <span className={iconColor}>{icon}</span>}
          <span className="text-[9px] lg:text-[9px] md:text-[9px] xl:text-[10px] 2xl:text-[11px] font-bold uppercase tracking-[0.1em] lg:tracking-[0.12em] xl:tracking-[0.14em] text-gray-200">{title}</span>
        </div>
        {extraHeader}
      </div>
      {children}
    </div>
  )
}
