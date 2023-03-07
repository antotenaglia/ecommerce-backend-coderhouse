import pino from "pino";
import { config } from "../config/config.js";

//en modo producción, se guardan en un archivo los "error" y "warn"
const buildProdLogger = pino ({level: "warn"}, pino.destination("warn.log"),{level: "error"}, pino.destination("error.log"))

//en modo desarrollo, se loguean en la consola todos los errores debajo del nivel "info", xej "error" y "warn"
const buildDevLogger = pino ({level: "debug"})

let logger;

if (config.nodeEnv.toLocaleUpperCase() === "PROD") {
    logger = buildProdLogger;
} else {
    logger = buildDevLogger;
}


export default logger;