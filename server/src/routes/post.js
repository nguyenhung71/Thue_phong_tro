import express from "express";
import { getPostsByCategory } from "../controllers/post.js";

const router = express.Router();

router.get("/:category", getPostsByCategory);

export default router;
