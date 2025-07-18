import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const AnimatedBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ 
        x: e.clientX / window.innerWidth, 
        y: e.clientY / window.innerHeight 
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  // Crear menos elementos flotantes y más sutiles
  const floatingElements = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    size: Math.random() * 60 + 40,
    initialX: Math.random() * 100,
    initialY: Math.random() * 100,
    duration: Math.random() * 20 + 25,
    delay: Math.random() * 10
  }))

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Gradiente de fondo principal - colores feministas */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-violet-900 to-indigo-900" />
      
      {/* Capa de gradiente dinámico sutil que sigue al mouse */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, rgba(139, 69, 19, 0.3) 0%, rgba(106, 27, 154, 0.2) 40%, transparent 70%)`
        }}
      />

      {/* Elementos flotantes más sutiles */}
      {floatingElements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute rounded-full bg-gradient-to-br from-violet-400/8 to-purple-400/8 backdrop-blur-xl border border-white/3"
          initial={{
            x: `${element.initialX}vw`,
            y: `${element.initialY}vh`,
            opacity: 0,
            scale: 0
          }}
          animate={{
            x: [`${element.initialX}vw`, `${element.initialX + 5}vw`, `${element.initialX}vw`],
            y: [`${element.initialY}vh`, `${element.initialY - 8}vh`, `${element.initialY}vh`],
            opacity: [0, 0.4, 0],
            scale: [0, 1, 0],
            rotate: [0, 180]
          }}
          transition={{
            duration: element.duration,
            delay: element.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            width: element.size,
            height: element.size,
          }}
        />
      ))}

      {/* Ondas de luz más sutiles con colores feministas */}
      <motion.div
        className="absolute top-1/3 left-1/5 w-96 h-96 rounded-full bg-gradient-to-r from-violet-500/3 to-purple-500/3 blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.05, 0.15, 0.05]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="absolute bottom-1/3 right-1/5 w-80 h-80 rounded-full bg-gradient-to-r from-green-500/3 to-emerald-500/3 blur-3xl"
        animate={{
          scale: [1.05, 0.95, 1.05],
          opacity: [0.05, 0.1, 0.05]
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Patrón de puntos académico más sutil */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Gradiente superior para mejorar la legibilidad */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black/15 to-transparent" />
      
      {/* Gradiente inferior sutil */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/10 to-transparent" />
    </div>
  )
}

export default AnimatedBackground
