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
    <section id="hero" className="min-h-screen relative overflow-hidden bg-gradient-to-br from-warm-50 to-warm-100">
      {/* Overlay sutil */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-primary-50/30 to-accent-50/20" />
      
      {/* Elementos decorativos sutiles */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
              opacity: 0
            }}
            animate={{ 
              y: [0, -50, 0],
              opacity: [0, 0.3, 0],
              scale: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3
            }}
            className="absolute w-2 h-2 bg-gradient-to-r from-primary-400 to-accent-400 rounded-full"
          />
        ))}
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 container mx-auto px-4 h-screen flex items-center justify-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center text-primary-900 max-w-4xl"
        >
          <motion.div
            variants={itemVariants}
            className="mb-8"
          >
            <HeartIcon className="w-16 h-16 mx-auto mb-6 text-accent-500" />
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-4">
              <span className="gradient-text">
                Orquídea
              </span>
            </h1>
            <p className="text-lg md:text-xl text-primary-600 mb-2">
              Análisis de violencia contra la mujer en Colombia
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="space-y-6"
          >
            <h2 className="text-2xl md:text-3xl font-display font-semibold leading-tight text-primary-800">
              Datos y análisis sobre{' '}
              <span className="text-accent-600">violencia de género</span>
            </h2>
            <p className="text-base md:text-lg text-primary-600 max-w-2xl mx-auto leading-relaxed">
              Plataforma de información y estadísticas sobre la situación de la mujer 
              en los diferentes departamentos de Colombia.
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
              className="group px-8 py-4 bg-primary-600 text-white rounded-full font-semibold text-lg hover:bg-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <span className="flex items-center gap-2">
                <ShieldCheckIcon className="w-5 h-5" />
                Ver estadísticas
              </span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group px-8 py-4 border-2 border-primary-600 text-primary-600 rounded-full font-semibold text-lg hover:bg-primary-600 hover:text-white transition-all duration-300"
            >
              <span className="flex items-center gap-2">
                <HeartIcon className="w-5 h-5" />
                Ver análisis
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
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-primary-600 cursor-pointer"
        onClick={scrollToNext}
      >
        <div className="flex flex-col items-center">
          <span className="text-sm mb-2">Desliza para continuar</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
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
