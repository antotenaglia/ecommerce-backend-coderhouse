import logger from "../lib/logger.lib.js";

const getLogout = (req, res) => {
    const username = req.query.username;
    const { originalUrl, method } = req;
  
    if (originalUrl && method) {
      logger.info(`Route ${method} ${originalUrl} implemented`);

      req.session.destroy((err) => {
        if (err) {
          res.json(`Error while logout: ${err}`);

          logger.error(`Error while logout: ${err}`);
        } else {
          return res.render("logout", { username: username });
        }
      });   
    }
};

export const logoutController = {
    getLogout
};