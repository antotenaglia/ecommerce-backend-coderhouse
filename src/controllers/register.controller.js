import { dirname, join } from "path";
import { fileURLToPath } from "url";
import logger from "../lib/logger.lib.js";
import { userService } from "../services/index.js";
import bcrypt from "bcrypt";
import { sendMail } from "../nodemailer.js";
import { User } from "../models/user.model.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const hashPassword = (password) => {
    return bcrypt.hashSync(password.toString(), bcrypt.genSaltSync(10));
  }; 

const getRegister = (ctx) => {
    try {
        if (ctx.method && ctx.originalUrl) {
            logger.info(`Route ${ctx.method} ${ctx.originalUrl} implemented`);

            ctx.html("register.html");
        };
    } catch (err) {
        logger.error(`Error while getting register html: ${err}`);

        ctx.body = { 
            data: `Error while getting register html: ${err}`,
        };
    }; 
};
  
const postRegister = async (ctx) => { 
    try {
        const { username, password, firstname, lastname, address, age, phone } = ctx.request.body;  
        //no me está guardando contraseña con hashpassword
        //const { password } = hashPassword(ctx.request.body); 
        const existingUser = await User.findOne( {username: username} ); 
        
        if (existingUser) {
            ctx.render("registerError");
        } else {
            const createdUser = await User.create({username, password, firstname, lastname, address, age, phone}); 

            sendMail.sendMailNewRegister(createdUser);

            ctx.render("home", {username, firstname, lastname, address, age, phone});
        }
    } catch (err) {
        logger.error(`error while register: ${err}`);

        ctx.body = { 
            data: `Error while register: ${err}`,
        };
    }
};
  
export const registerController = {
    getRegister,
    postRegister,
};