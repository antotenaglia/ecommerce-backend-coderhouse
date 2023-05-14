import { model, Schema } from "mongoose";

const userSchema = new Schema({
    username: String,
    password: String,
    firstname: String,
    lastname: String,
    phone: Number,
    photo: Buffer,
    city: String,
    address: String,
});

export const User = model("User", userSchema);