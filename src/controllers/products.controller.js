import { dirname, join } from "path";
import { fileURLToPath } from "url";
import logger from "../lib/logger.lib.js";
import productsContainer from "../container/products.container.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getProducts = async (req, res) => {
    const { originalUrl, method } = req;
    const username = req.query.username;
    const products = new productsContainer(join(__dirname, "../../products.txt")); 
    let productsList = await products.getAllProducts();
    
    productsList.forEach(element => {
      element.username = username;
    });
    
    if (originalUrl && method) {
        logger.info(`Route ${method} ${originalUrl} implemented`);
        
        return res.render("products", {productsList, username});
    }
};
  
const getProductsLoading = async (req, res) => {
    const { originalUrl, method } = req;
    const username = req.query.username;
      
    if (originalUrl && method) {
        logger.info(`Route ${method} ${originalUrl} implemented`);
        
        return res.render("productsLoading", {username});
    }
};

export const productsController = {
    getProducts,
    getProductsLoading
};