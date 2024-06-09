import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import userController from "../controller/userController.js";
import { imageHandler } from "../app/imageHandler.js";

const userRouter = new express.Router();

userRouter.use(authMiddleware);

userRouter.get("/api/auth/user", userController.getUser);
userRouter.post("/api/auth/user/password", userController.changePassword);

userRouter.use(imageHandler);
userRouter.patch("/api/auth/user", userController.update);

export { userRouter };
