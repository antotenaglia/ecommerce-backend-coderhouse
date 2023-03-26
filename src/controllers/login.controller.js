import { dirname, join } from "path";
import { fileURLToPath } from "url";
import logger from "../lib/logger.lib.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getLogin = (req, res) => {
    const { originalUrl, method } = req;
  
    if (originalUrl && method) {
      logger.info(`Route ${method} ${originalUrl} implemented`)
      
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
    const { originalUrl, method } = req;
  
    if (originalUrl && method) {
      logger.info(`Route ${method} ${originalUrl} implemented`)
      res.render("loginError");
    }
  };

export const loginController = {
    getLogin,
    getLoginFailure
};
