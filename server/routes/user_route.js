import express from "express";
import {
  deleteUser,
  getUser,
  updateUser,
} from "../controllers/user_controlle.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router
  .get("/:id", getUser)
  .put("/:id", verifyToken, updateUser)
  .delete("/:id", verifyToken, deleteUser);

export { router };
