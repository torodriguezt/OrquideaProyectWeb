# 🌸 Proyecto Orquídea - Análisis de Violencia de Género en Colombia

> Una plataforma web interactiva para la visualización y análisis de datos sobre violencia contra las mujeres en Colombia.

## 📋 Descripción del Proyecto

**Proyecto Orquídea** es una aplicación web desarrollada para presentar de manera clara y profesional datos estadísticos sobre la violencia de género en Colombia. El proyecto está enfocado en la educación, investigación y concienciación social a través de visualizaciones de datos interactivas.

### Objetivos

- **Visualización de Datos**: Presentar estadísticas actualizadas sobre violencia de género por departamentos
- **Análisis Geográfico**: Mapas interactivos con distribución territorial de casos
- **Acceso a la Información**: Datos presentados de forma clara y accesible

## 🚀 Tecnologías Utilizadas

### Frontend
- **React 19** - Framework de JavaScript
- **TypeScript** - Tipado estático
- **Vite** - Herramienta de construcción y desarrollo
- **Tailwind CSS** - Framework de CSS utilitario

### Animaciones y UX
- **Framer Motion** - Animaciones fluidas y transiciones
- **Heroicons** - Iconografía moderna
- **Efectos Glass Morphism** - Diseño visual moderno

### Visualización de Datos
- **Recharts** - Gráficos y visualizaciones interactivas
- **D3-geo** - Mapas geográficos
- **SVG Maps** - Mapas vectoriales de Colombia

## Estructura del Proyecto

```
src/
├── components/
│   ├── Hero.tsx              # Página principal
│   ├── Statistics.tsx        # Gráficos y estadísticas
│   ├── Map.tsx              # Mapa interactivo de Colombia
│   ├── Historical.tsx       # Línea de tiempo histórica
│   ├── Navigation.tsx       # Barra de navegación
│   ├── Footer.tsx           # Pie de página
│   └── ...
├── styles/
│   ├── index.css           # Estilos globales
│   └── charts.css          # Estilos para gráficos
└── App.tsx                 # Componente principal
```

## 📊 Características Principales

### 1. **Dashboard de Estadísticas**
- Gráficos de barras con casos por departamento
- Gráficos circulares de distribución por tipo de violencia
- Gráficos de línea con tendencias temporales
- Gráficos horizontales de comparación regional

### 2. **Mapa Interactivo de Colombia**
- Visualización por departamentos
- Códigos de color según nivel de incidencia
- Información detallada al hacer clic
- Top 5 de departamentos más afectados

### 3. **Línea de Tiempo Histórica**
- Hitos importantes en derechos de las mujeres
- Legislación relevante (Ley 1257, Ley Rosa Elvira Cely)
- Avances institucionales

### 4. **Diseño Responsivo**
- Optimizado para dispositivos móviles
- Navegación intuitiva
- Colores neutros y profesionales

## 🔧 Instalación y Configuración

### Prerrequisitos
- Node.js (versión 18 o superior)
- npm o yarn

### Pasos de Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/torodriguezt/OrquideaProyectWeb.git

# 2. Navegar al directorio del proyecto
cd OrquideaProyectWeb

# 3. Instalar dependencias
npm install

# 4. Ejecutar en modo desarrollo
npm run dev

# 5. Abrir en el navegador
# La aplicación estará disponible en http://localhost:3000/OrquideaProyectWeb/
```

### Scripts Disponibles

```bash
npm run dev         # Servidor de desarrollo
npm run build       # Construcción para producción
npm run preview     # Vista previa de la construcción
npm run lint        # Verificación de código
```

## 📈 Fuentes de Información

- Instituto Nacional de Medicina Legal y Ciencias Forenses
- Observatorio de Violencia de Género
- DANE (Departamento Administrativo Nacional de Estadística)
- MinSalud - Ministerio de Salud y Protección Social


## 🚀 Despliegue

### GitHub Pages
El proyecto se despliega automáticamente en GitHub Pages:
```
URL: https://torodriguezt.github.io/OrquideaProyectWeb/
```

### Configuración de Despliegue
El archivo `vite.config.ts` está configurado para GitHub Pages:
```typescript
export default defineConfig({
  base: '/OrquideaProyectWeb/',
  // ... otras configuraciones
})
```
