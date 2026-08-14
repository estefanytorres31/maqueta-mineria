import { ReactNode } from 'react'
import Header from '../components/Header'
import BottomNavigation from '../components/BottomNavigation'

interface MainLayoutProps {
  children: ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="w-full h-full flex flex-col">
      <Header />
      <main className="flex-1 overflow-hidden p-0.5 lg:p-0.5 xl:p-1.5 bg-industrial-900">
        <div className="fade-in h-full w-full">
          {children}
        </div>
      </main>
      <BottomNavigation />
    </div>
  )
}
