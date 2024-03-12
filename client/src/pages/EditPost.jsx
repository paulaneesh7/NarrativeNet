// EditPost is kinda same as CreatePost, just that we are editing over the created-post

import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { ImCross } from "react-icons/im";
import { useUser } from "../context/UserContext";
import axios from "axios";
import { URL } from "../url";
import { useNavigate, useParams } from "react-router-dom";


const EditPost = () => {
  const [category, setCategory] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null); // for image
  const [categories, setCategories] = useState([]);
  const { user } = useUser();
  const postId = useParams().id;
  const navigate = useNavigate();

  

  const addCategory = async () => {
    let updatedCategories = [...categories, category];
    setCategory("");
    setCategories(updatedCategories);
  };
  const deleteCategory = async (idx) => {
    const updatedCategories = categories.filter((_, index) => index !== idx);
    setCategories(updatedCategories);
  };

  // fetching the post with postId, so that we can update over it
  const fetchPost = async () => {
    try {
      const res = await axios(URL + `/api/posts/${postId}`);
      setTitle(res.data.title);
      setDescription(res.data.description);
      setFile(res.data.photo);
      setCategories(res.data.categories);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const post = {
      title,
      description,
      username: user.username,
      userId: user?._id,
      categories: categories,
    };

    /**
     In this code snippet, a new FormData object is created to prepare data for sending in a fetch request. The FormData object is commonly used to construct a set of key/value pairs representing form fields and their values, which can then be sent to the server using the fetch API or similar.

     Here's a breakdown of the code:

      const data = new FormData();: This creates a new FormData object, which will be used to hold the form data to be sent to the server.

      const filename = Date.now() + file.img;: This line generates a unique filename for the image file being uploaded. Date.now() returns the current timestamp, which is then concatenated with file.img to create a unique filename.

      data.append("img", filename);: This appends a new key-value pair to the FormData object. The key is "img", which is typically used to identify the file being uploaded, and the value is the filename generated in the previous step.

      data.append("file", file);: This appends another key-value pair to the FormData object. The key "file" is often used to send the actual file data. file should be a File object representing the file to be uploaded.

      post.photo = filename;: This assigns the generated filename to a property (photo) of an object (post). This is likely done to associate the uploaded image with a specific entity (e.g., a post).

      Overall, this code snippet is part of the process for uploading an image file to the server using FormData. The FormData object is prepared with the file data and associated with a specific key ("img" or "file") before being sent to the server.
     */

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("img", filename);
      data.append("file", file);
      post.photo = filename;
      // console.log(data);

      // uploading the image
      try {
        const imgUpload = await axios.post(URL + "/api/upload", data);
        // console.log(imgUpload.data);
        // console.log(data);
      } catch (err) {
        console.log(err);
      }
    }

    // uploading everything title, desc, categories etc...
    try {
      const res = await axios.put(URL + `/api/posts/${postId}`, post, {
        withCredentials: true,
      });
      // console.log(res.data);
      navigate(`/posts/post/${res.data._id}`);
      // console.log(post);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="px-8 md:px-[100px] lg:px-[100px] ">
        <h1 className="mt-8 text-xl font-bold md:text-2xl">Update a post</h1>
        <form
          action=""
          className="flex flex-col w-full mt-4 space-y-4 md:space-y-8"
        >
          {/* Post Title */}
          <input
            type="text"
            className="block w-full p-4 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter post title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* Post images */}
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            className="block w-full p-3 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            placeholder="Enter post pictures"
          />
          {/* Post category */}
          <div className="flex flex-col">
            <div className="flex flex-col items-start gap-4">
              <input
                type="text"
                className="block w-full p-4 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter post category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
              <div
                className="px-6 py-2 font-semibold text-white bg-black rounded-lg cursor-pointer"
                onClick={addCategory}
              >
                Add
              </div>
            </div>

            {/* Display catgories */}
            <div className="flex mt-3">
              {categories.map((cat, idx) => (
                <div
                  className="flex items-center justify-center px-2 py-1 mr-4 space-x-2 text-sm bg-gray-200 rounded-lg text-wrap"
                  key={idx}
                >
                  <p>{cat}</p>
                  <p
                    className="p-1 text-sm text-white bg-black rounded-full cursor-pointer"
                    onClick={() => deleteCategory(idx)}
                  >
                    <ImCross />
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Post Description Area */}
          <textarea
            name=""
            id=""
            rows={15}
            cols={30}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter post description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button
            onClick={handleUpdate}
            className="w-full px-4 py-2 mx-auto text-lg font-semibold text-white bg-black rounded-lg lg:w-1/2 md:text-xl"
          >
            Update
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default EditPost;
