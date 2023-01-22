import { db } from "../../db/db.js";
import { getFirestore } from 'firebase-admin/firestore';
import { FirebaseDao } from "../firebase.dao.js";

const Products = async () => {
    getFirestore(db.connectDb)
}

export class ProductFirebaseDao extends FirebaseDao {
    constructor() {
        super(Products, "products");
    }
}

