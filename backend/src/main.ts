import express, { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import cors from "cors";
import { errorHandler } from "./middleware/errorHandle.js";
import { NotFoundError } from "./utilities/errorClasses.js";

config();

const port = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/hello", (_req: Request, res: Response) => {
    res.status(200).send("Hello World!");
});

app.use((_req: Request, _res: Response, next: NextFunction) => {
    next(new NotFoundError("Not found"));
});

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
