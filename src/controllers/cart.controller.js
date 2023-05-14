import logger from "../lib/logger.lib.js";
import { cartService } from "../services/index.js";

const getCart = async (req, res) => {
    try {
        const { originalUrl, method } = req;
        const username = req.query.username;
        const newCart ={
            username: username,
            products: [],
        };
        const existingCart = await cartService.findCart(username); 
        
        if (originalUrl && method && username) {
            logger.info(`Route ${method} ${originalUrl} implemented`);

            if (existingCart && (existingCart.products.length !== 0)) { 
                const _idCart = existingCart._id.valueOf();
                
                return res.render("cart", {existingCart, _idCart, username});
            } else {
                if (!existingCart) {
                    await cartService.createCart(newCart); 
                    return res.render("cartEmpty");
                } else {
                    return res.render("cartEmpty");
                }
            }    
        } else {
            return res.render("noUserRegistered");
        }
    } catch (err) {
        logger.error(`Error getting Cart: ${err}`);
    }
};
  
const postCart = async (req, res) => {
    try {
        const { originalUrl, method } = req;
        const username = req.body.username;
        let newProduct = {
            _idProduct: req.body._id,
            title: req.body.title,
            price: req.body.price,
            thumbnail: req.body.thumbnail,
            category: req.body.category,
            description: req.body.description, 
            quantity: req.body.quantity,
        };
        const newCart ={
            username: username,
            products: [],
        };
        const existingCart = await cartService.findCart(username); 
        
        if (originalUrl && method && username) {
            logger.info(`Route ${method} ${originalUrl} implemented`);
            
            if (existingCart) {
                for (let i = 0; i < existingCart.products.length; i++) {
                    if (existingCart.products[i]._idProduct === newProduct._idProduct) {
                        newProduct.quantity = Number(existingCart.products[i].quantity) + Number(newProduct.quantity);
                    }; 
                };   

                await cartService.updateCart(username, newProduct);      
            } else {
                newCart.products.push(newProduct);

                await cartService.createCart(newCart); 
            };

            res.sendStatus(200);    
        } else {
            return res.render("noUserRegistered");
        }
    } catch (err) {
        logger.error(`Error posting Cart: ${err}`);

        res.sendStatus(500);
    }
};

const deleteCart = async (req, res) => {
    try {
        const { originalUrl, method } = req;
        let { _idCart } = req.params;
        
        if (originalUrl && method) {
            logger.info(`Route ${method} ${originalUrl} implemented`);
            
            await cartService.deleteCart(_idCart);

            return res.sendStatus(200);
        };
    } catch (err) {
        logger.error(`Error deleting Product: ${err}`);
    };
};

const deleteProductInCart = async (req, res) => {
    try {
        const { originalUrl, method } = req;
        let { _idCart, _idProduct } = req.params;
        
        if (originalUrl && method) {
            logger.info(`Route ${method} ${originalUrl} implemented`);

            await cartService.deleteProductInCart(_idCart, _idProduct);

            return res.sendStatus(200);
        };
    } catch (err) {
        logger.error(`Error deleting Product: ${err}`);
    };
};
  
export const cartController = {
    getCart,
    postCart,
    deleteCart,
    deleteProductInCart,
};
