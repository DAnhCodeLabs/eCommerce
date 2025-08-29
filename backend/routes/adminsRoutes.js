import express from "express";
import authorizeRole from "../middleware/authorizeRole.js";
import {
  adminAddBanner,
  adminAddCategory,
  adminAddSubCategory,
  adminBlockUser,
  adminDeleteBanner,
  adminDeleteUser,
  adminGetAllUsers,
  adminGetBanners,
  adminGetCategoriesTree,
  adminGetDetailsBanner,
  adminGetParentCategories,
  adminUnBlockUser,
  adminUpadteCategory,
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
adminRouter.get(
  "/parent-categories",
  authorizeRole(["admin"]),
  adminGetParentCategories
);
adminRouter.get(
  "/categories-tree",
  authorizeRole(["admin"]),
  adminGetCategoriesTree
);
//POST
adminRouter.post(
  "/add-banner",
  authorizeRole(["admin"]),
  uploadSingleImage("banners"),
  adminAddBanner
);
adminRouter.post(
  "/add-category",
  authorizeRole(["admin"]),
  uploadSingleImage("categories"),
  adminAddCategory
);
adminRouter.post(
  "/add-subcategory",
  authorizeRole(["admin"]),
  adminAddSubCategory
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
adminRouter.put(
  "/update-category/:id",
  authorizeRole(["admin"]),
  adminUpadteCategory
);
//DELETE
adminRouter.delete(
  "/delete-user/:id",
  authorizeRole(["admin"]),
  adminDeleteUser
);
adminRouter.delete(
  "/delete-banner/:id",
  authorizeRole(["admin"]),
  adminDeleteBanner
);
export default adminRouter;
