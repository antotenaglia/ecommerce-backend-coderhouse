import mongoose from "mongoose";
import { config } from "../config/config.js";
import { initializeApp } from "firebase-admin/app";
import { cert } from 'firebase-admin/app'
import serviceAccount from '../../pfbackend-1ab7d-firebase-adminsdk-g6pql-03a2cd7685.json' assert { type: "json" };
import { getFirestore } from "firebase/firestore";

let connectDb;

const connectMongo = async (url) => {
  await mongoose.connect(url);
};

const connectFirebase = async () => {
  initializeApp({
    credential: cert(serviceAccount)
  });
};

if (config.database === "MONGO") {
  connectDb = connectMongo;
} else {
  connectDb = connectFirebase;
}

export const db = { connectDb };

