import express from "express";
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  getUserPosts,
  updatePost,
} from "../controllers/post_controller.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router
  .post("/create", verifyToken, createPost)
  .get("/", getPosts)
  .get("/:id", getPost)
  .get("/user/:userId", getUserPosts)
  .put("/:id", verifyToken, updatePost)
  .delete("/:id", verifyToken, deletePost);

export { router };
