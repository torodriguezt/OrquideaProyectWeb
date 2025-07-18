# Estructura del Proyecto

```
OrquideaProyectWeb/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Configuración de GitHub Actions
├── public/
│   └── vite.svg               # Favicon y assets públicos
├── src/
│   ├── components/
│   │   ├── AnimatedBackground.tsx
│   │   ├── FloatingElements.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── Navigation.tsx
│   │   ├── Prevention.tsx
│   │   ├── Resources.tsx
│   │   ├── ScrollProgress.tsx
│   │   ├── Statistics.tsx
│   │   └── Stories.tsx
│   ├── App.tsx                # Componente principal
│   ├── index.css              # Estilos globales
│   ├── main.tsx               # Punto de entrada
│   └── vite-env.d.ts          # Tipos de Vite
├── .gitignore                 # Archivos ignorados por Git
├── DEPLOYMENT.md              # Guía de despliegue
├── eslint.config.js          # Configuración de ESLint
├── index.html                # HTML principal
├── LICENSE                   # Licencia MIT
├── package.json              # Dependencias y scripts
├── README.md                 # Documentación
├── STRUCTURE.md              # Estructura del proyecto
├── tailwind.config.js        # Configuración de Tailwind
├── tsconfig.app.json         # Configuración TypeScript (app)
├── tsconfig.json             # Configuración TypeScript
├── tsconfig.node.json        # Configuración TypeScript (node)
└── vite.config.ts            # Configuración de Vite
```

## Mejores Prácticas Implementadas

### 1. **Estructura de Archivos**
- Separación clara entre componentes
- Archivos de configuración en la raíz
- Assets públicos en `/public`

### 2. **GitHub Actions**
- Despliegue automático a GitHub Pages
- Build optimizado para producción
- Cache de dependencias

### 3. **Optimización de Build**
- Code splitting por chunks
- Separación de vendor libraries
- Sourcemaps deshabilitados en producción

### 4. **Documentación**
- README.md completo
- Licencia MIT
- Estructura documentada

### 5. **Configuración**
- Base path configurado para GitHub Pages (`/OrquideaProyectWeb/`)
- Puerto y configuración de desarrollo
- Optimizaciones de Rollup
