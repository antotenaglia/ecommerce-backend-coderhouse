import { MongoDao } from "../mongo.dao.js";

export class CartMongoDao extends MongoDao {
  constructor() {
      super("carts", {
          timestamp: { type: String, required: true },
          products: { type: Array, required: true },
      });
  }
}
