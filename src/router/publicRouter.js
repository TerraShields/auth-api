import express from "express";
import userController from "../controller/userController.js";

const publicRouter = new express.Router();

publicRouter.post("/api/register", userController.register);

export { publicRouter };
