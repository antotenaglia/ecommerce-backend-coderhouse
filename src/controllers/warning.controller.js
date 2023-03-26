import logger from "../lib/logger.lib.js";

const getWarningNotRoute = (req, res) => {
    const { url, method } = req;
  
    logger.warn(`Route ${method} ${url} implemented`);
    res.send(`Route ${method} ${url} not implemented`);
};
  
export const warningController = {
    getWarningNotRoute
};