import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    province: { type: String, required: true },
    district: { type: String, required: true },
    ward: { type: String, required: true },
    addressLine: { type: String, required: true },
    note: { type: String },
  },
  { _id: true }
);

const sellerInfoSchema = new mongoose.Schema(
  {
    taxcode: { type: String, required: true },
    dateOfIssue: { type: Date, required: true },
    ExpirationDate: { type: Date, required: true },
    PlaceOfGrant: { type: String, required: true },
    shopName: { type: String },
    addressSeller: { type: String },
    addressShop: { type: String },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    address: [addressSchema],
    sellerInfo: {
      type: sellerInfoSchema,
      default: undefined,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["user", "admin", "seller"],
      default: "user",
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    pendingEmail: {
      type: String,
    },
    otp: {
      type: String,
    },
    otpExpiry: {
      type: Date,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
