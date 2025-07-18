import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { 
  PhoneIcon, 
  GlobeAltIcon, 
  ChatBubbleLeftRightIcon,
  MapPinIcon,
  BookOpenIcon,
  HeartIcon,
  ArrowTopRightOnSquareIcon
} from '@heroicons/react/24/outline'

const Resources = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const resources = [
    {
      icon: PhoneIcon,
      title: "Líneas de Ayuda",
      description: "Atención 24/7 para emergencias y apoyo",
      color: "from-violet-600 to-purple-600",
      items: [
        { name: "Línea Nacional contra la Violencia", contact: "911", description: "Emergencias" },
        { name: "Línea de Apoyo Psicológico", contact: "123-456-7890", description: "Apoyo emocional" },
        { name: "Línea de Orientación Legal", contact: "098-765-4321", description: "Asesoría legal gratuita" }
      ]
    },
    {
      icon: MapPinIcon,
      title: "Centros de Apoyo",
      description: "Refugios y centros de atención especializados",
      color: "from-purple-600 to-indigo-600",
      items: [
        { name: "Casa de Refugio Esperanza", contact: "Calle 123 #45-67", description: "Refugio temporal" },
        { name: "Centro de Atención Integral", contact: "Avenida 456 #78-90", description: "Atención médica y psicológica" },
        { name: "Fundación Mujeres Fuertes", contact: "Carrera 789 #12-34", description: "Apoyo legal y social" }
      ]
    },
    {
      icon: GlobeAltIcon,
      title: "Recursos en Línea",
      description: "Información y apoyo digital",
      color: "from-green-600 to-emerald-600",
      items: [
        { name: "Portal de Ayuda Digital", contact: "www.ayuda-mujer.org", description: "Información y chat en línea" },
        { name: "App Botón de Pánico", contact: "Disponible en app stores", description: "Aplicación móvil de emergencia" },
        { name: "Foro de Apoyo", contact: "www.apoyo-mutuo.com", description: "Comunidad de apoyo" }
      ]
    },
    {
      icon: BookOpenIcon,
      title: "Educación y Capacitación",
      description: "Programas formativos y de empoderamiento",
      color: "from-emerald-600 to-teal-600",
      items: [
        { name: "Talleres de Autodefensa", contact: "Inscripciones: 555-0123", description: "Defensa personal" },
        { name: "Programas de Capacitación Laboral", contact: "Oficina de Empleo", description: "Desarrollo profesional" },
        { name: "Cursos de Empoderamiento", contact: "Centro Comunitario", description: "Fortalecimiento personal" }
      ]
    }
  ]

  const emergencySteps = [
    {
      step: "1",
      title: "Mantén la calma",
      description: "Respira profundo y evalúa la situación",
      icon: HeartIcon
    },
    {
      step: "2", 
      title: "Busca seguridad",
      description: "Aléjate del agresor si es posible",
      icon: MapPinIcon
    },
    {
      step: "3",
      title: "Pide ayuda",
      description: "Llama al 911 o a una línea de ayuda",
      icon: PhoneIcon
    },
    {
      step: "4",
      title: "Documenta",
      description: "Guarda evidencia si es seguro hacerlo",
      icon: BookOpenIcon
    }
  ]

  return (
    <section id="resources" className="py-20 relative">
      {/* Fondo con efecto de cristal */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-purple-50/10 to-pink-50/10 backdrop-blur-sm" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 text-shadow">
            Recursos y{' '}
            <span className="bg-gradient-to-r from-violet-400 to-green-400 bg-clip-text text-transparent">
              Apoyo
            </span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Encuentra la ayuda que necesitas. No estás sola, hay una red de apoyo esperándote.
          </p>
        </motion.div>

        {/* Recursos Principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {resources.map((resource, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${resource.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <resource.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-display font-bold text-gray-900 mb-3">
                  {resource.title}
                </h3>
                
                <p className="text-gray-600 mb-6">
                  {resource.description}
                </p>
                
                <div className="space-y-4">
                  {resource.items.map((item, itemIndex) => (
                    <motion.div
                      key={itemIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: itemIndex * 0.1 + 0.5 }}
                      className="border-l-4 border-purple-200 pl-4 hover:border-purple-400 transition-colors duration-300"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1">
                            {item.name}
                          </h4>
                          <p className="text-sm text-gray-600 mb-1">
                            {item.description}
                          </p>
                          <p className="text-purple-600 font-medium">
                            {item.contact}
                          </p>
                        </div>
                        <ArrowTopRightOnSquareIcon className="w-5 h-5 text-purple-400 flex-shrink-0 ml-2" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pasos en Caso de Emergencia */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-20"
        >
          <h3 className="text-3xl font-display font-bold text-center text-white mb-12 text-shadow">
            En Caso de Emergencia
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {emergencySteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 + 1 }}
                className="text-center"
              >
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {step.step}
                  </div>
                </div>
                
                <h4 className="text-xl font-display font-bold text-gray-900 mb-2">
                  {step.title}
                </h4>
                
                <p className="text-gray-600 text-sm">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Mensaje de Esperanza */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="bg-gradient-to-r from-violet-600 to-purple-600 rounded-2xl p-8 text-center text-white relative overflow-hidden"
        >
          {/* Decoración de fondo */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 left-4 w-20 h-20 bg-white rounded-full" />
            <div className="absolute bottom-4 right-4 w-16 h-16 bg-white rounded-full" />
            <div className="absolute top-1/2 left-1/3 w-12 h-12 bg-white rounded-full" />
          </div>
          
          <div className="relative z-10">
            <ChatBubbleLeftRightIcon className="w-12 h-12 mx-auto mb-4 text-purple-200" />
            <h3 className="text-2xl font-display font-bold mb-4">
              Recuerda: No estás sola
            </h3>
            <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
              Hay personas y organizaciones dispuestas a ayudarte. Tu seguridad y bienestar son prioritarios. 
              El primer paso hacia la libertad es pedir ayuda.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-violet-600 px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-all duration-300 shadow-lg"
            >
              Buscar Ayuda Ahora
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Resources
