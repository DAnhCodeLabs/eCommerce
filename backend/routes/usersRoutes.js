import express from "express";
import { registerUser } from "../controllers/usersController.js";

const userRouter = express.Router();
//GET
//POST
userRouter.post("/register", registerUser);
//PUT
//DELETE

export default userRouter;
