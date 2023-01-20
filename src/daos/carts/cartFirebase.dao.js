import { FirebaseDao } from "../firebase.dao.js";

export class CartFirebaseDao extends FirebaseDao {
    constructor() {
      super("carts");
    }
}



