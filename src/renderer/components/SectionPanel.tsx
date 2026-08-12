import { ReactNode } from 'react'

export default function SectionPanel({ title, icon, iconColor = 'text-electric-400', children, grow, extraHeader }: { title: string; icon?: ReactNode; iconColor?: string; children: ReactNode; grow?: boolean; extraHeader?: ReactNode }) {
  return (
    <div className={`rounded-lg border border-industrial-700 bg-industrial-850/60 overflow-hidden ${grow ? 'flex-1 min-h-0' : 'flex-shrink-0'}`}>
      <div className="px-3 py-2 border-b border-industrial-700 flex items-center gap-2 justify-between">
        <div className="flex items-center gap-2">
          {icon && <span className={iconColor}>{icon}</span>}
          <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-gray-200">{title}</span>
        </div>
        {extraHeader}
      </div>
      {children}
    </div>
  )
}
