// If User tries to DELETE or UPDATE his account, he/she will have to go through this "verifyToken middleware"

import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req.cookies?.jwtToken; // getting the value of the token stored inside of cookies
//   console.log(token);
  if (!token) {
    return res.status(401).json("You are not authenticated!");
  }
  jwt.verify(token, process.env.SECRET, async (err, data) => {
    if (err) {
      return res.status(403).json("Token is not valid!");
    }

    req.userId = data._id; // checking auth_controller -> loginUser reference

    // console.log("passed")
    next();
  });
};

export { verifyToken };
