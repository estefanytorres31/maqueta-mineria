export type MachineType = 
  | 'excavator' 
  | 'loader' 
  | 'scoop' 
  | 'tractor' 
  | 'drill' 
  | 'other'

export type SensorStatus = 'OK' | 'WARNING' | 'ERROR' | 'OFFLINE'
export type OperationMode = 'TRABAJANDO' | 'RALENTÍ' | 'INOPERATIVO'
export type AlertType = 'CRÍTICA' | 'ADVERTENCIA' | 'INFORMACIÓN'
export type AlertStatus = 'PENDIENTE' | 'ACKNOWLEDGED' | 'RESUELTA'

export interface Machine {
  id: string
  type: MachineType
  name: string
  model: string
  code: string
  category: string
  imageUrl: string
  iconUrl: string
}

export interface EngineData {
  rpm: number
  coolantTemp: number
  oilPressure: number
  oilTemp: number
  status: SensorStatus
}

export interface FuelData {
  instantConsumption: number
  avgConsumption: number
  tankLevel: number
  tankCapacity: number
  todayConsumption: number
  idleTodayConsumption: number
  autonomy: number
  supplyFlow: number
  returnFlow: number
  workingConsumption: number
  idleConsumption: number
  inoperativeConsumption: number
  consumptionHistory: { time: string; value: number }[]
  dailyHistory: { date: string; value: number }[]
}

export interface HydraulicData {
  mainPressure: number
  armPressure: number
  swingPressure: number
  oilTemp: number
  load: number
  status: SensorStatus
}

export interface GpsData {
  latitude: string
  longitude: string
  latDecimal: number
  lonDecimal: number
  speed: number
  heading: number
  altitude: number
  distance: number
  status: SensorStatus
}

export interface ImuData {
  pitch: number
  roll: number
  yaw: number
  status: SensorStatus
}

export interface ProductivityData {
  cyclesCompleted: number
  tonsMoved: number
  performance: number
  avgCycleTime: number
  consumptionPerTon: number
  consumptionPerCycle: number
  unproductiveFuel: number
  hourlyProductivity: { hour: string; tons: number; cycles: number }[]
  dailyProductivity: { day: string; tons: number }[]
}

export interface OperationData {
  engineHours: number
  effectiveHours: number
  idleHours: number
  inoperativeHours: number
  utilization: number
  totalHours: number
  mode: OperationMode
  hourlyOperation: { hour: string; working: number; idle: number; inoperative: number }[]
  rpmHistory: { time: string; value: number }[]
  speedHistory: { time: string; value: number }[]
  cycleTimeHistory: { time: string; value: number }[]
  stateDistribution: { name: OperationMode; value: number; color: string }[]
  timeline: { time: string; state: OperationMode; duration: number }[]
}

export interface Alert {
  id: string
  timestamp: Date
  type: AlertType
  sensor: string
  description: string
  status: AlertStatus
  priority: number
  value?: string
  threshold?: string
}

export interface Sensor {
  id: string
  name: string
  category: string
  status: SensorStatus
  lastUpdate: Date
  value?: string
}

export interface TelemetryData {
  engine: EngineData
  fuel: FuelData
  hydraulic: HydraulicData
  gps: GpsData
  imu: ImuData
  productivity: ProductivityData
  operation: OperationData
  sensors: Sensor[]
  timestamp: Date
  online: boolean
}

export type Page = 
  | 'selector'
  | 'home' 
  | 'fuel' 
  | 'operation' 
  | 'productivity' 
  | 'gps' 
  | 'alerts' 
  | 'settings'

export interface SystemStatus {
  storage: SensorStatus
  sensors: SensorStatus
  gps: SensorStatus
  communications: SensorStatus
  version: string
}
