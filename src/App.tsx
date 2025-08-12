import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Hero from './components/Hero'
import Statistics from './components/Statistics'
import ColombiaMap from './components/Map' // <- renombrado aquí
import Historical from './components/Historical'
import Footer from './components/Footer'
import Navigation from './components/Navigation'
import ScrollProgress from './components/ScrollProgress'
import FloatingElements from './components/FloatingElements'
import AnimatedBackground from './components/AnimatedBackground'
import './App.css'
import './styles/charts.css'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'statistics', 'map', 'historical']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600 z-50 flex items-center justify-center"
          >
            <div className="text-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="text-white"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 border-4 border-white border-t-transparent rounded-full mx-auto mb-4"
                />
                <h1 className="text-3xl font-display font-bold mb-2">Orquídea</h1>
                <p className="text-lg opacity-90">Datos y análisis</p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative min-h-screen">
        <AnimatedBackground />
        <ScrollProgress />
        <Navigation activeSection={activeSection} />
        <FloatingElements />
        
        <main className="relative z-10">
          <Hero />
          <Statistics />
          <ColombiaMap /> {/* <- usado aquí */}
          <Historical />
        </main>
        
        <Footer />
      </div>
    </>
  )
}

export default App
