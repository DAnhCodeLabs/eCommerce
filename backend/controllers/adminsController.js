import dotenv from "dotenv";
import {
  blockUser,
  deleteUser,
  getAllUser,
  unblockUser,
} from "./user/userController.js";
import {
  addBanner,
  deleteBanner,
  getBannerDetailForAdmin,
  getBannersForAdmin,
  updateBanner,
} from "./banner/bannerController.js";
import {
  addCategory,
  addSubCategory,
  getParentCategories,
} from "./category/categoryController.js";
dotenv.config();

export const adminGetAllUsers = getAllUser;
export const adminDeleteUser = deleteUser;
export const adminBlockUser = blockUser;
export const adminUnBlockUser = unblockUser;
export const adminAddBanner = addBanner;
export const adminGetBanners = getBannersForAdmin;
export const adminGetDetailsBanner = getBannerDetailForAdmin;
export const adminUpdateBanner = updateBanner;
export const adminDeleteBanner = deleteBanner;
export const adminAddCategory = addCategory;
export const adminAddSubCategory = addSubCategory;
export const adminGetParentCategories = getParentCategories;
