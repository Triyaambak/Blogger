import express from "express";
import { signin, signup, getAuth } from "../controllers/authController";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/getAuth", authMiddleware , getAuth);
router.post("/signin", signin);
router.post("/signup", signup);

export default router;
