import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import userController from "../controller/userController.js";

const userRouter = new express.Router();

userRouter.use(authMiddleware);

userRouter.get("/api/auth/user", userController.getUser);
userRouter.patch("/api/auth/user", userController.update);
userRouter.post("/api/auth/user/password", userController.changePassword);

export { userRouter };
