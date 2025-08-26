import mongoose from "mongoose";
const makeSlug = (name = "") =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxLength: 100,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      trim: true,
      maxLength: 500,
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    image: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

categorySchema.pre("save", function (next) {
  if (this.isModified("name") || !this.slug) {
    this.slug = makeSlug(this.name);
  }
  next();
});

// Lấy tất cả danh mục con trực tiếp
categorySchema.virtual("children", {
  ref: "Category",
  localField: "_id",
  foreignField: "parent",
});

// Static method: Lấy danh mục theo cấu trúc phân cấp
categorySchema.statics.getHierarchy = async function () {
  const categories = await this.find({ isActive: true })
    .populate("parent", "name")
    .populate("children", "name slug")
    .sort({ name: 1 });

  // Tách danh mục cha và con
  const parentCategories = categories.filter((cat) => !cat.parent);
  const childCategories = categories.filter((cat) => cat.parent);

  // Gán danh mục con vào danh mục cha
  parentCategories.forEach((parent) => {
    parent.children = childCategories.filter(
      (child) =>
        child.parent && child.parent._id.toString() === parent._id.toString()
    );
  });

  return parentCategories;
};

// Static method: Lấy tất cả danh mục con của một danh mục
categorySchema.statics.getChildren = async function (parentId) {
  return await this.find({
    parent: parentId,
    isActive: true,
  }).sort({ name: 1 });
};

// Static method: Lấy tất cả danh mục gốc (không có parent)
categorySchema.statics.getRootCategories = async function () {
  return await this.find({
    parent: null,
    isActive: true,
  }).sort({ name: 1 });
};

// Instance method: Kiểm tra có phải danh mục gốc
categorySchema.methods.isRoot = function () {
  return !this.parent;
};

// Instance method: Kiểm tra có phải danh mục con
categorySchema.methods.hasParent = function () {
  return !!this.parent;
};

const Category = mongoose.model("Category", categorySchema);

export default Category;
