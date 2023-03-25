import logger from "../lib/logger.lib.js";
import { Cart } from "../models/cart.model.js";
import { sendMail } from "../nodemailer.js";
import { cartService } from "../services/cart.service.js";

const getCart = async (req, res) => {
    const { url, method } = req;
    const username = req.query.username;

    const cart = await cartService.findCart(username);
    
    //const cart = await Cart.findOne({ username: req.query.username });
    
    if (url && method) {
        logger.info(`Ruta ${method} ${url} implementada`);
        if (cart) {
          return res.render("cart", {cart, username});
        } else {
          return res.render("cartError");
        }    
    }
};
  
const postCart = async (req, res) => {
    try {
      const newProduct = {
        id: req.body.id,
        title: req.body.title,
        price: req.body.price,
        stock: req.body.stock,
        thumbnail: req.body.thumbnail
      };
      const existingCart = await Cart.findOne({ username: req.body.username });
  
      if (existingCart) {
        existingCart.products.push(newProduct);
  
        await Cart.findByIdAndUpdate(existingCart._id, {products: existingCart.products});
      } else {
        const newCart ={
          username: req.body.username,
          products: []
        }
  
        newCart.products.push(newProduct);
  
        await Cart.create(newCart);
      }
  
      res.sendStatus(200);
  
    } catch (err) {
      logger.error(err);
  
      res.sendStatus(500);
    }
};
  
const getCartPurchase = async (req, res) => {
    const { url, method } = req;
    const username = req.query.username;
    const cart = await Cart.findOne({ username: req.query.username });
    
    if (url && method) {
        logger.info(`Ruta ${method} ${url} implementada`);
        
        if (cart) {
          sendMail.sendMailNewOrder(cart, username);
  
          return res.render("cartPurchase", {username});
        }
    }
};


export const cartController = {
    getCart,
    postCart,
    getCartPurchase  
};
