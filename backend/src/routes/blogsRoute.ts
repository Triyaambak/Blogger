import express from "express";
import { addBlog, getAllBlogs, getBlog, updateBlog } from "../controllers/blogController";

const router = express.Router();

router.get("/bulk", getAllBlogs);
router.get("/bulk/:id", getBlog);
router.post("/addBlog", addBlog);
router.put("/updateBlog", updateBlog);

export default router;
