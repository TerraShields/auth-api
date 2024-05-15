import { userRegisterValidation } from "../validation/userValidation.js";
import { validation } from "../validation/validation.js";
import { ResponseError } from "../error/responseError.js";
import { prismaClient } from "../app/database.js";
import bcrypt from "bcrypt";
import { nanoid } from "nanoid";

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

export default { register };
