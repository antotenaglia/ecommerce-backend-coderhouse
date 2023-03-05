import dotenv from "dotenv";

dotenv.config();

export const config = {
  mongoUrl: process.env.MONGOURL,
  mongoSecret: process.env.MONGOSECRET,
  nodeEnv: process.env.NODE_ENV,
};