import express from "express";
import authorizeRole from "../middleware/authorizeRole.js";
import {
  adminAddBanner,
  adminBlockUser,
  adminDeleteUser,
  adminGetAllUsers,
  adminGetBanners,
  adminGetDetailsBanner,
  adminUnBlockUser,
  adminUpdateBanner,
} from "../controllers/adminsController.js";
import { uploadSingleImage } from "../middleware/upload.js";

const adminRouter = express.Router();

//GET
adminRouter.get("/users", authorizeRole(["admin"]), adminGetAllUsers);
adminRouter.get("/banners", authorizeRole(["admin"]), adminGetBanners);
adminRouter.get(
  "/banners/:id",
  authorizeRole(["admin"]),
  adminGetDetailsBanner
);
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
adminRouter.put(
  "/update-banner/:id",
  authorizeRole(["admin"]),
  adminUpdateBanner
);
//DELETE
adminRouter.delete(
  "/delete-user/:id",
  authorizeRole(["admin"]),
  adminDeleteUser
);
export default adminRouter;
