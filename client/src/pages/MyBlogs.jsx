import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import axios from "axios";
import HomePost from "../components/HomePost";
import { URL } from "../url";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { useUser } from "../context/UserContext";

const MyBlogs = () => {
  const [posts, setPosts] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [loader, setLoader] = useState(false);
  const { user } = useUser();
  const param = useParams().id;
  const navigate = useNavigate();

  // Fetching the Posts
  const fetchPost = async () => {
    setLoader(true);
    try {
      const res = await axios.get(URL + `/api/posts/user/${param}`);
      setPosts(res.data);
      // console.log(res.data);
      if (res.data.length === 0) {
        setNoResults(true);
      } else {
        setNoResults(false);
      }
      setLoader(false);
    } catch (err) {
      console.log(err);
      setLoader(true);
    }
  };

  // Fetch the post on page load
  useEffect(() => {
    fetchPost();
  }, [param]);

  return (
    <>
      <Navbar />
      <div className="px-8 md:px-[100px] lg:px-[100px] min-h-[80vh]">
        <h1 className="mt-8 text-2xl font-bold text-center md:mb-20">My Blogs</h1>
        <div>
          {loader ? (
            <div className="flex items-center justify-center h-[80vh]">
              <Loader />
            </div>
          ) : !noResults ? (
            posts.map((post) => (
              <>
                <HomePost key={post._id} post={post} />
              </>
            ))
          ) : (
            <h3 className="mt-16 font-bold text-center">
              No posts available related to the topic
            </h3>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyBlogs;
