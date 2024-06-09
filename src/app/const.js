import dotenv from "dotenv";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

dotenv.config({ path: `${__dirname}/../../.env` });

export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRES = process.env.JWT_EXPIRES;

export const GCP_PROJECT_ID = process.env.GCP_PROJECT_ID;
export const GCP_BUCKET_FOLDER = process.env.GCP_BUCKET_FOLDER;
export const GCP_BUCKET_NAME = process.env.GCP_BUCKET_NAME;
export const GCP_REPORT_BUCKET_FOLDER = process.env.GCP_REPORT_BUCKET_FOLDER;

export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
