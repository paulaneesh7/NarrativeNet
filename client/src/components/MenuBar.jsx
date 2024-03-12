import axios from "axios";
import { useUser } from "../context/UserContext";
import { URL } from "../url";
import { Link, useNavigate } from "react-router-dom";

const MenuBar = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.get(URL + "/api/auth/logout", {
        withCredentials: true,
      });
      console.log("Logged out");
      setUser(null);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="bg-black w-[200px] flex flex-col items-start absolute top-12 right-6 md:right-32 md:top-16 rounded-md p-4 space-y-4">
        {!user && (
          <h3 className="text-sm text-white hover:text-gray-500">
            <Link to="/login">Login</Link>
          </h3>
        )}
        {!user && (
          <h3 className="text-sm text-white hover:text-gray-500">
            <Link to="/register">Register</Link>
          </h3>
        )}
        {user && (
          <h3 className="text-sm text-white hover:text-gray-500">
            <Link to={`/profile/${user?._id}`}>Profile</Link>
          </h3>
        )}
        {user && (
          <h3 className="text-sm text-white hover:text-gray-500">
            <Link to="/write">Write</Link>
          </h3>
        )}
        {user && (
          <h3 className="text-sm text-white hover:text-gray-500">
            <Link to={`/myblogs/${user?._id}`}>My blogs</Link>
          </h3>
        )}
        {user && (
          <h3
            className="text-sm text-white hover:text-gray-500"
            onClick={handleLogout}
          >
            Logout
          </h3>
        )}
      </div>
    </>
  );
};

export default MenuBar;
