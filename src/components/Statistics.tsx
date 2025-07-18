import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { ChartBarIcon, ExclamationTriangleIcon, HeartIcon, UsersIcon } from '@heroicons/react/24/outline'

const Statistics = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [animatedValues, setAnimatedValues] = useState({
    stat1: 0,
    stat2: 0,
    stat3: 0,
    stat4: 0
  })

  const statistics = [
    {
      icon: ExclamationTriangleIcon,
      value: 35,
      suffix: '%',
      label: 'de las mujeres experimentan violencia física o sexual',
      color: 'from-violet-600 to-purple-600'
    },
    {
      icon: ChartBarIcon,
      value: 87,
      suffix: '%',
      label: 'de los casos no son reportados a las autoridades',
      color: 'from-purple-600 to-indigo-600'
    },
    {
      icon: HeartIcon,
      value: 1,
      suffix: ' de cada 3',
      label: 'mujeres ha sufrido violencia de pareja',
      color: 'from-green-600 to-emerald-600'
    },
    {
      icon: UsersIcon,
      value: 137,
      suffix: ' mujeres',
      label: 'son asesinadas diariamente por miembros de su familia',
      color: 'from-orange-600 to-red-600'
    }
  ]

  useEffect(() => {
    if (isInView) {
      const animateValue = (key: string, targetValue: number) => {
        let currentValue = 0
        const increment = targetValue / 100
        const timer = setInterval(() => {
          currentValue += increment
          if (currentValue >= targetValue) {
            currentValue = targetValue
            clearInterval(timer)
          }
          setAnimatedValues(prev => ({ ...prev, [key]: Math.round(currentValue) }))
        }, 20)
      }

      animateValue('stat1', 35)
      animateValue('stat2', 87)
      animateValue('stat3', 1)
      animateValue('stat4', 137)
    }
  }, [isInView])

  return (
    <section id="statistics" className="py-20 relative">
      {/* Fondo con efecto de cristal */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-purple-50/20 to-pink-50/10 backdrop-blur-sm" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 text-shadow">
            La Realidad en{' '}
            <span className="bg-gradient-to-r from-violet-400 to-green-400 bg-clip-text text-transparent">
              Números
            </span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Estas estadísticas representan vidas reales, historias que necesitan ser contadas y cambios que debemos hacer.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {statistics.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative group"
            >
              <div className="relative bg-white/20 backdrop-blur-md rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2 border border-white/30 glass-morphism">
                {/* Fondo decorativo */}
                <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-10 rounded-2xl`} />
                
                {/* Icono */}
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${stat.color} mb-6 shadow-lg`}>
                  <stat.icon className="w-8 h-8 text-white" />
                </div>

                {/* Número animado */}
                <div className="mb-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                    className="text-4xl md:text-5xl font-bold text-white"
                  >
                    {index === 0 && `${animatedValues.stat1}${stat.suffix}`}
                    {index === 1 && `${animatedValues.stat2}${stat.suffix}`}
                    {index === 2 && `${animatedValues.stat3}${stat.suffix}`}
                    {index === 3 && `${animatedValues.stat4}${stat.suffix}`}
                  </motion.div>
                </div>

                {/* Descripción */}
                <p className="text-white/90 text-sm leading-relaxed">
                  {stat.label}
                </p>

                {/* Efecto de brillo al hacer hover */}
                <motion.div
                  className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)`
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mensaje de esperanza */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-16 text-center bg-gradient-to-r from-violet-600/80 to-green-600/80 backdrop-blur-md rounded-2xl p-8 text-white border border-white/20 glass-morphism"
        >
          <HeartIcon className="w-12 h-12 mx-auto mb-4 text-pink-200" />
          <h3 className="text-2xl font-display font-bold mb-4">
            Pero hay esperanza
          </h3>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Cada historia compartida, cada voz alzada, cada acción tomada nos acerca más a un mundo libre de violencia. 
            Juntas podemos cambiar estos números.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default Statistics
