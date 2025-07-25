import dotenv from "dotenv";
import {
  login,
  verifyOtp,
  forgotPassword,
  resetPassword,
  changePassword,
  updateAvatar,
  updateProfile,
} from "./user/authUserController.js";

// Load biến môi trường
dotenv.config();

// User Authentication
export const loginAccount = login;
export const verifyUserOtp = verifyOtp;
export const forgotUserPassword = forgotPassword;
export const resetUserPassword = resetPassword;
export const changeUserPassword = changePassword;
export const updateUserAvatar = updateAvatar;
export const updateUserProfile = updateProfile;
