import { MongoDao } from "../mongo.dao.js";
import { model, Schema } from "mongoose";

const cartSchema = new Schema({
    timestamp: { type: String, required: true },
    products: { type: Array, required: true },
});

const Carts = model("carts", cartSchema);
  
export class CartMongoDao extends MongoDao {
    constructor() {
        super(Carts);
    }
}

