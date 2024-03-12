import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { useState } from "react";
import MenuBar from "./MenuBar";
import { IoMenuOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { useUser } from "../context/UserContext";

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const [prompt, setPrompt] = useState("");

  const navigate = useNavigate();

  const pathname = useLocation().pathname;
  // console.log(params);

  const showMenu = () => {
    setMenu(!menu);
  };

  const { user } = useUser();

  return (
    <div className="flex items-center justify-between px-4 md:px-[100px] py-4">
      <h1 className="text-lg font-extrabold md:text-xl ">
        <Link to="/">NarrativeNet</Link>
      </h1>

      {/* search-bar - if in "Home" then show the searchbar otherwise not */}
      {pathname === "/" && (
        <div className="flex items-center justify-center space-x-0 rounded-xl  px-2 py-0.5">
          <p
            className="cursor-pointer"
            onClick={() =>
              prompt ? navigate("?search=" + prompt) : navigate("/")
            }
          >
            <FiSearch />
          </p>
          <input
            type="text"
            placeholder="Search a post"
            className="px-3 py-1 outline-none rounded-xl "
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>
      )}

      {/* routes */}
      <div className="justify-center hidden space-x-2 cursor-pointer tems-center md:space-x-4 lg:flex">
        {user ? (
          <h3 className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
            <Link to="/write">Write</Link>
          </h3>
        ) : (
          <h3 className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
            <Link to="/login">Login</Link>
          </h3>
        )}
        {user ? (
          <div onClick={showMenu}>
            <h3 className="py-2.5 px-5 relative">
              {menu ? <RxCross2 /> : <IoMenuOutline />}
            </h3>
            {menu && <MenuBar />}
          </div>
        ) : (
          <h3 className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
            <Link to="/register">Register</Link>
          </h3>
        )}
        {/* <button
          type="button"
          className="px-2 py-2 mb-2 text-sm font-medium text-white bg-gray-800 rounded-full hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 me-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          🌙
        </button> */}
      </div>

      <div className="text-lg cursor-pointer lg:hidden" onClick={showMenu}>
        <p className="relative">{menu ? <RxCross2 /> : <IoMenuOutline />}</p>
        {menu && <MenuBar />}
      </div>
    </div>
  );
};

export default Navbar;
