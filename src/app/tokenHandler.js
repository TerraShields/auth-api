import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { JWT_EXPIRES, JWT_SECRET } from "./const.js";

dotenv.config();

export const generateToken = (user_id) => {
	return jwt.sign({ user_id }, process.env.JWT_SECRET || JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES || JWT_EXPIRES,
	});
};

export const validateToken = (token) => {
	token = jwt.verify(token, process.env.JWT_SECRET || JWT_SECRET);
	return token;
};
