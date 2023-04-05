import logger from "../lib/logger.lib.js";
import ProductDTO from "../dto/product.dto.js";
import getCurrencyPrice from "../utils/quoter.js";

export default class productsMongo {
    constructor(collection) {
        this.collection = collection;
    }

    async createProduct (newProduct) {
        try {
            const product = await this.collection.create(newProduct);
            
            return product;
        } catch (err) {
            logger.error(`Error creating product in mongo: ${err}`);
        }   
    };

    async getAllProducts () {
        try {
            const product = await this.collection.find().lean();
        
            return product;
        } catch (err) {
            logger.error(`Error finding product in mongo: ${err}`);
        }  
    };

    async getProductQuoter() {
        try {
            const product = await this.collection.find().lean();
            const response = product.map((product) => {
                const currencies = {
                    usdPrice: getCurrencyPrice(product.price, "USD"),
                    arsPrice: getCurrencyPrice(product.price, "ARS"),
                };

                return new ProductDTO(product, currencies);
            });

            return response;
        } catch (err) {
            logger.error(`Error getting product quoter: ${err}`);
        }
    }
};

