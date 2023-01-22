import { MongoDao } from "../mongo.dao.js";
import { model, Schema } from "mongoose";

const productSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    thumbnail: { type: String, required: true },
});

const Products = model("products", productSchema);
  
export class ProductMongoDao extends MongoDao {
    constructor() {
        super(Products);
    }
}

