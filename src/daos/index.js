import { config } from "../config/config.js";
import { CartMongoDao } from "./carts/cartMongo.dao.js";
import { ProductMongoDao } from "./products/productMongo.dao.js";

let CartDao;
let ProductDao;

if (config.database === "MONGO") {
    CartDao = CartMongoDao;
    ProductDao = ProductMongoDao;
} else {
    console.log("Error connecting to Mongo Database")
}

export const Daos = { CartDao, ProductDao };