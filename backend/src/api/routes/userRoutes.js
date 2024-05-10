import express from "express";

import {
  signup,
  signin,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/signin", signin);

// Profile routes
userRouter.get("/profile", getUserProfile); // Route to fetch user profile
userRouter.put("/profile", updateUserProfile); // Route to update user profile

export default userRouter;
