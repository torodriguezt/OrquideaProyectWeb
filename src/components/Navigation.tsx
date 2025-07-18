import { motion } from 'framer-motion'
import { HeartIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

interface NavigationProps {
  activeSection: string
}

const Navigation = ({ activeSection }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigationItems = [
    { id: 'hero', label: 'Inicio' },
    { id: 'statistics', label: 'Estadísticas' },
    { id: 'stories', label: 'Historias' },
    { id: 'prevention', label: 'Prevención' },
    { id: 'resources', label: 'Recursos' }
  ]

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/10 border-b border-white/20"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => scrollToSection('hero')}
            >
              <HeartIcon className="w-8 h-8 text-pink-300" />
              <span className="text-xl font-display font-bold text-white">
                Orquídea
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navigationItems.map((item) => (
                <motion.button
                  key={item.id}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    activeSection === item.id
                      ? 'text-pink-300'
                      : 'text-white hover:text-pink-200'
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-pink-300 rounded-full"
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white p-2"
            >
              {isMenuOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          transition={{ type: 'tween', duration: 0.3 }}
          className="fixed top-0 right-0 bottom-0 z-40 w-80 bg-gradient-to-b from-purple-900 to-purple-800 backdrop-blur-md md:hidden"
        >
          <div className="p-8 pt-20">
            <div className="space-y-6">
              {navigationItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 10 }}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left px-4 py-3 text-lg font-medium transition-all duration-300 rounded-lg ${
                    activeSection === item.id
                      ? 'text-pink-300 bg-white/10'
                      : 'text-white hover:text-pink-200 hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsMenuOpen(false)}
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
        />
      )}
    </>
  )
}

export default Navigation
