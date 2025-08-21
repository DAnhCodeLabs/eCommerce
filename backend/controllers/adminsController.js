import dotenv from "dotenv";
import { blockUser, deleteUser, getAllUser, unblockUser } from "./user/userController.js";
dotenv.config();

export const adminGetAllUsers = getAllUser;
export const adminDeleteUser = deleteUser;
export const adminBlockUser = blockUser;
export const adminUnBlockUser = unblockUser;
