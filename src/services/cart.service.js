import { cartDao } from "../daos/index.js";
import logger from "../lib/logger.lib.js";


const createCart = async (username) => {
    try {
      const cart = await cartDao.createCart(username);
  
      return cart;
    } catch (err) {
        logger.error(`Error creating cart: ${err}`);
    };
};

const findCart = async (username) => {
    try {
      const cart = await cartDao.findCart(username);
  
      return cart;
    } catch (err) {
        logger.error(`Error finding cart: ${err}`);
    };
};

const updateCart = async (username, newProduct) => {
    try {
      const cart = await cartDao.updateCart(username, newProduct);
  
      return cart;
    } catch (err) {
        logger.error(`Error updating cart: ${err}`);
    };
};

const deleteCart = async (_idCart) => {
    try {
      const cart = await cartDao.deleteCart(_idCart);

      return cart;
    } catch (err) {
        logger.error(`Error deleting cart: ${err}`);
    };
};

const deleteProductInCart = async (_idCart, _idProduct) => {
    try {
      const cart = await cartDao.deleteProductInCart(_idCart, _idProduct);

      return cart;
    } catch (err) {
        logger.error(`Error deleting product in cart: ${err}`);
    };
};

export const cartService = {
    createCart,
    findCart,
    updateCart,
    deleteCart, 
    deleteProductInCart,
  };