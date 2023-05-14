import logger from "../lib/logger.lib.js";
import { productService } from "../services/index.js";

const getProducts = async (req, res) => {
    const { originalUrl, method } = req;
    const username = req.query.username;
    let productsList = await  productService.getAllProducts();
    let categoriesList = [];
    
    productsList.forEach(element => {
        element.username = username;
    });
   
    if (originalUrl && method) {
        logger.info(`Route ${method} ${originalUrl} implemented`);
        
        for (let i = 0; i < productsList.length; i++) {
            categoriesList.push(productsList[i].category);
        }; 
   
        categoriesList = [...new Set(categoriesList)];

        let categories = [];

        categoriesList.forEach((value) => {
            categories.push({username, value});
        });
        
        return res.render("products", {productsList, categories, username});
    }
};

const getProductsById = async (req, res) => {
    const { originalUrl, method } = req;
    const username = req.query.username;
    let { _id } = req.params;
    let product = await productService.getProductById(_id);

    if (originalUrl && method && product) {
        logger.info(`Route ${method} ${originalUrl} implemented`);
        
        return res.render("product", {product, username});
    } else {
        return res.render("productError");
    }
};

const getProductsByCategory = async (req, res) => {
    const { originalUrl, method } = req;
    const username = req.query.username;
    const { category } = req.params;
    const productsList = await  productService.getProductsByCategory(category);

    productsList.forEach(element => {
        element.username = username;
    });
    
    if (originalUrl && method && productsList) {
        logger.info(`Route ${method} ${originalUrl} implemented`);

        return res.render("products", {productsList, username, category});
    } else {
        return res.render("productError");
    }
};
 
const deleteProduct = async (req, res) => {
    try {
        const { originalUrl, method } = req;
        let { _id } = req.params;
        
        if (originalUrl && method) {
            logger.info(`Route ${method} ${originalUrl} implemented`);

            await productService.deleteProduct(_id);
            
            return res.sendStatus(200);    
        }
    } catch (err) {
        logger.error(`Error deleting Product: ${err}`);
    }
};

const updateProduct = async (req, res) => {
    try {
        const { originalUrl, method } = req;
        let { _id } = req.params;
        const productToUpdate = {
            title: req.body.title,
            price: req.body.price,
            thumbnail: req.body.thumbnail,
            category: req.body.category,
            description: req.body.description,
        };

        if (originalUrl && method) {
            logger.info(`Route ${method} ${originalUrl} implemented`);

            await productService.updateProduct(_id, productToUpdate);

            return res.sendStatus(200);    
        };
    } catch (err) {
        logger.error(`Error updating Product: ${err}`);
    };
};

const getProductsLoading = async (req, res) => {
    const { originalUrl, method } = req;
    try { 
        if (originalUrl && method) {
            logger.info(`Route ${method} ${originalUrl} implemented`);
            
            return res.render("productsLoading");
        };
    } catch (err) {
        logger.error(`Error getting products loading: ${err}`);
    };
};

const postProductsLoading = async (req, res) => { 
    try {
        const newProduct = {
            title: req.body.title,
            price: req.body.price,
            thumbnail: req.body.thumbnail,
            category: req.body.category,
            description: req.body.description,
        };
        
        await productService.createProduct(newProduct); 
        
        return res.render("productsLoading");  
    } catch (err) {
      logger.error(`Error while loading product: ${err}`);

      return res.json(`Error while loading product: ${err}`);
    };
};

const getProductsUpdating = async (req, res) => {
    try {
        const { originalUrl, method } = req;
        let { username } = req.params;
        
        if (originalUrl && method) {
            logger.info(`Route ${method} ${originalUrl} implemented`);
            
            return res.render("productsUpdating", {username});
        };
    } catch (err) {
        logger.error(`Error getting products updating: ${err}`);
    };
};

export const productsController = {
    getProducts,
    getProductsById,
    getProductsByCategory,
    deleteProduct,
    updateProduct,
    getProductsLoading,
    postProductsLoading,
    getProductsUpdating
};