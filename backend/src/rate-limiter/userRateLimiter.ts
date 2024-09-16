import { NextFunction, Request, Response } from "express";
import InternalServer from "../errors/InternalServer";
import { redisRateLimiter } from "../utils/redisUtil";

const userRateLimiter = async (req: Request, res: Response, next: NextFunction) => {
  const userIp = req.ip;
  await redisRateLimiter(userIp as string);
  next();
};

export default userRateLimiter;
