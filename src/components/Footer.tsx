import { motion } from 'framer-motion'
import { HeartIcon, EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { name: "Inicio", href: "#hero" },
    { name: "Estadísticas", href: "#statistics" },
    { name: "Historias", href: "#stories" },
    { name: "Prevención", href: "#prevention" },
    { name: "Recursos", href: "#resources" }
  ]

  const socialLinks = [
    { name: "Facebook", href: "#", icon: "📘" },
    { name: "Instagram", href: "#", icon: "📷" },
    { name: "Twitter", href: "#", icon: "🐦" },
    { name: "LinkedIn", href: "#", icon: "💼" }
  ]

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.replace('#', ''))
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="bg-gradient-to-br from-purple-900 via-purple-800 to-pink-800 text-white">
      {/* Sección principal del footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Información de la organización */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="flex items-center gap-3 mb-6">
              <HeartIcon className="w-8 h-8 text-pink-300" />
              <h3 className="text-2xl font-display font-bold">
                Orquídea
              </h3>
            </div>
            
            <p className="text-purple-100 text-lg leading-relaxed mb-6">
              Dedicados a crear conciencia sobre la violencia contra la mujer y brindar apoyo 
              a quienes lo necesitan. Juntos construimos un mundo más seguro y equitativo.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <PhoneIcon className="w-5 h-5 text-pink-300" />
                <span className="text-purple-100">Línea de Ayuda: 123-456-7890</span>
              </div>
              <div className="flex items-center gap-3">
                <EnvelopeIcon className="w-5 h-5 text-pink-300" />
                <span className="text-purple-100">contacto@orquidea.org</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPinIcon className="w-5 h-5 text-pink-300" />
                <span className="text-purple-100">Ciudad, País</span>
              </div>
            </div>
          </motion.div>

          {/* Enlaces rápidos */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-xl font-display font-bold mb-6 text-pink-300">
              Enlaces Rápidos
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <motion.button
                    whileHover={{ x: 5 }}
                    onClick={() => scrollToSection(link.href)}
                    className="text-purple-100 hover:text-pink-300 transition-colors duration-300 cursor-pointer"
                  >
                    {link.name}
                  </motion.button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Redes sociales */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h4 className="text-xl font-display font-bold mb-6 text-pink-300">
              Síguenos
            </h4>
            <div className="grid grid-cols-2 gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg p-3 hover:bg-white/20 transition-all duration-300"
                >
                  <span className="text-xl">{social.icon}</span>
                  <span className="text-sm text-purple-100">{social.name}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Línea divisoria */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="border-t border-purple-700 my-12"
        />

        {/* Números de emergencia destacados */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-2xl p-6 mb-8 backdrop-blur-sm border border-red-300/30"
        >
          <div className="text-center">
            <h4 className="text-2xl font-display font-bold mb-4 text-pink-200">
              🚨 Números de Emergencia 🚨
            </h4>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
              <div className="text-center">
                <p className="text-lg font-semibold text-white">Emergencia Nacional</p>
                <p className="text-3xl font-bold text-pink-300">911</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold text-white">Línea de Apoyo</p>
                <p className="text-3xl font-bold text-pink-300">123-456-7890</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Mensaje inspiracional */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
        >
          <div className="text-4xl mb-4">🌸</div>
          <p className="text-lg text-purple-100 italic max-w-2xl mx-auto">
            "Como las orquídeas que florecen en las condiciones más adversas, 
            las mujeres pueden encontrar su fuerza y belleza incluso en los momentos más difíciles."
          </p>
        </motion.div>
      </div>

      {/* Copyright */}
      <div className="border-t border-purple-700 bg-purple-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-purple-200 text-sm"
            >
              © {currentYear} Orquídea. Todos los derechos reservados.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex gap-6 text-sm text-purple-200"
            >
              <a href="#" className="hover:text-pink-300 transition-colors duration-300">
                Términos de Uso
              </a>
              <a href="#" className="hover:text-pink-300 transition-colors duration-300">
                Privacidad
              </a>
              <a href="#" className="hover:text-pink-300 transition-colors duration-300">
                Contacto
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
