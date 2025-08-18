import React, { useEffect } from "react";
import CustomForm from "../components/common/commons/CustomForm";
import CommonButton from "../components/common/commons/CommonButton";
import { httpPost } from "../services/httpService";
import { useNavigate } from "react-router-dom";
import { Form, message } from "antd";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Loading from "../components/common/commons/Loading";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { setUser, token } = useAuth();

  const formItems = [
    {
      name: "email",
      label: "Email",
      type: "text",
      rules: [{ required: true, message: "Please input your email!" }],
      placeholder: "Enter your email",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      rules: [{ required: true, message: "Please input your password!" }],
      placeholder: "Enter your password",
    },
  ];

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await httpPost("/auth/login-account", {
        email: values.email,
        password: values.password,
        type: "admin",
      });
      if (response.success) {
        message.success(response.message);
        localStorage.setItem("token", response.token);
        localStorage.setItem("account", JSON.stringify(response.account));
        setUser(response.account);
        setTimeout(() => {
          window.location.href = "/admin";
        }, 1500);
      }
    } catch (error) {
      const errMsg =
        error?.response?.message || "Có lỗi xảy ra, vui lòng thử lại!";
      message.error(errMsg);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-[#f7fafc] min-h-screen flex items-center justify-center p-4 relative">
      {loading && <Loading />}
      <div
        className="bg-white rounded-md shadow-md w-full max-w-xs p-6"
        aria-label="Sign In Form"
      >
        <h2 className="text-center text-gray-900 font-semibold text-lg mb-1">
          Sign In
        </h2>
        <p className="text-center text-gray-500 text-xs mb-6">
          Enter your credentials to continue
        </p>
        <CustomForm
          form={form}
          formItems={formItems}
          onFinish={onFinish}
          submitButtonComponent={(props) => (
            <CommonButton
              type="primary"
              htmlType="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 rounded transition-colors"
              loading={loading}
              {...props}
            >
              Sign In
            </CommonButton>
          )}
        />
      </div>
    </div>
  );
};

export default Login;
