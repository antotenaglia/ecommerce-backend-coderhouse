import { Cart } from "../models/cart.model.js";
import logger from "../lib/logger.lib.js";


const createCart = async (newCart) => {
    try {
        const cart = await Cart.create(newCart);

        return cart;
      } catch (err) {
        logger.error(`Error creating cart: ${err}`);
      }  
};

const findCart = async (username) => {
    try {
        const cart = await Cart.findOne({ username: username });
    
        return cart;
      } catch (err) {
        logger.error(`Error finding cart: ${err}`);
      }  
};

const updateCart = async (username, newProduct) => {
    try {
        const cart = await Cart.findOne({ username: username });

        cart.products.push(newProduct);
        
        const updatedCart = await Cart.findByIdAndUpdate(cart._id, {products: cart.products});
        
        return updatedCart;
      } catch (err) {
        logger.error(`Error updating cart: ${err}`);
      }  
};

export const cartDao = {
    createCart,
    findCart,
    updateCart
}