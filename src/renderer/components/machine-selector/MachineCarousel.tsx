import { useRef } from 'react'
import { Machine } from '../../types'
import MachineCard from './MachineCard'

interface MachineCarouselProps {
  machines: Machine[]
  selected: Machine | null
  onSelect: (m: Machine) => void
}

export default function MachineCarousel({ machines, selected, onSelect }: MachineCarouselProps) {
  const carouselRef = useRef<HTMLDivElement | null>(null)
  const dragState = useRef({
    isDown: false,
    startX: 0,
    startScrollLeft: 0,
    hasMoved: false,
    movedDistance: 0
  })

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!carouselRef.current) return
    dragState.current.isDown = true
    dragState.current.hasMoved = false
    dragState.current.movedDistance = 0
    dragState.current.startX = e.pageX - carouselRef.current.offsetLeft
    dragState.current.startScrollLeft = carouselRef.current.scrollLeft
    carouselRef.current.setPointerCapture(e.pointerId)
    carouselRef.current.style.cursor = 'grabbing'
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragState.current.isDown || !carouselRef.current) return
    const x = e.pageX - carouselRef.current.offsetLeft
    const walk = (x - dragState.current.startX) * 1.1
    dragState.current.movedDistance = Math.abs(walk)
    if (dragState.current.movedDistance > 5) {
      dragState.current.hasMoved = true
    }
    carouselRef.current.scrollLeft = dragState.current.startScrollLeft - walk
  }

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!carouselRef.current) return
    dragState.current.isDown = false
    carouselRef.current.releasePointerCapture?.(e.pointerId)
    carouselRef.current.style.cursor = ''
  }

  const handleCardClickCapture = (e: React.MouseEvent) => {
    if (dragState.current.hasMoved && dragState.current.movedDistance > 8) {
      e.preventDefault()
      e.stopPropagation()
    }
  }

  return (
    <div className="xl:hidden w-full h-full min-h-0">
      <div
        ref={carouselRef}
        className="w-full h-full flex overflow-x-auto snap-x snap-mandatory gap-2 sm:gap-2.5 md:gap-3 xl:gap-4 px-2 sm:px-3 md:px-4 xl:px-6 py-1 sm:py-1.5 md:py-2 xl:py-3 no-scrollbar touch-pan-y select-none cursor-grab active:cursor-grabbing"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onClickCapture={handleCardClickCapture}
      >
        {machines.map(machine => (
          <MachineCard
            key={machine.id}
            machine={machine}
            isSelected={selected?.id === machine.id}
            onClick={() => onSelect(machine)}
            variant="carousel"
          />
        ))}
      </div>
    </div>
  )
}
