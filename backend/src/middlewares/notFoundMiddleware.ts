import { NextFunction, Request , Response } from "express";
import { StatusCodes } from "http-status-codes";

const notFoundMiddleware = (req: Request, res: Response,next : NextFunction) => {
    res.status(StatusCodes.NOT_FOUND).send("Route does not exist");
}

export default notFoundMiddleware;