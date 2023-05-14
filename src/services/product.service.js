import { productDao } from "../daos/index.js";
import logger from "../lib/logger.lib.js";


const createProduct = async (newProduct) => {
    try {
      const product = await productDao.createProduct(newProduct);
  
      return product;
    } catch (err) {
        logger.error(`Error creating product: ${err}`);
    };
};

const getAllProducts = async () => {
    try {
      const product = await productDao.getAllProducts();
  
      return product;
    } catch (err) {
        logger.error(`Error finding all products: ${err}`);
    };
};

const getProductById = async (_idProduct) => {
  try {
    const product = await productDao.getProductById(_idProduct);

    return product;
  } catch (err) {
      logger.error(`Error getting product by id: ${err}`);
  };
};

const getProductsByCategory = async (category) => {
  try {
    const product = await productDao.getProductsByCategory(category);

    return product;
  } catch (err) {
      logger.error(`Error getting product by category: ${err}`);
  };
};

const deleteProduct = async (_idproduct) => {
    try {
      const product = await productDao.deleteProduct(_idproduct);

      return product;
    } catch (err) {
        logger.error(`Error deleting product: ${err}`);
    };
};

const updateProduct = async (_idproduct, productToUpdate) => {
  try {
    const product = await productDao.updateProduct(_idproduct, productToUpdate);

    return product;
  } catch (err) {
      logger.error(`Error updating product: ${err}`);
  };
};


export const productService = {
    createProduct,
    getAllProducts,
    getProductById,
    getProductsByCategory,
    deleteProduct,
    updateProduct,
  };