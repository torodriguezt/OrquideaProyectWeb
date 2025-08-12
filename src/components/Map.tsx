"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { MapPinIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { geoMercator, geoPath } from "d3-geo";
import { feature as topoToGeo } from "topojson-client";
import shp from "shpjs";

type Region = { name: string; cases: number; rate: number };
type GJ = GeoJSON.FeatureCollection<GeoJSON.Geometry, any>;

// 🔹 Corrige caracteres mal codificados
const fixEncoding = (s: string) =>
  s
    .replace(/Ã¡/g, "á")
    .replace(/Ã©/g, "é")
    .replace(/Ã­/g, "í")
    .replace(/Ã³/g, "ó")
    .replace(/Ãº/g, "ú")
    .replace(/Ã±/g, "ñ")
    .replace(/Ã/g, "Á")
    .replace(/Ã‰/g, "É")
    .replace(/Ã/g, "Í")
    .replace(/Ã“/g, "Ó")
    .replace(/Ãš/g, "Ú")
    .replace(/Ã‘/g, "Ñ");

const regionData: Region[] = [
  { name: "Antioquia", cases: 8245, rate: 52.3 },
  { name: "Bogotá D.C.", cases: 7892, rate: 48.7 },
  { name: "Valle del Cauca", cases: 5634, rate: 55.8 },
  { name: "Cundinamarca", cases: 4123, rate: 45.2 },
  { name: "Atlántico", cases: 3456, rate: 51.9 },
  { name: "Santander", cases: 3287, rate: 47.3 },
  { name: "Córdoba", cases: 2945, rate: 58.7 },
  { name: "Bolívar", cases: 2834, rate: 54.2 },
  { name: "Norte de Santander", cases: 2567, rate: 49.8 },
  { name: "Nariño", cases: 2234, rate: 46.4 },
  { name: "Cauca", cases: 1987, rate: 53.1 },
  { name: "Tolima", cases: 1856, rate: 44.7 },
  { name: "Huila", cases: 1745, rate: 43.2 },
  { name: "Meta", cases: 1634, rate: 50.3 },
  { name: "Cesar", cases: 1523, rate: 48.9 },
  { name: "Magdalena", cases: 1412, rate: 52.6 },
  { name: "La Guajira", cases: 1301, rate: 57.4 },
  { name: "Caldas", cases: 1098, rate: 42.1 },
  { name: "Quindío", cases: 987, rate: 41.8 },
  { name: "Risaralda", cases: 876, rate: 40.5 },
  { name: "Boyacá", cases: 765, rate: 39.2 },
  { name: "Sucre", cases: 654, rate: 45.8 },
  { name: "Casanare", cases: 543, rate: 47.1 },
  { name: "Putumayo", cases: 432, rate: 48.3 },
  { name: "Arauca", cases: 321, rate: 44.9 },
  { name: "Caquetá", cases: 287, rate: 46.7 },
  { name: "Chocó", cases: 234, rate: 59.8 },
  { name: "San Andrés y Providencia", cases: 123, rate: 38.4 },
  { name: "Amazonas", cases: 98, rate: 35.7 },
  { name: "Guainía", cases: 76, rate: 34.2 },
  { name: "Vichada", cases: 65, rate: 36.8 },
  { name: "Vaupés", cases: 43, rate: 33.1 },
  { name: "Guaviare", cases: 32, rate: 37.5 },
];

const getColorByRate = (rate: number) => {
  if (rate >= 55) return "#991b1b";
  if (rate >= 50) return "#dc2626";
  if (rate >= 45) return "#f97316";
  if (rate >= 40) return "#fb923c";
  if (rate >= 35) return "#fed7aa";
  return "#fef3e2";
};

// 🔹 Ahora normaliza y corrige encoding
const norm = (s: string) =>
  fixEncoding(s || "")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[.,]/g, "")
    .replace(/\s+/g, " ")
    .trim();

const getDeptoName = (props: Record<string, any>) => {
  const keys = [
    "NOMBRE_DPT",
    "DPTO_CNMBR",
    "DEPARTAMENTO",
    "DEPARTAMEN",
    "DPTO",
    "name",
    "NAME",
  ];
  for (const k of keys) if (props?.[k]) return String(props[k]);
  return "";
};

export default function ColombiaMap() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [geojson, setGeojson] = useState<GJ | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  const width = 800;
  const height = 600;

  useEffect(() => {
    let cancelled = false;

    const join = (a: string, b: string) =>
      (a.endsWith("/") ? a.slice(0, -1) : a) + (b.startsWith("/") ? b : "/" + b);

    const load = async () => {
      setLoadError(null);
      const base = import.meta.env.BASE_URL || "/"; // ej: /OrquideaProyectWeb/

      // Rutas EXACTAS según tu captura
      const shpURL = join(base, "departamentos/departamentos.shp");
      const dbfURL = join(base, "departamentos/departamentos.dbf");
      const shxURL = join(base, "departamentos/departamentos.shx");

      try {
        // Verificamos que existen (200)
        const [shpRes, dbfRes, shxRes] = await Promise.all([
          fetch(shpURL),
          fetch(dbfURL),
          fetch(shxURL),
        ]);
        if (!shpRes.ok || !dbfRes.ok) throw new Error("SHP/DBF no accesibles");
        // shxRes puede no ser crítico, pero lo pedimos igual
        if (!shxRes.ok) console.warn("SHX no accesible:", shxRes.status);

        // Parseo manual
        const [shpBuf, dbfBuf] = await Promise.all([
          shpRes.arrayBuffer(),
          dbfRes.arrayBuffer(),
        ]);

        const geom = shp.parseShp(shpBuf);
        const attrs = shp.parseDbf(dbfBuf);
        const gj = shp.combine([geom, attrs]) as GJ;

        if (!cancelled) {
          setGeojson(gj);
        }
        return;
      } catch (e) {
        console.warn("[MAP] Falla SHP manual, probando GeoJSON:", e);
      }

      // Fallback: public/colombia-departments.json (lo vi en tu carpeta)
      try {
        const geoURL = join(base, "colombia-departments.json");
        const res = await fetch(geoURL);
        if (!res.ok) throw new Error(String(res.status));
        const data = await res.json();
        const gj: GJ =
          data?.type === "Topology"
            ? (topoToGeo(data, data.objects[Object.keys(data.objects)[0]]) as unknown as GJ)
            : (data as GJ);

        if (!cancelled) setGeojson(gj);
        return;
      } catch (e) {
        console.warn("[MAP] Falla GeoJSON fallback:", e);
      }

      if (!cancelled) {
        setLoadError(
          "No pude cargar el shapefile (SHP/DBF/SHX) ni el archivo /colombia-departments.json desde /public."
        );
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const dataByName = useMemo(() => {
    const m = new globalThis.Map<string, Region>();
    for (const r of regionData) {
      m.set(norm(r.name), r);
      if (r.name === "Bogotá D.C.") m.set(norm("Bogota DC"), r);
      if (r.name === "San Andrés y Providencia")
        m.set(norm("Archipielago de San Andres Providencia y Santa Catalina"), r);
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
            Distribución geográfica de los casos de violencia contra la mujer en Colombia
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Mapa */}
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
                <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
                  {geojson.features.map((feat, i) => {
                    const props = (feat.properties ?? {}) as Record<string, any>;
                    const rawName = getDeptoName(props);
                    const n = norm(rawName);

                    const normalized =
                      n === norm("Bogota, D.C.") ||
                      n === norm("Bogota D.C.") ||
                      n === norm("Distrito Capital") ||
                      n === norm("Bogota")
                        ? norm("Bogotá D.C.")
                        : n;

                    const match =
                      dataByName.get(normalized) ||
                      dataByName.get(normalized.split(" ")[0]) ||
                      null;

                    const fill = match ? getColorByRate(match.rate) : "#e5e7eb";

                    return (
                      <path
                        key={i}
                        d={pathGen(feat as any) || ""}
                        fill={fill}
                        stroke="#374151"
                        strokeWidth={0.7}
                        className="cursor-pointer hover:opacity-90"
                        onClick={() => setSelectedRegion(match?.name || rawName || "Desconocido")}
                      />
                    );
                  })}
                </svg>
              )}

              {/* Leyenda */}
              <div className="mt-6 p-4 bg-warm-50/80 rounded-lg">
                <h4 className="font-semibold text-primary-900 mb-3">
                  Tasa de Violencia (por 100,000 mujeres)
                </h4>
                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: "#991b1b" }} />
                    <span className="text-sm">55+ (Crítico)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: "#dc2626" }} />
                    <span className="text-sm">50–54 (Alto)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: "#f97316" }} />
                    <span className="text-sm">45–49 (Medio-alto)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: "#fb923c" }} />
                    <span className="text-sm">40–44 (Medio)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: "#fed7aa" }} />
                    <span className="text-sm">35–39 (Bajo)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: "#fef3e2" }} />
                    <span className="text-sm">&lt;35 (Muy bajo)</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Panel de información */}
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
                  <h3 className="text-xl font-display font-bold text-primary-900">
                    {selectedRegion}
                  </h3>
                </div>

                {(() => {
                  const sd = selectedData;
                  if (!sd) return <p className="text-primary-600">Sin datos para esta región.</p>;
                  return (
                    <div className="space-y-4">
                      <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <ExclamationTriangleIcon className="w-5 h-5 text-red-600" />
                          <span className="font-semibold text-red-800">Casos Reportados</span>
                        </div>
                        <p className="text-3xl font-bold text-red-900">
                          {sd.cases.toLocaleString()}
                        </p>
                      </div>

                      <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <MapPinIcon className="w-5 h-5 text-orange-600" />
                          <span className="font-semibold text-orange-800">Tasa por 100,000</span>
                        </div>
                        <p className="text-3xl font-bold text-orange-900">{sd.rate}</p>
                      </div>
                    </div>
                  );
                })()}
              </div>
            ) : (
              <div className="glass-card bg-warm-100/80 backdrop-blur-sm rounded-xl p-6 text-center">
                <MapPinIcon className="w-12 h-12 mx-auto mb-4 text-primary-400" />
                <p className="text-primary-600">
                  Haz clic en un departamento para ver información detallada
                </p>
              </div>
            )}

            {/* Top 5 */}
            <div className="glass-card bg-warm-100/80 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-lg font-display font-bold mb-4 text-primary-900">
                Departamentos Más Afectados
              </h3>
              <div className="space-y-3">
                {[...regionData]
                  .sort((a, b) => b.rate - a.rate)
                  .slice(0, 5)
                  .map((region) => (
                    <div
                      key={region.name}
                      className="flex items-center justify-between p-3 bg-warm-50/60 rounded-lg cursor-pointer hover:bg-warm-100/80 transition-colors"
                      onClick={() => setSelectedRegion(region.name)}
                    >
                      <div>
                        <p className="font-semibold text-primary-900">{region.name}</p>
                        <p className="text-sm text-primary-600">
                          {region.cases.toLocaleString()} casos
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-red-700">{region.rate}</p>
                        <p className="text-xs text-primary-500">por 100k</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Nota metodológica */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 glass-card bg-warm-100/80 backdrop-blur-sm rounded-xl p-6"
        >
          <h3 className="text-lg font-display font-bold mb-3 text-primary-900">Nota Metodológica</h3>
          <p className="text-sm text-primary-600 leading-relaxed">
            Los datos presentados corresponden a casos reportados oficialmente. Las tasas se calculan
            por cada 100,000 mujeres en el departamento. Es importante considerar que existe un alto
            subregistro en muchas regiones, especialmente en áreas rurales y con menor presencia
            institucional.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
