import dotenv from "dotenv";
import {
  blockUser,
  deleteUser,
  getAllUser,
  unblockUser,
} from "./user/userController.js";
import { addBanner } from "./banner/banner.js";
dotenv.config();

export const adminGetAllUsers = getAllUser;
export const adminDeleteUser = deleteUser;
export const adminBlockUser = blockUser;
export const adminUnBlockUser = unblockUser;
export const adminAddBanner = addBanner;
