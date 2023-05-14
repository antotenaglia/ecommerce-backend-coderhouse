import { dirname, join } from "path";
import { fileURLToPath } from "url";
import logger from "../lib/logger.lib.js";
import { userService } from "../services/index.js";
import bcrypt from "bcrypt";
import { sendMail } from "../nodemailer.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const hashPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  }; 

const matchPassword = function(password, passwordRepeated){
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, passwordRepeated, (err, matches) => {
            if (err) reject(err)
            else resolve(matches)
        });
    });
};

const getRegister = (req, res) => {
    try {
        const { originalUrl, method } = req;

        if (originalUrl && method) {
          logger.info(`Route ${method} ${originalUrl} implemented`);
    
          res.sendFile(join(__dirname, "../../views/register.html"));
        };
    } catch (err) {
        logger.error(`error while getting register html: ${err}`);

        return res.json(`error while getting register html: ${err}`);
    } 
};
  
const postRegister = async (req, res) => {    
    try {
        const username = req.body.username;
        const newUser = {
            username: req.body.username,
            password: hashPassword(req.body.password),
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            phone: req.body.phone,
            photo: `http://localhost:3000/images/${req.file.filename}`,
            city: req.body.city,
            address: req.body.address,
        };
        const existingUser = await userService.findUser(username); 
        
        if (existingUser) {
            return res.render("registerError");
        } else {
            const createdUser = await userService.createUser(newUser); 

            sendMail.sendMailNewRegister(createdUser);

            return res.render("home", createdUser);
        }
    } catch (err) {
      logger.error(`error while register: ${err}`);

      return res.json(`error while register: ${err}`);
    }
};
  
export const registerController = {
    getRegister,
    postRegister,
};