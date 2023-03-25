import { dirname, join } from "path";
import { fileURLToPath } from "url";
import logger from "../lib/logger.lib.js";
import { User } from "../models/user.model.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const hashPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  }; 

const getRegister = (req, res) => {
    const { url, method } = req;
  
    if (url && method) {
      logger.info(`Ruta ${method} ${url} implementada`);
      res.sendFile(join(__dirname, "../../views/register.html"));
    };
};
  
const postRegister = async (req, res) => { 
    try {
      const existingUser = await User.findOne({ username: req.body.username });
  
      if (existingUser) {
        return res.render("registerError");
      } 
  
      const newUser = {
        username: req.body.username,
        password: hashPassword(req.body.password),
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        address: req.body.address,
        age: req.body.age,
        phone: req.body.phone,
        photo: `http://localhost:3000/images/${req.file.filename}`,
      };
  
      const createdUser = await User.create(newUser);
      
      sendMail.sendMailNewRegister(createdUser);
      
      return res.render("home", createdUser);
    
    } catch (err) {
      logger.error(err);
      return res.json("error while register", err);
    }
};
  
const getRegisterFailure = (req, res) => {
    const { url, method } = req;
  
    if (url && method) {
      logger.info(`Ruta ${method} ${url} implementada`)
      res.render("registerError");
    }
};

export const registerController = {
    getRegister,
    postRegister,
    getRegisterFailure
};