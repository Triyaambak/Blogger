import "dotenv/config";
import "express-async-errors";

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import generalRateLimiter from "./rate-limiter/generalRateLimiter";
import redisClient from "./redis/redisClient";

async () => {
  await redisClient.set("triyu", 1);
  const val = await redisClient.get("triyu");
  console.log(val);
}

const app = express();
app.use(cors({
  origin: 'http://localhost:3000',  
  methods: ['GET', 'POST', 'PUT'],  
  credentials: true  
}));
app.use(cookieParser());
app.use(generalRateLimiter);

import authMiddleware from "./middlewares/authMiddleware";
import notFoundMiddleware from "./middlewares/notFoundMiddleware";
import errorHandlerMiddleware from "./middlewares/errorHandlerMiddleware";
import authRoutes from "./routes/authRoutes"
import blogRoutes from "./routes/blogsRoute";

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/blogs", authMiddleware ,blogRoutes);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const PORT: string = process.env.BACKEND_PORT || "3001";
app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`);
});
