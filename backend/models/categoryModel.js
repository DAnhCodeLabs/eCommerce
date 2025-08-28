import mongoose from "mongoose";
const slugify = (name = "") =>
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
      default: false,
    },
    isEnabled: {
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

categorySchema.pre("save", async function (next) {
  if (this.isModified("name") || !this.slug) {
    const base = slugify(this.name);
    let slugCandidate = base;
    let count = 0;

    while (
      await this.constructor.findOne({
        slug: slugCandidate,
        _id: { $ne: this._id },
      })
    ) {
      count += 1;
      slugCandidate = `${base}-${count}`;
    }

    this.slug = slugCandidate;
  }
  next();
});

categorySchema.virtual("children", {
  ref: "Category",
  localField: "_id",
  foreignField: "parent",
});

categorySchema.statics.getHierarchy = async function () {
  const categories = await this.find()
    .populate("parent", "name")
    .populate("children", "name slug")
    .sort({ name: 1 });

  const parentCategories = categories.filter((cat) => !cat.parent);
  const childCategories = categories.filter((cat) => cat.parent);

  parentCategories.forEach((parent) => {
    parent.children = childCategories.filter(
      (child) =>
        child.parent && child.parent._id.toString() === parent._id.toString()
    );
  });

  return parentCategories;
};

categorySchema.statics.getChildren = async function (parentId) {
  return await this.find({
    parent: parentId,
  }).sort({ name: 1 });
};

categorySchema.statics.getRootCategories = async function () {
  return await this.find({
    parent: null,
  }).sort({ name: 1 });
};

categorySchema.methods.isRoot = function () {
  return !this.parent;
};

categorySchema.methods.hasParent = function () {
  return !!this.parent;
};

const Category = mongoose.model("Category", categorySchema);

export default Category;
