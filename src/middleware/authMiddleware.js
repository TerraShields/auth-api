import { ResponseError } from "../error/responseError";

export const authMiddleware = (req, res, next) => {
	const token = req.headers.authorization;

	if (!token) {
		res
			.status(401)
			.json({
				errors: "Unauthorize",
			})
			.end();
	}
};
