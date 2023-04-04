import mongoDB from "./products.mongoDB.js";
import productsFile from "./products.file.js";
import { config } from "../config/config.js";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
let dao;

switch (config.db) {
    case 'MONGO': 
        dao = new mongoDB(config.mongoUrl);

        break;
    case 'FILE':
        dao = new productsFile(join(__dirname, "../../products.txt"));

        break;
}

class productsFactoryDao {
    static getDAO() {
        return dao
    }
}

export default productsFactoryDao; 

