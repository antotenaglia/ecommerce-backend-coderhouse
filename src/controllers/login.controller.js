import { dirname, join } from "path";
import { fileURLToPath } from "url";
import logger from "../lib/logger.lib.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getLogin = (ctx) => {
    if (ctx.method && ctx.originalUrl) {
        logger.info(`Route ${ctx.method} ${ctx.originalUrl} implemented`);
      
        if (ctx.isAuthenticated()) {
          const user = ctx.user; 
    
          ctx.render("home", 
            {
              username: user.username,
              firstname: user.firstname,
              lastname: user.lastname,
              address: user.address,
              age: user.age,
              phone: user.phone,
              photo: user.photo,
            }
          );
        }
  
        ctx.html(join(__dirname, "../../views/login.html"));
    }
  };

const getLoginFailure = (ctx) => {  
    if (ctx.method && ctx.originalUrl) {
        logger.info(`Route ${ctx.method} ${ctx.originalUrl} implemented`);

        ctx.render("loginError");
    }
};

export const loginController = {
    getLogin,
    getLoginFailure
};
