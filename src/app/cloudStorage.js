import { Storage } from "@google-cloud/storage";
import { GCP_PROJECT_ID } from "./const.js";

export const storage = new Storage({
	projectId: process.env.GCP_PROJECT_ID || GCP_PROJECT_ID,
});

export const getBucketName = (bucketName) => {
	return storage.bucket(bucketName);
};

export const storagePath = (folderName, fileName) => {
	return `${folderName}/${fileName}`;
};
