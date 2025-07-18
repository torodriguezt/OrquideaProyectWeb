import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { 
  ShieldCheckIcon, 
  UsersIcon, 
  AcademicCapIcon, 
  HeartIcon,
  ExclamationTriangleIcon,
  PhoneIcon
} from '@heroicons/react/24/outline'

const Prevention = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const preventionStrategies = [
    {
      icon: AcademicCapIcon,
      title: "Educación y Concienciación",
      description: "Promover la igualdad de género desde temprana edad y educar sobre relaciones saludables",
      color: "from-violet-600 to-purple-600",
      tips: [
        "Hablar abiertamente sobre el respeto mutuo",
        "Enseñar sobre los derechos humanos",
        "Fomentar la autoestima y confianza"
      ]
    },
    {
      icon: UsersIcon,
      title: "Apoyo Comunitario",
      description: "Crear redes de apoyo sólidas y espacios seguros para las mujeres",
      color: "from-purple-600 to-indigo-600",
      tips: [
        "Establecer grupos de apoyo locales",
        "Crear líneas de ayuda especializadas",
        "Capacitar a líderes comunitarios"
      ]
    },
    {
      icon: ShieldCheckIcon,
      title: "Protección Legal",
      description: "Fortalecer las leyes y mecanismos de protección para las víctimas",
      color: "from-green-600 to-emerald-600",
      tips: [
        "Mejorar el acceso a la justicia",
        "Capacitar a las autoridades",
        "Crear medidas de protección efectivas"
      ]
    },
    {
      icon: HeartIcon,
      title: "Atención Integral",
      description: "Brindar apoyo psicológico, médico y social a las víctimas",
      color: "from-emerald-600 to-teal-600",
      tips: [
        "Proporcionar terapia especializada",
        "Ofrecer refugios temporales",
        "Facilitar la reintegración social"
      ]
    }
  ]

  const warningSignsData = [
    {
      category: "Físicas",
      signs: ["Golpes", "Empujones", "Restricción de movimientos", "Daño a propiedades"],
      color: "from-violet-600 to-purple-600"
    },
    {
      category: "Emocionales",
      signs: ["Humillaciones", "Amenazas", "Aislamiento", "Control excesivo"],
      color: "from-purple-600 to-indigo-600"
    },
    {
      category: "Económicas",
      signs: ["Control de finanzas", "Prohibir trabajar", "Destruir documentos", "Deudas forzadas"],
      color: "from-green-600 to-emerald-600"
    }
  ]

  return (
    <section id="prevention" className="py-20 relative">
      {/* Fondo con efecto de cristal */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/10 via-pink-50/10 to-indigo-50/10 backdrop-blur-sm" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 text-shadow">
            Prevención y{' '}
            <span className="bg-gradient-to-r from-violet-400 to-green-400 bg-clip-text text-transparent">
              Protección
            </span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Juntos podemos crear un mundo más seguro através de la educación, el apoyo y la acción colectiva.
          </p>
        </motion.div>

        {/* Estrategias de Prevención */}
        <div className="mb-20">
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl font-display font-bold text-center text-white mb-12 text-shadow"
          >
            Estrategias de Prevención
          </motion.h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {preventionStrategies.map((strategy, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                className="group"
              >
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${strategy.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <strategy.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h4 className="text-xl font-display font-bold text-gray-900 mb-3">
                    {strategy.title}
                  </h4>
                  
                  <p className="text-gray-600 mb-4 text-sm">
                    {strategy.description}
                  </p>
                  
                  <ul className="space-y-2">
                    {strategy.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="flex items-start gap-2 text-sm text-gray-500">
                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Señales de Alerta */}
        <div className="mb-20">
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-3xl font-display font-bold text-center text-white mb-12 text-shadow"
          >
            Señales de Alerta
          </motion.h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {warningSignsData.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 + 1 }}
                className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-red-400"
              >
                <div className="flex items-center gap-3 mb-4">
                  <ExclamationTriangleIcon className="w-6 h-6 text-red-500" />
                  <h4 className="text-xl font-display font-bold text-gray-900">
                    Violencia {category.category}
                  </h4>
                </div>
                
                <ul className="space-y-3">
                  {category.signs.map((sign, signIndex) => (
                    <motion.li
                      key={signIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: signIndex * 0.1 + 1.2 }}
                      className="flex items-center gap-3 text-gray-700"
                    >
                      <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${category.color}`} />
                      <span>{sign}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Llamada a la Acción */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="bg-gradient-to-r from-violet-600 to-green-600 rounded-2xl p-8 text-center text-white"
        >
          <PhoneIcon className="w-12 h-12 mx-auto mb-4 text-pink-200" />
          <h3 className="text-2xl font-display font-bold mb-4">
            ¿Necesitas ayuda?
          </h3>
          <p className="text-lg mb-6 opacity-90">
            Si estás en peligro inmediato, llama al número de emergencia. 
            Si necesitas apoyo o información, contáctanos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-all duration-300"
            >
              Línea de Emergencia: 911
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-purple-600 transition-all duration-300"
            >
              Línea de Apoyo: 123-456-7890
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Prevention
