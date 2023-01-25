import { Daos } from "../daos/index.js";
import { ProductMongoDao } from "../daos/products/productMongo.dao.js";

const Product = new Daos.ProductDao(ProductMongoDao);

const getAllProducts = async (req, res) => {
  try {
    const response = await Product.getAll();
    res.json(response);
  } catch (err) {
    throw new Error(err);
  }
};

const createProduct = async (req, res) => {
    try {
      const response = await Product.create(req.body);
  
      res.json(response);
    } catch (err) {
      throw new Error(err);
    }
};

const getProductById = async (req, res) => {
    try {
      const response = await Product.getById(req.params._id);
  
      res.json(response);
    } catch (err) {
      throw new Error(err);
    }
};

const updateProductById = async (req, res) => {
    try {
      const response = await Product.update(req.body, req.params._id);
  
      res.json(response);
    } catch (err) {
      throw new Error(err);
    }
};

const deleteProductById = async (req, res) => {
    try {
      const response = await Product.delete(req.params._id);
  
      res.json(response);
    } catch (err) {
      throw new Error(err);
    }
};

export const productController = { getAllProducts, createProduct, getProductById, updateProductById,deleteProductById };