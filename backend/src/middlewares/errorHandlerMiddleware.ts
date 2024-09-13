import { NextFunction, Request , Response } from "express";
import { StatusCodes } from "http-status-codes";

type CustomErrorType = {
    status: number;
    error: string;
}

const errorHandlerMiddleware = (err : any, req: Request, res: Response, next: NextFunction) => {
    let customError: CustomErrorType = {
        status: err.status || StatusCodes.INTERNAL_SERVER_ERROR,
        error: err.message || "Internal Server Error",
    }
    res.status(customError.status).send(customError.error);
}

export default errorHandlerMiddleware;