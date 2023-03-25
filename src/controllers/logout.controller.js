import logger from "../lib/logger.lib.js";

const getLogout = (req, res) => {
    const user = req.user;
    const { url, method } = req;
  
    if (url && method) {
      logger.info(`Ruta ${method} ${url} implementada`)
      req.session.destroy((err) => {
        if (err) {
          res.json(err);
          logger.error(err);
        } else {
          return res.render("logout", { username: user.username });
        }
      });   
    }
};

export const logoutController = {
    getLogout
};