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
import { Storage } from "@google-cloud/storage";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const defaultImage =
	"https://storage.googleapis.com/capstone-bucket-bangkit-2024/users_image/user-default-image.png";

const register = async (req) => {
	req = validation(userRegisterValidation, req);

	const userCheck = await userCollection.where("email", "==", req.email).get();

	if (!userCheck.empty) {
		throw new ResponseError(400, "Email already use");
	}

	req.user_id = `user-${uuid()}`;
	req.password = await bcrypt.hash(req.password, 10);
	req.address = "";
	req.image = defaultImage;
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

const update = async (userId, req, file) => {
	req = validation(userUpdateValidation, req);

	if (req.name) {
		await userCollection.doc(userId).update({
			name: req.name,
		});
	}

	if (req.address) {
		await userCollection.doc(userId).update({
			address: req.address,
		});
	}

	if (req.email) {
		const checkEmail = await userCollection
			.where("email", "==", req.email)
			.get();

		if (checkEmail.empty) {
			await userCollection.doc(userId).update({
				email: req.email,
			});
		} else {
			throw new ResponseError(400, "Email already use");
		}
	}

	if (file !== undefined) {
		const storage = new Storage({ projectId: process.env.GCP_PROJECT_ID });
		const bucketName = process.env.GCP_BUCKET_NAME;
		const filePath = file.path;
		const fileName = file.filename;

		// store to buckets
		const gcs = storage.bucket(bucketName);
		const storagepath = `${process.env.GCP_BUCKET_FOLDER}/${fileName}`;
		await gcs.upload(filePath, {
			destination: storagepath,
			predefinedAcl: "publicRead",
			metadata: {
				contentType: file.mimetype,
			},
		});
		// end

		let user = await userCollection.where("user_id", "==", userId).get();

		user = user.docs.map((doc) => {
			return doc.data();
		});

		let image = user[0].image;
		image = image.split("/");
		const imageLength = image.length - 1;
		const oldUserImage = image[imageLength];

		if (oldUserImage !== "user-default-image.png") {
			await gcs
				.file(`${process.env.GCP_BUCKET_FOLDER}/${oldUserImage}`)
				.delete();
		}

		fs.unlink(`${filePath}`, (err) => {
			if (err) throw new ResponseError(err.status, err.message);
		});

		await userCollection.doc(userId).update({
			image: `https://storage.googleapis.com/${process.env.GCP_BUCKET_NAME}/${process.env.GCP_BUCKET_FOLDER}/${fileName}`,
		});
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
