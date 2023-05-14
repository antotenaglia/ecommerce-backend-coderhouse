import pino from "pino";
import { config } from "../config/config.js";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const buildProdLogger = pino ({level: "warn"}, pino.destination(join(__dirname, "../../loggers/warn.log")),{level: "error"}, pino.destination(join(__dirname, "../../loggers/error.log")));
const buildDevLogger = pino ({level: "debug"});

let logger;

if (config.nodeEnv.toLocaleUpperCase() === "PROD") {
    logger = buildProdLogger;
    
    config.mongoUrl = process.env.MONGO_URL_PROD;
} else if (config.nodeEnv.toLocaleUpperCase() === "DEV") {
    logger = buildDevLogger;

    config.mongoUrl = process.env.MONGO_URL_DEV;    
};

export default logger;