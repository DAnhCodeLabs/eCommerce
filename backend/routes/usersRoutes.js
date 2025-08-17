import express from "express";
import { registeredSellerUser, registerUser } from "../controllers/usersController.js";
import authorizeRole from "../middleware/authorizeRole.js";

const userRouter = express.Router();
//GET
//POST
userRouter.post("/register/user", registerUser);
userRouter.post("/register/seller", authorizeRole(["user"]), registeredSellerUser)
//PUT
//DELETE

export default userRouter;
