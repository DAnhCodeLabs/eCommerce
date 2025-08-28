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
import { getBannersForUser } from "./banner/bannerController.js";
import { getCategoriesList } from "./category/categoryController.js";

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
export const authGetBanners = getBannersForUser;
export const authGetCategoriesList = getCategoriesList;
