import mongoose from "mongoose";

const connectMongo = async (url) => {
  await mongoose.connect(url);
};

export const db = {connectMongo};

