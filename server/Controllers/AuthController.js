import * as dotenv from "dotenv";
dotenv.config();
import { User } from "../Models/UserModel.js";
import jwt from "jsonwebtoken";
const secretKey = process.env.SECRET_KEY;

// create token fn

const createToken = ({ _id }) => {
  return jwt.sign({ _id }, secretKey, {
    expiresIn: "1h",
  });
};

// register controller
export const registerUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.register(email, password);
    const token = createToken(user._id);
    return res.status(201).json({
      email,
      token,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};

// login controller
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    return res.status(200).json({
      email,
      token,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};
