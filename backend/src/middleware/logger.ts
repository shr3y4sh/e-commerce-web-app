import { NextFunction, Request, Response } from "express";

export function incomingRequestLog(
    req: Request,
    _res: Response,
    next: NextFunction
): void {
    console.log(`Method: ${req.method}`);
    console.log(`Endpoint: ${req.url}`);
    console.log(`Body: ${req.body}`);

    next();
}
