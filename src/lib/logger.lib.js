import pino from "pino";

const infoLogger = pino(); 
const warnLogger = pino("warn.log");
const errorLogger = pino("error.log"); 

infoLogger.level = "info";
warnLogger.level = "warn";
errorLogger.level = "error";

export const logger = {infoLogger, warnLogger, errorLogger};