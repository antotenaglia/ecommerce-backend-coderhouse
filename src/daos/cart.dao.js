import { Cart } from "../models/cart.model.js";
import logger from "../lib/logger.lib.js";

const findCart = async (username) => {
    try {
        const cart = await Cart.findOne({ username });
    
        return cart;
      } catch (err) {
        logger.error(`Error finding cart: ${err}`);
      }  
};

export const cartDao = {
    findCart
}