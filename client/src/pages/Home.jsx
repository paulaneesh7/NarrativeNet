import axios from "axios";
import Footer from "../components/Footer";
import HomePost from "../components/HomePost";
import Navbar from "../components/Navbar";
import { URL } from "../url";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Loader from "../components/Loader";
import { useUser } from "../context/UserContext";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation(); // with useLocation we can extract out the query string from route, we extracting search from path.search
  const [noResults, setNoResults] = useState(false);
  const [loader, setLoader] = useState(false);
  const { user } = useUser();

  // Fetching the Posts
  const fetchPost = async () => {
    setLoader(true);
    try {
      const res = await axios.get(URL + "/api/posts/" + search); // adding the query string for searching, check backend controller for more
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
  }, [search]);

  return (
    <>
      <Navbar />
      <div className="px-8 md:px-[100px] lg:px-[100px] min-h-[80vh]">
        {loader ? (
          <div className="flex items-center justify-center h-[80vh]">
            <Loader />
          </div>
        ) : !noResults ? (
          posts.map((post) => (
            <>
              <Link to={user ? `posts/post/${post._id}` : "/login"}>
                <HomePost key={post._id} post={post} />
              </Link>
            </>
          ))
        ) : (
          <h3 className="mt-16 font-bold text-center">
            No posts available related to the topic
          </h3>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Home;
