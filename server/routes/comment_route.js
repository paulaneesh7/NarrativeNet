import express from "express";
import {
  createComment,
  deleteComment,
  getComment,
  getUserComments,
  updateComment,
} from "../controllers/comment_controller.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router
  .post("/create", verifyToken, createComment)
  .get("/post/:postId", getUserComments)
  // .get("/:id", getComment)
  .put("/:id", verifyToken, updateComment)
  .delete("/:id", verifyToken, deleteComment);

export { router };
