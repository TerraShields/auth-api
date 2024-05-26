import jwt from "jsonwebtoken";
import dotenv from "dotenv";

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
