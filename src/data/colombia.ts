// src/data/colombia.ts

// Tipos del JSON de la fuente pública:
// [
//   { "departamento": "Antioquia", "ciudades": ["Medellín", "Bello", ...] },
//   ...
// ]
export interface ColombiaRow {
  departamento: string;
  ciudades: string[];
}

// Importa el JSON generado por el script.
// ⚠️ Asegúrate de haber corrido `npm run prebuild:data:co`.
import raw from "./colombia.json" assert { type: "json" };

const rows = raw as ColombiaRow[];

// Mapa Departamento -> Municipios
export const CO_MAP: Record<string, string[]> = Object.fromEntries(
  rows.map((r) => [r.departamento, r.ciudades.slice().sort((a, b) => a.localeCompare(b, "es"))])
);

// Lista de departamentos ordenada (para el <select>)
export const DEPARTMENTS: string[] = Object.keys(CO_MAP).sort((a, b) =>
  a.localeCompare(b, "es")
);

// Helper para obtener municipios por depto.
export const getCitiesByDepartment = (dept: string): string[] => CO_MAP[dept] ?? [];
