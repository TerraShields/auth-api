import { prismaClient } from "../app/database.js";
import { validateToken } from "../app/tokenHandler.js";

export const authMiddleware = async (req, res, next) => {
	let token = req.headers.authorization;

	if (!token) {
		res
			.status(401)
			.json({
				errors: "Unauthorize",
			})
			.end();
	} else {
		token = token.split(" ")[1];
		const validate = validateToken(token);

		const user = await prismaClient.user.findUnique({
			where: {
				user_id: validate.user_id,
			},
			select: {
				user_id: true,
				name: true,
				email: true,
			},
		});

		if (!user) {
			res
				.status(401)
				.json({
					errors: "Unauthorize",
				})
				.end();
		} else {
			req.user = user;
			next();
		}
	}
};
