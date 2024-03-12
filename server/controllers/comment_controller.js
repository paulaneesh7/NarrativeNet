import { Comment } from "../models/comment.js";



// CREATE comment
const createComment = async (req, res, next) => {
  try {
    const newComment = new Comment(req.body);
    const savedComment = await newComment.save();
    res.status(200).json(savedComment);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};


// // GET Comment Details
const getComment = async (req, res, next) => {
  const id = req.params.id;
  try {
    const comment = await Comment.findById(id);
    res.status(200).json(comment);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};


// // GET comments
// const getComments = async (req, res, next) => {
//   try {
//     const comments = await Comment.find();
//     res.status(200).json(comments);
//   } catch (err) {
//     res.status(500).json(err);
//     console.log(err);
//   }
// };


// GET POST Comments (Comments of particular posts)
const getUserComments = async (req, res, next) => {
  const postId = req.params.postId;

  try {
    const comments = await Comment.find({ postId });
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};


// UPDATE comment
const updateComment = async (req, res, next) => {
  const id = req.params.id;
  try {
    const updatedComment = await Comment.findByIdAndUpdate(id, req.body, {
      returnDocument: "after",
    });
    res.status(200).json(updatedComment);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

// DELETE comment
const deleteComment = async (req, res, next) => {
  const id = req.params.id;
  try {
    await Comment.findByIdAndDelete(id);
    res.status(200).json("Comment has been deleted");
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

export {
  createComment,
  getUserComments,
  getComment,
  updateComment,
  deleteComment,
};
