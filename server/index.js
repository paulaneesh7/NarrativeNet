import "dotenv/config";
import cors from "cors";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { router as authRouter } from "./routes/auth_route.js";
import { router as userRouter } from "./routes/user_route.js";
import { router as postRouter } from "./routes/post_route.js";
import { router as commentRouter } from "./routes/comment_route.js";

const server = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

// database connection
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log(`Database connected`);
}

// middlewares
server.use(express.json());
server.use(cookieParser());
server.use(
  cors({
    origin: process.env.CLIENT_URL, // specify the origin for CORS
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // specify the methods for CORS
    credentials: true, // this allows session cookies to be sent with requests
    optionsSuccessStatus: 200, // some legacy browsers choke on 204
  })
); // To enable CORS

// routes
server.use("/api/auth", authRouter);
server.use("/api/users", userRouter);
server.use("/api/posts", postRouter);
server.use("/api/comments", commentRouter);
server.use("/images", express.static(path.join(__dirname, "/images")));

// image upload with multer
const storage = multer.diskStorage({
  destination: (req, file, fn) => {
    fn(null, "images");
  },
  filename: (req, file, fn) => {
    fn(null, req.body.img);
    // fn(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });
server.post("/api/upload", upload.single("file"), (req, res) => {
  // console.log(req.body);
  res.status(200).json("Image has been uploaded successfully!");
});

server.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT}`);
});
