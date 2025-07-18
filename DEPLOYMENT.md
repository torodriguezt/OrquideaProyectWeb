# Configuración para GitHub Pages

## Pasos para Desplegar

### 1. Configuración del Repositorio

1. **El repositorio** ya está configurado como `OrquideaProyectWeb`
2. **Subir el código** a la rama `main`
3. **Configurar GitHub Pages** en Settings > Pages:
   - Source: GitHub Actions
   - El workflow se ejecutará automáticamente

### 2. Configuración Automática

El proyecto ya incluye:
- ✅ GitHub Actions workflow (`.github/workflows/deploy.yml`)
- ✅ Base path configurado (`/OrquideaProyectWeb/`)
- ✅ Build optimizado para producción
- ✅ Estructura de archivos organizada

### 3. Comandos para Subir a GitHub

```bash
# Inicializar git (si no está inicializado)
git init

# Agregar todos los archivos
git add .

# Commit inicial
git commit -m "Initial commit: Conciencia Mujer webapp"

# Agregar origen remoto (si no está configurado)
git remote add origin https://github.com/torodriguezt/OrquideaProyectWeb.git

# Subir a GitHub
git push -u origin main
```

### 4. Verificación del Despliegue

1. Ve a la pestaña **Actions** en GitHub
2. Verifica que el workflow se ejecute correctamente
3. Una vez completado, la aplicación estará disponible en:
   `https://torodriguezt.github.io/OrquideaProyectWeb/`

## Características del Despliegue

- **Automático**: Se despliega cada vez que se hace push a `main`
- **Optimizado**: Build minificado y optimizado
- **Rápido**: Cache de dependencias para builds más rápidos
- **Confiable**: Usa GitHub Actions oficial

## Solución de Problemas

### Si el despliegue falla:
1. Verifica que el workflow tenga permisos de escritura
2. Revisa los logs en la pestaña Actions
3. Asegúrate de que el base path sea correcto

### Si la página no carga:
1. Verifica que GitHub Pages esté habilitado
2. Confirma que el dominio sea correcto
3. Revisa la configuración de base path en `vite.config.ts`
