"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { MapPinIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { geoMercator, geoPath } from "d3-geo";
import { feature as topoToGeo } from "topojson-client";
import shp from "shpjs";

type VulnerablePopulation = {
  discapacitadas: number;
  desplazadas: number;
  migrantes: number;
  privadas_libertad: number;
  gestantes: number;
  indigenas: number;
  icbf: number;
  madres_comunitarias: number;
  desmovilizadas: number;
  centro_psiquiatrico: number;
  violencia_armada: number;
  otras: number;
  cabeza_familia: number;
  convive_agresor: number;
};

type Region = { 
  name: string; 
  cases: number; 
  vulnerablePopulation: VulnerablePopulation;
};

type GeoJSONData = GeoJSON.FeatureCollection<GeoJSON.Geometry, any>;

// 🔹 Corrige caracteres mal codificados específicamente para el shapefile de Colombia
const fixEncoding = (s: string) =>
  s
    // Correcciones específicas para departamentos problemáticos
    .replace(/BOGOTÃ/g, "BOGOTÁ")
    .replace(/BOLÃVAR/g, "BOLÍVAR") 
    .replace(/BOYACÃ/g, "BOYACÁ")
    .replace(/CAQUETÃ/g, "CAQUETÁ")
    .replace(/CÃ"RDOBA/g, "CÓRDOBA")
    .replace(/CHOCÃ"/g, "CHOCÓ")
    .replace(/NARIÃ'O/g, "NARIÑO")
    .replace(/ARCHIPIÃ‰LAGO DE SAN ANDRÃ‰S, PROVIDENCIA Y SANTA CATALINA/g, "ARCHIPIÉLAGO DE SAN ANDRÉS")
    .replace(/ARCHIPIÃ‰LAGO DE SAN ANDRÃ‰S/g, "ARCHIPIÉLAGO DE SAN ANDRÉS")
    .replace(/QUINDIO/g, "QUINDÍO")
    // Correcciones generales de encoding UTF-8 mal interpretado
    .replace(/Ã¡/g, "á")
    .replace(/Ã©/g, "é") 
    .replace(/Ã­/g, "í")
    .replace(/Ã³/g, "ó")
    .replace(/Ãº/g, "ú")
    .replace(/Ã±/g, "ñ")
    .replace(/Ã/g, "Á")
    .replace(/Ã‰/g, "É")
    .replace(/Ã/g, "Í")
    .replace(/Ã"/g, "Ó")
    .replace(/Ãš/g, "Ú")
    .replace(/Ã'/g, "Ñ")
    .replace(/Ã/g, "Á")
    .replace(/Ã‰/g, "É");

// Datos actualizados de SIVIGILA completos por departamento (33 departamentos)
const regionData: Region[] = [
  { 
    name: "Antioquia", 
    cases: 144064, 
    vulnerablePopulation: {
      discapacitadas: 680, desplazadas: 3308, migrantes: 1349, privadas_libertad: 196,
      gestantes: 4884, indigenas: 241, icbf: 778, madres_comunitarias: 128,
      desmovilizadas: 87, centro_psiquiatrico: 402, violencia_armada: 11299,
      otras: 128818, cabeza_familia: 14377, convive_agresor: 60099
    }
  },
  { 
    name: "Bogotá, D.C.", 
    cases: 105554, 
    vulnerablePopulation: {
      discapacitadas: 1098, desplazadas: 522, migrantes: 3753, privadas_libertad: 91,
      gestantes: 9092, indigenas: 422, icbf: 270, madres_comunitarias: 30,
      desmovilizadas: 28, centro_psiquiatrico: 215, violencia_armada: 254,
      otras: 92892, cabeza_familia: 36316, convive_agresor: 61506
    }
  },
  { 
    name: "Valle Del Cauca", 
    cases: 101495, 
    vulnerablePopulation: {
      discapacitadas: 343, desplazadas: 488, migrantes: 1478, privadas_libertad: 187,
      gestantes: 4252, indigenas: 167, icbf: 364, madres_comunitarias: 50,
      desmovilizadas: 57, centro_psiquiatrico: 357, violencia_armada: 1538,
      otras: 94866, cabeza_familia: 11895, convive_agresor: 42116
    }
  },
  { 
    name: "Cundinamarca", 
    cases: 65329, 
    vulnerablePopulation: {
      discapacitadas: 466, desplazadas: 577, migrantes: 1450, privadas_libertad: 98,
      gestantes: 3181, indigenas: 89, icbf: 306, madres_comunitarias: 86,
      desmovilizadas: 77, centro_psiquiatrico: 140, violencia_armada: 1522,
      otras: 59659, cabeza_familia: 10669, convive_agresor: 34724
    }
  },
  { 
    name: "Santander", 
    cases: 42608, 
    vulnerablePopulation: {
      discapacitadas: 218, desplazadas: 158, migrantes: 939, privadas_libertad: 65,
      gestantes: 4526, indigenas: 69, icbf: 196, madres_comunitarias: 33,
      desmovilizadas: 34, centro_psiquiatrico: 120, violencia_armada: 646,
      otras: 38016, cabeza_familia: 2376, convive_agresor: 25517
    }
  },
  { 
    name: "Huila", 
    cases: 39736, 
    vulnerablePopulation: {
      discapacitadas: 255, desplazadas: 835, migrantes: 100, privadas_libertad: 93,
      gestantes: 1680, indigenas: 46, icbf: 472, madres_comunitarias: 43,
      desmovilizadas: 43, centro_psiquiatrico: 29, violencia_armada: 587,
      otras: 36736, cabeza_familia: 4102, convive_agresor: 20007
    }
  },
  { 
    name: "Nariño", 
    cases: 29326, 
    vulnerablePopulation: {
      discapacitadas: 238, desplazadas: 587, migrantes: 213, privadas_libertad: 62,
      gestantes: 1253, indigenas: 34, icbf: 142, madres_comunitarias: 17,
      desmovilizadas: 28, centro_psiquiatrico: 27, violencia_armada: 616,
      otras: 27311, cabeza_familia: 2799, convive_agresor: 13322
    }
  },
  { 
    name: "Atlántico", 
    cases: 27090, 
    vulnerablePopulation: {
      discapacitadas: 130, desplazadas: 49, migrantes: 791, privadas_libertad: 45,
      gestantes: 1620, indigenas: 27, icbf: 87, madres_comunitarias: 20,
      desmovilizadas: 19, centro_psiquiatrico: 63, violencia_armada: 1041,
      otras: 24689, cabeza_familia: 2688, convive_agresor: 13875
    }
  },
  { 
    name: "Boyacá", 
    cases: 26951, 
    vulnerablePopulation: {
      discapacitadas: 230, desplazadas: 60, migrantes: 248, privadas_libertad: 47,
      gestantes: 1096, indigenas: 19, icbf: 90, madres_comunitarias: 55,
      desmovilizadas: 24, centro_psiquiatrico: 44, violencia_armada: 517,
      otras: 25342, cabeza_familia: 3152, convive_agresor: 16057
    }
  },
  { 
    name: "Bolívar", 
    cases: 24176, 
    vulnerablePopulation: {
      discapacitadas: 123, desplazadas: 196, migrantes: 530, privadas_libertad: 42,
      gestantes: 2191, indigenas: 39, icbf: 129, madres_comunitarias: 25,
      desmovilizadas: 20, centro_psiquiatrico: 44, violencia_armada: 476,
      otras: 21586, cabeza_familia: 2101, convive_agresor: 11706
    }
  },
  { 
    name: "Caldas", 
    cases: 21325, 
    vulnerablePopulation: {
      discapacitadas: 120, desplazadas: 236, migrantes: 119, privadas_libertad: 58,
      gestantes: 727, indigenas: 29, icbf: 226, madres_comunitarias: 7,
      desmovilizadas: 10, centro_psiquiatrico: 30, violencia_armada: 526,
      otras: 19854, cabeza_familia: 2535, convive_agresor: 9423
    }
  },
  { 
    name: "Risaralda", 
    cases: 21296, 
    vulnerablePopulation: {
      discapacitadas: 115, desplazadas: 134, migrantes: 250, privadas_libertad: 40,
      gestantes: 1242, indigenas: 50, icbf: 164, madres_comunitarias: 16,
      desmovilizadas: 16, centro_psiquiatrico: 62, violencia_armada: 360,
      otras: 19700, cabeza_familia: 1572, convive_agresor: 10953
    }
  },
  { 
    name: "Córdoba", 
    cases: 22761, 
    vulnerablePopulation: {
      discapacitadas: 111, desplazadas: 341, migrantes: 252, privadas_libertad: 31,
      gestantes: 1839, indigenas: 41, icbf: 140, madres_comunitarias: 76,
      desmovilizadas: 15, centro_psiquiatrico: 30, violencia_armada: 1686,
      otras: 19446, cabeza_familia: 2773, convive_agresor: 10823
    }
  },
  { 
    name: "Norte De Santander", 
    cases: 21569, 
    vulnerablePopulation: {
      discapacitadas: 90, desplazadas: 57, migrantes: 1733, privadas_libertad: 22,
      gestantes: 1482, indigenas: 26, icbf: 66, madres_comunitarias: 8,
      desmovilizadas: 9, centro_psiquiatrico: 14, violencia_armada: 201,
      otras: 18776, cabeza_familia: 1406, convive_agresor: 12354
    }
  },
  { 
    name: "Tolima", 
    cases: 17556, 
    vulnerablePopulation: {
      discapacitadas: 103, desplazadas: 114, migrantes: 100, privadas_libertad: 43,
      gestantes: 879, indigenas: 19, icbf: 144, madres_comunitarias: 11,
      desmovilizadas: 15, centro_psiquiatrico: 28, violencia_armada: 533,
      otras: 16155, cabeza_familia: 1982, convive_agresor: 8672
    }
  },
  { 
    name: "Cesar", 
    cases: 17563, 
    vulnerablePopulation: {
      discapacitadas: 91, desplazadas: 340, migrantes: 336, privadas_libertad: 28,
      gestantes: 1150, indigenas: 21, icbf: 143, madres_comunitarias: 35,
      desmovilizadas: 14, centro_psiquiatrico: 18, violencia_armada: 360,
      otras: 15955, cabeza_familia: 1290, convive_agresor: 9285
    }
  },
  { 
    name: "Quindío", 
    cases: 16110, 
    vulnerablePopulation: {
      discapacitadas: 90, desplazadas: 146, migrantes: 181, privadas_libertad: 38,
      gestantes: 852, indigenas: 45, icbf: 120, madres_comunitarias: 26,
      desmovilizadas: 22, centro_psiquiatrico: 118, violencia_armada: 1217,
      otras: 14098, cabeza_familia: 1827, convive_agresor: 7024
    }
  },
  { 
    name: "Meta", 
    cases: 15551, 
    vulnerablePopulation: {
      discapacitadas: 118, desplazadas: 197, migrantes: 277, privadas_libertad: 31,
      gestantes: 1824, indigenas: 39, icbf: 129, madres_comunitarias: 25,
      desmovilizadas: 15, centro_psiquiatrico: 47, violencia_armada: 667,
      otras: 13160, cabeza_familia: 1119, convive_agresor: 8029
    }
  },
  { 
    name: "Magdalena", 
    cases: 14505, 
    vulnerablePopulation: {
      discapacitadas: 52, desplazadas: 105, migrantes: 401, privadas_libertad: 24,
      gestantes: 1114, indigenas: 17, icbf: 46, madres_comunitarias: 8,
      desmovilizadas: 6, centro_psiquiatrico: 10, violencia_armada: 276,
      otras: 13056, cabeza_familia: 1251, convive_agresor: 6977
    }
  },
  { 
    name: "Cauca", 
    cases: 23574, 
    vulnerablePopulation: {
      discapacitadas: 193, desplazadas: 210, migrantes: 205, privadas_libertad: 44,
      gestantes: 1492, indigenas: 61, icbf: 138, madres_comunitarias: 23,
      desmovilizadas: 17, centro_psiquiatrico: 27, violencia_armada: 942,
      otras: 21471, cabeza_familia: 2241, convive_agresor: 10289
    }
  },
  { 
    name: "Sucre", 
    cases: 13850, 
    vulnerablePopulation: {
      discapacitadas: 77, desplazadas: 237, migrantes: 179, privadas_libertad: 46,
      gestantes: 812, indigenas: 29, icbf: 43, madres_comunitarias: 13,
      desmovilizadas: 13, centro_psiquiatrico: 27, violencia_armada: 258,
      otras: 12778, cabeza_familia: 1620, convive_agresor: 6554
    }
  },
  { 
    name: "Casanare", 
    cases: 9913, 
    vulnerablePopulation: {
      discapacitadas: 79, desplazadas: 61, migrantes: 194, privadas_libertad: 26,
      gestantes: 3037, indigenas: 29, icbf: 70, madres_comunitarias: 9,
      desmovilizadas: 12, centro_psiquiatrico: 12, violencia_armada: 62,
      otras: 7547, cabeza_familia: 688, convive_agresor: 6758
    }
  },
  { 
    name: "Caquetá", 
    cases: 7950, 
    vulnerablePopulation: {
      discapacitadas: 52, desplazadas: 387, migrantes: 17, privadas_libertad: 30,
      gestantes: 624, indigenas: 14, icbf: 51, madres_comunitarias: 7,
      desmovilizadas: 7, centro_psiquiatrico: 15, violencia_armada: 174,
      otras: 7015, cabeza_familia: 678, convive_agresor: 3718
    }
  },
  { 
    name: "La Guajira", 
    cases: 8140, 
    vulnerablePopulation: {
      discapacitadas: 21, desplazadas: 20, migrantes: 989, privadas_libertad: 32,
      gestantes: 575, indigenas: 26, icbf: 80, madres_comunitarias: 7,
      desmovilizadas: 5, centro_psiquiatrico: 5, violencia_armada: 127,
      otras: 6798, cabeza_familia: 650, convive_agresor: 3959
    }
  },
  { 
    name: "Putumayo", 
    cases: 7571, 
    vulnerablePopulation: {
      discapacitadas: 58, desplazadas: 436, migrantes: 217, privadas_libertad: 7,
      gestantes: 534, indigenas: 17, icbf: 79, madres_comunitarias: 8,
      desmovilizadas: 5, centro_psiquiatrico: 10, violencia_armada: 171,
      otras: 6400, cabeza_familia: 612, convive_agresor: 3566
    }
  },
  { 
    name: "Arauca", 
    cases: 4903, 
    vulnerablePopulation: {
      discapacitadas: 47, desplazadas: 181, migrantes: 638, privadas_libertad: 3,
      gestantes: 430, indigenas: 28, icbf: 56, madres_comunitarias: 7,
      desmovilizadas: 4, centro_psiquiatrico: 3, violencia_armada: 66,
      otras: 3836, cabeza_familia: 146, convive_agresor: 2735
    }
  },
  { 
    name: "Amazonas", 
    cases: 3005, 
    vulnerablePopulation: {
      discapacitadas: 20, desplazadas: 13, migrantes: 1, privadas_libertad: 0,
      gestantes: 147, indigenas: 11, icbf: 174, madres_comunitarias: 6,
      desmovilizadas: 0, centro_psiquiatrico: 1, violencia_armada: 55,
      otras: 2728, cabeza_familia: 214, convive_agresor: 1534
    }
  },
  { 
    name: "Chocó", 
    cases: 2463, 
    vulnerablePopulation: {
      discapacitadas: 19, desplazadas: 113, migrantes: 24, privadas_libertad: 1,
      gestantes: 279, indigenas: 8, icbf: 23, madres_comunitarias: 4,
      desmovilizadas: 6, centro_psiquiatrico: 7, violencia_armada: 148,
      otras: 2056, cabeza_familia: 240, convive_agresor: 967
    }
  },
  { 
    name: "Guaviare", 
    cases: 1764, 
    vulnerablePopulation: {
      discapacitadas: 13, desplazadas: 55, migrantes: 51, privadas_libertad: 1,
      gestantes: 183, indigenas: 3, icbf: 19, madres_comunitarias: 0,
      desmovilizadas: 3, centro_psiquiatrico: 1, violencia_armada: 15,
      otras: 1502, cabeza_familia: 138, convive_agresor: 938
    }
  },
  { 
    name: "Vaupés", 
    cases: 1314, 
    vulnerablePopulation: {
      discapacitadas: 6, desplazadas: 7, migrantes: 1, privadas_libertad: 1,
      gestantes: 50, indigenas: 2, icbf: 4, madres_comunitarias: 2,
      desmovilizadas: 1, centro_psiquiatrico: 1, violencia_armada: 8,
      otras: 1263, cabeza_familia: 80, convive_agresor: 861
    }
  },
  { 
    name: "Vichada", 
    cases: 1514, 
    vulnerablePopulation: {
      discapacitadas: 6, desplazadas: 23, migrantes: 186, privadas_libertad: 0,
      gestantes: 116, indigenas: 6, icbf: 16, madres_comunitarias: 7,
      desmovilizadas: 0, centro_psiquiatrico: 1, violencia_armada: 41,
      otras: 1216, cabeza_familia: 168, convive_agresor: 792
    }
  },
  { 
    name: "Guainía", 
    cases: 868, 
    vulnerablePopulation: {
      discapacitadas: 4, desplazadas: 4, migrantes: 95, privadas_libertad: 0,
      gestantes: 39, indigenas: 1, icbf: 3, madres_comunitarias: 1,
      desmovilizadas: 1, centro_psiquiatrico: 0, violencia_armada: 9,
      otras: 727, cabeza_familia: 93, convive_agresor: 418
    }
  },
  { 
    name: "Archipiélago De San Andrés", 
    cases: 801, 
    vulnerablePopulation: {
      discapacitadas: 2, desplazadas: 0, migrantes: 3, privadas_libertad: 5,
      gestantes: 32, indigenas: 0, icbf: 1, madres_comunitarias: 0,
      desmovilizadas: 0, centro_psiquiatrico: 4, violencia_armada: 156,
      otras: 647, cabeza_familia: 78, convive_agresor: 382
    }
  }
];

// Función específica para encontrar match de departamentos con encoding problemático
const findDepartmentMatch = (rawName: string, dataByName: Map<string, Region>): Region | null => {
  if (!rawName) return null;
  
  // Buscar primero con la normalización estándar
  const normalizedName = norm(rawName);
  let match = dataByName.get(normalizedName);
  if (match) return match;
  
  // Caso específico para San Andrés con diferentes estrategias
  if (rawName.toLowerCase().includes('andres') || rawName.toLowerCase().includes('andrã')) {
    const sanAndresVariations = [
      rawName.toLowerCase().replace(/\s+/g, " ").trim(),
      rawName.toLowerCase().replace(/[.,]/g, "").replace(/\s+/g, " ").trim(),
      fixEncoding(rawName).toLowerCase().replace(/\s+/g, " ").trim(),
      "archipielago de san andres",
      "san andres",
      "san andres y providencia"
    ];
    
    for (const variation of sanAndresVariations) {
      match = dataByName.get(variation);
      if (match) return match;
    }
    
    // Buscar por coincidencia parcial en las claves existentes
    for (const [key, region] of dataByName.entries()) {
      if ((key.includes('andres') || key.includes('archipielago')) && region.name === "Archipiélago De San Andrés") {
        return region;
      }
    }
  }
  
  return null;
};

// Función de color simplificada - gradiente cálido basado en casos
const getColorByRate = (cases: number) => {
  if (cases >= 100000) return "#8B4513"; // Marrón oscuro para casos muy altos
  if (cases >= 50000) return "#A0522D";  // Marrón siena
  if (cases >= 30000) return "#CD853F";  // Marrón arena
  if (cases >= 20000) return "#DEB887";  // Marrón claro
  if (cases >= 10000) return "#F5DEB3";  // Trigo
  if (cases >= 5000) return "#F5F5DC";   // Beige claro
  return "#FDF5E6";                       // Lino claro
};

// 🔹 Normaliza y corrige encoding
const norm = (s: string) => {
  // Primero aplicamos la corrección de encoding
  const fixed = fixEncoding(s || "");
  
  // Luego normalizamos removiendo acentos y espacios extra
  return fixed
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[.,]/g, "")
    .replace(/\s+/g, " ")
    .trim();
};

const getDeptoName = (props: Record<string, any>) => {
  const keys = ["NOMBRE_DPT", "DPTO_CNMBR", "DEPARTAMENTO", "DEPARTAMEN", "DPTO", "name", "NAME"];
  for (const k of keys) {
    if (props?.[k]) {
      const rawName = String(props[k]);
      const correctedName = fixEncoding(rawName);
      return correctedName;
    }
  }
  return "";
};

export default function ColombiaMap() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [geojson, setGeojson] = useState<GeoJSONData | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  const width = 800;
  const height = 600;

  useEffect(() => {
    let cancelled = false;

    const join = (a: string, b: string) =>
      (a.endsWith("/") ? a.slice(0, -1) : a) + (b.startsWith("/") ? b : "/" + b);

    const load = async () => {
      setLoadError(null);
      const base = import.meta.env.BASE_URL || "/";

      const shpURL = join(base, "departamentos/departamentos.shp");
      const dbfURL = join(base, "departamentos/departamentos.dbf");
      const shxURL = join(base, "departamentos/departamentos.shx");

      try {
        const [shpRes, dbfRes, shxRes] = await Promise.all([
          fetch(shpURL), fetch(dbfURL), fetch(shxURL),
        ]);
        if (!shpRes.ok || !dbfRes.ok) throw new Error("SHP/DBF no accesibles");
        if (!shxRes.ok) console.warn("SHX no accesible:", shxRes.status);

        const [shpBuf, dbfBuf] = await Promise.all([
          shpRes.arrayBuffer(), dbfRes.arrayBuffer(),
        ]);

        const geom = shp.parseShp(shpBuf);
        const attrs = shp.parseDbf(dbfBuf);
        const gj = shp.combine([geom, attrs]) as GeoJSONData;

        if (!cancelled) setGeojson(gj);
        return;
      } catch (e) {
        console.warn("[MAP] Falla SHP manual, probando GeoJSON:", e);
      }

      try {
        const geoURL = join(base, "colombia-departments.json");
        const res = await fetch(geoURL);
        if (!res.ok) throw new Error(String(res.status));
        const data = await res.json();
        const gj: GeoJSONData = data?.type === "Topology"
          ? (topoToGeo(data, data.objects[Object.keys(data.objects)[0]]) as unknown as GeoJSONData)
          : (data as GeoJSONData);

        if (!cancelled) setGeojson(gj);
        return;
      } catch (e) {
        console.warn("[MAP] Falla GeoJSON fallback:", e);
      }

      if (!cancelled) {
        setLoadError("No pude cargar el shapefile ni el archivo GeoJSON.");
      }
    };

    load();
    return () => { cancelled = true; };
  }, []);

  const dataByName = useMemo(() => {
    const m = new globalThis.Map<string, Region>();
    
    // Primero agregar todas las claves normalizadas
    for (const r of regionData) {
      const normalized = norm(r.name);
      m.set(normalized, r);
    }
    
    // Luego agregar mapeos específicos y variaciones
    for (const r of regionData) {
      switch (r.name) {
        case "Antioquia":
          m.set(norm("Antioquia"), r);
          break;
          
        case "Bogotá, D.C.":
          m.set(norm("Bogota DC"), r);
          m.set(norm("Bogota D.C."), r);
          m.set(norm("Bogotá D.C."), r);
          m.set(norm("Distrito Capital"), r);
          m.set(norm("Bogota"), r);
          m.set(norm("Bogotá"), r);
          m.set(norm("Santafe de Bogota"), r);
          m.set(norm("Santa Fe de Bogotá"), r);
          m.set(norm("BOGOTÃ"), r);
          break;
          
        case "Valle Del Cauca":
          m.set(norm("Valle del Cauca"), r);
          m.set(norm("Valle"), r);
          break;
          
        case "Cundinamarca":
          m.set(norm("Cundinamarca"), r);
          break;
          
        case "Santander":
          m.set(norm("Santander"), r);
          break;
          
        case "Huila":
          m.set(norm("Huila"), r);
          break;
          
        case "Nariño":
          m.set(norm("Nariño"), r);
          m.set(norm("Narino"), r);
          m.set(norm("NARIÃ'O"), r);
          break;
          
        case "Atlántico":
          m.set(norm("Atlantico"), r);
          m.set(norm("Atlántico"), r);
          break;
          
        case "Boyacá":
          m.set(norm("Boyaca"), r);
          m.set(norm("Boyacá"), r);
          m.set(norm("BOYACÃ"), r);
          break;
          
        case "Bolívar":
          m.set(norm("Bolivar"), r);
          m.set(norm("Bolívar"), r);
          m.set(norm("BOLÃVAR"), r);
          break;
          
        case "Meta":
          m.set(norm("Meta"), r);
          break;
          
        case "Córdoba":
          m.set(norm("Cordoba"), r);
          m.set(norm("Córdoba"), r);
          m.set(norm("CÃ\"RDOBA"), r);
          break;
          
        case "Norte De Santander":
          m.set(norm("Norte de Santander"), r);
          m.set(norm("Norte Santander"), r);
          break;
          
        case "Tolima":
          m.set(norm("Tolima"), r);
          break;
          
        case "Caldas":
          m.set(norm("Caldas"), r);
          break;
          
        case "Magdalena":
          m.set(norm("Magdalena"), r);
          break;
          
        case "Cauca":
          m.set(norm("Cauca"), r);
          break;
          
        case "Sucre":
          m.set(norm("Sucre"), r);
          break;
          
        case "Cesar":
          m.set(norm("Cesar"), r);
          break;
          
        case "La Guajira":
          m.set(norm("Guajira"), r);
          m.set(norm("La Guajira"), r);
          break;
          
        case "Quindío":
          m.set(norm("Quindio"), r);
          m.set(norm("Quindío"), r);
          m.set(norm("QUINDIO"), r);
          break;
          
        case "Risaralda":
          m.set(norm("Risaralda"), r);
          break;
          
        case "Caquetá":
          m.set(norm("Caqueta"), r);
          m.set(norm("Caquetá"), r);
          m.set(norm("CAQUETÃ"), r);
          break;
          
        case "Casanare":
          m.set(norm("Casanare"), r);
          break;
          
        case "Putumayo":
          m.set(norm("Putumayo"), r);
          break;
          
        case "Chocó":
          m.set(norm("Choco"), r);
          m.set(norm("Chocó"), r);
          m.set(norm("CHOCÃ\""), r);
          break;
          
        case "Amazonas":
          m.set(norm("Amazonas"), r);
          break;
          
        case "Arauca":
          m.set(norm("Arauca"), r);
          break;
          
        case "Guainía":
          m.set(norm("Guainia"), r);
          m.set(norm("Guainía"), r);
          break;
          
        case "Guaviare":
          m.set(norm("Guaviare"), r);
          break;
          
        case "Vaupés":
          m.set(norm("Vaupes"), r);
          m.set(norm("Vaupés"), r);
          break;
          
        case "Vichada":
          m.set(norm("Vichada"), r);
          break;
          
        case "Archipiélago De San Andrés":
          // Mapeo normal
          m.set(norm("San Andres y Providencia"), r);
          m.set(norm("San Andrés y Providencia"), r);
          m.set(norm("San Andres"), r);
          m.set(norm("San Andrés"), r);
          m.set(norm("Archipielago de San Andres"), r);
          m.set(norm("Archipiélago de San Andrés"), r);
          m.set(norm("Archipiélago de San Andrés, Providencia y Santa Catalina"), r);
          m.set(norm("San Andrés, Providencia y Santa Catalina"), r);
          
          // ⭐ MAPEO CRÍTICO: La versión exacta del GeoJSON mal codificada
          const geoJsonKey = "ARCHIPIÃ‰LAGO DE SAN ANDRÃ‰S, PROVIDENCIA Y SANTA CATALINA";
          m.set(norm(geoJsonKey), r);
          
          // También crear versiones sin la normalización completa
          m.set(geoJsonKey.toLowerCase().replace(/\s+/g, " ").trim(), r);
          m.set(geoJsonKey.toLowerCase().replace(/[.,]/g, "").replace(/\s+/g, " ").trim(), r);
          break;
      }
    }
    
    return m;
  }, []);

  const projection = useMemo(() => {
    const proj = geoMercator();
    if (geojson) {
      // @ts-ignore fitSize existe en d3-geo
      proj.fitSize([width, height], geojson);
    } else {
      proj.center([-74, 4.5]).scale(2100).translate([width / 2, height / 2]);
    }
    return proj;
  }, [geojson]);

  const pathGen = useMemo(() => geoPath(projection), [projection]);
  const selectedData = selectedRegion ? dataByName.get(norm(selectedRegion)) || null : null;

  const vulnerablePopulationLabels = {
    discapacitadas: "Discapacitadas", desplazadas: "Desplazadas", migrantes: "Migrantes",
    privadas_libertad: "Privadas de la Libertad", gestantes: "Gestantes", indigenas: "Indígenas",
    icbf: "A Cargo del ICBF", madres_comunitarias: "Madres Comunitarias",
    desmovilizadas: "Desmovilizadas", centro_psiquiatrico: "Centro Psiquiátrico",
    violencia_armada: "Violencia Armada", otras: "Otras", cabeza_familia: "Cabeza de Familia",
    convive_agresor: "Convive con el Agresor"
  };

  return (
    <section id="map" className="py-20 bg-gradient-to-br from-warm-50 to-warm-100" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-primary-900">
            Mapa de Violencia por Departamento
          </h2>
          <p className="text-xl text-primary-600 max-w-3xl mx-auto">
            Distribución geográfica de los casos de violencia contra la mujer según datos SIVIGILA
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2 glass-card bg-warm-100/80 backdrop-blur-sm rounded-2xl p-6"
          >
            <div className="relative">
              {!geojson && !loadError && (
                <div className="p-4 text-sm text-primary-600">Cargando mapa…</div>
              )}
              {loadError && (
                <div className="p-4 text-sm text-red-700 bg-red-50 rounded">{loadError}</div>
              )}

              {geojson && (
                <div className="relative">
                  <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto"
                       style={{ cursor: 'pointer' }}>
                    {geojson.features.map((feat, i) => {
                      const props = (feat.properties ?? {}) as Record<string, any>;
                      const rawName = getDeptoName(props);
                      
                      // Usar la función especializada para encontrar match
                      const match = findDepartmentMatch(rawName, dataByName);
                      
                      const fill = match ? getColorByRate(match.cases) : "#e5e7eb";

                      return (
                        <path
                          key={i}
                          d={pathGen(feat as any) || ""}
                          fill={fill}
                          stroke="#374151"
                          strokeWidth={0.7}
                          className="cursor-pointer hover:opacity-80 hover:stroke-2 transition-all duration-200"
                          onClick={() => setSelectedRegion(match?.name || rawName || "Desconocido")}
                        />
                      );
                    })}
                  </svg>
                </div>
              )}

              <div className="mt-6 p-4 bg-warm-50/80 rounded-lg">
                <h4 className="font-semibold text-primary-900 mb-3">Casos de Violencia (SIVIGILA)</h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    { color: "#8B4513", label: "100,000+ casos" },
                    { color: "#A0522D", label: "50,000-99,999" },
                    { color: "#CD853F", label: "30,000-49,999" },
                    { color: "#DEB887", label: "20,000-29,999" },
                    { color: "#F5DEB3", label: "10,000-19,999" },
                    { color: "#F5F5DC", label: "5,000-9,999" },
                    { color: "#FDF5E6", label: "<5,000" },
                  ].map(({ color, label }) => (
                    <div key={label} className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded" style={{ backgroundColor: color }} />
                      <span className="text-sm">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            {selectedRegion ? (
              <div className="glass-card bg-warm-100/80 backdrop-blur-sm rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <MapPinIcon className="w-6 h-6 text-accent-500" />
                  <h3 className="text-xl font-display font-bold text-primary-900">{selectedRegion}</h3>
                </div>

                {(() => {
                  const sd = selectedData;
                  if (!sd) return <p className="text-primary-600">Sin datos para esta región.</p>;
                  return (
                    <div className="space-y-4">
                      <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <ExclamationTriangleIcon className="w-5 h-5 text-red-600" />
                          <span className="font-semibold text-red-800">Total de Casos</span>
                        </div>
                        <p className="text-3xl font-bold text-red-900">{sd.cases.toLocaleString()}</p>
                      </div>

                      <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg p-4">
                        <h4 className="font-semibold text-orange-800 mb-3">Población Vulnerable</h4>
                        <div className="grid grid-cols-1 gap-2 max-h-60 overflow-y-auto">
                          {Object.entries(sd.vulnerablePopulation)
                            .sort(([,a], [,b]) => b - a)
                            .slice(0, 8)
                            .map(([key, value]) => (
                            <div key={key} className="flex justify-between items-center text-sm">
                              <span className="text-orange-700">
                                {vulnerablePopulationLabels[key as keyof typeof vulnerablePopulationLabels]}:
                              </span>
                              <span className="font-semibold text-orange-900">{value.toLocaleString()}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            ) : (
              <div className="glass-card bg-warm-100/80 backdrop-blur-sm rounded-xl p-6 text-center">
                <div className="relative">
                  <MapPinIcon className="w-12 h-12 mx-auto mb-4 text-primary-400" />
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center animate-pulse">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" />
                    </svg>
                  </div>
                </div>
                <p className="text-primary-600">
                  Haz clic en un departamento para ver información sobre población vulnerable
                </p>
              </div>
            )}

            <div className="glass-card bg-warm-100/80 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-lg font-display font-bold mb-4 text-primary-900">
                Top 10 Departamentos Más Afectados
              </h3>
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {[...regionData]
                  .sort((a, b) => b.cases - a.cases)
                  .slice(0, 10)
                  .map((region, index) => (
                    <div
                      key={region.name}
                      className="flex items-center justify-between p-3 bg-warm-50/60 rounded-lg cursor-pointer hover:bg-warm-100/80 transition-colors"
                      onClick={() => setSelectedRegion(region.name)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-red-500 to-orange-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-semibold text-primary-900">{region.name}</p>
                          <p className="text-sm text-primary-600">{region.cases.toLocaleString()} casos</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-red-400 to-red-600 rounded-full"
                            style={{ width: `${(region.cases / Math.max(...regionData.map(r => r.cases))) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 glass-card bg-warm-100/80 backdrop-blur-sm rounded-xl p-6"
        >
          <h3 className="text-lg font-display font-bold mb-3 text-primary-900">Nota Metodológica</h3>
          <p className="text-sm text-primary-600 leading-relaxed">
            Los datos presentados corresponden a casos reportados oficialmente en el sistema SIVIGILA. 
            La información de población vulnerable incluye diferentes grupos en situación de riesgo.
            Es importante considerar que existe un alto subregistro en muchas regiones.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
