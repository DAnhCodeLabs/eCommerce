import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import validator from "validator";
import User from "../../models/userModel.js";
import sendEmail from "../../utils/sendEmail.js";
import { otpEmailTemplate } from "../../utils/emailTemplates.js";
import { cloudinary } from "../../config/cloudinary.js";
dotenv.config();

export const signUpUser = async (req, res) => {
  try {
    const { username, phone, email, password } = req.body;
    if (!username || !phone || !email || !password) {
      return res.json({
        success: false,
        message: "Please do not leave information blank!",
      });
    }
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Email is not in the correct format. Please check again!",
      });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.json({
        success: false,
        message: "Email already registered. Please enter another Email",
      });
    }
    const existingPhone = await User.findOne({ phone });
    if (existingPhone) {
      return res.json({
        success: false,
        message:
          "Phone number is already registered. Please enter another number",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      phone,
      password: hashedPassword,
      role: "user",
      emailVerified: false,
    });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    newUser.otp = otp;
    newUser.otpExpiry = Date.now() + 10 * 60 * 1000;

    await newUser.save();

    await sendEmail({
      to: email,
      subject: "Your email confirmation code",
      html: otpEmailTemplate(otp),
    });

    return res.json({
      success: true,
      message:
        "OTP code has been sent to your Email, Please check your Email to verify your account",
    });
  } catch (error) {
    console.log(error);
    if (error.name === "ValidationError") {
      return res.json({ message: error.message });
    }
    return res.json({ message: "Server error" });
  }
};

export const registerSeller = async (req, res) => {
  try {
    const userID = req.user?.id;
    if (!userID) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // Accept either req.body.sellerInfo or top-level fields sent by frontend
    const body = req.body || {};
    const sellerInfo =
      body.sellerInfo && typeof body.sellerInfo === "object"
        ? { ...body.sellerInfo }
        : {
            taxcode: body.taxcode,
            dateOfIssue: body.dateOfIssue,
            ExpirationDate: body.ExpirationDate,
            PlaceOfGrant: body.PlaceOfGrant,
            shopName: body.shopName,
            addressSeller: body.addressSeller,
            addressShop: body.addressShop,
          };

    // Validate required fields
    if (
      !sellerInfo.taxcode ||
      !sellerInfo.dateOfIssue ||
      !sellerInfo.ExpirationDate ||
      !sellerInfo.PlaceOfGrant
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required seller information!",
      });
    }

    // Parse dates and validate
    const dateOfIssue = new Date(sellerInfo.dateOfIssue);
    const ExpirationDate = new Date(sellerInfo.ExpirationDate);
    if (isNaN(dateOfIssue.getTime()) || isNaN(ExpirationDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid date format for dateOfIssue or ExpirationDate",
      });
    }
    sellerInfo.dateOfIssue = dateOfIssue;
    sellerInfo.ExpirationDate = ExpirationDate;

    const user = await User.findById(userID);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.role === "seller") {
      return res.status(400).json({
        success: false,
        message: "You are already a seller",
      });
    }
    if (user.isBlocked) {
      return res.status(403).json({
        success: false,
        message: "Your account has been blocked. Please contact support!",
      });
    }

    // Assign sellerInfo and promote role
    user.sellerInfo = sellerInfo;
    user.role = "seller";
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Seller registration successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        sellerInfo: user.sellerInfo,
      },
    });
  } catch (error) {
    console.error("Register seller error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({
        success: false,
        message: "Please enter complete information!",
      });
    }

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    // Kiểm tra đăng nhập admin
    if (email === adminEmail) {
      const isAdminMatch = await bcrypt.compare(password, adminPassword);

      if (!isAdminMatch) {
        return res.json({
          success: false,
          message: "Incorrect account or password, please check again",
        });
      }

      const token = jwt.sign({ email, role: "admin" }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      return res.json({
        success: true,
        message: "Administrator login successful",
        token,
        account: {
          email,
          role: "admin",
        },
      });
    }

    const account = await User.findOne({ email });
    if (!account) {
      return res.json({
        success: false,
        message: "Account does not exist. Please check again!",
      });
    }

    if (!account.emailVerified) {
      return res.json({
        success: false,
        message:
          "Email not verified. Please check your email inbox for verification!",
      });
    }

    if (account.isBlocked) {
      return res.json({
        success: false,
        message:
          "Your account is locked. Please contact the operator for processing!",
      });
    }

    const isMatch = await bcrypt.compare(password, account.password);
    if (!isMatch) {
      return res.json({
        success: false,
        message: "Incorrect account or password",
      });
    }

    const token = jwt.sign(
      { id: account._id, role: account.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    let userData = {
      id: account._id,
      name: account.username,
      email: account.email,
      phone: account.phone,
      role: account.role,
    };

    if (account.role === "seller") {
      userData = {
        ...userData,
        addressSeller: account.addressSeller,
        addressShop: account.addressShop,
        country: account.country,
        shopName: account.shopName,
      };
    }

    return res.json({
      success: true,
      message: "Login successful",
      token,
      account: userData,
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.json({
      success: false,
      message: "Server error. Please try again!",
    });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.json({
        success: false,
        message: "Email and OTP cannot be left blank!",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "Account does not exist" });
    }
    if (user.otp !== otp) {
      return res.json({
        success: false,
        message: "OTP code is incorrect. Please check again!",
      });
    }

    if (user.otpExpiry < Date.now()) {
      return res.json({ success: false, message: "OTP code has expired" });
    }

    user.emailVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    return res.json({
      success: true,
      message: "Email verification successful, please log in to your account.",
    });
  } catch (error) {
    console.error(error);
    return res.json({ message: "Server error" });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Email is not in the correct format",
      });
    }

    const user = await User.findOne({ email });
    if (user) {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();

      user.otp = otp;
      user.otpExpiry = Date.now() + 10 * 60 * 100;
      await user.save();

      await sendEmail({
        to: email,
        subject: "Mã xác nhận email quên mật khẩu:",
        html: otpEmailTemplate(otp),
      });
    }

    return res.json({
      success: true,
      message: "OTP code has been sent to your Email",
    });
  } catch (error) {
    console.log(error);
    return res.json({ message: "Lỗi máy chủ" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    if (!email || !newPassword) {
      return res.json({
        success: false,
        message: "Please enter complete information!",
      });
    }

    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Email is not in correct format.",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "Account does not exist" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    return res.json({
      success: true,
      message: "Password reset successful. Please log in again.",
    });
  } catch (error) {
    console.log(error);
    return res.json({ message: "Lỗi máy chủ" });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id;
    if (!currentPassword || !newPassword) {
      return res.json({
        success: false,
        message: "Do not leave password blank!",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "Account does not exist" });
    }

    if (user.isBlocked) {
      return res.json({
        success: false,
        message:
          "Account has been locked, please contact the hotline for support!",
      });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.json({
        success: false,
        message: "Old password is incorrect!",
      });
    }

    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword) {
      return res.json({
        success: false,
        message: "New password cannot be the same as old password!",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    return res.json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Server error. Please try again later",
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userID = req.user.id;
    const { username, phone } = req.body;

    if (!username && !phone) {
      return res.status(400).json({
        success: false,
        message: "Please provide the information that needs to be updated",
      });
    }

    if (phone && !/^[0-9]{10,15}$/.test(phone)) {
      return res.status(400).json({
        success: false,
        message: "Invalid phone number (only numbers, 10-15 characters)",
      });
    }
    if (username && (username.length < 3 || username.length > 30)) {
      return res.status(400).json({
        success: false,
        message: "Username must be between 3 and 30 characters",
      });
    }

    const user = await User.findById(userID);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }

    if (user.isBlocked) {
      return res.status(403).json({
        success: false,
        message:
          "Account has been locked, please contact the hotline for support!",
      });
    }
    if (username === user.username && phone === user.phone) {
      return res.json({
        success: true,
        message: "No information has changed",
        account: {
          name: user.username,
          phone: user.phone,
        },
      });
    }

    if (username) user.username = username;
    if (phone) user.phone = phone;

    await user.save();

    return res.json({
      success: true,
      message: "Update information successfully",
      account: {
        name: user.username,
        phone: user.phone,
      },
    });
  } catch (error) {
    console.error("Update profile error:", error);
    return res.status(500).json({
      success: false,
      message: "Lỗi máy chủ khi cập nhật thông tin",
    });
  }
};

export const createAddress = async (req, res) => {
  try {
    const userID = req.user.id;
    const { fullName, phone, province, ward, district, addressLine, note } =
      req.body;

    // Validate input
    if (
      !fullName ||
      !phone ||
      !province ||
      !ward ||
      !district ||
      !addressLine
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required address information!",
      });
    }

    // Validate phone number
    if (!/^[0-9]{10,11}$/.test(phone)) {
      return res.status(400).json({
        success: false,
        message: "Invalid phone number format!",
      });
    }

    const user = await User.findById(userID);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }

    const newAddress = {
      fullName,
      phone,
      province,
      ward,
      district,
      addressLine,
      note: note || "",
    };

    user.address.push(newAddress);
    await user.save();

    return res.json({
      success: true,
      message: "Address added successfully",
      address: user.address,
    });
  } catch (error) {
    console.error("Create address error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

export const updateAddress = async (req, res) => {
  try {
    const userID = req.user.id;
    const addressID = req.params.id;
    const { fullName, phone, province, ward, district, addressLine, note } =
      req.body;

    // Validate input
    if (
      !fullName ||
      !phone ||
      !province ||
      !ward ||
      !district ||
      !addressLine
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required address information!",
      });
    }

    const user = await User.findById(userID);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }

    const addressToUpdate = user.address.id(addressID);
    if (!addressToUpdate) {
      return res.status(404).json({
        success: false,
        message: "Address not found!",
      });
    }

    // Update address fields
    addressToUpdate.fullName = fullName;
    addressToUpdate.phone = phone;
    addressToUpdate.province = province;
    addressToUpdate.ward = ward;
    addressToUpdate.district = district;
    addressToUpdate.addressLine = addressLine;
    addressToUpdate.note = note || "";

    await user.save();

    return res.json({
      success: true,
      message: "Address updated successfully",
      address: user.address,
    });
  } catch (error) {
    console.error("Update address error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

export const getAddress = async (req, res) => {
  try {
    const userID = req.user.id;
    const user = await User.findById(userID);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }

    if (user.isBlocked) {
      return res.status(403).json({
        success: false,
        message: "Your account has been blocked. Please contact support!",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Get address list successfully",
      address: user.address,
    });
  } catch (error) {
    console.error("Get address error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

export const deleteAddress = async (req, res) => {
  try {
    const addressId = req.params.id;
    const userId = req.user.id;

    if (!addressId) {
      return res.status(400).json({
        success: false,
        message: "Address ID is required",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.isBlocked) {
      return res.status(403).json({
        success: false,
        message: "Your account is blocked. Please contact support.",
      });
    }

    // Kiểm tra địa chỉ có tồn tại không
    const addressIndex = user.address.findIndex(
      (addr) => addr._id.toString() === addressId
    );

    if (addressIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    // Xóa địa chỉ bằng splice để hiệu quả hơn
    user.address.splice(addressIndex, 1);
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Address deleted successfully",
      address: user.address,
    });
  } catch (error) {
    console.error("Delete address error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete address. Please try again later.",
    });
  }
};
