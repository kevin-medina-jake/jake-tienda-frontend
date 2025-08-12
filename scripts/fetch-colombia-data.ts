
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// Fuente pública muy usada (departamentos -> ciudades/municipios)
const RAW_URL =
  "https://raw.githubusercontent.com/marcovega/colombia-json/master/colombia.json";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const OUT_DIR = resolve(__dirname, "../src/data");
const OUT_FILE = resolve(OUT_DIR, "colombia.json");

await mkdir(OUT_DIR, { recursive: true });

console.log("Descargando departamentos/municipios de Colombia…");
const res = await fetch(RAW_URL);
if (!res.ok) {
  throw new Error(`Error al descargar: ${res.status} ${res.statusText}`);
}

const buf = Buffer.from(await res.arrayBuffer());
await writeFile(OUT_FILE, buf);
console.log(`OK -> ${OUT_FILE}`);
