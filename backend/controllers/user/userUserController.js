import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import validator from "validator";
import User from "../../models/userModel.js";
import sendEmail from "../../utils/sendEmail.js";
import { otpEmailTemplate } from "../../utils/emailTemplates.js";;
dotenv.config();


export const signUpUser = async (req, res) => {
  try {
    const { username, phone, email, password } = req.body;
    if (!username || !phone || !email || !password) {
      return res.json({
        success: false,
        message: "Vui lòng không bỏ trống thông tin!",
      });
    }
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Email không đúng định dạng. Vui lòng kiểm tra lại!",
      });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.json({
        success: false,
        message: "Email đã được đăng ký. Hãy nhập Email khác",
      });
    }
    const existingPhone = await User.findOne({ phone });
    if (existingPhone) {
      return res.json({
        success: false,
        message: "Số điện thoại đã được đăng ký. Hãy nhập số khác",
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
      subject: "Mã xác nhận email của bạn:",
      html: otpEmailTemplate(otp),
    });

    return res.json({
      success: true,
      message:
        "Mã OTP đã được gửi tới Email của bạn, Hãy kiểm tra Email để xác thực tài khoản",
    });
  } catch (error) {
    console.log(error);
    if (error.name === "ValidationError") {
      return res.json({ message: error.message });
    }
    return res.json({ message: "Server error" });
  }
};
