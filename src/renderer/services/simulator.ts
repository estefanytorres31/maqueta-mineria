import { 
  TelemetryData, 
  Alert, 
  Sensor, 
  OperationMode, 
  AlertType,
  AlertStatus,
  SensorStatus
} from '../types'

const randomInRange = (min: number, max: number, decimals = 1) => {
  return Number((Math.random() * (max - min) + min).toFixed(decimals))
}

const clamp = (value: number, min: number, max: number) => {
  return Math.max(min, Math.min(max, value))
}

const generateTimeLabels = (count: number, interval: 'min' | 'hour' = 'min') => {
  const labels: string[] = []
  const now = new Date()
  for (let i = count - 1; i >= 0; i--) {
    const time = new Date(now.getTime() - i * (interval === 'min' ? 5 * 60000 : 3600000))
    labels.push(
      `${String(time.getHours()).padStart(2, '0')}:${String(time.getMinutes()).padStart(2, '0')}`
    )
  }
  return labels
}

const generateDailyDates = (days: number) => {
  const dates: string[] = []
  const now = new Date()
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now.getTime() - i * 86400000)
    if (i === 0) dates.push('Hoy')
    else if (i === 1) dates.push('Ayer')
    else dates.push(`${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()}`)
  }
  return dates
}

export const generateInitialTelemetry = (): TelemetryData => {
  const mode: OperationMode = 'TRABAJANDO'
  const consumptionTimeLabels = generateTimeLabels(24)
  const hourlyLabels = generateTimeLabels(12, 'hour')
  const dailyDates = generateDailyDates(7)
  
  const baseRpm = randomInRange(1650, 1850, 0)
  const initialCycles = randomInRange(130, 138, 0)
  const initialTons = initialCycles * randomInRange(11.5, 12.5)
  const initialEngineHours = randomInRange(7.8, 8.8)
  
  const initialWorkingFuel = randomInRange(150, 180)
  const initialIdleFuel = randomInRange(10, 15)
  const initialInopFuel = randomInRange(3, 8) // Consumo ficticio para maqueta
  
  return {
    engine: {
      rpm: baseRpm,
      coolantTemp: randomInRange(80, 88),
      oilPressure: randomInRange(3.8, 4.8),
      oilTemp: randomInRange(90, 105),
      voltage: randomInRange(26.8, 28.2, 1),
      status: 'OK'
    },
    fuel: {
      instantConsumption: randomInRange(38, 45),
      avgConsumption: randomInRange(39, 42),
      tankLevel: randomInRange(60, 68, 0),
      tankCapacity: 1500,
      todayConsumption: initialWorkingFuel + initialIdleFuel + initialInopFuel,
      idleTodayConsumption: initialIdleFuel,
      autonomy: randomInRange(18, 24),
      supplyFlow: randomInRange(20, 25),
      returnFlow: randomInRange(2.0, 4.0),
      workingConsumption: initialWorkingFuel,
      idleConsumption: initialIdleFuel,
      inoperativeConsumption: initialInopFuel,
      consumptionHistory: consumptionTimeLabels.map(t => ({
        time: t,
        value: randomInRange(10, 45)
      })),
      dailyHistory: dailyDates.map(d => ({
        date: d,
        value: randomInRange(100, 140)
      }))
    },
    hydraulic: {
      mainPressure: randomInRange(260, 295, 0),
      armPressure: randomInRange(250, 285, 0),
      swingPressure: randomInRange(195, 225, 0),
      oilTemp: randomInRange(54, 62),
      load: randomInRange(65, 80, 0),
      status: 'OK'
    },
    gps: {
      latitude: 'N 10°12\'45.2"',
      longitude: 'W 76°58\'23.7"',
      latDecimal: 10.21256,
      lonDecimal: -76.97325,
      speed: randomInRange(1.5, 3.5),
      heading: randomInRange(0, 360, 0),
      altitude: randomInRange(2400, 2600, 0),
      distance: randomInRange(5.2, 8.5),
      status: 'OK'
    },
    imu: {
      pitch: randomInRange(-12, 12),
      roll: randomInRange(-12, 12),
      yaw: randomInRange(0, 360, 1),
      status: 'OK'
    },
    productivity: {
      cyclesCompleted: initialCycles,
      tonsMoved: Number(initialTons.toFixed(1)),
      performance: Number((initialTons / initialEngineHours).toFixed(1)),
      avgCycleTime: randomInRange(32, 40, 0),
      consumptionPerTon: randomInRange(0.085, 0.105),
      consumptionPerCycle: randomInRange(1.2, 1.5),
      unproductiveFuel: randomInRange(7, 10),
      hourlyProductivity: hourlyLabels.slice(6, 12).map((h, i) => ({
        hour: h,
        tons: randomInRange(100 + (i * 10), 140 + (i * 10), 0),
        cycles: randomInRange(8 + i, 12 + i, 0)
      })),
      dailyProductivity: dailyDates.slice(0, 5).map(d => ({
        day: d,
        tons: randomInRange(900, 1400, 0)
      }))
    },
    operation: {
      engineHours: initialEngineHours,
      effectiveHours: randomInRange(5.8, 6.8),
      idleHours: randomInRange(0.9, 1.5),
      inoperativeHours: randomInRange(0.4, 0.9),
      utilization: randomInRange(72, 82, 0),
      totalHours: randomInRange(5800, 5900, 0),
      mode,
      hourlyOperation: hourlyLabels.map(h => ({
        hour: h,
        working: randomInRange(60, 80, 0),
        idle: randomInRange(5, 15, 0),
        inoperative: randomInRange(5, 20, 0)
      })),
      rpmHistory: consumptionTimeLabels.slice(0, 20).map(t => ({
        time: t,
        value: randomInRange(1500, 1900, 0)
      })),
      speedHistory: consumptionTimeLabels.slice(0, 20).map(t => ({
        time: t,
        value: randomInRange(0.5, 4)
      })),
      cycleTimeHistory: consumptionTimeLabels.slice(0, 18).map(t => ({
        time: t,
        value: randomInRange(38, 60, 0)
      })),
      stateDistribution: [
        { name: 'TRABAJANDO', value: 73.8, color: '#10B981' },
        { name: 'RALENTÍ', value: 8.8, color: '#F59E0B' },
        { name: 'INOPERATIVO', value: 17.4, color: '#3B82F6' }
      ],
      timeline: Array.from({ length: 12 }).map((_, i) => {
        const states: OperationMode[] = ['TRABAJANDO', 'RALENTÍ', 'INOPERATIVO']
        const time = `${String(i * 2).padStart(2, '0')}:00`
        return {
          time,
          state: i % 5 === 3 ? 'RALENTÍ' : i % 7 === 6 ? 'INOPERATIVO' : 'TRABAJANDO',
          duration: randomInRange(45, 120, 0)
        }
      })
    },
    sensors: [
      { id: 'gps', name: 'GPS', category: 'NAVEGACIÓN', status: 'OK', lastUpdate: new Date() },
      { id: 'imu', name: 'IMU 9 Ejes', category: 'NAVEGACIÓN', status: 'OK', lastUpdate: new Date() },
      { id: 'rpm', name: 'Sensor RPM', category: 'MOTOR', status: 'OK', lastUpdate: new Date() },
      { id: 'temp-cool', name: 'Temp. Refrigerante', category: 'MOTOR', status: 'OK', lastUpdate: new Date() },
      { id: 'pres-oil', name: 'Pres. Aceite', category: 'MOTOR', status: 'OK', lastUpdate: new Date() },
      { id: 'temp-oil', name: 'Temp. Aceite Motor', category: 'MOTOR', status: 'OK', lastUpdate: new Date() },
      { id: 'flow-supply', name: 'Flujómetro Suministro', category: 'COMBUSTIBLE', status: 'OK', lastUpdate: new Date() },
      { id: 'flow-return', name: 'Flujómetro Retorno', category: 'COMBUSTIBLE', status: 'OK', lastUpdate: new Date() },
      { id: 'level-tank', name: 'Nivel Tanque', category: 'COMBUSTIBLE', status: 'OK', lastUpdate: new Date() },
      { id: 'pres-main', name: 'Pres. Principal', category: 'HIDRÁULICA', status: 'OK', lastUpdate: new Date() },
      { id: 'pres-arm', name: 'Pres. Brazo', category: 'HIDRÁULICA', status: 'OK', lastUpdate: new Date() },
      { id: 'pres-swing', name: 'Pres. Giro', category: 'HIDRÁULICA', status: 'OK', lastUpdate: new Date() }
    ],
    timestamp: new Date(),
    online: true
  }
}

export const generateAlerts = (): Alert[] => {
  const now = new Date()
  return [
    {
      id: 'alert-1',
      timestamp: new Date(now.getTime() - 5 * 60000),
      type: 'ADVERTENCIA',
      sensor: 'Temp. Aceite Hidráulico',
      description: 'Temperatura de aceite hidráulico cercana al límite superior',
      status: 'PENDIENTE',
      priority: 2,
      value: '65 °C',
      threshold: '70 °C'
    },
    {
      id: 'alert-2',
      timestamp: new Date(now.getTime() - 45 * 60000),
      type: 'INFORMACIÓN',
      sensor: 'Mantenimiento',
      description: 'Próximo mantenimiento preventivo en 250 horas',
      status: 'PENDIENTE',
      priority: 3,
      value: '5842 h',
      threshold: '6092 h'
    },
    {
      id: 'alert-3',
      timestamp: new Date(now.getTime() - 2 * 3600000),
      type: 'ADVERTENCIA',
      sensor: 'Filtro Combustible',
      description: 'Filtro de combustible requiere monitoreo - diferencia de presión',
      status: 'PENDIENTE',
      priority: 2,
      value: '0.8 bar',
      threshold: '1.0 bar'
    },
    {
      id: 'alert-4',
      timestamp: new Date(now.getTime() - 2 * 3600000),
      type: 'ADVERTENCIA',
      sensor: 'Filtro Combustible',
      description: 'Filtro de combustible requiere monitoreo - diferencia de presión',
      status: 'PENDIENTE',
      priority: 2,
      value: '0.8 bar',
      threshold: '1.0 bar'
    },
    {
      id: 'alert-5',
      timestamp: new Date(now.getTime() - 2 * 3600000),
      type: 'ADVERTENCIA',
      sensor: 'Filtro Combustible',
      description: 'Filtro de combustible requiere monitoreo - diferencia de presión',
      status: 'PENDIENTE',
      priority: 2,
      value: '0.8 bar',
      threshold: '1.0 bar'
    },
    {
      id: 'alert-6',
      timestamp: new Date(now.getTime() - 2 * 3600000),
      type: 'ADVERTENCIA',
      sensor: 'Filtro Combustible',
      description: 'Filtro de combustible requiere monitoreo - diferencia de presión',
      status: 'PENDIENTE',
      priority: 2,
      value: '0.8 bar',
      threshold: '1.0 bar'
    },
    {
      id: 'alert-7',
      timestamp: new Date(now.getTime() - 2 * 3600000),
      type: 'ADVERTENCIA',
      sensor: 'Filtro Combustible',
      description: 'Filtro de combustible requiere monitoreo - diferencia de presión',
      status: 'PENDIENTE',
      priority: 2,
      value: '0.8 bar',
      threshold: '1.0 bar'
    },
    {
      id: 'alert-8',
      timestamp: new Date(now.getTime() - 2 * 3600000),
      type: 'ADVERTENCIA',
      sensor: 'Filtro Combustible',
      description: 'Filtro de combustible requiere monitoreo - diferencia de presión',
      status: 'PENDIENTE',
      priority: 2,
      value: '0.8 bar',
      threshold: '1.0 bar'
    },
    {
      id: 'alert-9',
      timestamp: new Date(now.getTime() - 2 * 3600000),
      type: 'ADVERTENCIA',
      sensor: 'Filtro Combustible',
      description: 'Filtro de combustible requiere monitoreo - diferencia de presión',
      status: 'PENDIENTE',
      priority: 2,
      value: '0.8 bar',
      threshold: '1.0 bar'
    },
    {
      id: 'alert-10',
      timestamp: new Date(now.getTime() - 2 * 3600000),
      type: 'ADVERTENCIA',
      sensor: 'Filtro Combustible',
      description: 'Filtro de combustible requiere monitoreo - diferencia de presión',
      status: 'PENDIENTE',
      priority: 2,
      value: '0.8 bar',
      threshold: '1.0 bar'
    }
  ]
}

export class TelemetrySimulator {
  private state: TelemetryData
  private onChangeCallback: ((data: TelemetryData) => void) | null = null
  private intervalId: ReturnType<typeof setInterval> | null = null
  private intervalMs: number = 2000
  private mode: OperationMode = 'TRABAJANDO'
  private modeTimer = 0

  constructor(initial?: TelemetryData) {
    this.state = initial || generateInitialTelemetry()
  }

  setOnChange(cb: (data: TelemetryData) => void) {
    this.onChangeCallback = cb
  }

  private smoothUpdate(current: number, targetMin: number, targetMax: number, maxDelta: number, decimals = 1): number {
    const target = randomInRange(targetMin, targetMax, decimals)
    const delta = target - current
    const change = clamp(delta, -maxDelta, maxDelta)
    return Number((current + change).toFixed(decimals))
  }

  private tick() {
    this.modeTimer++
    if (this.modeTimer > 60) {
      this.modeTimer = 0
      const r = Math.random()
      this.mode = r < 0.7 ? 'TRABAJANDO' : r < 0.85 ? 'RALENTÍ' : 'INOPERATIVO'
    }

    const rpmBase = this.mode === 'TRABAJANDO' 
      ? [1650, 1850] 
      : this.mode === 'RALENTÍ' 
        ? [850, 1100] 
        : [0, 0]

    const newRpm = this.smoothUpdate(this.state.engine.rpm, rpmBase[0], rpmBase[1], 40, 0)
    const rpmFactor = clamp((newRpm - 600) / 1250, 0, 1)

    const newEngine = {
      ...this.state.engine,
      rpm: newRpm,
      coolantTemp: this.mode === 'INOPERATIVO' ? this.smoothUpdate(this.state.engine.coolantTemp, 40, 50, 0.5) : this.smoothUpdate(this.state.engine.coolantTemp, 78 + rpmFactor * 10, 82 + rpmFactor * 8, 0.3),
      oilPressure: this.mode === 'INOPERATIVO' ? this.smoothUpdate(this.state.engine.oilPressure, 0, 0, 0.2) : this.smoothUpdate(this.state.engine.oilPressure, 3.6 + rpmFactor * 0.4, 4.2 + rpmFactor * 0.6, 0.05, 2),
      oilTemp: this.mode === 'INOPERATIVO' ? this.smoothUpdate(this.state.engine.oilTemp, 40, 50, 0.5) : this.smoothUpdate(this.state.engine.oilTemp, 90 + rpmFactor * 10, 95 + rpmFactor * 10, 0.2)
    }

    const instantFuel = this.mode === 'TRABAJANDO'
      ? 35 + rpmFactor * 15
      : this.mode === 'RALENTÍ'
        ? 8 + rpmFactor * 4
        : 2.5 // Consumo irreal inyectado para rellenar la maqueta
    
    const hourFrac = this.intervalMs / 3600000
    const consumed = instantFuel * hourFrac

    const newInstantConsumption = this.smoothUpdate(this.state.fuel.instantConsumption, instantFuel * 0.85, instantFuel * 1.15, 1.5)

    const newFuel = {
      ...this.state.fuel,
      instantConsumption: newInstantConsumption,
      avgConsumption: this.smoothUpdate(this.state.fuel.avgConsumption, 38, 42, 0.1),
      tankLevel: Math.max(0, this.state.fuel.tankLevel - (consumed / this.state.fuel.tankCapacity * 100) + (Math.random() - 0.5) * 0.05),
      autonomy: clamp((this.state.fuel.tankLevel / 100 * this.state.fuel.tankCapacity) / Math.max(this.state.fuel.avgConsumption, 0.1), 0, 50),
      todayConsumption: this.state.fuel.todayConsumption + consumed,
      idleTodayConsumption: this.mode === 'RALENTÍ' ? this.state.fuel.idleTodayConsumption + consumed : this.state.fuel.idleTodayConsumption,
      workingConsumption: this.mode === 'TRABAJANDO' ? this.state.fuel.workingConsumption + consumed : this.state.fuel.workingConsumption,
      idleConsumption: this.mode === 'RALENTÍ' ? this.state.fuel.idleConsumption + consumed : this.state.fuel.idleConsumption,
      inoperativeConsumption: this.mode === 'INOPERATIVO' ? this.state.fuel.inoperativeConsumption + consumed : this.state.fuel.inoperativeConsumption,
      supplyFlow: this.mode === 'INOPERATIVO' ? 0 : this.smoothUpdate(this.state.fuel.supplyFlow, 20, 25, 0.5),
      returnFlow: this.mode === 'INOPERATIVO' ? 0 : this.smoothUpdate(this.state.fuel.returnFlow, 2, 4, 0.1),
      consumptionHistory: this.state.fuel.consumptionHistory.map((item, index, arr) => 
        index === arr.length - 1 
          ? { ...item, value: newInstantConsumption } 
          : item
      )
    }

    const hydFactor = this.mode === 'TRABAJANDO' ? 1 : this.mode === 'RALENTÍ' ? 0.2 : 0
    const newHydraulic = {
      ...this.state.hydraulic,
      mainPressure: this.mode === 'INOPERATIVO' ? this.smoothUpdate(this.state.hydraulic.mainPressure, 0, 0, 10, 0) : this.smoothUpdate(this.state.hydraulic.mainPressure, 200 + hydFactor * 80, 220 + hydFactor * 80, 5, 0),
      armPressure: this.mode === 'INOPERATIVO' ? this.smoothUpdate(this.state.hydraulic.armPressure, 0, 0, 10, 0) : this.smoothUpdate(this.state.hydraulic.armPressure, 190 + hydFactor * 80, 210 + hydFactor * 75, 5, 0),
      swingPressure: this.mode === 'INOPERATIVO' ? this.smoothUpdate(this.state.hydraulic.swingPressure, 0, 0, 10, 0) : this.smoothUpdate(this.state.hydraulic.swingPressure, 160 + hydFactor * 55, 180 + hydFactor * 50, 4, 0),
      oilTemp: this.mode === 'INOPERATIVO' ? this.smoothUpdate(this.state.hydraulic.oilTemp, 40, 50, 0.5) : this.smoothUpdate(this.state.hydraulic.oilTemp, 54 + hydFactor * 6, 58 + hydFactor * 6, 0.15),
      load: this.mode === 'INOPERATIVO' ? 0 : clamp(50 + hydFactor * randomInRange(10, 40, 0), 0, 100)
    }

    const speedFactor = this.mode === 'TRABAJANDO' ? randomInRange(0.4, 1) : 0
    const newGps = {
      ...this.state.gps,
      speed: this.smoothUpdate(this.state.gps.speed, speedFactor * 0.5, speedFactor * 4.5, 0.15),
      heading: (this.state.gps.heading + randomInRange(-2, 2)) % 360,
      latDecimal: this.state.gps.latDecimal + (Math.random() - 0.5) * 0.00002,
      lonDecimal: this.state.gps.lonDecimal + (Math.random() - 0.5) * 0.00002,
      distance: this.state.gps.distance + this.state.gps.speed / 1800
    }

    const newImu = {
      ...this.state.imu,
      pitch: this.smoothUpdate(this.state.imu.pitch, -3, 3, 0.2),
      roll: this.smoothUpdate(this.state.imu.roll, -2.5, 2.5, 0.15),
      yaw: this.state.imu.yaw
    }

    const productivityDelta = this.mode === 'TRABAJANDO' ? 1 : 0
    const tonsPerCycle = randomInRange(11, 13)
    const cycleDone = Math.random() < 0.018 && productivityDelta
    const newProductivity = {
      ...this.state.productivity,
      cyclesCompleted: this.state.productivity.cyclesCompleted + (cycleDone ? 1 : 0),
      tonsMoved: cycleDone ? this.state.productivity.tonsMoved + tonsPerCycle : this.state.productivity.tonsMoved,
      performance: (this.state.productivity.tonsMoved / Math.max(0.1, this.state.operation.engineHours))
    }

    const workingPct = this.mode === 'TRABAJANDO' ? 1 : 0
    const idlePct = this.mode === 'RALENTÍ' ? 1 : 0
    const inopPct = this.mode === 'INOPERATIVO' ? 1 : 0
    const newOperation = {
      ...this.state.operation,
      mode: this.mode,
      engineHours: this.state.operation.engineHours + hourFrac,
      effectiveHours: this.state.operation.effectiveHours + hourFrac * workingPct,
      idleHours: this.state.operation.idleHours + hourFrac * idlePct,
      inoperativeHours: this.state.operation.inoperativeHours + hourFrac * inopPct,
      utilization: clamp(
        (this.state.operation.effectiveHours / Math.max(0.01, this.state.operation.engineHours)) * 100,
        0, 100
      )
    }

    this.state = {
      engine: newEngine,
      fuel: newFuel,
      hydraulic: newHydraulic,
      gps: newGps,
      imu: newImu,
      productivity: newProductivity,
      operation: newOperation,
      sensors: this.state.sensors.map(s => ({ ...s, lastUpdate: new Date() })),
      timestamp: new Date(),
      online: true
    }

    if (this.onChangeCallback) {
      this.onChangeCallback({ ...this.state })
    }
  }

  start(interval = 2000) {
    if (this.intervalId) return
    this.intervalMs = interval
    this.intervalId = setInterval(() => this.tick(), interval)
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
      this.intervalId = null
    }
  }

  getState(): TelemetryData {
    return { ...this.state }
  }

  setMode(mode: OperationMode) {
    this.mode = mode
  }
}
