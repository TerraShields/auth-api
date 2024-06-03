import express from "express";
import userController from "../controller/userController.js";

const publicRouter = new express.Router();

publicRouter.post("/api/auth/register", userController.register);
publicRouter.post("/api/auth/login", userController.login);

publicRouter.get("/api/auth/google", userController.googleAuth);
publicRouter.get(
	"/api/auth/google/callback",
	userController.googleAuthCallback
);

export { publicRouter };
