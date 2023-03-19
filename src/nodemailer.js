import { config } from "./config/config.js";
import { createTransport } from "nodemailer";
import logger from "./lib/logger.lib.js";

const transporter = createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: config.etherealMail, //cuenta ethereal del admin
        pass: config.etherealPassword
    }
});

const sendMail = async ({username, firstname, lastname, address, age, phone}) => {
    try {
        const mailOptions = {
            from: "Servidor Node",
            to: config.etherealMail, 
            subject: "Nuevo registro",
            html: `<h3 style="color: blue;">Usuario: ${username}</h3>
            <h3 style="color: blue;">Nombre: ${firstname}</h3>
            <h3 style="color: blue;">Apellido: ${lastname}</h3>
            <h3 style="color: blue;">Dirección: ${address}</h3>
            <h3 style="color: blue;">Edad: ${age}</h3>
            <h3 style="color: blue;">Teléfono: ${phone}</h3>`,
        };
        const info = await transporter.sendMail(mailOptions);
        logger.info(info);
    } catch (err) {
        logger.error(err);
    }
}

export default sendMail;