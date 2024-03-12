import axios from "axios";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ProfilePosts from "../components/ProfilePosts";
import { useEffect, useState } from "react";
import { URL } from "../url";
import { useUser } from "../context/UserContext";
import { useNavigate, useParams } from "react-router-dom";

const Profile = () => {
  const param = useParams().id;
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [updated, setUpdated] = useState(false);
  const [posts, setPosts] = useState([]);

  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const res = await axios(URL + `/api/users/${user._id}`);
      setUsername(res.data.username);
      setEmail(res.data.email);
      setPassword(res.data.password);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [param]);

  const handleUpdateProfile = async () => {
    setUpdated(false);
    try {
      const res = await axios.put(
        URL + `/api/users/${user._id}`,
        {
          username,
          email,
          password,
        },
        { withCredentials: true }
      );
      setUpdated(true);
      // console.log(res.data);
    } catch (err) {
      console.log(err);
      setUpdated(false);
    }
  };

  const handleDeleteProfile = async () => {
    try {
      const res = await axios.delete(URL + `/api/users/${user._id}`, {
        withCredentials: true,
      });
      console.log(res.data);
      setUser(null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUserPosts = async () => {
    try {
      const res = await axios(URL + `/api/posts/user/${user._id}`);
      setPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUserPosts();
  }, [param])

  return (
    <div>
      <Navbar />
      <div className="px-8 md:px-[100px] lg:px-[100px] mt-8 flex flex-col">
        {/* Top div */}
        <div className="mb-8">
          <div className="flex flex-col w-full space-y-4">
            <h1 className="mb-[-1px] text-xl font-bold">Profile</h1>
            <input
              type="text"
              placeholder="Enter your username"
              className="block w-full p-4 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter your email"
              className="block w-full p-4 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {/* <input
              type="text"
              placeholder="Enter your password"
              className="block w-full p-4 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            /> */}
            <div className="flex items-center mt-8 space-x-4 ">
              <button
                onClick={handleUpdateProfile}
                className="px-4 py-2 font-semibold text-white duration-200 bg-black rounded-lg hover:text-balck hover:bg-gray-400"
              >
                Update
              </button>
              <button
                onClick={handleDeleteProfile}
                className="px-4 py-2 font-semibold text-white duration-200 bg-black rounded-lg hover:text-balck hover:bg-gray-400"
              >
                Delete
              </button>
            </div>
            {updated && (
              <h3 className="mt-4 text-sm text-center text-green-500">
                User updated successfully!
              </h3>
            )}
          </div>
        </div>

        {/* Lower div */}
        <div className="flex flex-col w-full mt-8 ">
          <h1 className="text-xl font-bold">Your posts</h1>
          {posts?.map((p) => (
            <ProfilePosts key={p._id} p={p} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
