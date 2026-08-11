import { create } from 'zustand'
import { Page, Machine, SystemStatus } from '../types'
import { MACHINES } from '../data/machines'

interface NavigationState {
  currentPage: Page
  selectedMachine: Machine | null
  systemStatus: SystemStatus
  isFullscreen: boolean
  setPage: (page: Page) => void
  setMachine: (machine: Machine) => void
  goToDashboard: (machine?: Machine) => void
  clearMachine: () => void
  setFullscreen: (fs: boolean) => void
  setSystemStatus: (status: Partial<SystemStatus>) => void
}

export const useNavigationStore = create<NavigationState>((set, get) => ({
  currentPage: 'selector',
  selectedMachine: null,
  systemStatus: {
    storage: 'OK',
    sensors: 'OK',
    gps: 'OK',
    communications: 'OK',
    version: '2.3.1'
  },
  isFullscreen: false,
  setPage: (page) => {
    if (get().currentPage === page) return
    set({ currentPage: page })
  },
  setMachine: (machine) => {
    if (get().selectedMachine?.id === machine.id) return
    set({ selectedMachine: machine })
  },
  goToDashboard: (machine) => {
    const next = machine ?? get().selectedMachine
    if (next) set({ selectedMachine: next, currentPage: 'home' })
    else set({ currentPage: 'selector' })
  },
  clearMachine: () => set({ selectedMachine: null, currentPage: 'selector' }),
  setFullscreen: (fs) => set({ isFullscreen: fs }),
  setSystemStatus: (status) => set((s) => ({
    systemStatus: { ...s.systemStatus, ...status }
  }))
}))

export { MACHINES }
