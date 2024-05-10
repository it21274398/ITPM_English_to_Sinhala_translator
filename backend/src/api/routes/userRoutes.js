import express from "express";
import {
  signup,
  signin,
  getAllUsers,
  getUserProfile,
} from "../controllers/userController.js";

const userRouter = express.Router();

//login singup part
userRouter.post("/signup", signup);
userRouter.post("/signin", signin);

//user part
userRouter.get("/profile", getUserProfile);
userRouter.get("/all", getAllUsers);

export default userRouter;
