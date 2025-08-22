import express from "express";
import authorizeRole from "../middleware/authorizeRole.js";
import {
  adminAddBanner,
  adminBlockUser,
  adminDeleteUser,
  adminGetAllUsers,
  adminUnBlockUser,
} from "../controllers/adminsController.js";
import { uploadSingleImage } from "../middleware/upload.js";

const adminRouter = express.Router();

//GET
adminRouter.get("/users", authorizeRole(["admin"]), adminGetAllUsers);
//POST
adminRouter.post(
  "/add-banner",
  authorizeRole(["admin"]),
  uploadSingleImage("banners"),
  adminAddBanner
);
//PATCH
adminRouter.patch("/block-user/:id", authorizeRole(["admin"]), adminBlockUser);
adminRouter.patch(
  "/unblock-user/:id",
  authorizeRole(["admin"]),
  adminUnBlockUser
);
//PUT
//DELETE
adminRouter.delete(
  "/delete-user/:id",
  authorizeRole(["admin"]),
  adminDeleteUser
);
export default adminRouter;
