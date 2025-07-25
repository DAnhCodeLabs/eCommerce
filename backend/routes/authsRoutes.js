import express from "express";
import {
  changeUserPassword,
  forgotUserPassword,
  loginAccount,
  resetUserPassword,
  updateUserAvatar,
  updateUserProfile,
  verifyUserOtp,
} from "../controllers/authsController.js";
import authorizeRole from "../middleware/authorizeRole.js";
import { uploadSingleImage } from "../middleware/upload.js";

const authRouter = express.Router();

//GET
//POST
authRouter.post("/login-account", loginAccount);
authRouter.post("/verify-otp", verifyUserOtp);
authRouter.post("/forgot-password", forgotUserPassword);
authRouter.post("/reset-password", resetUserPassword);
authRouter.post(
  "/change-password",
  authorizeRole(["user", "seller"]),
  changeUserPassword
);
//PUT
authRouter.put(
  "/update-avatar",
  authorizeRole(["user", "seller"]),
  uploadSingleImage("avatar"),
  updateUserAvatar
);
authRouter.put(
  "/update-profile",
  authorizeRole(["user", "seller"]),
  updateUserProfile
);
//DELETE

export default authRouter;
