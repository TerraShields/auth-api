import jwt from "jsonwebtoken";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

export const generateToken = (user_id) => {
	return jwt.sign({ user_id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES,
	});
};

export const validateToken = (token) => {
	token = jwt.verify(token, process.env.JWT_SECRET);
	return token;
};
