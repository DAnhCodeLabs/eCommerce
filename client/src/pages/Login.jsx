import React from "react";
import { assets } from "../assets/assets";
import { Divider, Button, Form, Input, message, Space } from "antd";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import InputField from "../components/InputField";

const Login = () => {
  const [form] = Form.useForm();
  const onFinish = () => {
    message.success("Submit success!");
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-primary">
      <div className="w-[1400px] mx-auto p-4">
        <div className="flex items-center justify-center gap-10">
          <div className="flex flex-col items-start justify-center w-1/2 bg-background-light p-8 rounded-3xl shadow-lg">
            <div className="flex flex-col items-start justify-center gap-4 w-full">
              <h1 className="text-2xl font-bold text-tertiary">Welcome back</h1>
              <div className="flex items-center justify-between gap-6 w-full">
                <button className="border border-secondary rounded-3xl py-2 px-8 text-center cursor-pointer hover:bg-secondary hover:text-white transition-colors duration-300 flex items-center justify-center gap-4 flex-1">
                  <FcGoogle className="text-2xl" />
                  Sign in with Google
                </button>
                <button className="border border-secondary rounded-3xl py-2 px-8 text-center cursor-pointer hover:bg-secondary hover:text-white transition-colors duration-300 flex items-center justify-center gap-4 flex-1">
                  <FaFacebook className="text-2xl" />
                  Sign in with Facebook
                </button>
              </div>
            </div>
            <Divider plain>OR</Divider>
            <div className="flex flex-col items-start justify-center gap-2 w-full">
              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                className="w-full"
              >
                <InputField
                  className="flex-1"
                  label={"Email"}
                  rules={[
                    { type: "email", message: "Email không hợp lệ." },
                    { min: 6, message: "Email phải có ít nhất 6 ký tự." },
                    { max: 50, message: "Email không được vượt quá 50 ký tự." },
                  ]}
                  name="email"
                  required={true}
                />
                <InputField
                  className="flex-1"
                  label={"Password"}
                  rules={[
                    { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự." },
                    { max: 50, message: "Mật khẩu không được vượt quá 50 ký tự." }
                  ]}
                  name="password"
                  required={true}
                />
              </Form>
            </div>
          </div>
          <div className="flex flex-col items-center justify-start w-1/2 p-8">
            <img src={assets.loginImg} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
