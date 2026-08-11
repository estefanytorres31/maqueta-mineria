import { ReactNode } from 'react'
import { LucideIcon } from 'lucide-react'

interface PanelProps {
  title?: string
  icon?: LucideIcon
  children: ReactNode
  className?: string
  bodyClassName?: string
  actions?: ReactNode
  showHeader?: boolean
}

export default function Panel({
  title,
  icon: Icon,
  children,
  className = '',
  bodyClassName = '',
  actions,
  showHeader = true
}: PanelProps) {
  return (
    <section className={`panel flex flex-col overflow-hidden ${className}`}>
      {(showHeader && title) && (
        <header className="panel-header flex items-center">
          {Icon && <Icon size={15} />}
          <span>{title}</span>
          {actions && (
            <div className="ml-auto flex items-center gap-2">
              {actions}
            </div>
          )}
        </header>
      )}
      <div className={`flex-1 p-3 md:p-4 overflow-auto ${bodyClassName}`}>
        {children}
      </div>
    </section>
  )
}
