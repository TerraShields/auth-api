import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import reportController from "../controller/reportController.js";

const reportRouter = new express.Router();

reportRouter.use(authMiddleware);

reportRouter.get("/api/report", reportController.getListReport);
reportRouter.post("/api/report", reportController.storeReport);

export { reportRouter };
