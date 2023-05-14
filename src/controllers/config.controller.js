import logger from "../lib/logger.lib.js";

const getConfig = (req, res) => {
    const { originalUrl, method } = req;
  
    if (originalUrl && method) {
      logger.info(`Route ${method} ${originalUrl} implemented`);

      res.render("configData")
    }
};

export const configController = {
    getConfig
};