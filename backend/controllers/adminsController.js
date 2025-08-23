import dotenv from "dotenv";
import {
  blockUser,
  deleteUser,
  getAllUser,
  unblockUser,
} from "./user/userController.js";
import { addBanner } from "./banner/bannerController.js";
dotenv.config();

export const adminGetAllUsers = getAllUser;
export const adminDeleteUser = deleteUser;
export const adminBlockUser = blockUser;
export const adminUnBlockUser = unblockUser;
export const adminAddBanner = addBanner;
