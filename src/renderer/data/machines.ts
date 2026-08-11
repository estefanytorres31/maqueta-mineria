import { Machine, MachineType } from '../types'

export const MACHINES: Machine[] = [
  {
    id: 'cat-375l',
    type: 'excavator',
    name: 'RETROEXCAVADORA',
    model: 'CAT 375L',
    code: 'EQ-002',
    category: 'EXCAVADORA HIDRÁULICA'
  },
  {
    id: 'cat-980k',
    type: 'loader',
    name: 'CARGADOR FRONTAL',
    model: 'CAT 980K',
    code: 'EQ-005',
    category: 'CARGADOR DE RUEDAS'
  },
  {
    id: 'cat-r1700',
    type: 'scoop',
    name: 'SCOOP / LHD',
    model: 'CAT R1700',
    code: 'EQ-008',
    category: 'CARGA-DESCARGA SUBTERRÁNEO'
  },
  {
    id: 'cat-d11t',
    type: 'tractor',
    name: 'TRACTOR ORUGA',
    model: 'CAT D11T',
    code: 'EQ-012',
    category: 'TRACTOR DE CADENAS'
  },
  {
    id: 'cat-md6200',
    type: 'drill',
    name: 'PERFORADORA',
    model: 'CAT MD6200',
    code: 'EQ-015',
    category: 'PERFORADORA ROTATIVA'
  },
  {
    id: 'cat-777g',
    type: 'other',
    name: 'OTRA MAQUINARIA',
    model: 'CAT 777G',
    code: 'EQ-020',
    category: 'CAMIÓN DE ACARREO'
  }
]

export const getMachineByType = (type: MachineType): Machine | undefined => {
  return MACHINES.find(m => m.type === type)
}

export const getMachineById = (id: string): Machine | undefined => {
  return MACHINES.find(m => m.id === id)
}
