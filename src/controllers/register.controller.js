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
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  }; 

const getRegister = (ctx) => {
    try {
        if (ctx.method && ctx.originalUrl) {
            logger.info(`Route ${ctx.method} ${ctx.originalUrl} implemented`);

            ctx.html(join(__dirname, "../../views/register.html"));
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
        const newUser = {
            username: ctx.request.body,
            password: hashPassword(ctx.request.body),
            firstname: ctx.request.body,
            lastname: ctx.request.body,
            address: ctx.request.body,
            age: ctx.request.body,
            phone: ctx.request.body,
            photo: `http://localhost:3000/images/${ctx.request.body}`,
        };
        const existingUser = await User.findOne({username: newUser.username}); 

        if (existingUser) {
            ctx.render("registerError");
        } else {
            const createdUser = await User.create(newUser); 

            sendMail.sendMailNewRegister(createdUser);

            ctx.render("home", createdUser);
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