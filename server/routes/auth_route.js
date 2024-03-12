import express from "express";
import {
  loginUser,
  logoutUser,
  refetchUser,
  registerUser,
} from "../controllers/auth_controller.js";

const router = express.Router();

router
  .post("/register", registerUser)
  .post("/login", loginUser)
  .get("/logout", logoutUser)
  .get("/refetch", refetchUser);

export { router };
