import mongoose from "mongoose";
import logger from "../lib/logger.lib.js";

export default class mongoDB {
  constructor(mongoURL) {
    this.client = mongoose;
    this.mongoURL = mongoURL;
  }

  async connect() {
    try {
      await this.client.connect(this.mongoURL);

      logger.info("MongoDB connected for products");
    } catch (err) {
      logger.error(`Error connecting MongoDB for products: ${err}`);
    }
  }
}
