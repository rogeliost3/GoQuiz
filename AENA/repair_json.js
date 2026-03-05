// unir-jsons.js
import fs from "fs";

const FILE1 = "aeroportuaria.json";
const FILE2 = "aeroportuaria-locs.json";
const OUTPUT_FILE = "aeroportuaria-joined.json";
const ROOT_LOCS = "Aeroportuaria";
const ROOT_INICIAL = "Aeroportuaria";
const START_INDEX = 0; // Índice inicial para combinar
const END_INDEX = 71; // Índice final para combinar

// Leer archivos JSON
const fInicial = JSON.parse(fs.readFileSync(FILE1, "utf8"));
const fLocs = JSON.parse(fs.readFileSync(FILE2, "utf8"));

// Función para procesar la referencia
function parseReferencia(ref) {
  const moduloMatch = ref.match(/MÓDULO\s+(\d+)/i);
  const unidadMatch = ref.match(/UNIDAD\s+(\d+)/i);
  const apartadoMatch = ref.match(/Apt:\s(\d+\.\d+)\s+([^.]+)\./);
  const paginaMatch = ref.match(/Página\s(\d+)/i);
  
  const modulo = moduloMatch ? `MÓDULO ${moduloMatch[1]}. ` : "";
  const unidad = unidadMatch ? `UNIDAD ${unidadMatch[1]}. ` : "";
  const apartadoNumero = apartadoMatch ? `${apartadoMatch[1]}, ${apartadoMatch[2].trim()}. ` : "";
  const pagina = paginaMatch ? `Página ${paginaMatch[1]}` : "";

  return `${modulo}${unidad}${apartadoNumero}${pagina}`;
}

// Usar corchetes para acceder a la clave con acento
// const arrayLocs = fLocs[ROOT_LOCS];

// if (!arrayLocs) {
//   throw new Error(
//     `No se encontró la clave ${ROOT_LOCS} ni un array raíz en ${FILE2}`
//   );
// }


function combinarArrays() {
  // Crear una copia profunda del array inicial para no mutar el original
  const jsonJoined = fInicial;

  let index = START_INDEX;

  jsonJoined[ROOT_INICIAL].forEach((item) => {
    if (index > END_INDEX) {
      return; // Detener la ejecución del forEach
    }
    // Verificar que el índice no se haya salido del array arrayLocs
    // if (index >= arrayLocs.length) {
    //   console.error(
    //     `Error: El array inicial es más largo que arrayLocs. Deteniendo en índice ${index}`
    //   );
    //   return; // Detener la ejecución del forEach
    // }

    // Añadir los campos referencia y explicacion del arrayLocs al item actual
    item.texto = fLocs[ROOT_LOCS][index].texto;
    item.referencia = parseReferencia(fLocs[ROOT_LOCS][index].referencia);
    item.explicacion = fLocs[ROOT_LOCS][index].explicacion;

    index++;
  });

  // Verificar si arrayLocs es más largo que aeronautica
  // if (fLocs[ROOT_LOCS].length > jsonJoined[ROOT_INICIAL].length) {
  //   console.warn(
  //     `Advertencia: arrayLocs tiene ${
  //       fLocs[ROOT_LOCS].length - jsonJoined[ROOT_INICIAL].length
  //     } elementos más que jsonJoined`
  //   );
  // }

  return jsonJoined;
}

// Ejecutar la combinación
try {
  const jsonJoined = combinarArrays();

  // Generar el archivo JSON
  fs.writeFileSync(
    OUTPUT_FILE,
    JSON.stringify(jsonJoined, null, 2),
    "utf8"
  );

  console.log(`✅ Archivo ${OUTPUT_FILE} generado exitosamente`);
  console.log(`📊 Elementos procesados: ${jsonJoined[ROOT_INICIAL].length}`);
} catch (error) {
  console.error("❌ Error al procesar los arrays:", error.message);
}
