import logger from "../lib/logger.lib.js";
import productsFactoryDao from "../daos/products.factory.dao.js";

const product = await productsFactoryDao.getDAO();

const getProducts = async (req, res) => {
    const { originalUrl, method } = req;
    const username = req.query.username;
    //let productsList = await product.getAllProducts();
    let productsWithQuotes = await product.getProductQuoter();
    
    productsWithQuotes.forEach(element => {
      element.username = username;
    });
    
    if (originalUrl && method) {
        logger.info(`Route ${method} ${originalUrl} implemented`);
        
        return res.render("products", {productsWithQuotes, username});
    }
};
 
const deleteProduct = async (req, res) => {
    try {
        const { originalUrl, method } = req;
        let { id } = req.params;

        if (originalUrl && method) {
            logger.info(`Route ${method} ${originalUrl} implemented`);

            await product.deleteProduct(id);
            
            return res.sendStatus(200);    
        }
    } catch (err) {
        logger.error(`Error deleting Product: ${err}`);
    }
};

const updateProduct = async (req, res) => {
    try {
        const { originalUrl, method } = req;
        let { id } = req.params;
        let { username } = req.query;
        const productToUpdate = {
            title: req.body.title,
            price: req.body.price,
            stock: req.body.stock,
            thumbnail: req.body.thumbnail,
        };

        if (originalUrl && method) {
            logger.info(`Route ${method} ${originalUrl} implemented`);

            await product.updateProduct(productToUpdate, id);
            
            return res.render("productsLoading");    
        }
    } catch (err) {
        logger.error(`Error updating Product: ${err}`);
    }
};

const getProductsLoading = async (req, res) => {
    const { originalUrl, method } = req;
      
    if (originalUrl && method) {
        logger.info(`Route ${method} ${originalUrl} implemented`);
        
        return res.render("productsLoading");
    }
};

const postProductsLoading = async (req, res) => { 
    try {
        const newProduct = {
            id: req.body.id,
            title: req.body.title,
            price: req.body.price,
            stock: req.body.stock,
            thumbnail: req.body.thumbnail,
        };
        
        const createdProduct = await product.createProduct(newProduct); 
        
        return res.render("productsLoading");  
    } catch (err) {
      logger.error(`error while loading product: ${err}`);

      return res.json(`error while loading product: ${err}`);
    }
};

const getProductsUpdating = async (req, res) => {
    const { originalUrl, method } = req;
    let { id } = req.params;
    let { username } = req.params;
      
    if (originalUrl && method) {
        logger.info(`Route ${method} ${originalUrl} implemented`);
        
        return res.render("productsUpdating", {id, username});
    }
};

export const productsController = {
    getProducts,
    deleteProduct,
    updateProduct,
    getProductsLoading,
    postProductsLoading,
    getProductsUpdating
};