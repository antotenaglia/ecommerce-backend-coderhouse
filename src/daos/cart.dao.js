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

        let newArray = [];

        cart.products.forEach(function (item, index) {
          if(item._idProduct !== newProduct._idProduct){
            newArray.push(item);
          }
        });

        newArray.push(newProduct);

        cart.products = newArray;
        
        const updatedCart = await Cart.findByIdAndUpdate(cart._id, {products: cart.products});
        
        return updatedCart;
      } catch (err) {
        logger.error(`Error updating cart: ${err}`);
      }  
};

const deleteCart = async (_idCart) => {
    try {
        const deletedCart = await Cart.deleteOne({ _id: _idCart });
            
        return deletedCart;
      } catch (err) {
        logger.error(`Error deleting cart: ${err}`);
      }  
};

const deleteProductInCart = async (_idCart, _idProduct) => {
    try {
        const cart = await Cart.findOne({ _id: _idCart });
        const productToDelete = cart.products.find(element => element._idProduct === _idProduct);
        const indexOfProductToDelete = cart.products.indexOf(productToDelete);
        const productsDeleted = cart.products.splice(indexOfProductToDelete, 1);        
        const deletedProductInCart = await Cart.findByIdAndUpdate(cart._id, {products: cart.products});
        
        return deletedProductInCart;
      } catch (err) {
        logger.error(`Error deleting product in cart: ${err}`);
      }  
};

export const cartDao = {
    createCart,
    findCart,
    updateCart,
    deleteCart,
    deleteProductInCart,
};