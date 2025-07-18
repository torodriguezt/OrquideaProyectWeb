# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Conciencia Mujer - Webapp de Concientización

Una aplicación web interactiva diseñada para crear conciencia sobre la violencia contra las mujeres, desarrollada con React, TypeScript y Tailwind CSS.

## 🌟 Características

- **Diseño Responsive**: Optimizado para todos los dispositivos
- **Animaciones Suaves**: Implementadas con Framer Motion
- **Interfaz Moderna**: Efectos glass morphism y gradientes
- **Contenido Educativo**: Estadísticas, historias y recursos de apoyo
- **Accesibilidad**: Diseño inclusivo y navegación intuitiva

## 🚀 Tecnologías Utilizadas

- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS
- **Animaciones**: Framer Motion
- **Iconos**: Heroicons
- **Build Tool**: Vite
- **Despliegue**: GitHub Pages

## 📱 Secciones

1. **Hero**: Página principal con mensaje impactante
2. **Estadísticas**: Datos relevantes sobre violencia de género
3. **Historias**: Testimonios y experiencias
4. **Prevención**: Estrategias y señales de alarma
5. **Recursos**: Líneas de ayuda y centros de apoyo

## 🎨 Paleta de Colores

El diseño utiliza una paleta de colores feminista que incluye:
- Violeta (#8b5cf6)
- Púrpura (#a855f7)
- Verde (#059669)
- Esmeralda (#10b981)

## 🔧 Instalación y Desarrollo

```bash
# Clonar el repositorio
git clone https://github.com/torodriguezt/OrquideaProyectWeb.git

# Navegar al directorio
cd OrquideaProyectWeb

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build
```

## 📦 Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo
- `npm run build`: Construye la aplicación para producción
- `npm run preview`: Previsualiza la build de producción
- `npm run lint`: Ejecuta el linter

## 🚀 Despliegue

La aplicación se despliega automáticamente en GitHub Pages cuando se hace push a la rama `main`.

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 🆘 Recursos de Ayuda

Si necesitas ayuda inmediata:
- **Emergencias**: 911
- **Línea Nacional**: 123-456-7890
- **Chat Online**: www.ayuda-mujer.org

## 🎯 Propósito

Esta aplicación fue creada con el propósito de:
- Crear conciencia sobre la violencia de género
- Proporcionar recursos de ayuda
- Educar sobre prevención
- Dar voz a las sobrevivientes

---

**Nota**: Esta es una aplicación educativa. En caso de emergencia real, contacta inmediatamente a las autoridades locales.

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
