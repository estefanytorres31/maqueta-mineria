import { Machine, MachineType } from '../types'

export const MACHINES: Machine[] = [
  {
    id: '375l',
    type: 'excavator',
    name: 'EXCAVADORA',
    model: '3754L',
    code: 'EQ-002',
    category: 'EXCAVADORA HIDRÁULICA',
    imageUrl: './maquinaria/excavadora.webp',
    iconUrl: './maquinaria/iconos/excavadora.webp'
  },
  {
    id: '980k',
    type: 'loader',
    name: 'CARGADOR FRONTAL',
    model: '6540K',
    code: 'EQ-005',
    category: 'CARGADOR FRONTAL',
    imageUrl: './maquinaria/cargador frontal.webp',
    iconUrl: './maquinaria/iconos/cargador frontal.webp'
  },
  {
    id: 'r1700',
    type: 'scoop',
    name: 'SCOOP / LHD',
    model: 'R4000',
    code: 'EQ-008',
    category: 'SCOOP / LHD',
    imageUrl: './maquinaria/scoop.webp',
    iconUrl: './maquinaria/iconos/scoop.webp'
  },
  {
    id: 'd11t',
    type: 'tractor',
    name: 'TRACTOR ORUGA',
    model: 'D178T',
    code: 'EQ-012',
    category: 'TRACTOR ORUGA',
    imageUrl: './maquinaria/tractor oruga.webp',
    iconUrl: './maquinaria/iconos/tractor oruga.webp'
  },
  {
    id: 'md6200',
    type: 'drill',
    name: 'PERFORADORA',
    model: 'MD2020',
    code: 'EQ-015',
    category: 'PERFORADORA',
    imageUrl: './maquinaria/perforadora.webp',
    iconUrl: './maquinaria/iconos/perforadora.webp'
  },
  {
    id: '378l',
    type: 'retroexcavator',
    name: 'RETROEXCAVADORA',
    model: '3658L',
    code: 'EQ-002',
    category: 'RETROEXCAVADORA CON CARGADOR FRONTAL',
    imageUrl: './maquinaria/retroexcavadora.webp',
    iconUrl: './maquinaria/iconos/retroexcavadora.webp'
  },
  {
    id: '777g',
    type: 'other',
    name: 'CAMIÓN MINERO',
    model: '767G',
    code: 'EQ-020',
    category: 'CAMIÓN MINERO',
    imageUrl: './maquinaria/camion.webp',
    iconUrl: './maquinaria/iconos/camion.webp'
  }
]

export const getMachineByType = (type: MachineType): Machine | undefined => {
  return MACHINES.find(m => m.type === type)
}

export const getMachineById = (id: string): Machine | undefined => {
  return MACHINES.find(m => m.id === id)
}
