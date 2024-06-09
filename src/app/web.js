import express from "express";
import { publicRouter } from "../router/publicRouter.js";
import { errorMiddleware } from "../middleware/errorMiddleware.js";
import { userRouter } from "../router/authRouter.js";
import { reportRouter } from "../router/reportRouter.js";

const app = express();

app.use(express.json());

app.use(publicRouter);
app.use(userRouter);
app.use(reportRouter);

app.use(errorMiddleware);

export { app };
