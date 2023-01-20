import { MongoDao } from "../mongo.dao.js";

export class ProductMongoDao extends MongoDao {
    constructor() {
        super("products", {
            name: { type: String, required: true },
            price: { type: Number, required: true },
            thumbnail: { type: String, required: true },
        });
    }
}

