import { Comment } from "../models/comment.js";
import { Post } from "../models/post.js";

// CREATE Post
const createPost = async (req, res, next) => {
  try {
    const newPost = new Post(req.body);
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

// GET Post Details
const getPost = async (req, res, next) => {
  const id = req.params.id;
  try {
    const post = await Post.findById(id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};



// GET All Posts as well as `Query String` search FUNCTIONALITY
const getPosts = async (req, res, next) => {
  const query = req.query;
  // console.log(query); // check what value the `search` key is attached to here
  try {
    // becauase ?search=value => query.search=value which we want to search
    const searchFilter = { title: { $regex: query.search, $options: "i" } };
    const posts = await Post.find(query.search ? searchFilter : null);
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};



// GET User Posts (Posts of particular user)
const getUserPosts = async (req, res, next) => {
  const userId = req.params.userId;

  try {
    const posts = await Post.find({ userId });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

// UPDATE Post
const updatePost = async (req, res, next) => {
  const id = req.params.id;
  try {
    const updatedPost = await Post.findByIdAndUpdate(id, req.body, {
      returnDocument: "after",
    });
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

// DELETE
const deletePost = async (req, res, next) => {
  const id = req.params.id;
  try {
    await Post.findByIdAndDelete(id);
    await Comment.deleteMany({postId: id});
    res.status(200).json("Post has been deleted");
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

export { createPost, getPost, getPosts, getUserPosts, updatePost, deletePost };
