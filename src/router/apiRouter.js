import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import userController from "../controller/userController.js";

const userRouter = new express.Router();

userRouter.use(authMiddleware);

userRouter.get("/api/user", userController.getUser);
userRouter.put("/api/user", userController.getUser);
userRouter.patch("/api/user", userController.update);

export { userRouter };
