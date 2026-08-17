import { create } from 'zustand'
import { Page, Machine, SystemStatus } from '../types'
import { MACHINES, getMachineById } from '../data/machines'

const LAST_MACHINE_STORAGE_KEY = 'edge-smart:last-selected-machine-id'

const readLastSelectedMachine = (): Machine | null => {
  if (typeof window === 'undefined') return null
  try {
    const lastId = window.localStorage.getItem(LAST_MACHINE_STORAGE_KEY)
    if (!lastId) return null
    const found = getMachineById(lastId)
    return found ?? null
  } catch {
    return null
  }
}

const writeLastSelectedMachine = (machine: Machine | null) => {
  if (typeof window === 'undefined') return
  try {
    if (machine) window.localStorage.setItem(LAST_MACHINE_STORAGE_KEY, machine.id)
    else window.localStorage.removeItem(LAST_MACHINE_STORAGE_KEY)
  } catch {
  }
}

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

const hydrateInitialSelected = (): Machine | null => {
  const persisted = readLastSelectedMachine()
  return persisted ?? (MACHINES[0] ?? null)
}

export const useNavigationStore = create<NavigationState>((set, get) => ({
  currentPage: 'selector',
  selectedMachine: hydrateInitialSelected(),
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
    writeLastSelectedMachine(machine)
    set({ selectedMachine: machine })
  },
  goToDashboard: (machine) => {
    const next = machine ?? get().selectedMachine
    if (next) {
      writeLastSelectedMachine(next)
      set({ selectedMachine: next, currentPage: 'home' })
    } else {
      set({ currentPage: 'selector' })
    }
  },
  clearMachine: () => {
    writeLastSelectedMachine(null)
    set({ selectedMachine: null, currentPage: 'selector' })
  },
  setFullscreen: (fs) => set({ isFullscreen: fs }),
  setSystemStatus: (status) => set((s) => ({
    systemStatus: { ...s.systemStatus, ...status }
  }))
}))

export { MACHINES, LAST_MACHINE_STORAGE_KEY, readLastSelectedMachine }
