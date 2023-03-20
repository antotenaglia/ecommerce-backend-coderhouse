 import { model, Schema } from "mongoose";

 const productSchema = new Schema({
   title: String,
   price: Number,
   stock: Number,
   thumbnail: String,
});

export const Product = model("Product", productSchema);