import { FirebaseDao } from "../firebase.dao.js";

export class ProductFirebaseDao extends FirebaseDao {
    constructor() {
        super("products");
    }
}

