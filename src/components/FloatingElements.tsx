import { motion } from 'framer-motion'
import { HeartIcon, SparklesIcon } from '@heroicons/react/24/outline'

const FloatingElements = () => {
  const elements = [
    { Icon: HeartIcon, delay: 0, duration: 4, x: '10%', y: '20%' },
    { Icon: SparklesIcon, delay: 1, duration: 5, x: '80%', y: '30%' },
    { Icon: HeartIcon, delay: 2, duration: 3, x: '15%', y: '70%' },
    { Icon: SparklesIcon, delay: 3, duration: 4.5, x: '90%', y: '80%' },
    { Icon: HeartIcon, delay: 0.5, duration: 3.5, x: '70%', y: '15%' },
    { Icon: SparklesIcon, delay: 2.5, duration: 4, x: '5%', y: '50%' }
  ]

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {elements.map((element, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 0.3, 0],
            scale: [0, 1, 0],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: element.duration,
            delay: element.delay,
            repeat: Infinity,
            repeatDelay: 2
          }}
          className="absolute"
          style={{
            left: element.x,
            top: element.y
          }}
        >
          <element.Icon className="w-6 h-6 text-pink-300/20" />
        </motion.div>
      ))}
    </div>
  )
}

export default FloatingElements
