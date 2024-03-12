import axios from "axios";
import Comment from "../components/Comment";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { URL, IF } from "../url";
import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";

const PostDetails = () => {
  const [post, setPost] = useState({});
  const [loader, setLoader] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const postId = useParams().id;
  const { user } = useUser();
  const navigate = useNavigate();

  // Fetch the Post
  const fetchPost = async () => {
    setLoader(true);
    try {
      const res = await axios.get(URL + `/api/posts/${postId}`);
      // console.log(res.data);
      setPost(res.data);
      setLoader(false);
    } catch (err) {
      console.log(err);
      setLoader(true);
    }
  };

  /**
   * This useEffect hook with a dependency array [postId] means that the fetchPost function will be called once when the component
   * mounts (i.e., when it is first rendered), and then again whenever the postId value change
   */
  useEffect(() => {
    fetchPost();
  }, [postId]);

  // Fetch the comments
  const fetchPostComments = async () => {
    try {
      const res = await axios.get(URL + `/api/comments/post/${postId}`);
      setComments(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  /**
   * This useEffect hook with [postId] as the dependency array means that the fetchPostComments function will be called once
   * when the component mounts (i.e., when it is first rendered), and then again whenever the postId value changes
   */
  useEffect(() => {
    fetchPostComments();
  }, [postId]);

  /* To delete the post */
  const handleDelete = async () => {
    try {
      const res = await axios.delete(URL + `/api/posts/${postId}`, {
        withCredentials: true,
      });
      console.log(res.data);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  /*To add comment */
  const handleAddComment = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        URL + `/api/comments/create`,
        {
          comment: comment,
          author: user.username,
          postId: postId,
          userId: user._id,
        },
        { withCredentials: true }
      );
      setComment("");
      fetchPostComments();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Navbar />
      {loader ? (
        <div className="h-[80vh] flex justify-center items-center w-full">
          <Loader />
        </div>
      ) : (
        <div className="px-8 md:px-[100px] lg:px-[100px] mt-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-black md:text-3xl">
              {post.title}
            </h1>

            {user?._id === post?.userId && (
              <div className="flex items-center justify-center space-x-2 cursor-pointer">
                <p onClick={() => navigate(`/edit/${postId}`)}>
                  <BiEdit />
                </p>
                <p onClick={handleDelete}>
                  <MdDelete />
                </p>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between mt-2 md:mt-4">
            <p>@{post.username}</p>
            <div className="flex space-x-2">
              <p>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
              <p>{new Date(post.updatedAt).toString().slice(16, 24)}</p>
            </div>
          </div>
          <img
            src={IF + post.photo}
            alt=""
            className="w-full mx-auto mt-8 rounded-xl"
          />
          <p className="mx-auto mt-8">{post.description}</p>
          <div className="flex items-center mt-8 space-x-4 font-semibold">
            <p>Categories:</p>
            <div className="flex items-center justify-center space-x-2 text-sm">
              {post.categories?.map((p, idx) => (
                <div className="px-1.5 py-1 bg-gray-300 rounded-lg" key={idx}>
                  {p}
                </div>
              ))}
            </div>
          </div>

          {/* Comments */}
          <div className="flex flex-col mt-4">
            <h3 className="mt-6 mb-4 font-semibold">Comments:</h3>
            {comments?.map((c) => (
              <Comment
                key={c._id}
                c={c}
                userId={user?._id}
              />
            ))}
          </div>

          {/* Write and Add a comment */}
          <div className="flex flex-col w-full gap-4 mt-4 lg:items-end">
            <input
              type="text"
              className="block w-full p-3 mt-4 text-sm text-gray-900 border border-gray-300 rounded-lg outline-none cursor-pointer md:mt-0 bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              placeholder="Write a comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              className="px-4 py-2 font-semibold text-white bg-black rounded-lg"
              onClick={handleAddComment}
            >
              Add Comment
            </button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default PostDetails;
