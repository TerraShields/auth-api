import { Firestore } from "@google-cloud/firestore";
import { GCP_PROJECT_ID } from "./const.js";
import dotenv from "dotenv";
dotenv.config();

const firestore = new Firestore({
	projectId: process.env.GCP_PROJECT_ID || GCP_PROJECT_ID,
});

export const userCollection = firestore.collection("users");

export const reportCollection = firestore.collection("reports");

export const deletedReportCollection = firestore.collection("deleted_reports");
