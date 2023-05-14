import logger from "../lib/logger.lib.js";
import { sendMail } from "../nodemailer.js";
import { cartService } from "../services/index.js";
import { userService } from "../services/index.js";
import { orderService } from "../services/index.js";

const getOrder = async (req, res) => {
    try {
        const { originalUrl, method } = req;
        const username = req.query.username;
        const user = await userService.findUser(username); 
        const cart = await cartService.findCart(username); 
        const order = await orderService.findOrder(username); 
        const allOrders = await orderService.findAllOrders(); 
        let orderNumber = 1;
        const status = "Generada";
        const newOrder = {
            username: username,
            products: cart.products,
            orderNumber: orderNumber,
            dateAndTime: new Date().toLocaleString(),
            status: status,
        };

        if (originalUrl && method) {
            logger.info(`Route ${method} ${originalUrl} implemented`);
            
            if (order) {
                for (let i = 0; i < allOrders.length; i++ ) {
                    if (allOrders[i].username === username) {
                        orderNumber++
                    };
                };
                
                newOrder.orderNumber = orderNumber;

                await orderService.createOrder(newOrder);
            } else {
                await orderService.createOrder(newOrder); 
            }
            sendMail.sendMailNewOrder(newOrder, user);

            return res.render("order", {username});
        }
    } catch (err) {
        logger.error(`Error getting Order: ${err}`);

        res.sendStatus(500);
    }
};

export const orderController = {
    getOrder  
};
