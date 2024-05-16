import userService from "../service/userService.js";

const register = async (req, res, next) => {
	try {
		req = req.body;
		const result = await userService.register(req);
		res.status(201).json({
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
			data: result,
		});
	} catch (error) {
		next(error);
	}
};

export default { register, login };
