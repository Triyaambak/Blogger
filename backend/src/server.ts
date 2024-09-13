import "dotenv/config";
import "express-async-errors";

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(cors({
  origin: 'http://localhost:3000',  
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  
  credentials: true  
}));
app.use(cookieParser());

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
