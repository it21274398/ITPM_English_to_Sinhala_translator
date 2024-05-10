import User from "../models/userModel.js";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const SECRET_KEY = "RECIPEAPI";

//existing User login
const signup = async (req, res) => {
  const { firstName, lastName, contact, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await User.create({
      firstName,
      lastName,
      contact,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { email: result.email, id: result._id },
      SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );
    res.status(201).json({ result, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      return res.status(404).json({ message: "User doesn't exist" });
    }
    const matchPassword = await bcrypt.compare(password, existingUser.password);

    if (!matchPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.status(201).json({ result: existingUser, token });
    /* return user data */
    // res.status(200).json({ result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// userController.js

const getUserProfile = async (req, res) => {
  // Fetch user profile from database based on user ID
  const userId = req.user.id; // Assuming you're using authentication middleware to get user ID
  try {
    const userProfile = await User.findById(userId);
    res.status(200).json(userProfile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const updateUserProfile = async (req, res) => {
  // Update user profile in database
  const userId = req.user.id;
  const { firstName, lastName, contact } = req.body;
  try {
    const updatedUserProfile = await User.findByIdAndUpdate(
      userId,
      { firstName, lastName, contact },
      { new: true }
    );
    res.status(200).json(updatedUserProfile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { signup, signin, getUserProfile, updateUserProfile };
