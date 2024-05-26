import { Firestore } from "@google-cloud/firestore";

const firestore = new Firestore();

export const userCollection = firestore.collection("users");
