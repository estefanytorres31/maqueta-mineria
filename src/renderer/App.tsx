import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { useNavigationStore } from './stores/navigationStore'
import { useSimulator } from './hooks/useSimulator'
import MachineSelector from './pages/MachineSelector'
import Dashboard from './pages/Dashboard'
import Fuel from './pages/Fuel'
import Operation from './pages/Operation'
import Productivity from './pages/Productivity'
import Gps from './pages/Gps'
import Alerts from './pages/Alerts'
import Settings from './pages/Settings'
import MainLayout from './layouts/MainLayout'
import type { Page } from './types'

type PageKey = Page

const PAGE_TO_ROUTE: Record<PageKey, string> = {
  selector: '/',
  home: '/dashboard',
  fuel: '/fuel',
  operation: '/operation',
  productivity: '/productivity',
  gps: '/gps',
  alerts: '/alerts',
  settings: '/settings'
}

const ROUTE_TO_PAGE: Record<string, PageKey> = {
  '/': 'selector',
  '/login': 'selector',
  '/selector': 'selector',
  '/dashboard': 'home',
  '/home': 'home',
  '/fuel': 'fuel',
  '/operation': 'operation',
  '/productivity': 'productivity',
  '/gps': 'gps',
  '/alerts': 'alerts',
  '/settings': 'settings'
}

function AppInner() {
  const currentPage = useNavigationStore(s => s.currentPage)
  const selectedMachine = useNavigationStore(s => s.selectedMachine)
  const navigate = useNavigate()
  const lastRouteRef = useRef<string>('')
  const isApplyingRef = useRef(false)

  // Single-direction sync: Zustand currentPage => URL
  useEffect(() => {
    const targetRoute = PAGE_TO_ROUTE[currentPage]
    if (!targetRoute) return
    if (lastRouteRef.current === targetRoute) return
    if (isApplyingRef.current) return
    isApplyingRef.current = true
    navigate(targetRoute, { replace: true })
    lastRouteRef.current = targetRoute
    // Release microtask later so navigate completes
    queueMicrotask(() => { isApplyingRef.current = false })
  }, [currentPage, navigate])

  // Initialize one time only: restore deep link from URL
  const initialized = useRef(false)
  useEffect(() => {
    if (initialized.current) return
    initialized.current = true
    const pathname = window.location.pathname
    const mapped = ROUTE_TO_PAGE[pathname]
    const store = useNavigationStore.getState()
    if (!mapped) return
    // If URL implies a dashboard page but store has no machine, force selector to avoid blank page
    if (mapped !== 'selector' && !store.selectedMachine) {
      return
    }
    if (mapped !== store.currentPage) {
      store.setPage(mapped)
    }
  }, [])

  useSimulator()

  const renderPage = () => {
    if (currentPage !== 'selector' && !selectedMachine) {
      return <MachineSelector />
    }
    switch (currentPage) {
      case 'selector':
        return <MachineSelector />
      case 'home':
        return <MainLayout><Dashboard /></MainLayout>
      case 'fuel':
        return <MainLayout><Fuel /></MainLayout>
      case 'operation':
        return <MainLayout><Operation /></MainLayout>
      case 'productivity':
        return <MainLayout><Productivity /></MainLayout>
      case 'gps':
        return <MainLayout><Gps /></MainLayout>
      case 'alerts':
        return <MainLayout><Alerts /></MainLayout>
      case 'settings':
        return <MainLayout><Settings /></MainLayout>
      default:
        return <MachineSelector />
    }
  }

  return (
    <div className="w-screen h-screen bg-industrial-950 overflow-hidden text-white">
      {renderPage()}
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<AppInner />} />
        <Route path="/" element={<AppInner />} />
        <Route path="/:page" element={<AppInner />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
