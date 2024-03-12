import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    photo: { type: String },
    username: { type: String, required: true },
    userId: { type: String, required: true },
    categories: { type: [String] },
  },
  { timestamps: true }
);

// model
export const Post = mongoose.model("Post", postSchema);
