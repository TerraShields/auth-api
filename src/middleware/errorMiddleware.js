import { ResponseError } from "../error/responseError.js";

const errorMiddleware = (err, req, res, next) => {
	if (!err) {
		next();
		return;
	}

	if (Error instanceof ResponseError) {
		res
			.status(err.status)
			.json({
				errors: err.message,
			})
			.end();
	} else {
		res
			.status(500)
			.json({
				errors: err.message,
			})
			.end();
	}
};

export { errorMiddleware };
