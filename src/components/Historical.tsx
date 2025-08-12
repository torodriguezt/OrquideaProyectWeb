import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ClockIcon, DocumentTextIcon, ScaleIcon } from '@heroicons/react/24/outline'

const Historical = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const milestones = [
    {
      year: '1961',
      title: 'Derechos Políticos de la Mujer',
      description: 'Las mujeres colombianas obtienen el derecho al voto y a ser elegidas.',
      icon: ScaleIcon,
      color: 'text-blue-600'
    },
    {
      year: '1981',
      title: 'Ratificación CEDAW',
      description: 'Colombia ratifica la Convención sobre la Eliminación de Todas las Formas de Discriminación contra la Mujer.',
      icon: DocumentTextIcon,
      color: 'text-green-600'
    },
    {
      year: '2008',
      title: 'Ley 1257',
      description: 'Se dictan normas de sensibilización, prevención y sanción de formas de violencia y discriminación contra las mujeres.',
      icon: ScaleIcon,
      color: 'text-accent-600'
    },
    {
      year: '2014',
      title: 'Ley Rosa Elvira Cely',
      description: 'Tipificación del feminicidio como delito autónomo en Colombia.',
      icon: DocumentTextIcon,
      color: 'text-red-600'
    }
  ]

  return (
    <section id="historical" className="py-20 bg-gradient-to-br from-warm-100 to-warm-50">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-900 mb-6">
            Avances{' '}
            <span className="gradient-text">
              Históricos
            </span>
          </h2>
          <p className="text-lg text-primary-600 max-w-3xl mx-auto">
            Un recorrido por los hitos más importantes en la lucha por los derechos de las mujeres en Colombia
          </p>
        </motion.div>

        <div className="relative">
          {/* Línea de tiempo */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-primary-200 hidden md:block" />

          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col md:gap-8 gap-4`}
              >
                {/* Contenido */}
                <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'} text-center`}>
                  <div className="glass-card bg-warm-100/80 backdrop-blur-sm rounded-xl p-6 max-w-md mx-auto md:mx-0">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary-100 mb-4 ${index % 2 === 0 ? 'md:ml-auto' : 'md:mr-auto'} mx-auto`}>
                      <milestone.icon className={`w-6 h-6 ${milestone.color}`} />
                    </div>
                    <h3 className="text-xl font-display font-bold text-primary-900 mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-primary-600 leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>

                {/* Punto central */}
                <div className="relative z-10 hidden md:block">
                  <div className="w-16 h-16 bg-warm-50 rounded-full border-4 border-primary-300 flex items-center justify-center shadow-lg">
                    <span className="text-primary-700 font-bold text-sm">
                      {milestone.year}
                    </span>
                  </div>
                </div>

                {/* Espacio para balance */}
                <div className="flex-1 hidden md:block" />

                {/* Año para móvil */}
                <div className="md:hidden">
                  <div className="inline-flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-full">
                    <ClockIcon className="w-4 h-4" />
                    <span className="font-bold">{milestone.year}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mensaje motivacional */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-16 text-center glass-card bg-warm-100/80 backdrop-blur-sm rounded-xl p-8"
        >
          <h3 className="text-2xl font-display font-bold mb-4 text-primary-900">
            Proyecto Orquídea
          </h3>
          <p className="text-lg text-primary-600 max-w-2xl mx-auto">
            Proyecto financiado por MinCiencias, Colombia
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default Historical
