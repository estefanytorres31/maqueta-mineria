import { Clock } from 'lucide-react'
import SectionPanel from '../SectionPanel'
import KpiCard from '../KpiCard'
import UtilizationRing from '../gauges/UtilizationRing'
import { OperationData } from '../../types'

interface TodayPanelProps {
  operation: Pick<OperationData, 'engineHours' | 'effectiveHours' | 'idleHours' | 'inoperativeHours' | 'utilization' | 'totalHours'>
}

export default function TodayPanel({ operation }: TodayPanelProps) {
  return (
    <SectionPanel
      title="HOY"
      icon={<Clock size={14} className="text-electric-400" />}
    >
      <div className="p-3 space-y-2.5">
      <div className="grid grid-cols-3 gap-1.5">
        <KpiCard label="HORAS MOTOR" value={operation.engineHours.toFixed(1)} unit="h" />
        <KpiCard label="HORAS EFECTIVAS" value={operation.effectiveHours.toFixed(1)} unit="h" />
        <KpiCard label="RALENTÍ" value={operation.idleHours.toFixed(1)} unit="h" />
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        <KpiCard label="INOPERATIVO" value={operation.inoperativeHours.toFixed(1)} unit="h" />
        <UtilizationRing utilization={operation.utilization} />
        <KpiCard label="HORÓMETRO TOTAL" value={operation.totalHours.toLocaleString(undefined, { maximumFractionDigits: 0 })} unit="h" />
      </div>
      </div>
    </SectionPanel>
  )
}
