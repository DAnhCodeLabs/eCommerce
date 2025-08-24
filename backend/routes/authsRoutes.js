import express from "express";
import {
  authGetBanners,
  changeUserPassword,
  createUserSellerAddress,
  deleteUserSellerAddress,
  forgotUserPassword,
  getUserSellerAddress,
  loginAccount,
  resetUserPassword,
  updateUserProfile,
  updateUserSellerAddress,
  verifyUserOtp,
} from "../controllers/authsController.js";
import authorizeRole from "../middleware/authorizeRole.js";

const authRouter = express.Router();

// GET routes
authRouter.get(
  "/get-address",
  authorizeRole(["user", "seller"]),
  getUserSellerAddress
);
authRouter.get("/get-banners", authGetBanners);

// POST routes
authRouter.post("/login-account", loginAccount);
authRouter.post("/verify-otp", verifyUserOtp);
authRouter.post("/forgot-password", forgotUserPassword);
authRouter.post("/reset-password", resetUserPassword);
authRouter.post(
  "/create-address",
  authorizeRole(["user", "seller"]),
  createUserSellerAddress
);

// PUT routes
authRouter.put(
  "/update-profile",
  authorizeRole(["user", "seller"]),
  updateUserProfile
);
authRouter.put(
  "/change-password",
  authorizeRole(["user", "seller"]),
  changeUserPassword
);
authRouter.put(
  "/update-address/:id",
  authorizeRole(["user", "seller"]),
  updateUserSellerAddress
);

// DELETE routes
authRouter.delete(
  "/delete-address/:id",
  authorizeRole(["user", "seller"]),
  deleteUserSellerAddress
);
export default authRouter;
