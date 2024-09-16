import "dotenv/config";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import Unauthorized from "../errors/Unauthorized";
import InternalServer from "../errors/InternalServer";
import { redisGetAuthToken } from "../utils/redisUtil";
import { StatusCodes } from "http-status-codes";

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.authToken;
  if (!token)
    throw new Unauthorized("Auth Token Cookie not present , Access Denied");

  const decodedData = await redisGetAuthToken(token);
  if (decodedData) {
    return res.status(StatusCodes.OK).json(JSON.parse(decodedData));
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new InternalServer("JWT_SECRET environment variable is not defined");
  }
  const decoded = jwt.verify(token, secret);
  if (!decoded)
    throw new Unauthorized("Token is not valid , Unauthorized access");
    
  req.body.user = decoded;
  next();
};

export default authMiddleware;
