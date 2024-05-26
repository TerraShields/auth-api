import express from "express";
import { publicRouter } from "../router/PublicRouter.js";
import { errorMiddleware } from "../middleware/ErrorMiddleware.js";
import { userRouter } from "../router/authRouter.js";

const app = express();

app.use(express.json());

app.use(publicRouter);
app.use(userRouter);

app.use(errorMiddleware);

export { app };
