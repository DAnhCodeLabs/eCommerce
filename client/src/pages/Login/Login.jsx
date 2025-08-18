// Login.jsx (phiên bản đã được tối ưu)
import React, { useState } from "react";
import { Divider, Form, message } from "antd";
import { motion, AnimatePresence } from "framer-motion";
import { AuthHeader } from "./features/AuthHeader";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import AuthForm from "./features/AuthForm";
import { httpPost } from "../../services/httpService";
import Loader from "../../components/commons/Loader";
import ScrollFadeIn from "../../components/commons/ScrollFadeIn";

const Login = () => {
  const [state, setState] = useState("login");
  const [email, setEmail] = useState("");
  const [purpose, setPurpose] = useState("");
  const { setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      let response;

      switch (state) {
        case "register":
          response = await httpPost("/user/register/user", {
            username: values.username,
            email: values.email,
            phone: values.phone,
            password: values.password,
          });
          if (response.success) {
            setEmail(values.email);
            setState("verify");
          }
          break;

        case "verify":
          response = await httpPost("/auth/verify-otp", {
            email,
            otp: values.otp,
          });
          if (response.success) {
            setState(purpose === "forgot" ? "reset" : "login");
          }
          break;

        case "login":
          response = await httpPost("/auth/login-account", {
            email: values.email,
            password: values.password,
            type: "user",
          });
          if (response.success) {
            localStorage.setItem("token", response.token);
            localStorage.setItem("account", JSON.stringify(response.account));
            setUser(response.account);
            setTimeout(() => navigate("/"), 1500);
          }
          break;

        case "forgot":
          setPurpose("forgot");
          response = await httpPost("/auth/forgot-password", {
            email: values.email,
          });
          if (response.success) {
            setEmail(values.email);
            setState("verify");
          }
          break;

        case "reset":
          response = await httpPost("/auth/reset-password", {
            email,
            newPassword: values.password,
          });
          if (response.success) {
            setState("login");
          }
          break;

        default:
          message.error("Hành động không hợp lệ.");
          return;
      }

      response?.success
        ? message.success(response.message)
        : message.error(response.message);
    } catch (error) {
      const errMsg =
        error?.response?.message || "Có lỗi xảy ra, vui lòng thử lại!";
      message.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const onChange = (text) => {
    console.log("onChange:", text);
  };
  const onInput = (value) => {
    console.log("onInput:", value);
  };
  const sharedProps = {
    onChange,
    onInput,
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-primary">
      {loading && <Loader />}
      <div className="w-[1400px] mx-auto p-4">
        <ScrollFadeIn>
          <div className="flex items-center justify-center gap-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={state}
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="flex flex-col items-start justify-center w-1/2 bg-background p-8 rounded-3xl shadow-lg"
              >
                <AuthHeader state={state} />
                <AnimatePresence mode="wait">
                  <motion.div
                    key={state}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="w-full"
                  >
                    <div className="flex flex-col items-start justify-center gap-2 w-full">
                      <AuthForm
                        state={state}
                        form={form}
                        onFinish={onFinish}
                        setState={setState}
                        sharedProps={sharedProps}
                        purpose={purpose}
                      />
                    </div>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </AnimatePresence>

            <div className="flex flex-col items-center justify-start w-1/2 p-8">
              <img src={assets.loginImg} alt="" />
            </div>
          </div>
        </ScrollFadeIn>
      </div>
    </div>
  );
};

export default Login;
