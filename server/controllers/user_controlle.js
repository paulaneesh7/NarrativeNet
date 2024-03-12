import bcrypt from "bcrypt";
import { User } from "../models/User.js";
import { Post } from "../models/post.js";
import { Comment } from "../models/comment.js";

// GET USER
const getUser = async (req, res, next) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);

    // doing this because we want to send everything in response except the password, which should not be sent
    const {password, ...info} = user._doc;
    res.status(200).json(info);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

// UPDATE
const updateUser = async (req, res, next) => {
  const id = req.params.id;
  try {
    // if user requests for update of password
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hashSync(req.body.password, salt); // hashing updated password and placing it back in req.body
    }

    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      returnDocument: "after",
    });
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

// DELETE
const deleteUser = async (req, res, next) => {
  const id = req.params.id;
  try {
    await User.findByIdAndDelete(id, { returnDocument: "before" });
    await Post.deleteMany({ userId: id });
    await Comment.deleteMany({ userId: id });
    res.status(200).json("User has been deleted");
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

export { getUser, updateUser, deleteUser };
