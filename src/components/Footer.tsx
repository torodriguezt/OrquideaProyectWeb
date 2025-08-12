import { motion } from 'framer-motion'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-br from-slate-50 to-slate-100 border-t border-primary-200">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-sm text-primary-700">
            © {currentYear} Análisis de Datos - Violencia de Género en Colombia. 
            Información con fines educativos y de investigación.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
