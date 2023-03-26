import { cartDao } from "../daos/index.js";
import logger from "../lib/logger.lib.js";


const createCart = async (username) => {
    try {
      const cart = await cartDao.createCart(username);
  
      return cart;
    } catch (err) {
        logger.error(`Error creating cart: ${err}`);
    }
};

const findCart = async (username) => {
    try {
      const cart = await cartDao.findCart(username);
  
      return cart;
    } catch (err) {
        logger.error(`Error finding cart: ${err}`);
    }
};

const updateCart = async (username, newProduct) => {
    try {
      const cart = await cartDao.updateCart(username, newProduct);
  
      return cart;
    } catch (err) {
        logger.error(`Error updating cart: ${err}`);
    }
};


export const cartService = {
    createCart,
    findCart,
    updateCart
  };