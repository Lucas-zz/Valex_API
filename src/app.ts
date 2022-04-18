import cors from "cors";
import 'express-async-errors';
import express, { json, Request, Response, NextFunction } from "express";

import router from "./routers/cardRouter.js";
import errorHandlerMiddleware from "./middlewares/errorHandlerMiddleware.js";

const app = express();

app.use(cors());
app.use(json());
app.use(router);
app.use(errorHandlerMiddleware);

export default app;