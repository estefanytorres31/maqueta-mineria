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
      <main className="flex-1 overflow-auto p-3 lg:p-4 bg-industrial-900">
        <div className="fade-in min-h-full">
          {children}
        </div>
      </main>
      <BottomNavigation />
    </div>
  )
}
