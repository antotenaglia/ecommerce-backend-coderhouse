import { config } from "../config/config.js";
import pino from "pino";

// const buildProdLogger = () => { //en modo producción, se guardan en un archivo los "error" y "warn"
//     const warnLogger = pino("warn.log");
//     const errorLogger = pino("error.log"); 
//     const prodLogger = pino("debug.log");
    
//     warnLogger.level = "warn";
//     errorLogger.level = "error";
//     prodLogger.level = "debug";

//     return prodLogger;
//     //se me está guardando todo en debug y no en warn o error.. 
//     //si no pongo debug, no me toma el logger.info al conectar la ruta 
// };

// const buildDevLogger = () => { //en modo desarrollo, se loguean en la consola todos los errores debajo del nivel "info", xej "error" y "warn"
//     const infoLogger = pino(); 

//     infoLogger.level = "info";

//     return infoLogger;
// };
  
// let logger;

// if (config.nodeEnv.toLocaleUpperCase() === "PROD") {
//     logger = buildProdLogger();
// } else {
//     logger = buildDevLogger();
// }


const infoLogger = pino(); 
const warnLogger = pino("warn.log");
const errorLogger = pino("error.log"); 

infoLogger.level = "info";
warnLogger.level = "warn";
errorLogger.level = "error";

export const logger = {infoLogger, warnLogger, errorLogger};