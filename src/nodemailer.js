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

const sendMailNewRegister = async ({username, firstname, lastname, phone, city, address}) => {
    try {
        const mailOptions = {
            from: "Servidor Node",
            to: config.etherealMail, 
            subject: "Nuevo registro",
            html: `<h3 style="color: blue;">Nuevo usuario: ${username}</h3>
            <h3>Nombre: ${firstname}</h3>
            <h3>Apellido: ${lastname}</h3>
            <h3>Teléfono: ${phone}</h3>
            <h3>Ciudad: ${city}</h3>
            <h3>Dirección: ${address}</h3>`,
        };
        const info = await transporter.sendMail(mailOptions);
        logger.info(info);
    } catch (err) {
        logger.error(`Error sending register email: ${err}`);
    };
};

const sendMailNewOrder = async (newOrder, user) => {
    try {
        let price = [];

        for (let i = 0; i < newOrder.products.length; i++) {
            const pricePerProduct =  newOrder.products[i].price*newOrder.products[i].quantity;
            
            price.push(pricePerProduct);
        };
        
        const totalPrice = price.reduce((a, b) => a + b, 0);

        const mailOptions = {
            from: "Servidor Node",
            to: config.etherealMail, 
            subject: `Pedido N° ${newOrder.orderNumber} de ${newOrder.username} - ${newOrder.dateAndTime}`,
            html: `<h3 style="color: blue;">Usuario: ${newOrder.username}</h3>
            <h3>Dirección de entrega: ${user.city} - ${user.address}</h3>
            <h3>Estado: ${newOrder.status}</h3>
            <h3>Pedido:</h3>
            ${newOrder.products.map((product) => 
                `<li>Title: ${product.title}
                    <ul>Quantity: ${product.quantity}</ul>
                    <ul>Price per unit: $${product.price}</ul>
                    <ul>Category: ${product.category}</ul>
                    <ul>Description: ${product.description}</ul>
                    <ul>ProductId: ${product._idProduct}</ul>
                 </li>`
            )}
            <h3>PRECIO TOTAL: $${totalPrice}</h3>`,
        };

        const info = await transporter.sendMail(mailOptions);

        logger.info(`Order mail sent: `, info);
    } catch (err) {
        logger.error(`Error sending new order email : ${err}`);
    };
};

export const sendMail = { sendMailNewRegister, sendMailNewOrder };
