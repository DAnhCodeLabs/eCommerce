import { Banner, autoUpdateBannerStatus } from "../../models/bannerModel.js";
import mongoose from "mongoose";

export const addBanner = async (req, res) => {
  try {
    const { title, subTitle, description, startDate, endDate } = req.body;
    const image = req.file ? req.file.path : null;

    if (!title || !subTitle || !description || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const now = new Date();
    let isActive = true;

    if (endDate && new Date(endDate) < now) {
      isActive = false;
    }

    if (startDate && new Date(startDate) > now) {
      isActive = false;
    }

    const newBanner = new Banner({
      title,
      subTitle,
      description,
      isActive,
      startDate: startDate || now,
      endDate,
      image,
    });

    const savedBanner = await newBanner.save();
    res
      .status(201)
      .json({ message: "Banner added successfully", banner: savedBanner });
  } catch (error) {
    console.error("Error adding banner:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const getBannersForUser = async (req, res) => {
  try {
    const now = new Date();

    const banners = await Banner.find({
      isActive: true,
      startDate: { $lte: now },
      $or: [
        { endDate: { $exists: false } },
        { endDate: null },
        { endDate: { $gt: now } },
      ],
    })
      .select("title subTitle description image") // Chỉ lấy các trường cần thiết
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Banners retrieved successfully",
      banners,
      total: banners.length,
    });
  } catch (error) {
    console.error("Error retrieving banners:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getBannersForAdmin = async (req, res) => {
  try {
     await autoUpdateBannerStatus();
    const {
      page = 1,
      limit = 10,
      search = "",
      isActive,
      startDate,
      endDate,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = req.query;

    const filter = {};

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { subTitle: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    if (isActive !== undefined) {
      filter.isActive = isActive === "true";
    }

    // Sửa phần xử lý ngày tháng
    if (startDate && !isNaN(new Date(startDate).getTime())) {
      filter.startDate = { $gte: new Date(startDate) };
    }

    if (endDate && !isNaN(new Date(endDate).getTime())) {
      filter.endDate = { $lte: new Date(endDate) };
    }

    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === "desc" ? -1 : 1;

    const skip = (page - 1) * limit;

    const banners = await Banner.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Banner.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);

    res.status(200).json({
      message: "Banners retrieved successfully",
      banners,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalItems: total,
        itemsPerPage: parseInt(limit),
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    console.error("Error retrieving banners:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getBannerDetailForAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Banner ID is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid banner ID format" });
    }

    const banner = await Banner.findById(id);

    if (!banner) {
      return res.status(404).json({ message: "Banner not found" });
    }

    res.status(200).json({
      message: "Banner details retrieved successfully",
      banner,
    });
  } catch (error) {
    console.error("Error retrieving banner details:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const updateBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, subTitle, description, startDate, endDate, isActive } =
      req.body;
    const image = req.file ? req.file.path : undefined;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid banner ID format" });
    }

    const existingBanner = await Banner.findById(id);
    if (!existingBanner) {
      return res.status(404).json({ message: "Banner not found" });
    }

    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (subTitle !== undefined) updateData.subTitle = subTitle;
    if (description !== undefined) updateData.description = description;
    if (image !== undefined) updateData.image = image;

    // ✅ Ưu tiên giá trị isActive từ client
    if (isActive !== undefined) {
      updateData.isActive = isActive === "true" || isActive === true;
    }

    // Xử lý dates
    let newStartDate = existingBanner.startDate;
    let newEndDate = existingBanner.endDate;

    if (startDate !== undefined) {
      newStartDate = new Date(startDate);
      updateData.startDate = newStartDate;
    }
    if (endDate !== undefined) {
      newEndDate = new Date(endDate);
      updateData.endDate = newEndDate;
    }

    if (newEndDate && newStartDate && newEndDate <= newStartDate) {
      return res.status(400).json({
        message: "Validation error",
        error: "End date must be after start date",
      });
    }

    // ✅ Chỉ auto set isActive nếu client không gửi
    if (isActive === undefined) {
      const now = new Date();
      updateData.isActive = true;
      if (newStartDate && newStartDate > now) updateData.isActive = false;
      if (newEndDate && newEndDate < now) updateData.isActive = false;
    }

    // Cập nhật và lưu
    const bannerToUpdate = await Banner.findById(id);
    Object.assign(bannerToUpdate, updateData);

    const updatedBanner = await bannerToUpdate.save();

    res.status(200).json({
      message: "Banner updated successfully",
      banner: updatedBanner,
    });
  } catch (error) {
    console.error("Error updating banner:", error);
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation error",
        error: Object.values(error.errors)
          .map((err) => err.message)
          .join(", "),
      });
    }
    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid date format",
        error: "Please provide valid date values",
      });
    }
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
