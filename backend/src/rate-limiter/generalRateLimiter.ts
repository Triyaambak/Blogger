import rateLimit from "express-rate-limit";

const generalRateLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 100,
  message: "Too many requests from IP , please try again later",
});

export default generalRateLimiter;
