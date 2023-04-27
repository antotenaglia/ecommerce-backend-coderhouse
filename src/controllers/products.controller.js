import logger from "../lib/logger.lib.js";
//import productsFactoryDao from "../daos/products.factory.dao.js";
import { Product } from "../models/product.model.js";

//const product = await productsFactoryDao.getDAO();

const getProducts = async (ctx) => {
    const username = ctx.query.username;
    const products = await Product.find().lean();
    
    products.forEach(element => {
      element.username = username;
    });
    
    if (ctx.method && ctx.originalUrl) {
        logger.info(`Route ${ctx.method} ${ctx.originalUrl} implemented`);
        
        return ctx.render("products", { products, username });
    }
};
 
const deleteProduct = async (ctx) => {
    try {
        let { id } = ctx.params;

    if (ctx.method && ctx.originalUrl) {
        logger.info(`Route ${ctx.method} ${ctx.originalUrl} implemented`);

            const deletedProduct = await Product.deleteOne({ id: id });
            
            ctx.response.status = 200;

            // ctx.body = {
            //     data: deletedProduct,
            // };
        }
    } catch (err) {
        logger.error(`Error deleting Product: ${err}`);
    }
};

const updateProduct = async (ctx) => {
    try {
        let { id } = ctx.params;
        const { title, price, stock, thumbnail } = ctx.request.body;

        if (ctx.method && ctx.originalUrl) {
            logger.info(`Route ${ctx.method} ${ctx.originalUrl} implemented`);

            const updatedProduct = await Product.updateOne({ id: id }, { title, price, stock, thumbnail });
            
            ctx.render("productsLoading");    
        }
    } catch (err) {
        logger.error(`Error updating Product: ${err}`);
    }
};

const getProductsLoading = async (ctx) => {   
    if (ctx.method && ctx.originalUrl) {
        logger.info(`Route ${ctx.method} ${ctx.originalUrl} implemented`);
        
        ctx.render("productsLoading");
    }
};

const postProductsLoading = async (ctx) => { 
    try {
        const { id, title, price, stock, thumbnail } = ctx.request.body;
        const createdProduct = await Product.create({ id, title, price, stock, thumbnail }); 

        if (ctx.method && ctx.originalUrl) {
            logger.info(`Route ${ctx.method} ${ctx.originalUrl} implemented`);
            ctx.render("productsLoading");  
        }
    } catch (err) {
        logger.error(`Error while loading product: ${err}`);

        ctx.body = { 
            data: `Error while loading product: ${err}`,
        };
    }
};

const getProductsUpdating = async (ctx) => {
    let { id } = ctx.params;
    let { username } = ctx.params;
      
    if (ctx.method && ctx.originalUrl) {
        logger.info(`Route ${ctx.method} ${ctx.originalUrl} implemented`);
        
        ctx.render("productsUpdating", {id, username});
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