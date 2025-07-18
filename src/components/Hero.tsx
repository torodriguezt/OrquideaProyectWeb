import { motion } from 'framer-motion'
import { ChevronDownIcon, HeartIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'

const Hero = () => {
  const scrollToNext = () => {
    const statisticsSection = document.getElementById('statistics')
    if (statisticsSection) {
      statisticsSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.5
      }
    }
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as any
      }
    }
  }

  return (
    <section id="hero" className="min-h-screen relative overflow-hidden">
      {/* Overlay con efecto de cristal */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-purple-900/40 to-pink-900/20 backdrop-blur-sm" />
      
      {/* Partículas flotantes */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
              opacity: 0
            }}
            animate={{ 
              y: [0, -100, 0],
              opacity: [0, 0.8, 0],
              scale: [0.5, 1.5, 0.5]
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3
            }}
            className="absolute w-1 h-1 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full shadow-lg"
          />
        ))}
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 container mx-auto px-4 h-screen flex items-center justify-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center text-white max-w-4xl"
        >
          <motion.div
            variants={itemVariants}
            className="mb-8"
          >
            <HeartIcon className="w-20 h-20 mx-auto mb-6 text-pink-300" />
            <h1 className="text-6xl md:text-8xl font-display font-bold mb-4">
              <span className="text-gradient bg-gradient-to-r from-pink-300 to-amber-300 bg-clip-text text-transparent">
                Orquídea
              </span>
            </h1>
            <p className="text-xl md:text-2xl opacity-90 mb-2">
              Un símbolo de resistencia y fortaleza
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-display font-semibold leading-tight">
              Alzando la voz contra la{' '}
              <span className="text-pink-300">violencia</span>
            </h2>
            <p className="text-lg md:text-xl opacity-80 max-w-2xl mx-auto leading-relaxed">
              Juntas construimos un mundo donde cada mujer pueda florecer sin miedo, 
              donde su voz sea escuchada y respetada.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToNext}
              className="group px-8 py-4 bg-white text-purple-900 rounded-full font-semibold text-lg hover:bg-opacity-90 transition-all duration-300 shadow-lg"
            >
              <span className="flex items-center gap-2">
                <ShieldCheckIcon className="w-5 h-5" />
                Conoce más
              </span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group px-8 py-4 border-2 border-white text-white rounded-full font-semibold text-lg hover:bg-white hover:text-purple-900 transition-all duration-300"
            >
              <span className="flex items-center gap-2">
                <HeartIcon className="w-5 h-5" />
                Únete a la causa
              </span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Indicador de scroll */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white cursor-pointer"
        onClick={scrollToNext}
      >
        <div className="flex flex-col items-center">
          <span className="text-sm opacity-80 mb-2">Desliza para continuar</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDownIcon className="w-6 h-6" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export default Hero
