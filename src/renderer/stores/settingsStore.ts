import { create } from 'zustand'
import { AlertType, SensorStatus } from '../types'

interface SettingsState {
  general: {
    machineName: string
    equipmentId: string
    unitSystem: 'metric' | 'imperial'
  }
  communication: {
    protocol: 'MQTT' | 'REST' | 'WS'
    ip: string
    port: number
    connected: boolean
  }
  sensors: {
    gps: SensorStatus
    imu: SensorStatus
    fuel: SensorStatus
    hydraulic: SensorStatus
    rpm: SensorStatus
  }
  cloud: {
    status: 'CONNECTED' | 'DISCONNECTED' | 'SYNCING'
    lastSync: Date
  }
  system: {
    version: string
    storageUsed: number
    storageTotal: number
    autoUpdate: boolean
  }
  display: {
    timeRange: '1H' | '6H' | '12H' | '24H'
    alertsFilter: AlertType | 'ALL'
    autoRefresh: boolean
    refreshInterval: number
    theme: 'dark'
  }
  updateGeneral: (data: Partial<SettingsState['general']>) => void
  updateCommunication: (data: Partial<SettingsState['communication']>) => void
  updateSensors: (data: Partial<SettingsState['sensors']>) => void
  updateCloud: (data: Partial<SettingsState['cloud']>) => void
  updateSystem: (data: Partial<SettingsState['system']>) => void
  updateDisplay: (data: Partial<SettingsState['display']>) => void
}

export const useSettingsStore = create<SettingsState>((set) => ({
  general: {
    machineName: 'CAT 375L',
    equipmentId: 'EQ-002',
    unitSystem: 'imperial'
  },
  communication: {
    protocol: 'MQTT',
    ip: '192.168.1.100',
    port: 1883,
    connected: true
  },
  sensors: {
    gps: 'OK',
    imu: 'OK',
    fuel: 'OK',
    hydraulic: 'OK',
    rpm: 'OK'
  },
  cloud: {
    status: 'CONNECTED',
    lastSync: new Date()
  },
  system: {
    version: '2.3.1',
    storageUsed: 45,
    storageTotal: 512,
    autoUpdate: true
  },
  display: {
    timeRange: '1H',
    alertsFilter: 'ALL',
    autoRefresh: true,
    refreshInterval: 2000,
    theme: 'dark'
  },
  updateGeneral: (data) => set((s) => ({
    general: { ...s.general, ...data }
  })),
  updateCommunication: (data) => set((s) => ({
    communication: { ...s.communication, ...data }
  })),
  updateSensors: (data) => set((s) => ({
    sensors: { ...s.sensors, ...data }
  })),
  updateCloud: (data) => set((s) => ({
    cloud: { ...s.cloud, ...data }
  })),
  updateSystem: (data) => set((s) => ({
    system: { ...s.system, ...data }
  })),
  updateDisplay: (data) => set((s) => ({
    display: { ...s.display, ...data }
  }))
}))
