import { Machine, MachineType } from '../types'

export const MACHINES: Machine[] = [
  {
    id: 'cat-375l',
    type: 'excavator',
    name: 'EXCAVADORA',
    model: 'CAT 375L',
    code: 'EQ-002',
    category: 'EXCAVADORA HIDRÁULICA',
    imageUrl: '/maquinaria/excavadora.png',
    iconUrl: '/maquinaria/iconos/excavadora.png'
  },
  {
    id: 'cat-980k',
    type: 'loader',
    name: 'CARGADOR FRONTAL',
    model: 'CAT 980K',
    code: 'EQ-005',
    category: 'CARGADOR DE RUEDAS',
    imageUrl: '/maquinaria/cargador frontal.png',
    iconUrl: '/maquinaria/iconos/cargador frontal.png'
  },
  {
    id: 'cat-r1700',
    type: 'scoop',
    name: 'SCOOP / LHD',
    model: 'CAT R1700',
    code: 'EQ-008',
    category: 'CARGA-DESCARGA SUBTERRÁNEO',
    imageUrl: '/maquinaria/scoop.png',
    iconUrl: '/maquinaria/iconos/scoop.png'
  },
  {
    id: 'cat-d11t',
    type: 'tractor',
    name: 'TRACTOR ORUGA',
    model: 'CAT D11T',
    code: 'EQ-012',
    category: 'TRACTOR DE CADENAS',
    imageUrl: '/maquinaria/tractor oruga.png',
    iconUrl: '/maquinaria/iconos/tractor oruga.png'
  },
  {
    id: 'cat-md6200',
    type: 'drill',
    name: 'PERFORADORA',
    model: 'CAT MD6200',
    code: 'EQ-015',
    category: 'PERFORADORA ROTATIVA',
    imageUrl: '/maquinaria/perforadora.png',
    iconUrl: '/maquinaria/iconos/perforadora.png'
  },
  {
    id: 'cat-777g',
    type: 'other',
    name: 'OTRA MAQUINARIA',
    model: 'CAT 777G',
    code: 'EQ-020',
    category: 'CAMIÓN DE ACARREO',
    imageUrl: '/maquinaria/camion.png',
    iconUrl: '/maquinaria/iconos/camion.png'
  }
]

export const getMachineByType = (type: MachineType): Machine | undefined => {
  return MACHINES.find(m => m.type === type)
}

export const getMachineById = (id: string): Machine | undefined => {
  return MACHINES.find(m => m.id === id)
}
