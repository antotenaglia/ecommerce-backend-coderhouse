 import { model, Schema } from "mongoose";

 const productSchema = new Schema({ 
    title: String,
    price: Number,
    thumbnail: String,
    category: String, 
    description: String,
});

export const Product = model("Product", productSchema);