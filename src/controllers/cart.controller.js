import logger from "../lib/logger.lib.js";
import { sendMail } from "../nodemailer.js";
import { cartService } from "../services/index.js";
import { Cart } from "../models/cart.model.js";

const getCart = async (ctx) => {
    try {
        //const { originalUrl, method } = req;
        //const username = req.query.username;
        // const newCart ={
        //     username: username,
        //     products: []
        // };
        // const existingCart = await cartService.findCart(username); 
        
        //if (originalUrl && method) {
            //logger.info(`Route ${method} ${originalUrl} implemented`);

            // if (existingCart && (existingCart.products.length !== 0)) {
            //     return res.render("cart", {existingCart, username});
            // } else {
            //     if (!existingCart) {
            //         await cartService.createCart(newCart); 
            //         return res.render("cartError");
            //     } else {
            //         return res.render("cartError");
            //     }
            // }   
        
        if (ctx.method && ctx.originalUrl) {
            logger.info(`Route ${ctx.method} ${ctx.originalUrl} implemented`);
            
            const username = ctx.query.username; 
            const existingCart = await Cart.findOne({username: username});
            
            if (existingCart && (existingCart.products.length !== 0)) {
                ctx.render("cart", {existingCart, username});

                ctx.response.status = 200;
            } else {
                if (!existingCart) {
                    await Cart.create(username, []);

                    ctx.render("cartError");
                } else {
                    ctx.response.status = 500;

                    ctx.render("cartError");
                }
            } 
        }
    } catch (err) {
        logger.error(`Error getting Cart: ${err}`);
    }
}
  
const postCart = async (ctx) => {
    try {
        // const { originalUrl, method } = req;
        // const username = req.body.username;
        
        // const newProduct = {
        //     id: req.body.id,
        //     title: req.body.title,
        //     price: req.body.price,
        //     stock: req.body.stock,
        //     thumbnail: req.body.thumbnail
        // };
        // const newCart ={
        //     username: username,
        //     products: []
        // };
        // const existingCart = await cartService.findCart(username); 

        // if (originalUrl && method) {
        //     logger.info(`Route ${method} ${originalUrl} implemented`);
            
        //     if (existingCart) {
        //         await cartService.updateCart(username, newProduct); 
        //     } else {
        //         await cartService.createCart(newCart); 
        //         await cartService.updateCart(username, newProduct); 
        //     }
        
        if (ctx.method && ctx.originalUrl) {
            logger.info(`Route ${ctx.method} ${ctx.originalUrl} implemented`);
            
            const username = ctx.query.username; 
            const { id, title, price, stock, thumbnail } = ctx.request.body;
            const existingCart = await Cart.findOne({username: username});

            if (existingCart) {
                await Cart.updateOne({username: username}, { id, title, price, stock, thumbnail });
            } else {
                await Cart.create(username, []);
                await Cart.updateOne({username: username}, { id, title, price, stock, thumbnail });
            }
        
            ctx.response.status = 200;
        }
    } catch (err) {
        logger.error(`Error posting Cart: ${err}`);

        ctx.response.status = 500;
                
        ctx.body = { 
            data: "Error posting Cart",
        };
    }
};
  
const getCartPurchase = async (ctx) => {
    try {
        // const { originalUrl, method } = req;
        //const username = req.query.username;
        // const cart = await cartService.findCart(username); 

        // if (originalUrl && method) {
        //     logger.info(`Route ${method} ${originalUrl} implemented`);
        if (ctx.method && ctx.originalUrl) {
            logger.info(`Route ${ctx.method} ${ctx.originalUrl} implemented`);
            
            const username = ctx.query.username;
            const cart = await Cart.findOne({username: username});
        
            if (cart) {
                ctx.response.status = 200;

                sendMail.sendMailNewOrder(cart, username);
    
                ctx.render("cartPurchase", {username});
            }
        }
    } catch (err) {
        logger.error(`Error getting Cart Purchase: ${err}`);

        ctx.response.status = 500;
                
        ctx.body = { 
            data: "Error getting Cart Purchase",
        };
    }
};

export const cartController = {
    getCart,
    postCart,
    getCartPurchase  
};
