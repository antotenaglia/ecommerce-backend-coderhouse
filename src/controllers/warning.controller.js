import logger from "../lib/logger.lib.js";

const getWarningNotRoute = (req, res) => {
    const { originalUrl, method } = req;
  
    logger.warn(`Route ${method} ${originalUrl} not implemented`);
    res.send(`Route ${method} ${originalUrl} not implemented`);
};
  
export const warningController = {
    getWarningNotRoute
};