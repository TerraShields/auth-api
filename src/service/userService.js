import {
	userLoginValidation,
	userRegisterValidation,
} from "../validation/userValidation.js";
import { validation } from "../validation/validation.js";
import { ResponseError } from "../error/responseError.js";
import { prismaClient } from "../app/database.js";
import bcrypt from "bcrypt";
import { nanoid } from "nanoid";
import { generateToken } from "../app/generateToken.js";

const register = async (req) => {
	req = validation(userRegisterValidation, req);

	const userCheck = await prismaClient.user.findUnique({
		where: {
			email: req.email,
		},
	});

	if (userCheck !== null) {
		throw new ResponseError(400, "Email already use");
	}

	req.password = await bcrypt.hash(req.password, 10);
	const userId = `user_${nanoid(16)}`;

	return prismaClient.user.create({
		data: {
			user_id: userId,
			email: req.email,
			name: req.name,
			password: req.password,
		},
		select: {
			user_id: true,
			name: true,
			email: true,
		},
	});
};

const login = async (req) => {
	req = validation(userLoginValidation, req);

	const getUser = await prismaClient.user.findUnique({
		where: {
			email: req.email,
		},
		select: {
			user_id: true,
			email: true,
			password: true,
		},
	});

	if (!getUser) {
		throw new ResponseError(401, "Username or password wrong");
	}

	const isPasswordValid = await bcrypt.compare(req.password, getUser.password);

	if (!isPasswordValid) {
		throw new ResponseError(401, "Username or password wrong");
	}

	const token = generateToken(getUser.user_id);

	return {
		token,
	};
};

export default { register, login };
