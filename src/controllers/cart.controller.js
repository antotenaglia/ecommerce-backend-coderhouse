import logger from "../lib/logger.lib.js";
import { sendMail } from "../nodemailer.js";
import { cartService } from "../services/index.js";

const getCart = async (req, res) => {
    try {
        const { originalUrl, method } = req;
        const username = req.query.username;
        const newCart ={
            username: username,
            products: []
        };
        const existingCart = await cartService.findCart(username); 
        
        if (originalUrl && method) {
            logger.info(`Route ${method} ${originalUrl} implemented`);

            if (existingCart && (existingCart.products.length !== 0)) {
                return res.render("cart", {existingCart, username});
            } else {
                if (!existingCart) {
                    await cartService.createCart(newCart); 
                    return res.render("cartError");
                } else {
                    return res.render("cartError");
                }
            }    
        }
    } catch (err) {
        logger.error(`Error getting Cart: ${err}`);
    }
};
  
const postCart = async (req, res) => {
    try {
        const { originalUrl, method } = req;
        const username = req.body.username;
        
        const newProduct = {
            id: req.body.id,
            title: req.body.title,
            price: req.body.price,
            stock: req.body.stock,
            thumbnail: req.body.thumbnail
        };
        const newCart ={
            username: username,
            products: []
        };
        const existingCart = await cartService.findCart(username); 

        if (originalUrl && method) {
            logger.info(`Route ${method} ${originalUrl} implemented`);
            
            if (existingCart) {
                await cartService.updateCart(username, newProduct); 
            } else {
                await cartService.createCart(newCart); 
                await cartService.updateCart(username, newProduct); 
            }

            res.sendStatus(200);    
        }
    } catch (err) {
        logger.error(`Error posting Cart: ${err}`);

        res.sendStatus(500);
    }
};
  
const getCartPurchase = async (req, res) => {
    try {
        const { originalUrl, method } = req;
        const username = req.query.username;
        const cart = await cartService.findCart(username); 

        if (originalUrl && method) {
            logger.info(`Route ${method} ${originalUrl} implemented`);
            
            if (cart) {
              sendMail.sendMailNewOrder(cart, username);
      
              return res.render("cartPurchase", {username});
            }
        }
    } catch (err) {
        logger.error(`Error posting Cart: ${err}`);

        res.sendStatus(500);
    }
};

export const cartController = {
    getCart,
    postCart,
    getCartPurchase  
};
