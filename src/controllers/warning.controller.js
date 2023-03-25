import logger from "../lib/logger.lib.js";

const getWarningNotRoute = (req, res) => {
    const { url, method } = req;
  
    logger.warn(`Ruta ${method} ${url} no implementada`);
    res.send(`Ruta ${method} ${url} no está implementada`);
};
  
export const warningController = {
    getWarningNotRoute
};