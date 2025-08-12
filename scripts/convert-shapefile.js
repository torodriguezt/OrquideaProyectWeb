import shapefile from 'shapefile';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function convertShapefileToGeoJSON() {
  try {
    const shapefilePath = path.join(__dirname, '../departamentos/departamentos.shp');
    const outputPath = path.join(__dirname, '../src/data/colombia-departments.json');
    
    // Crear directorio de datos si no existe
    const dataDir = path.join(__dirname, '../src/data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    const geojson = await shapefile.read(shapefilePath);
    
    // Simplificar los nombres de propiedades y limpiar datos
    const simplifiedGeoJSON = {
      type: 'FeatureCollection',
      features: geojson.features.map(feature => ({
        type: 'Feature',
        properties: {
          name: feature.properties.DEPTO || feature.properties.NAME || feature.properties.NOMBRE_DPT || 'Desconocido',
          code: feature.properties.CODIGO || feature.properties.CODE || feature.properties.DPTO,
          // Preservar todas las propiedades originales para debug
          ...feature.properties
        },
        geometry: feature.geometry
      }))
    };

    fs.writeFileSync(outputPath, JSON.stringify(simplifiedGeoJSON, null, 2));
    
    console.log(`✅ GeoJSON generado exitosamente en: ${outputPath}`);
    console.log(`📊 Número de departamentos: ${simplifiedGeoJSON.features.length}`);
    
    // Mostrar algunos nombres de departamentos para verificar
    console.log('🗺️ Primeros 5 departamentos:');
    simplifiedGeoJSON.features.slice(0, 5).forEach((dept, index) => {
      console.log(`  ${index + 1}. ${dept.properties.name}`);
    });

  } catch (error) {
    console.error('❌ Error al convertir shapefile:', error);
  }
}

convertShapefileToGeoJSON();
