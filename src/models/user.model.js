import { model, Schema } from "mongoose";

const userSchema = new Schema({
  username: String,
  password: String,
  firstname: String,
  lastname: String,
  address: String,
  age: Number,
  phone: Number,
  //photo: Buffer,
});

export const User = model("User", userSchema);