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
      parent: null,
      isEnabled: true,
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
                parent: 1, // thêm parent để frontend biết child có parent
                description: 1,
                createdAt: 1,
                updatedAt: 1,
                slug: 1,
                image: 1,
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
          description: 1,
          createdAt: 1,
          updatedAt: 1,
          slug: 1,
          image: 1,
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
          image: 1,
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

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, parent, isActive, isEnabled } = req.body;

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Danh mục không tồn tại",
      });
    }

    // Kiểm tra xem category hiện tại có phải là subcategory không
    const isCurrentlySubcategory = !!category.parent;

    // Chỉ validate parent nếu đang chỉnh sửa subcategory
    if (isCurrentlySubcategory) {
      const parentProvided = typeof parent !== "undefined";
      const parentToCheck = parentProvided
        ? parent || null
        : category.parent || null;

      // Validate unique name within the same parent
      if (name && name.trim() !== category.name) {
        const existingCategory = await Category.findOne({
          name: name.trim(),
          parent: parentToCheck,
          _id: { $ne: id },
        });

        if (existingCategory) {
          return res.status(400).json({
            success: false,
            message: "Tên danh mục đã tồn tại trong cùng danh mục cha",
          });
        }
      }

      // Parent validations: if client provided a parent value, validate it
      if (parentProvided) {
        const parentId = parent || null;

        if (parentId && parentId === id) {
          return res.status(400).json({
            success: false,
            message: "Không thể đặt danh mục cha là chính nó",
          });
        }

        // if parentId provided and not null -> must exist and must not create cycle
        if (parentId) {
          let current = parentId;
          // walk up the parent chain to ensure we don't set a descendant as parent
          while (current) {
            if (current.toString() === id.toString()) {
              return res.status(400).json({
                success: false,
                message:
                  "Không thể đặt một danh mục con làm danh mục cha (vòng lặp)",
              });
            }
            const parentCategory = await Category.findById(current).select(
              "parent"
            );
            if (!parentCategory) {
              return res.status(404).json({
                success: false,
                message: "Danh mục cha không tồn tại",
              });
            }
            current = parentCategory.parent
              ? parentCategory.parent.toString()
              : null;
          }
        }
      }
    } else {
      // Nếu là danh mục cha, không cho phép đặt parent
      if (typeof parent !== "undefined" && parent !== null) {
        return res.status(400).json({
          success: false,
          message: "Danh mục cha không thể có parent",
        });
      }

      // Validate unique name cho danh mục cha (parent = null)
      if (name && name.trim() !== category.name) {
        const existingCategory = await Category.findOne({
          name: name.trim(),
          parent: null,
          _id: { $ne: id },
        });

        if (existingCategory) {
          return res.status(400).json({
            success: false,
            message: "Tên danh mục đã tồn tại",
          });
        }
      }
    }

    const updateData = {
      ...(name && { name: name.trim() }),
      ...(description !== undefined && {
        description: description?.trim() || "",
      }),
      // Chỉ cập nhật parent nếu đang chỉnh sửa subcategory
      ...(isCurrentlySubcategory &&
        typeof parent !== "undefined" && {
          parent: parent || null,
        }),
      ...(isActive !== undefined && {
        isActive: isActive === "true" || isActive === true,
      }),
      ...(isEnabled !== undefined && {
        isEnabled: isEnabled !== "false",
      }),
      ...(req.file && { image: req.file.path }),
    };

    const updatedCategory = await Category.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).populate("parent", "name");

    res.status(200).json({
      success: true,
      message: "Cập nhật danh mục thành công",
      category: updatedCategory,
    });
  } catch (error) {
    console.error("Lỗi khi cập nhật danh mục:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi server khi cập nhật danh mục",
    });
  }
};
