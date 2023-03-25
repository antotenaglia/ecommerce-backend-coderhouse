import { dirname, join } from "path";
import { fileURLToPath } from "url";
import logger from "../lib/logger.lib.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getLogin = (req, res) => {
    const { url, method } = req;
  
    if (url && method) {
      logger.info(`Ruta ${method} ${url} implementada`)
      
      if (req.isAuthenticated()) {
        const user = req.user; 
  
        return res.render("home", 
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
  
      res.sendFile(join(__dirname, "../../views/login.html"));
    }
  };

const getLoginFailure = (req, res) => {
    const { url, method } = req;
  
    if (url && method) {
      logger.info(`Ruta ${method} ${url} implementada`)
      res.render("loginError");
    }
  };

export const loginController = {
    getLogin,
    getLoginFailure
};
