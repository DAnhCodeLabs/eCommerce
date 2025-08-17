import dotenv from "dotenv";
import {
  changePassword,
  createAddress,
  deleteAddress,
  forgotPassword,
  getAddress,
  login,
  resetPassword,
  updateAddress,
  updateProfile,
  verifyOtp,
} from "./user/userController.js";

// Load biến môi trường
dotenv.config();

// User Authentication
export const loginAccount = login;
export const verifyUserOtp = verifyOtp;
export const forgotUserPassword = forgotPassword;
export const resetUserPassword = resetPassword;
export const changeUserPassword = changePassword;
export const updateUserProfile = updateProfile;
export const createUserSellerAddress = createAddress;
export const updateUserSellerAddress = updateAddress;
export const getUserSellerAddress = getAddress;
export const deleteUserSellerAddress = deleteAddress;
