import { cartDao } from "../daos/index.js";
import logger from "../lib/logger.lib.js";

const findCart = async (username) => {
    try {
      const cart = await cartDao.findCart(username);
  
      return cart;
    } catch (err) {
        logger.error(`Error finding cart: ${err}`);
    }
};

export const cartService = {
    findCart
  };