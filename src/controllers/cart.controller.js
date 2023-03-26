import logger from "../lib/logger.lib.js";
import { sendMail } from "../nodemailer.js";
import { cartService } from "../services/index.js";

const getCart = async (req, res) => {
    try {
        const { url, method } = req;
        const username = req.query.username;
        const cart = await cartService.findCart(username); 
        
        if (url && method) {
            logger.info(`Route ${method} ${url} implemented`);
            if (cart) {
            return res.render("cart", {cart, username});
            } else {
            return res.render("cartError");
            }    
        }
    } catch (err) {
        logger.error(`Error getting Cart: ${err}`);
    }
};
  
const postCart = async (req, res) => {
    try {
        const { url, method } = req;
        const username = req.query.username;
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

        if (url && method) {
            logger.info(`Route ${method} ${url} implemented`);
            
            if (existingCart) {
                await cartService.updateCart(username, newProduct); 
            } else {
                await cartService.createCart(newCart); 
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
        const { url, method } = req;
        const username = req.query.username;
        const cart = await cartService.findCart(username); 

        if (url && method) {
            logger.info(`Route ${method} ${url} implemented`);
            
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
