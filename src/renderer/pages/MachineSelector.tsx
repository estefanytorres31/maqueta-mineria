import { useState, useEffect } from 'react'
import { useNavigationStore } from '../stores/navigationStore'
import { MACHINES } from '../data/machines'
import { Machine } from '../types'
import SelectorHeader from '../components/machine-selector/SelectorHeader'
import MachineCard from '../components/machine-selector/MachineCard'
import MachineCarousel from '../components/machine-selector/MachineCarousel'

const getInitialSelected = (): Machine => {
  const persisted = useNavigationStore.getState().selectedMachine
  return persisted ?? MACHINES[0]
}

export default function MachineSelector() {
  const persistedInitial = getInitialSelected()
  const [selected, setSelected] = useState<Machine | null>(persistedInitial)
  const globalSelectedMachine = useNavigationStore(s => s.selectedMachine)
  const goToDashboard = useNavigationStore(s => s.goToDashboard)
  const setMachine = useNavigationStore(s => s.setMachine)

  useEffect(() => {
    // Precargar todas las imágenes e íconos en memoria en segundo plano
    MACHINES.forEach(machine => {
      const img = new Image()
      img.src = machine.imageUrl
      const icon = new Image()
      icon.src = machine.iconUrl
    })
  }, [])

  useEffect(() => {
    if (globalSelectedMachine && globalSelectedMachine.id !== selected?.id) {
      setSelected(globalSelectedMachine)
    }
  }, [globalSelectedMachine, selected?.id])

  const handleCardClick = (machine: Machine) => {
    setSelected(machine)
    setMachine(machine)
    goToDashboard(machine)
  }

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-br from-industrial-950 via-industrial-900 to-industrial-950 overflow-hidden">
      <SelectorHeader />

      <main className="flex-1 min-h-0 w-full flex flex-col items-stretch overflow-hidden px-3 sm:px-4 md:px-6 xl:px-12 2xl:px-24 py-2 sm:py-3 md:py-5 xl:py-6 2xl:py-8 gap-1.5 sm:gap-2 md:gap-3 xl:gap-5 2xl:gap-7">
        <div className="text-center flex-shrink-0">
          <h1 className="text-base sm:text-xl md:text-xl xl:text-2xl 2xl:text-3xl font-bold text-white mb-0.5 sm:mb-1 md:mb-1.5 xl:mb-2 2xl:mb-3 leading-tight">
            BIENVENIDO A <span className="text-electric-400">EDGE SMART</span>
          </h1>
          <p className="text-gray-400 text-[11px] sm:text-xs md:text-sm xl:text-base leading-tight">
            Seleccione el tipo de máquina para continuar
          </p>
        </div>

        <div className="flex-1 min-h-0 w-full flex items-center justify-center overflow-hidden">
          <div className="hidden xl:grid xl:grid-cols-7 w-full h-auto max-h-full max-w-[2000px] 2xl:max-w-[2600px] mx-auto gap-3 xl:gap-4 2xl:gap-3 px-0 xl:px-6 2xl:px-0.5 place-content-center items-center">
            {MACHINES.map(machine => (
              <MachineCard
                key={machine.id}
                machine={machine}
                isSelected={selected?.id === machine.id}
                onClick={() => handleCardClick(machine)}
                variant="grid"
              />
            ))}
          </div>

          <MachineCarousel
            machines={MACHINES}
            selected={selected}
            onSelect={handleCardClick}
          />
        </div>
      </main>
    </div>
  )
}
