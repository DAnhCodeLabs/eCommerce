import React, { use, useState } from "react";
import { assets } from "../assets/assets";
import { Divider, Form, Input, message, Space, Checkbox } from "antd";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import InputField from "../components/InputField";
import CommonButton from "../components/CommonButton";
import { motion, AnimatePresence } from "framer-motion";
import ScrollFadeIn from "../components/ScrollFadeIn";
import { httpPost } from "../services/httpService";

const Login = () => {
  const [state, setState] = useState("login");
  const [email, setEmail] = useState("");
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    if (state === "register") {
      try {
        const response = await httpPost("/user/register", {
          username: values.username,
          email: values.email,
          phone: values.phone,
          password: values.password,
        });
        if (response.success) {
          setEmail(values.email);
          setState("verify");
          message.success(response.message);
        } else {
          message.error(response.message);
        }
      } catch (error) {
        const errorMessage =
          error.response?.message ||
          "An error occurred. Please try again.";
        message.error(errorMessage);
      }
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
      <div className="w-[1400px] mx-auto p-4">
        <ScrollFadeIn>
          {" "}
          <div className="flex items-center justify-center gap-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={state}
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="flex flex-col items-start justify-center w-1/2 bg-background-light p-8 rounded-3xl shadow-lg"
              >
                <div className="flex flex-col items-start justify-center gap-4 w-full">
                  <h1 className="text-2xl font-bold text-secondary">
                    {state === "login"
                      ? "Welcome back"
                      : state === "register"
                      ? "Sign up to get started"
                      : state === "forgot"
                      ? "Let’s reset your password"
                      : state === "reset"
                      ? "You're almost there"
                      : state === "verify"
                      ? "Let’s verify it’s you"
                      : ""}
                  </h1>
                  {(state === "login" || state === "register") && (
                    <div className="flex items-center justify-between gap-6 w-full">
                      <button className="border border-secondary rounded-lg py-2 px-8 text-center cursor-pointer hover:bg-secondary hover:text-white transition-colors duration-300 flex items-center justify-center gap-4 flex-1">
                        <FcGoogle className="text-2xl" />
                        Sign {state === "login" ? "in" : "up"} with Google
                      </button>
                      <button className="border border-secondary rounded-lg py-2 px-8 text-center cursor-pointer hover:bg-secondary hover:text-white transition-colors duration-300 flex items-center justify-center gap-4 flex-1">
                        <FaFacebook className="text-2xl" />
                        Sign {state === "login" ? "in" : "up"} with Facebook
                      </button>
                    </div>
                  )}
                </div>
                {(state === "login" || state === "register") && (
                  <Divider plain>OR</Divider>
                )}
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
                      <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                        className="w-full"
                      >
                        {state === "register" && (
                          <InputField
                            type="text"
                            label={"Username"}
                            name={"username"}
                            required={true}
                            rules={[
                              {
                                min: 3,
                                message:
                                  "Username must be at least 3 characters.",
                              },
                              {
                                max: 20,
                                message:
                                  "Username cannot exceed 20 characters.",
                              },
                            ]}
                          />
                        )}

                        {(state === "login" ||
                          state === "register" ||
                          state === "forgot") && (
                          <InputField
                            className="flex-1"
                            label={"Email"}
                            rules={[
                              { type: "email", message: "Email không hợp lệ." },
                              {
                                min: 6,
                                message: "Email phải có ít nhất 6 ký tự.",
                              },
                              {
                                max: 50,
                                message: "Email không được vượt quá 50 ký tự.",
                              },
                            ]}
                            name="email"
                            required={true}
                          />
                        )}

                        {state === "register" && (
                          <InputField
                            type="number"
                            label={"Phone Number"}
                            name={"phone"}
                            required={true}
                            rules={[
                              {
                                pattern: /^\d{10,11}$/,
                                message:
                                  "Số điện thoại phải có 10 hoặc 11 chữ số.",
                              },
                              {
                                max: 11,
                                message:
                                  "Số điện thoại không được vượt quá 11 chữ số.",
                              },
                              {
                                min: 10,
                                message:
                                  "Số điện thoại phải có ít nhất 10 chữ số.",
                              },
                            ]}
                          />
                        )}

                        {(state === "login" ||
                          state === "register" ||
                          state === "reset") && (
                          <InputField
                            className="flex-1"
                            label={"Password"}
                            type="password"
                            rules={[
                              {
                                min: 6,
                                message: "Mật khẩu phải có ít nhất 6 ký tự.",
                              },
                              {
                                max: 50,
                                message:
                                  "Mật khẩu không được vượt quá 50 ký tự.",
                              },
                            ]}
                            name="password"
                            required={true}
                          />
                        )}
                        {state === "verify" && (
                          <div className="col-span-2 flex justify-center items-center">
                            <Form.Item
                              label="Mã OTP"
                              name="otp"
                              rules={[
                                {
                                  required: true,
                                  message: "Vui lòng nhập mã OTP!",
                                },
                              ]}
                              className="mb-0 w-full max-w-[250px]"
                            >
                              <Input.OTP
                                className="!w-full"
                                formatter={(str) => str.toUpperCase()}
                                {...sharedProps}
                              />
                            </Form.Item>
                          </div>
                        )}

                        <Space className="w-full justify-between">
                          {state === "login" && (
                            <Form.Item name="remember" valuePropName="checked">
                              <Checkbox>
                                {state === "login"
                                  ? "Remember account"
                                  : "I agree to the terms of service"}
                              </Checkbox>
                            </Form.Item>
                          )}
                          {(state === "login" || state === "register") && (
                            <a
                              href="#"
                              className="text-secondary hover:underline"
                              onClick={() => setState("forgot")}
                            >
                              Forgot password?
                            </a>
                          )}
                        </Space>
                        <Form.Item>
                          <CommonButton
                            type="primary"
                            htmlType="submit"
                            block
                            className={
                              "w-full mt-4 !rounded-lg !bg-secondary hover:!bg-tertiary duration-300 transition-all ease-in-out"
                            }
                          >
                            {state === "login"
                              ? "Sign in to your account"
                              : state === "register"
                              ? "Join us today"
                              : state === "forgot"
                              ? "Recover your account"
                              : state === "reset"
                              ? "Save your new password"
                              : state === "verify"
                              ? "Confirm your email to continue"
                              : ""}
                          </CommonButton>
                        </Form.Item>
                        <div className="mt-4">
                          <p class="text-sm font-light text-secondary">
                            {state === "login"
                              ? "Don't have an account?"
                              : "Already have an account?"}

                            <a
                              href="#"
                              class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                              onClick={
                                state === "login"
                                  ? () => setState("register")
                                  : () => setState("login")
                              }
                            >
                              {state === "login" ? " Sign up" : " Sign in"}
                            </a>
                          </p>
                        </div>
                      </Form>
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
