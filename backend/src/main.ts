import express from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { incomingRequestLog } from "./middleware/logger.js";

const app = express();

app.use(helmet());

app.use(express.json());
app.use(cookieParser());

app.use(incomingRequestLog);

app.get("/hello", (_req, res) => {
    res.status(200).send("Hello");
});

export default app;
