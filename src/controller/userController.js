import userService from "../service/userService.js";

const register = async (req, res, next) => {
	try {
		req = req.body;
		const result = await userService.register(req);
		res.status(201).json({
			message: "success",
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

const login = async (req, res, next) => {
	try {
		req = req.body;
		const result = await userService.login(req);
		res.status(200).json({
			message: "success",
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

const getUser = async (req, res, next) => {
	try {
		res.status(200).json({
			data: req.user,
		});
	} catch (error) {
		next(error);
	}
};

const update = async (req, res, next) => {
	try {
		const userId = req.user[0].user_id;
		req = req.body;
		const result = await userService.update(userId, req);
		res.status(200).json({
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

const changePassword = async (req, res, next) => {
	try {
		const userId = req.user[0].user_id;
		req = req.body;
		const result = await userService.changePassword(userId, req);
		res.status(200).json({
			message: "Success update password",
		});
	} catch (error) {
		next(error);
	}
};

export default { register, login, getUser, update, changePassword };
