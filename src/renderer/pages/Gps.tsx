import { useEffect, useMemo } from 'react'
import { 
  MapPin, 
  Navigation, 
  Move3D, 
  TrendingUp, 
  Ruler,
  Mountain,
  Compass,
  ArrowRight,
  CircleDot,
  Activity
} from 'lucide-react'
import { useTelemetryStore } from '../stores/telemetryStore'
import Panel from '../components/Panel'
import MetricCard from '../components/MetricCard'
import Gauge from '../components/Gauge'

export default function Gps() {
  const { telemetry } = useTelemetryStore()
  const { gps, imu, operation } = telemetry

  const trail = useMemo(() => {
    const points = []
    let lat = gps.latDecimal
    let lon = gps.lonDecimal
    for (let i = 0; i < 30; i++) {
      lat += (Math.random() - 0.5) * 0.00001
      lon += (Math.random() - 0.5) * 0.00001
      points.push({ lat, lon })
    }
    return points
  }, [gps.latDecimal, gps.lonDecimal])

  const mapSize = { w: 700, h: 400 }
  const minLat = Math.min(...trail.map(p => p.lat))
  const maxLat = Math.max(...trail.map(p => p.lat))
  const minLon = Math.min(...trail.map(p => p.lon))
  const maxLon = Math.max(...trail.map(p => p.lon))

  const scaleX = (lon: number) => ((lon - minLon) / Math.max(0.00001, maxLon - minLon)) * (mapSize.w - 80) + 40
  const scaleY = (lat: number) => mapSize.h - (((lat - minLat) / Math.max(0.00001, maxLat - minLat)) * (mapSize.h - 80) + 40)

  const svgPath = trail.map((p, i) => 
    `${i === 0 ? 'M' : 'L'} ${scaleX(p.lon)} ${scaleY(p.lat)}`
  ).join(' ')

  return (
    <div className="w-full h-full flex flex-col gap-3 lg:gap-4">
      <div className="flex items-center gap-2 mb-0.5">
        <MapPin size={22} className="text-electric-400" />
        <h2 className="text-xl md:text-2xl font-bold text-white">GPS / MOVIMIENTO</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2 md:gap-3">
        <MetricCard label="LATITUD" value={gps.latitude.split(' ')[1] || gps.latitude} className="!p-2" />
        <MetricCard label="LONGITUD" value={gps.longitude.split(' ')[1] || gps.longitude} className="!p-2" />
        <MetricCard label="VELOCIDAD" value={gps.speed.toFixed(1)} unit="km/h" className="!p-2" />
        <MetricCard label="HEADING (RUMBO)" value={`${gps.heading.toFixed(0)}°`} className="!p-2" />
        <MetricCard label="PITCH" value={imu.pitch > 0 ? '+' : '' + imu.pitch.toFixed(2)} unit="°" className="!p-2" />
        <MetricCard label="ROLL" value={imu.roll > 0 ? '+' : '' + imu.roll.toFixed(2)} unit="°" className="!p-2" />
        <MetricCard label="ALTITUD" value={gps.altitude.toLocaleString()} unit="m" className="!p-2" />
        <MetricCard label="DISTANCIA" value={gps.distance.toFixed(1)} unit="km" className="!p-2" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-4 flex-1 min-h-0">
        <div className="lg:col-span-9 flex flex-col gap-3 lg:gap-4">
          <Panel title="MAPA DE UBICACIÓN Y TRAYECTORIA" icon={MapPin} className="flex-1 min-h-0">
            <div className="relative w-full h-full min-h-[260px] rounded-lg overflow-hidden bg-industrial-900 border border-industrial-700">
              <svg width="100%" height="100%" viewBox={`0 0 ${mapSize.w} ${mapSize.h}`} preserveAspectRatio="xMidYMid meet">
                <defs>
                  <pattern id="grid" width="35" height="35" patternUnits="userSpaceOnUse">
                    <path d="M 35 0 L 0 0 0 35" fill="none" stroke="#162233" strokeWidth="0.5" />
                  </pattern>
                  <linearGradient id="trailGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10B981" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#1E88E5" stopOpacity="1" />
                  </linearGradient>
                  <radialGradient id="pulseGlow">
                    <stop offset="0%" stopColor="#10B981" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />

                <circle cx={mapSize.w / 2} cy={mapSize.h / 2} r={120} fill="none" stroke="#1C2B3F" strokeWidth="1" strokeDasharray="4 4" />
                <circle cx={mapSize.w / 2} cy={mapSize.h / 2} r={80} fill="none" stroke="#253A54" strokeWidth="1" strokeDasharray="2 3" />
                <circle cx={mapSize.w / 2} cy={mapSize.h / 2} r={40} fill="none" stroke="#334A68" strokeWidth="1" />

                <line x1="0" y1={mapSize.h/2} x2={mapSize.w} y2={mapSize.h/2} stroke="#162233" strokeWidth="0.5" />
                <line x1={mapSize.w/2} y1="0" x2={mapSize.w/2} y2={mapSize.h} stroke="#162233" strokeWidth="0.5" />

                <path d={svgPath} fill="none" stroke="url(#trailGrad)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                <path d={svgPath} fill="none" stroke="#1E88E5" strokeWidth="1.5" strokeDasharray="8 6" opacity="0.8" />

                <circle cx={scaleX(trail[0].lon)} cy={scaleY(trail[0].lat)} r="5" fill="#6B7280" stroke="#0D141E" strokeWidth="2" />
                <text x={scaleX(trail[0].lon)} y={scaleY(trail[0].lat) + 20} fill="#6B7280" fontSize="10" textAnchor="middle" fontFamily="monospace">INICIO</text>

                {[1, 6, 11, 16, 21].map(i => (
                  <circle key={i} cx={scaleX(trail[i].lon)} cy={scaleY(trail[i].lat)} r="3.5" fill="#1E88E5" stroke="#0D141E" strokeWidth="1.5" opacity="0.8" />
                ))}

                <g transform={`translate(${scaleX(gps.lonDecimal)}, ${scaleY(gps.latDecimal)})`}>
                  <circle r="28" fill="url(#pulseGlow)" className="animate-pulse-slow" />
                  <circle r="16" fill="none" stroke="#10B981" strokeWidth="2" opacity="0.6" />
                  <circle r="9" fill="#10B981" stroke="#fff" strokeWidth="2" />
                  <polygon 
                    points="0,-14 4,-2 4,4 -4,4 -4,-2" 
                    fill="#fff" 
                    transform={`rotate(${gps.heading})`}
                  />
                </g>

                <g transform="translate(20, 20)">
                  <circle cx="16" cy="16" r="14" fill="#0D141E" stroke="#253A54" strokeWidth="1" />
                  <text x="16" y="13" textAnchor="middle" fill="#10B981" fontSize="10" fontWeight="bold">N</text>
                  <text x="16" y="36" textAnchor="middle" fill="#4B5563" fontSize="8">S</text>
                  <text x="30" y="20" textAnchor="middle" fill="#4B5563" fontSize="8">E</text>
                  <text x="2" y="20" textAnchor="middle" fill="#4B5563" fontSize="8">O</text>
                </g>

                <g transform={`translate(${mapSize.w - 110}, 20)`}>
                  <rect x="0" y="0" width="90" height="56" rx="4" fill="#0D141E" stroke="#253A54" strokeWidth="1" opacity="0.95" />
                  <text x="8" y="14" fill="#9CA3AF" fontSize="8" fontFamily="monospace">N: {(gps.latDecimal).toFixed(6)}</text>
                  <text x="8" y="26" fill="#9CA3AF" fontSize="8" fontFamily="monospace">W: {Math.abs(gps.lonDecimal).toFixed(6)}</text>
                  <text x="8" y="38" fill="#10B981" fontSize="8" fontFamily="monospace">ALT: {gps.altitude}m</text>
                  <text x="8" y="50" fill="#F59E0B" fontSize="8" fontFamily="monospace">VEL: {gps.speed.toFixed(1)}km/h</text>
                </g>
              </svg>
            </div>
          </Panel>

          <Panel title="INCLINACIÓN EN TIEMPO REAL (IMU)">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <div className="flex flex-col items-center">
                <div className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-2">INCLINACIÓN VISUAL</div>
                <svg width="180" height="160" viewBox="0 0 180 160">
                  <defs>
                    <linearGradient id="vehicleGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#EAB308" />
                      <stop offset="100%" stopColor="#B45309" />
                    </linearGradient>
                  </defs>
                  <g transform={`translate(90, 110) rotate(${imu.roll})`}>
                    <g transform={`rotate(${imu.pitch})`}>
                      <rect x="-55" y="-20" width="110" height="28" rx="6" fill="url(#vehicleGrad)" stroke="#0D141E" strokeWidth="1.5" />
                      <rect x="-30" y="-40" width="35" height="22" rx="4" fill="#0369A1" stroke="#0D141E" strokeWidth="1" />
                      <circle cx="-40" cy="12" r="10" fill="#111A26" stroke="#374151" strokeWidth="2" />
                      <circle cx="40" cy="12" r="10" fill="#111A26" stroke="#374151" strokeWidth="2" />
                      <circle cx="-40" cy="12" r="4" fill="#6B7280" />
                      <circle cx="40" cy="12" r="4" fill="#6B7280" />
                    </g>
                  </g>
                  <line x1="20" y1="140" x2="160" y2="140" stroke="#253A54" strokeWidth="2" strokeDasharray="6 4" />
                  <g transform="translate(20, 140)">
                    <line x1="0" y1="-3" x2="0" y2="3" stroke="#253A54" strokeWidth="1.5" />
                    <text x="0" y="16" textAnchor="middle" fill="#4B5563" fontSize="8">-5°</text>
                  </g>
                  <g transform="translate(90, 140)">
                    <line x1="0" y1="-5" x2="0" y2="5" stroke="#1E88E5" strokeWidth="2" />
                    <text x="0" y="16" textAnchor="middle" fill="#1E88E5" fontSize="8" fontWeight="bold">0°</text>
                  </g>
                  <g transform="translate(160, 140)">
                    <line x1="0" y1="-3" x2="0" y2="3" stroke="#253A54" strokeWidth="1.5" />
                    <text x="0" y="16" textAnchor="middle" fill="#4B5563" fontSize="8">+5°</text>
                  </g>
                </svg>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-industrial-850 rounded-xl border border-industrial-700 p-4 flex flex-col items-center">
                  <Move3D size={20} className="text-electric-400 mb-2" />
                  <div className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">PITCH</div>
                  <div className={`text-3xl font-black font-mono ${Math.abs(imu.pitch) > 4 ? 'text-status-warning' : 'text-white'}`}>
                    {imu.pitch > 0 ? '+' : ''}{imu.pitch.toFixed(1)}°
                  </div>
                  <div className="mt-2 w-full h-1.5 rounded-full bg-industrial-700 overflow-hidden">
                    <div 
                      className="h-full bg-electric-500 transition-all duration-500" 
                      style={{ width: `${50 + imu.pitch * 10}%`, marginLeft: `${Math.min(0, 50 - (-imu.pitch + 5) * 10)}%` }}
                    />
                  </div>
                </div>
                <div className="bg-industrial-850 rounded-xl border border-industrial-700 p-4 flex flex-col items-center">
                  <Activity size={20} className="text-fuel-primary mb-2" />
                  <div className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">ROLL</div>
                  <div className={`text-3xl font-black font-mono ${Math.abs(imu.roll) > 4 ? 'text-status-warning' : 'text-white'}`}>
                    {imu.roll > 0 ? '+' : ''}{imu.roll.toFixed(1)}°
                  </div>
                  <div className="mt-2 w-full h-1.5 rounded-full bg-industrial-700 overflow-hidden">
                    <div 
                      className="h-full bg-fuel-primary transition-all duration-500" 
                      style={{ width: `${50 + imu.roll * 10}%`, marginLeft: 0 }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <Compass size={22} className="text-status-ok mb-2" />
                <div className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-2">RUMBO (HEADING)</div>
                <Gauge value={gps.heading} max={360} label="°" size={130} color="#10B981" />
                <div className="flex items-center gap-1 text-gray-400 text-xs mt-1">
                  <Navigation size={12} style={{ transform: `rotate(${gps.heading}deg)` }} className="text-electric-400" />
                  <span className="font-mono text-electric-400 font-semibold">{gps.heading.toFixed(0)}°</span>
                </div>
              </div>
            </div>
          </Panel>
        </div>

        <div className="lg:col-span-3 flex flex-col gap-3 lg:gap-4">
          <Panel title="VELOCÍMETRO">
            <div className="flex justify-center">
              <Gauge value={gps.speed} max={10} label="VELOCIDAD" unit="km/h" size={170} color="#10B981" warningThreshold={7} dangerThreshold={9} />
            </div>
          </Panel>

          <Panel title="DATOS DE NAVEGACIÓN">
            <div className="space-y-2">
              <div className="flex justify-between items-center bg-industrial-850 rounded-lg p-2.5 border border-industrial-700">
                <div className="flex items-center gap-1.5 text-gray-400 text-xs font-medium">
                  <MapPin size={12} className="text-electric-400" />
                  UBICACIÓN
                </div>
                <div className="text-right">
                  <div className="font-mono text-xs text-white">{gps.latitude}</div>
                  <div className="font-mono text-xs text-white">{gps.longitude}</div>
                </div>
              </div>
              <div className="flex justify-between items-center bg-industrial-850 rounded-lg p-2.5 border border-industrial-700">
                <div className="flex items-center gap-1.5 text-gray-400 text-xs font-medium">
                  <Ruler size={12} className="text-status-ok" />
                  DISTANCIA RECORRIDA
                </div>
                <span className="font-mono font-bold text-white">{gps.distance.toFixed(2)} <span className="text-xs text-gray-400">km</span></span>
              </div>
              <div className="flex justify-between items-center bg-industrial-850 rounded-lg p-2.5 border border-industrial-700">
                <div className="flex items-center gap-1.5 text-gray-400 text-xs font-medium">
                  <Mountain size={12} className="text-fuel-primary" />
                  ALTITUD
                </div>
                <span className="font-mono font-bold text-white">{gps.altitude.toLocaleString()} <span className="text-xs text-gray-400">m s.n.m.</span></span>
              </div>
              <div className="flex justify-between items-center bg-industrial-850 rounded-lg p-2.5 border border-industrial-700">
                <div className="flex items-center gap-1.5 text-gray-400 text-xs font-medium">
                  <TrendingUp size={12} className="text-status-ok" />
                  HORAS OPERACIÓN
                </div>
                <span className="font-mono font-bold text-white">{operation.engineHours.toFixed(1)} <span className="text-xs text-gray-400">h</span></span>
              </div>
              <div className="flex justify-between items-center bg-industrial-850 rounded-lg p-2.5 border border-industrial-700">
                <div className="flex items-center gap-1.5 text-gray-400 text-xs font-medium">
                  <CircleDot size={12} className={gps.status === 'OK' ? 'text-status-ok' : 'text-status-danger'} fill={gps.status === 'OK' ? 'currentColor' : 'none'} />
                  ESTADO GPS
                </div>
                <span className={`font-bold text-sm ${gps.status === 'OK' ? 'text-status-ok' : 'text-status-danger'}`}>{gps.status}</span>
              </div>
            </div>
          </Panel>

          <Panel title="LEYENDA TRAYECTORIA" className="flex-1">
            <div className="space-y-3 text-xs">
              <div className="flex items-center gap-3">
                <span className="w-4 h-4 rounded-full bg-status-ok shadow-glow-green flex-shrink-0" />
                <div>
                  <div className="text-white font-semibold">POSICIÓN ACTUAL</div>
                  <div className="text-gray-500">Ubicación en tiempo real de la máquina</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-4 h-1 rounded bg-electric-500 flex-shrink-0" />
                <div>
                  <div className="text-white font-semibold">TRAYECTORIA RECIENTE</div>
                  <div className="text-gray-500">Historial de movimiento (últimos puntos)</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-4 h-4 rounded-full bg-status-offline flex-shrink-0" />
                <div>
                  <div className="text-white font-semibold">PUNTO DE INICIO</div>
                  <div className="text-gray-500">Inicio del recorrido registrado</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <ArrowRight size={16} className="text-electric-400 flex-shrink-0" />
                <div>
                  <div className="text-white font-semibold">PREPARADO PARA</div>
                  <div className="text-gray-500">Leaflet / OpenStreetMap</div>
                </div>
              </div>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  )
}
