import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";



// REGISTER
const registerUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hashSync(password, salt); // hashing the password
    const newUser = new User({ username, email, password: hashedPassword });
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};



// LOGIN
const loginUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json("User not found");
    }

    const match = await bcrypt.compareSync(req.body.password, user.password); // comparing whether the password matches or not
    if (!match) {
      return res.status(401).json("Wrong credentials");
    }

    // token
    const token = jwt.sign({ _id: user._id, username:user.username, email: user.email }, process.env.SECRET, {
      expiresIn: process.env.JWT_EXPIRY,
    });

    // doing this because we want to send everything in response except the password, which should not be sent
    const { password, ...info } = user._doc;

    res.cookie("jwtToken", token).status(200).json(info);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};



// LOGOUT
const logoutUser = async (req, res, next) => {
  try {
    res
      .clearCookie("jwtToken", { sameSite: "none", secure: true })
      .status(200)
      .send("User logged out successfully");
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};



// REFETCH USER (So that after Login, we don't Logout automatically)
const refetchUser = async(req, res, next) => {
  const token = req.cookies?.jwtToken; // getting the value of the token stored inside of cookies

  jwt.verify(token, process.env.SECRET, {}, async(err, data) => {
    if(err){
      return res.status(404).json(err);
    }
    res.status(200).json(data);
  })
}

export { registerUser, loginUser, logoutUser, refetchUser };
