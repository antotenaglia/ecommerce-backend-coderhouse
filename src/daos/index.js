import { config } from "../config/config.js";
import { CartMongoDao } from "./carts/cartMongo.dao.js";
import { CartFirebaseDao } from "./carts/cartFirebase.dao.js";
import { ProductMongoDao } from "./products/productMongo.dao.js";
import { ProductFirebaseDao } from "./products/productFirebase.dao.js";

let CartDao;
let ProductDao;

if (config.database === "MONGO") {
    CartDao = CartMongoDao;
    ProductDao = ProductMongoDao;
} else {
    CartDao = CartFirebaseDao;
    ProductDao = ProductFirebaseDao;
}

export const Daos = { CartDao, ProductDao };