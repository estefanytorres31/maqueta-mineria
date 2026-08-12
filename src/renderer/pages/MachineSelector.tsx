import { useState } from 'react'
import { useNavigationStore } from '../stores/navigationStore'
import { MACHINES } from '../data/machines'
import { Machine } from '../types'
import StatusBar from '../components/StatusBar'
import SelectorHeader from '../components/machine-selector/SelectorHeader'
import MachineCard from '../components/machine-selector/MachineCard'
import MachineCarousel from '../components/machine-selector/MachineCarousel'
import LoginSection from '../components/machine-selector/LoginSection'

export default function MachineSelector() {
  const [selected, setSelected] = useState<Machine | null>(MACHINES[0])
  const goToDashboard = useNavigationStore(s => s.goToDashboard)

  const handleCardClick = (machine: Machine) => {
    setSelected(machine)
    goToDashboard(machine)
  }

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-br from-industrial-950 via-industrial-900 to-industrial-950 overflow-hidden">
      <SelectorHeader />

      <main className="flex-1 min-h-0 overflow-hidden px-2 sm:px-3 md:px-4 xl:px-10 2xl:px-14 py-2 sm:py-3 md:py-4 xl:py-8 2xl:py-10 flex flex-col gap-1.5 sm:gap-2 md:gap-3 xl:gap-6 2xl:gap-8">
        <div className="text-center mb-0 md:mb-0 xl:mb-0 flex-shrink-0">
          <h1 className="text-base sm:text-lg md:text-2xl xl:text-4xl font-bold text-white mb-0.5 md:mb-1 xl:mb-2 leading-tight">
            BIENVENIDO A <span className="text-electric-400">EDGE SMART</span>
          </h1>
          <p className="text-gray-400 text-[11px] sm:text-xs md:text-sm leading-tight">
            Seleccione el tipo de máquina para continuar
          </p>
        </div>

        <div className="flex-1 min-h-0 w-full overflow-hidden flex items-stretch justify-center">
          <div className="hidden xl:grid xl:grid-cols-6 xl:gap-4 2xl:gap-6 w-full h-full min-h-0 max-w-[1780px] 2xl:max-w-[1980px] mx-auto">
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

        <div className="flex-shrink-0 mt-0 md:mt-0 xl:mt-0">
          <LoginSection />
        </div>
      </main>

      <StatusBar />
    </div>
  )
}
