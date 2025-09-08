import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { ChartBarIcon, ExclamationTriangleIcon, HeartIcon, UsersIcon, MapPinIcon } from '@heroicons/react/24/outline'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LineChart, Line } from 'recharts'

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
    { icon: ExclamationTriangleIcon, value: 862195, suffix: ' casos', label: 'de violencia contra la mujer registrados en SIVIGILA', color: 'text-red-600' },
    { icon: ChartBarIcon, value: 30.1, suffix: '%', label: 'de los casos corresponden al grupo etario de 29-59 años', color: 'text-orange-600' },
    { icon: HeartIcon, value: 122775, suffix: ' casos', label: 'fueron registrados en 2023, el año con mayor reporte', color: 'text-red-700' },
    { icon: UsersIcon, value: 26.3, suffix: '%', label: 'de los casos corresponden al grupo de 18-28 años', color: 'text-blue-600' }
  ]

  const violenceByAge = [
    { age: '29-59', percentage: 30.1, count: 259919 },
    { age: '18-28', percentage: 26.3, count: 226978 },
    { age: '12-17', percentage: 21.0, count: 181007 },
    { age: '0-5', percentage: 10.4, count: 89534 },
    { age: '6-11', percentage: 8.5, count: 73595 },
    { age: '60-84', percentage: 3.3, count: 28109 },
    { age: '85+', percentage: 0.4, count: 3053 }
  ]

  const reportingData = [
    { name: 'Heterosexual', value: 64.4, color: '#475569' },
    { name: 'Sin información', value: 25.4, color: '#94a3b8' },
    { name: 'Otra', value: 6.9, color: '#ea7520' },
    { name: 'OSIEG no hegemónicas', value: 3.3, color: '#f97316' }
  ]

  const departmentData = [
    { department: 'Antioquia', cases: 144064 },
    { department: 'Bogotá D.C.', cases: 105553 },
    { department: 'Valle del Cauca', cases: 101495 },
    { department: 'Cundinamarca', cases: 65329 },
    { department: 'Santander', cases: 42608 },
    { department: 'Huila', cases: 39736 },
    { department: 'Nariño', cases: 29326 },
    { department: 'Atlántico', cases: 27090 },
    { department: 'Boyacá', cases: 26951 },
    { department: 'Bolívar', cases: 24176 }
  ]

  const trendData = [
    { year: '2013', cases: 34170 },
    { year: '2014', cases: 46894 },
    { year: '2015', cases: 56725 },
    { year: '2016', cases: 71978 },
    { year: '2017', cases: 74204 },
    { year: '2018', cases: 85704 },
    { year: '2019', cases: 91194 },
    { year: '2020', cases: 78301 },
    { year: '2021', cases: 90694 },
    { year: '2022', cases: 109556 },
    { year: '2023', cases: 122775 }
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
      animateValue('stat1', 862195)
      animateValue('stat2', 30.1)
      animateValue('stat3', 122775)
      animateValue('stat4', 26.3)
    }
  }, [isInView])

  return (
    <section id="statistics" className="py-20 bg-warm-50">
      <div className="container mx-auto px-4">
        <motion.div ref={ref} initial={{ opacity: 0, y: 50 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-900 mb-6">
            Violencia de Género en <span className="gradient-text">Colombia</span>
          </h2>
          <p className="text-lg text-primary-600 max-w-3xl mx-auto">
            Datos oficiales sobre violencia contra la mujer en Colombia basados en informes del Instituto Nacional de Medicina Legal y Ciencias Forenses.
          </p>
        </motion.div>

        {/* Estadísticas principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {statistics.map((stat, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 50, scale: 0.9 }} animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}} transition={{ duration: 0.6, delay: index * 0.1 }} className="relative group">
              <div className="bg-warm-100 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-warm-200">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary-100 mb-4">
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="mb-3">
                  <motion.div initial={{ scale: 0 }} animate={isInView ? { scale: 1 } : {}} transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }} className={`text-3xl font-bold ${stat.color}`}>
                    {index === 0 && `${animatedValues.stat1}${stat.suffix}`}
                    {index === 1 && `${animatedValues.stat2}${stat.suffix}`}
                    {index === 2 && `${animatedValues.stat3}${stat.suffix}`}
                    {index === 3 && `${animatedValues.stat4}${stat.suffix}`}
                  </motion.div>
                </div>
                <p className="text-primary-600 text-sm leading-relaxed">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-16">
          {/* Barras edad */}
          <motion.div initial={{ opacity: 0, x: -50 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.5 }} className="glass-card bg-warm-100/80 backdrop-blur-sm rounded-xl p-6">
            <h3 className="text-xl font-display font-semibold text-primary-900 mb-4 flex items-center gap-2">
              <ChartBarIcon className="w-5 h-5 text-primary-600" /> Violencia por Grupo Etario en Colombia
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={violenceByAge} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="age" stroke="#64748b" fontSize={12} />
                  <YAxis stroke="#64748b" fontSize={12} label={{ value: 'Porcentaje (%)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip contentStyle={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '14px' }} formatter={(value) => [`${value}%`, 'Prevalencia']} labelFormatter={(label) => `Edad: ${label} años`} />
                  <Bar dataKey="percentage" fill="#475569" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Gráfico de barras de orientación sexual */}
          <motion.div initial={{ opacity: 0, x: 50 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.7 }} className="glass-card bg-warm-100/80 backdrop-blur-sm rounded-xl p-6">
            <h3 className="text-xl font-display font-semibold text-primary-900 mb-4 flex items-center gap-2">
              <ExclamationTriangleIcon className="w-5 h-5 text-primary-600" /> Distribución por Orientación Sexual
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={reportingData} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis 
                    dataKey="name" 
                    stroke="#64748b" 
                    fontSize={11} 
                    angle={-45}
                    textAnchor="end"
                    height={100}
                    interval={0}
                  />
                  <YAxis 
                    stroke="#64748b" 
                    fontSize={12} 
                    label={{ value: 'Porcentaje (%)', angle: -90, position: 'insideLeft' }} 
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#f8fafc', 
                      border: '1px solid #e2e8f0', 
                      borderRadius: '8px', 
                      fontSize: '14px' 
                    }} 
                    formatter={(value) => [`${value}%`, 'Porcentaje']} 
                    labelFormatter={(label) => `Orientación: ${label}`} 
                  />
                  <Bar 
                    dataKey="value" 
                    radius={[4, 4, 0, 0]}
                    fill="#475569"
                  >
                    {reportingData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Departamentos */}
        <motion.div initial={{ opacity: 0, y: 50 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.8 }} className="glass-card bg-warm-100/80 backdrop-blur-sm rounded-xl p-6 mb-12">
          <h3 className="text-xl font-display font-semibold text-primary-900 mb-4 flex items-center gap-2">
            <MapPinIcon className="w-5 h-5 text-primary-600" /> Casos por Departamento (Top 10)
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentData} layout="vertical" margin={{ top: 20, right: 30, left: 80, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" stroke="#64748b" fontSize={12} />
                <YAxis 
                  dataKey="department" 
                  type="category" 
                  stroke="#64748b" 
                  fontSize={12} 
                  width={80} 
                  tickFormatter={(value) => String(value).normalize("NFD").replace(/[\u0300-\u036f]/g, "")} 
                />
                <Tooltip contentStyle={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '14px' }} formatter={(value) => [`${Number(value).toLocaleString()}`, 'Casos']} labelFormatter={(label) => label} />
                <Bar dataKey="cases" fill="#ea7520" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Tendencia */}
        <motion.div initial={{ opacity: 0, y: 50 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 1 }} className="glass-card bg-warm-100/80 backdrop-blur-sm rounded-xl p-6 mb-12">
          <h3 className="text-xl font-display font-semibold text-primary-900 mb-4 flex items-center gap-2">
            <MapPinIcon className="w-5 h-5 text-primary-600" /> Evolución de la Violencia en Colombia (2013-2023)
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="year" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '14px' }} formatter={(value) => [`${Number(value).toLocaleString()}`, 'Casos Registrados']} />
                <Line type="monotone" dataKey="cases" stroke="#475569" strokeWidth={3} dot={{ fill: '#475569', strokeWidth: 2, r: 6 }} activeDot={{ r: 8 }} name="cases" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Mensaje */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 1.2 }} className="text-center glass-card rounded-xl p-8">
          <h3 className="text-2xl font-display font-bold mb-4 text-primary-900">Información para la Acción</h3>
          <p className="text-lg text-primary-600 max-w-2xl mx-auto">
            Los datos son el primer paso para entender la magnitud del problema. Con información precisa podemos diseñar políticas públicas más efectivas para proteger a las mujeres colombianas.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default Statistics
