import { NextFunction, Request, Response } from "express";
import { HttpError } from "../utilities/errorClasses.js";

export async function errorHandler(
    err: Error | HttpError,
    _req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _next: NextFunction
): Promise<void> {
    const statusCode = err instanceof HttpError ? err.statusCode : 500;

    console.log(err);
    res.status(statusCode).json(err);
}
