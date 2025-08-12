import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { ChartBarIcon, ExclamationTriangleIcon, HeartIcon, UsersIcon, MapPinIcon } from '@heroicons/react/24/outline'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts'

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
    { icon: ExclamationTriangleIcon, value: 51, suffix: '%', label: 'de las mujeres en Colombia han experimentado algún tipo de violencia', color: 'text-red-600' },
    { icon: ChartBarIcon, value: 91, suffix: '%', label: 'de los casos de violencia intrafamiliar no son denunciados', color: 'text-orange-600' },
    { icon: HeartIcon, value: 622, suffix: ' feminicidios', label: 'fueron registrados en Colombia durante 2023', color: 'text-red-700' },
    { icon: UsersIcon, value: 89, suffix: '%', label: 'de los feminicidios son cometidos por parejas o exparejas', color: 'text-blue-600' }
  ]

  const violenceByAge = [
    { age: '14-17', percentage: 28, count: 3420 },
    { age: '18-24', percentage: 45, count: 5680 },
    { age: '25-34', percentage: 52, count: 7240 },
    { age: '35-44', percentage: 48, count: 6100 },
    { age: '45-54', percentage: 38, count: 4520 },
    { age: '55+', percentage: 25, count: 2890 }
  ]

  const reportingData = [
    { name: 'Denunciados', value: 9, color: '#475569' },
    { name: 'No Denunciados', value: 91, color: '#ea7520' }
  ]

  const departmentData = [
    { department: 'Bogotá', cases: 4250 },
    { department: 'Antioquia', cases: 3890 },
    { department: 'Valle', cases: 2680 },
    { department: 'Cundinamarca', cases: 2420 },
    { department: 'Atlántico', cases: 1980 },
    { department: 'Santander', cases: 1750 },
    { department: 'Nariño', cases: 1620 },
    { department: 'Tolima', cases: 1450 }
  ]

  const trendData = [
    { year: '2019', cases: 2567, feminicidios: 287 },
    { year: '2020', cases: 3104, feminicidios: 320 },
    { year: '2021', cases: 4289, feminicidios: 456 },
    { year: '2022', cases: 5834, feminicidios: 612 },
    { year: '2023', cases: 6742, feminicidios: 622 }
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
      animateValue('stat1', 51)
      animateValue('stat2', 91)
      animateValue('stat3', 622)
      animateValue('stat4', 89)
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
          <motion.div initial={{ opacity: 0, x: -50 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.5 }} className="glass-card rounded-xl p-6">
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

          {/* Pie */}
          <motion.div initial={{ opacity: 0, x: 50 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.7 }} className="glass-card rounded-xl p-6">
            <h3 className="text-xl font-display font-semibold text-primary-900 mb-4 flex items-center gap-2">
              <ExclamationTriangleIcon className="w-5 h-5 text-primary-600" /> Casos Denunciados vs No Denunciados
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <Pie data={reportingData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={({ name, value }) => `${name}: ${value}%`} labelLine={false} fontSize={12}>
                    {reportingData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '14px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Departamentos */}
        <motion.div initial={{ opacity: 0, y: 50 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.8 }} className="glass-card rounded-xl p-6 mb-12">
          <h3 className="text-xl font-display font-semibold text-primary-900 mb-4 flex items-center gap-2">
            <MapPinIcon className="w-5 h-5 text-primary-600" /> Casos por Departamento (Top 8)
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
        <motion.div initial={{ opacity: 0, y: 50 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 1 }} className="glass-card rounded-xl p-6 mb-12">
          <h3 className="text-xl font-display font-semibold text-primary-900 mb-4 flex items-center gap-2">
            <MapPinIcon className="w-5 h-5 text-primary-600" /> Evolución de la Violencia en Colombia (2019-2023)
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="year" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '14px' }} formatter={(value, name) => [`${Number(value).toLocaleString()}`, name === 'cases' ? 'Casos Totales' : 'Feminicidios']} />
                <Line type="monotone" dataKey="cases" stroke="#475569" strokeWidth={3} dot={{ fill: '#475569', strokeWidth: 2, r: 6 }} activeDot={{ r: 8 }} name="cases" />
                <Line type="monotone" dataKey="feminicidios" stroke="#ea7520" strokeWidth={3} dot={{ fill: '#ea7520', strokeWidth: 2, r: 6 }} activeDot={{ r: 8 }} name="feminicidios" />
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
