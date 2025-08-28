import Category from "../../models/categoryModel.js";

export const addCategory = async (req, res) => {
  try {
    const { name, description, isActive, isEnabled } = req.body;

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
      isEnabled: isEnabled !== "false",
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
    const { name, parentId, isEnabled } = req.body;

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
      isEnabled: isEnabled !== "false",
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
      parent: null, isEnabled: true
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

export const getCategoriesTree = async (req, res) => {
  try {
    const {
      search,
      isActive,
      isEnabled,
      page = 1,
      limit = 10,
      sortBy = "name",
      sortOrder = "asc",
    } = req.query;

    const parseBool = (v) => v === true || v === "true" || v === "1" || v === 1;

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10) || 10));
    const skip = (pageNum - 1) * limitNum;
    const sortDirection = sortOrder === "desc" || sortOrder === "-1" ? -1 : 1;

    const rootMatch = { parent: null };
    if (typeof isActive !== "undefined")
      rootMatch.isActive = parseBool(isActive);
    if (typeof isEnabled !== "undefined")
      rootMatch.isEnabled = parseBool(isEnabled);
    if (search) rootMatch.name = { $regex: search, $options: "i" };

    const pipelineForData = [
      { $match: rootMatch },
      {
        $lookup: {
          from: "categories",
          let: { parentId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$parent", "$$parentId"] },
              },
            },
            {
              $project: {
                name: 1,
                isActive: 1,
                isEnabled: 1,
                _id: 1,
              },
            },
            { $sort: { name: 1 } },
          ],
          as: "children",
        },
      },
      {
        $project: {
          name: 1,
          isActive: 1,
          isEnabled: 1,
          children: 1,
        },
      },
      { $sort: { [sortBy]: sortDirection } },
      { $skip: skip },
      { $limit: limitNum },
    ];

    const pipelineForCount = [{ $match: rootMatch }, { $count: "total" }];

    const agg = await Category.aggregate([
      {
        $facet: {
          data: pipelineForData,
          totalCount: pipelineForCount,
        },
      },
    ]);

    const data = (agg[0] && agg[0].data) || [];
    const total =
      agg[0] && agg[0].totalCount && agg[0].totalCount[0]
        ? agg[0].totalCount[0].total
        : 0;

    res.status(200).json({
      success: true,
      categories: data,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    console.error("Lỗi khi lấy danh mục dạng cây:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi server khi lấy danh mục dạng cây",
    });
  }
};
export const getCategoriesList = async (req, res) => {
  try {
    const categories = await Category.aggregate([
      { $match: { parent: null, isEnabled: true } },
      {
        $lookup: {
          from: "categories",
          let: { parentId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$parent", "$$parentId"] },
                isEnabled: true,
              },
            },
          ],
          as: "children",
        },
      },
      {
        $project: {
          name: 1,
          itemCount: { $size: "$children" },
          isActive: 1,
        },
      },
      { $sort: { isActive: -1, name: 1 } },
    ]);

    res.status(200).json({
      success: true,
      categories,
    });
  } catch (error) {
    console.error("Lỗi khi lấy danh mục dạng danh sách:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi server khi lấy danh mục dạng danh sách",
    });
  }
};

