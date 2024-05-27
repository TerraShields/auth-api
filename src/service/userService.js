import {
	changePasswordValidation,
	userLoginValidation,
	userRegisterValidation,
	userUpdateValidation,
} from "../validation/userValidation.js";
import { validation } from "../validation/validation.js";
import { ResponseError } from "../error/responseError.js";
import bcrypt from "bcrypt";
import { generateToken } from "../app/tokenHandler.js";
import { userCollection } from "../app/firestore.js";
import { v4 as uuid } from "uuid";

const register = async (req) => {
	req = validation(userRegisterValidation, req);

	const userCheck = await userCollection.where("email", "==", req.email).get();

	if (!userCheck.empty) {
		throw new ResponseError(400, "Email already use");
	}

	req.user_id = `user-${uuid()}`;
	req.password = await bcrypt.hash(req.password, 10);
	req.address = "";
	req.image = "";
	delete req.password_confirmation;

	await userCollection.doc(req.user_id).set(req);
	const getUser = await userCollection
		.where("user_id", "==", req.user_id)
		.get();

	const data = getUser.docs.map((doc) => {
		const { email, name, user_id } = doc.data();
		return { email, name, user_id };
	});

	return data[0];
};

const login = async (req) => {
	req = validation(userLoginValidation, req);

	let getUser = await userCollection
		.where("email", "==", req.email)
		.limit(1)
		.get();

	if (getUser.empty) {
		throw new ResponseError(401, "Email or password wrong");
	}

	getUser = getUser.docs[0].data();

	const isPasswordValid = await bcrypt.compare(req.password, getUser.password);

	if (!isPasswordValid) {
		throw new ResponseError(401, "Email or password wrong");
	}

	const token = generateToken(getUser.user_id);

	return {
		token,
	};
};

const update = async (userId, req) => {
	req = validation(userUpdateValidation, req);

	let data = {};

	const user = await userCollection.doc(userId).get();

	if (req.name) {
	}
};

const changePassword = async (userId, req) => {
	req = validation(changePasswordValidation, req);

	req.password = await bcrypt.hash(req.password, 10);

	await userCollection.doc(userId).update({
		password: req.password,
	});
};

export default { register, login, update, changePassword };
