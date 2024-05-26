import { userCollection } from "../app/firestore.js";
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
		try {
			const validate = validateToken(token);

			let user = await userCollection
				.where("user_id", "==", validate.user_id)
				.get();

			user = user.docs.map((doc) => {
				return doc.data();
			});
			if (user.empty) {
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
		} catch (error) {
			next(error);
		}
	}
};
