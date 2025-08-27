import Category from "../../models/categoryModel.js";

export const addCategory = async (req, res) => {
  try {
    const { name, description, isActive } = req.body;

    const existingCategory = await Category.findOne({
      name: name,
    });

    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: "Danh mục đã tồn tại",
      });
    }

    const newCategory = new Category({
      name,
      description: description || "",
      isActive: isActive === "true" || isActive === true,
      image: req.file ? req.file.path : null,
    });

    await newCategory.save();

    res.status(201).json({
      success: true,
      message: "Thêm danh mục thành công",
      category: newCategory,
    });
  } catch (error) {
    console.error("Lỗi khi thêm danh mục:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi server khi thêm danh mục",
    });
  }
};

export const addSubCategory = async (req, res) => {
  try {
    const { name, parentId } = req.body;

    if (!name || !parentId) {
      return res.status(400).json({
        success: false,
        message: "Tên danh mục và danh mục cha là bắt buộc",
      });
    }

    const parentCategory = await Category.findById(parentId);
    if (!parentCategory) {
      return res.status(404).json({
        success: false,
        message: "Danh mục cha không tồn tại",
      });
    }

    const existingCategory = await Category.findOne({
      name: name,
      parent: parentId,
    });

    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: "Danh mục con đã tồn tại trong danh mục cha này",
      });
    }

    const newSubCategory = new Category({
      name,
      parent: parentId,
    });

    await newSubCategory.save();

    res.status(201).json({
      success: true,
      message: "Thêm danh mục con thành công",
      subCategory: newSubCategory,
    });
  } catch (error) {
    console.error("Lỗi khi thêm danh mục con:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi server khi thêm danh mục con",
    });
  }
};

export const getParentCategories = async (req, res) => {
  try {
    const parentCategories = await Category.find({
      parent: null,
    }).select("name _id");

    res.status(200).json({
      success: true,
      parentCategories,
    });
  } catch (error) {
    console.error("Lỗi khi lấy danh mục cha:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi server khi lấy danh mục cha",
    });
  }
};
