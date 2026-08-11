import { useEffect, useRef } from 'react'
import { useTelemetryStore } from '../stores/telemetryStore'
import { TelemetrySimulator } from '../services/simulator'
import { useSettingsStore } from '../stores/settingsStore'

export const useSimulator = () => {
  const setTelemetry = useTelemetryStore((s) => s.setTelemetry)
  const refreshInterval = useSettingsStore((s) => s.display.refreshInterval)
  const autoRefresh = useSettingsStore((s) => s.display.autoRefresh)
  const simulatorRef = useRef<TelemetrySimulator | null>(null)

  useEffect(() => {
    if (!simulatorRef.current) {
      simulatorRef.current = new TelemetrySimulator()
    }
    
    simulatorRef.current.setOnChange((data) => {
      setTelemetry(data)
    })

    if (autoRefresh) {
      simulatorRef.current.start(refreshInterval)
    } else {
      setTelemetry(simulatorRef.current.getState())
    }

    return () => {
      simulatorRef.current?.stop()
    }
  }, [refreshInterval, autoRefresh, setTelemetry])

  return simulatorRef
}
