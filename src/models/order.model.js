import { model, Schema } from "mongoose";

const orderSchema = new Schema({
    username: String,
    products: Array,
    orderNumber: Number,
    dateAndTime: String,
    status: String,
 });

export const Order = model("Order", orderSchema);