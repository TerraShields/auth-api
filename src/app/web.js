import express from "express";
import { publicRouter } from "../router/PublicRouter.js";
import { errorMiddleware } from "../middleware/ErrorMiddleware.js";

const app = express();

app.use(express.json());

app.use(publicRouter);

app.use(errorMiddleware);

export { app };
