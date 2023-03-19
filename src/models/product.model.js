import { model, Schema } from "mongoose";

const productSchema = new Schema({
  title: String,
  thumbnail: String,
  price: Number,
});

export const Product = model("Product", productSchema);