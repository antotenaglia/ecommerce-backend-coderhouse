// import productsMongo from "./products.dao.js";
// import productsFile from "./products.file.js";
// import { config } from "../config/config.js";
// import { dirname, join } from "path";
// import { fileURLToPath } from "url";
// import { Product } from "../models/product.model.js";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
// let dao;

// switch (config.database) {
//     case 'MONGO': 
//         dao = new productsMongo(Product);

//         break;
//     case 'FILE':
//         dao = new productsFile(join(__dirname, "../../files/products.txt"));

//         break;
// };

// class productsFactoryDao {
//     static getDAO() {
//         return dao
//     };
// };

// export default productsFactoryDao; 

