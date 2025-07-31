import { useEffect, useRef } from 'react'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import bg from './assets/bg.png'
import Causes from './components/Causes'
import Solutions from './components/Solutions'
import Game from './components/Game'
import BankOfInfo from './components/BankOfInfo'

function App() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isScrollingRef = useRef(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let scrollTimeout: ReturnType<typeof setTimeout> | null = null

    const handleWheel = (e: WheelEvent) => {
      const horizontalEl = document.getElementById('horizontal-section')
      const rect = horizontalEl?.getBoundingClientRect()

      // Skip if the horizontal section is fully in view
      if (
        rect &&
        rect.top <= 0 &&
        rect.bottom >= window.innerHeight
      ) {
        return // Let ScrollTrigger handle horizontal scrolling
      }

      if (isScrollingRef.current) {
        e.preventDefault()
        return
      }

      isScrollingRef.current = true

      const direction = e.deltaY > 0 ? 1 : -1
      const sections = Array.from(container.children) as HTMLElement[]
      const currentScroll = container.scrollTop
      const screenHeight = window.innerHeight
      const currentIndex = Math.round(currentScroll / screenHeight)
      const nextIndex = Math.max(0, Math.min(currentIndex + direction, sections.length - 1))

      const nextScroll = nextIndex * screenHeight
      container.scrollTo({ top: nextScroll, behavior: 'smooth' })

      scrollTimeout = setTimeout(() => {
        isScrollingRef.current = false
      }, 500) // Increased timeout for smoother snapping
    }

    container.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      container.removeEventListener('wheel', handleWheel)
      if (scrollTimeout) clearTimeout(scrollTimeout)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative h-screen overflow-y-auto snap-y snap-mandatory"
    >
      {/* Background */}
      <div
        className="absolute inset-0 w-full h-[510vh] -z-10"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      <section id="home" className="h-screen snap-start">
        <Navbar />
        <Hero />
      </section>

      <section id="causes" className="snap-start">
        <Causes />
      </section>

      <section id="solutions" className="snap-start">
        <Solutions />
      </section>

      <section id="game" className="snap-start">
        <Game />
      </section>

      <section id="bank" className="snap-start">
        <BankOfInfo />
      </section>

    </div>
  )
}

export default App