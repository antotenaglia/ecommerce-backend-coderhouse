import { Daos } from "../daos/index.js";
import { CartMongoDao } from "../daos/carts/cartMongo.dao.js";

const Cart = new Daos.CartDao(CartMongoDao);

const getAllCarts = async (req, res) => {
  try {
    const response = await Cart.getAll();

    res.json(response);
  } catch (err) {
    throw new Error();
  }
};

const createCart = async (req, res) => {
    try {
      const response = await Cart.create(req.body);
  
      res.json(response);
    } catch (err) {
      throw new Error();
    }
};

const getCartById = async (req, res) => {
    try {
      const response = await Cart.getById(req.params._id);
  
      res.json(response);
    } catch (err) {
      throw new Error();
    }
};

const updateCartById = async (req, res) => {
    try {
      const response = await Cart.update(req.body, req.params._id);
  
      res.json(response);
    } catch (err) {
      throw new Error();
    }
};

const deleteCartById = async (req, res) => {
    try {
      const response = await Cart.delete(req.params._id);
  
      res.json(response);
    } catch (err) {
      throw new Error();
    }
};

export const cartController = { getAllCarts, createCart, getCartById, updateCartById,deleteCartById };