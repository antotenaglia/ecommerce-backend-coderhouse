import { Product } from "../models/product.model.js";
import logger from "../lib/logger.lib.js";

const createProduct = async (newProduct) => {
    try {
        const product = await Product.create(newProduct);
        
        return product;
    } catch (err) {
        logger.error(`Error creating product in mongo: ${err}`);
    };   
};

const getAllProducts = async () => {
    try {
        const product = await Product.find().lean();
    
        return product;
    } catch (err) {
        logger.error(`Error finding product in mongo: ${err}`);
    };  
};

const getProductById = async (_id) => {
    try {
        const product = await Product.findOne({ _id: _id }).lean();
    
        return product;
    } catch (err) {
        logger.error(`Error getting product by Id in mongo: ${err}`);
    };  
};

const getProductsByCategory = async (category) => {
    try {

        const products = await Product.find({ category: category }).lean();
        
        return products;
    } catch (err) {
        logger.error(`Error getting product by category in mongo: ${err}`);
    };  
};

const deleteProduct = async (_id) => {
    try {
        const product = await Product.deleteOne({ _id: _id });
    
        return product;
    } catch (err) {
        logger.error(`Error deleting product in mongo: ${err}`);
    };  
};

const updateProduct = async (_id, productToUpdate) => {
    try {
        const product = await Product.updateOne({ _id: _id }, productToUpdate);
        
        return product;
    } catch (err) {
        logger.error(`Error updating product in mongo: ${err}`);
    };  
};

export const productDao = {
    createProduct,
    getAllProducts,
    getProductById,
    getProductsByCategory,
    deleteProduct,
    updateProduct
};

