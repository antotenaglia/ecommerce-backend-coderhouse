import logger from "../lib/logger.lib.js";

const getLogout = (ctx) => {
    const username = ctx.query.username;
      
    if (ctx.method && ctx.originalUrl) {
        logger.info(`Route ${ctx.method} ${ctx.originalUrl} implemented`);

        ctx.session.destroy((err) => {
          if (err) {
            res.json(`Error while logout: ${err}`);

            logger.error(`Error while logout: ${err}`);
          } else {
            ctx.render("logout", { username: username });
          }
        });   
    }
};

export const logoutController = {
    getLogout
};