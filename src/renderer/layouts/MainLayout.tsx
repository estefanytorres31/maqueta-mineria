import { ReactNode } from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import BottomNavigation from '../components/BottomNavigation'
import StatusBar from '../components/StatusBar'

interface MainLayoutProps {
  children: ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="w-full h-full flex flex-col">
      <Header />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar className="hidden lg:flex" />
        <main className="flex-1 overflow-auto p-3 lg:p-4 bg-industrial-900">
          <div className="fade-in min-h-full">
            {children}
          </div>
        </main>
      </div>
      <BottomNavigation className="lg:hidden" />
      <StatusBar />
    </div>
  )
}
