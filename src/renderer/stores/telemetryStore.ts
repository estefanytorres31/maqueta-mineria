import { create } from 'zustand'
import { 
  TelemetryData, 
  Alert, 
  Sensor, 
  AlertType, 
  OperationMode,
  SensorStatus
} from '../types'
import { generateInitialTelemetry, generateAlerts } from '../services/simulator'

interface TelemetryState {
  telemetry: TelemetryData
  alerts: number
  lastUpdate: Date
  setTelemetry: (data: TelemetryData) => void
  updateTelemetry: (updates: Partial<TelemetryData>) => void
  // addAlert: (alert: Alert) => void
  // updateAlert: (id: string, updates: Partial<Alert>) => void
  // acknowledgeAlert: (id: string) => void
  // getUnresolvedAlertsCount: () => number
  // getAlertsByType: (type?: AlertType) => Alert[]
}

export const useTelemetryStore = create<TelemetryState>((set, get) => ({
  telemetry: generateInitialTelemetry(),
  alerts: 20,
  lastUpdate: new Date(),
  setTelemetry: (data) => set({ telemetry: data, lastUpdate: new Date() }),
  updateTelemetry: (updates) => set((state) => ({
    telemetry: { ...state.telemetry, ...updates },
    lastUpdate: new Date()
  })),
  // addAlert: (alert) => set((state) => ({
  //   alerts: [alert, ...state.alerts]
  // })),
  // updateAlert: (id, updates) => set((state) => ({
  //   alerts: state.alerts.map(a => 
  //     a.id === id ? { ...a, ...updates } : a
  //   )
  // })),
  // acknowledgeAlert: (id) => set((state) => ({
  //   alerts: state.alerts.map(a => 
  //     a.id === id ? { ...a, status: 'ACKNOWLEDGED' as const } : a
  //   )
  // })),
  // getUnresolvedAlertsCount: () => {
  //   return get().alerts.filter(a => a.status === 'PENDIENTE').length
  // },
  // getAlertsByType: (type) => {
  //   const alerts = get().alerts
  //   if (!type) return alerts
  //   return alerts.filter(a => a.type === type)
  // }
}))
