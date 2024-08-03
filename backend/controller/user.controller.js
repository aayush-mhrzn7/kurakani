import { User } from "../database/model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../utils/config.js";
const signup = async (req, res) => {
  try {
    const { email, password, username, gender } = req.body;
    if ([email, password, username, gender].some((field) => field.trim == "")) {
      return res
        .status(400)
        .json({ message: "invalid all the fields are required" });
    }
    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      return res
        .status(400)
        .json({ message: "invalid the user exists chooses a new name" });
    }
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res
        .status(400)
        .json({ message: "invalid the user email exists chooses a new email" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    if (!hashedPassword) {
      return res.status(400).json({ message: "invalid hashing has failed" });
    }
    const user = await User.create({
      username,
      password: hashedPassword,
      email,
      gender,
    });
    if (!user) {
      return res.status(400).json({ message: " The user creation has failed" });
    }
    return res
      .status(200)
      .json({ data: user, message: "User has been created" });
  } catch (error) {
    return res.status(500).json({ message: "invalid json" });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      [email, password].some((field) => {
        field.trim() == "";
      })
    ) {
      return res
        .status(400)
        .json({ message: "invalid all the fields must be filled" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "invalid the user with that email doesnt exist " });
    }
    const hashedPassword = bcrypt.compare(password, user.password);
    if (!hashedPassword) {
      return res
        .status(400)
        .json({ message: "the password doesnt match with the old one " });
    }
    const acessToken = jwt.sign(
      { id: user._id, email: email },
      config.jwtSecret,
      { expiresIn: "2d" }
    );
    if (!acessToken) {
      return res
        .status(400)
        .json({ message: "the access token creation has returned a failure " });
    }
    const cookieOptions = {
      httpOnly: true,
      secure: true,
    };
    return res
      .status(200)
      .cookie("accessToken", acessToken, cookieOptions)
      .json({
        data: user,
        message: "logged in sucessfully",
      });
  } catch (error) {
    return res.status(500).json({ message: "Server Failure in Login " });
  }
};
const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, renewPassword } = req.body;
    const userId = req.user?.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        message: "the access token did not sucessfully return a user  ",
      });
    }
    const comparePasswords = bcrypt.compare(user.password, oldPassword);
    if (!comparePasswords) {
      return res
        .status(400)
        .json({ message: "the old password you entered is incorrect " });
    }
    if (newPassword !== renewPassword) {
      return res.status(400).json({ message: "the passwords doenst match " });
    }
    const hashedNewPassword = bcrypt.hash(newPassword, 12);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          password: hashedNewPassword,
        },
      },
      { new: true }
    );
    return res.status(200).json({
      data: updatedUser,
      message: "the password has been changed sucessfully ",
    });
  } catch (error) {
    return res.status(500).json("Server Failure in changing password  ");
  }
};
const getUserDetails = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(400).json({
        message: "the access token did not sucessfully return a user id ",
      });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        message: "the user specified by that token id doesnt exist  ",
      });
    }
    return res
      .status(200)
      .json({ data: user, message: "returned the user details" });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error failed to Get User Details",
    });
  }
};
export { signup, login, changePassword, getUserDetails };
