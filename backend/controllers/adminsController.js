import dotenv from "dotenv";
import {
  blockUser,
  deleteUser,
  getAllUser,
  unblockUser,
} from "./user/userController.js";
import {
  addBanner,
  getBannerDetailForAdmin,
  getBannersForAdmin,
  updateBanner,
} from "./banner/bannerController.js";
dotenv.config();

export const adminGetAllUsers = getAllUser;
export const adminDeleteUser = deleteUser;
export const adminBlockUser = blockUser;
export const adminUnBlockUser = unblockUser;
export const adminAddBanner = addBanner;
export const adminGetBanners = getBannersForAdmin;
export const adminGetDetailsBanner = getBannerDetailForAdmin;
export const adminUpdateBanner = updateBanner
