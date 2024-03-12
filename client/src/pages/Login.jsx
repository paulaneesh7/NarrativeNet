import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useState } from "react";
import axios from "axios";
import { URL } from "../url";
import { useUser } from "../context/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        URL + "/api/auth/login",
        {
          email,
          password,
        },
        { withCredentials: true } // this is done to ensure the cookie is present at the Cookies section
      );
      setUser(res.data);
      navigate("/");
      // console.log(res.data);
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between px-8 md:px-[100px] lg:px-[100px] py-4">
        <h1 className="text-lg font-extrabold md:text-xl">
          <Link to="/">NarrativeNet</Link>
        </h1>
        <Link to="/register">Register</Link>
      </div>
      <div className="flex items-center justify-center w-full h-[70vh]">
        <div className="flex flex-col items-center justify-center space-y-4 w-[80%] md:w-[25%]">
          <h1 className="text-xl font-bold text-left">
            Log in to your account
          </h1>
          <input
            type="text"
            className="w-full px-4 py-2 border-2 border-black rounded-lg outline-0"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="w-full px-4 py-2 border-2 border-black rounded-lg outline-0"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="w-full px-4 py-4 text-lg font-bold text-white bg-black rounded-lg hover:bg-gray-500 hover:text-black"
            onClick={handleLogin}
          >
            Log In
          </button>
          {error && (
            <h3 className="text-sm text-red-500">Something went wrong!!</h3>
          )}
          <div className="flex items-center justify-center space-x-3">
            <p>New here?</p>
            <p className="text-gray-500 underline hover:text-black">
              <Link to="/register">Register</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
