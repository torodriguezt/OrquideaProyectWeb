import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline'

const Stories = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [currentStory, setCurrentStory] = useState(0)

  const stories = [
    {
      name: "María Elena",
      age: "32 años",
      story: "Después de años de silencio, encontré la fuerza para hablar. Hoy soy libre y ayudo a otras mujeres a encontrar su voz.",
      image: "🌸",
      color: "from-violet-600 to-purple-600"
    },
    {
      name: "Carmen",
      age: "28 años", 
      story: "El apoyo de mi familia y organizaciones como esta me dieron esperanza cuando más lo necesitaba. Ahora construyo una nueva vida.",
      image: "🦋",
      color: "from-purple-600 to-indigo-600"
    },
    {
      name: "Ana Sofía",
      age: "45 años",
      story: "Ser madre me dio la fuerza para salir adelante. Quiero que mis hijas crezcan en un mundo mejor, sin miedo.",
      image: "🌺",
      color: "from-green-600 to-emerald-600"
    },
    {
      name: "Isabella",
      age: "24 años",
      story: "Estudiar y trabajar me devolvió mi independencia. Cada día es una nueva oportunidad para crecer y sanar.",
      image: "🌷",
      color: "from-emerald-600 to-teal-600"
    }
  ]

  const nextStory = () => {
    setCurrentStory((prev) => (prev + 1) % stories.length)
  }

  const prevStory = () => {
    setCurrentStory((prev) => (prev - 1 + stories.length) % stories.length)
  }

  return (
    <section id="stories" className="py-20 relative">
      {/* Fondo con efecto de cristal */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50/10 via-white/10 to-purple-50/10 backdrop-blur-sm" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 text-shadow">
            Historias de{' '}
            <span className="bg-gradient-to-r from-violet-400 to-green-400 bg-clip-text text-transparent">
              Fortaleza
            </span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Cada superviviente tiene una historia única de valentía, resistencia y esperanza.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            {/* Contenedor principal de la historia */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden">
              {/* Fondo decorativo */}
              <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${stories[currentStory].color}`} />
              
              {/* Icono de comillas */}
              <div className="flex justify-center mb-8">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5 }}
                  className={`w-16 h-16 rounded-full bg-gradient-to-r ${stories[currentStory].color} flex items-center justify-center`}
                >
                  <ChatBubbleLeftIcon className="w-8 h-8 text-white" />
                </motion.div>
              </div>

              {/* Contenido de la historia */}
              <motion.div
                key={currentStory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                {/* Emoji decorativo */}
                <div className="text-6xl mb-6">{stories[currentStory].image}</div>

                {/* Historia */}
                <blockquote className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8 italic">
                  "{stories[currentStory].story}"
                </blockquote>

                {/* Información del testimonio */}
                <div className="space-y-2">
                  <h3 className="text-2xl font-display font-bold text-gray-900">
                    {stories[currentStory].name}
                  </h3>
                  <p className="text-gray-500 text-lg">
                    {stories[currentStory].age}
                  </p>
                </div>
              </motion.div>

              {/* Controles de navegación */}
              <div className="flex justify-between items-center mt-12">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={prevStory}
                  className={`p-3 rounded-full bg-gradient-to-r ${stories[currentStory].color} text-white shadow-lg hover:shadow-xl transition-all duration-300`}
                >
                  <ChevronLeftIcon className="w-6 h-6" />
                </motion.button>

                {/* Indicadores */}
                <div className="flex space-x-2">
                  {stories.map((_, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.8 }}
                      onClick={() => setCurrentStory(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentStory
                          ? `bg-gradient-to-r ${stories[currentStory].color}`
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={nextStory}
                  className={`p-3 rounded-full bg-gradient-to-r ${stories[currentStory].color} text-white shadow-lg hover:shadow-xl transition-all duration-300`}
                >
                  <ChevronRightIcon className="w-6 h-6" />
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Mensaje inspiracional */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 text-center bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-8"
          >
            <h3 className="text-2xl font-display font-bold text-gray-900 mb-4">
              Tu historia también importa
            </h3>
            <p className="text-gray-700 text-lg">
              Si estás viviendo una situación de violencia o conoces a alguien que la vive, 
              recuerda que no estás sola. Hay ayuda disponible y tu vida tiene valor.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Stories
