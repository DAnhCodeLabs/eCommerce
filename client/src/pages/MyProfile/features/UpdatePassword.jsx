import React, { useState } from "react";
import { httpPut } from "../../../services/httpService";
import { Form, message } from "antd";
import CommonButton from "../../../components/commons/CommonButton";
import CustomForm from "../../../components/commons/CustomForm";

const UpdatePassword = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const formItems = [
    {
      type: "password",
      name: "currentPassword",
      label: "Current Password",
      required: true,
      placeholder: "Enter your current password",
      rules: [
        { required: true, message: "Please input your current password!" },
        { min: 6, message: "Password must be at least 6 characters." },
        { max: 50, message: "Password must not exceed 50 characters." },
      ],
    },
    {
      type: "password",
      name: "newPassword",
      label: "New Password",
      required: true,
      placeholder: "Enter your new password",
      rules: [
        { required: true, message: "Please input your new password!" },
        { min: 6, message: "Password must be at least 6 characters." },
        { max: 50, message: "Password must not exceed 50 characters." },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value || getFieldValue("currentPassword") !== value) {
              return Promise.resolve();
            }
            return Promise.reject(
              new Error("New password must be different from current password!")
            );
          },
        }),
      ],
    },
    {
      type: "password",
      name: "confirmPassword",
      label: "Confirm New Password",
      required: true,
      placeholder: "Confirm your new password",
      dependencies: ["newPassword"],
      rules: [
        { required: true, message: "Please confirm your new password!" },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value || getFieldValue("newPassword") === value) {
              return Promise.resolve();
            }
            return Promise.reject(new Error("The two passwords do not match!"));
          },
        }),
      ],
    },
  ];

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await httpPut("/auth/change-password", {
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });

      if (response.success) {
        message.success(response.message || "Password updated successfully!");
        form.resetFields();
      } else {
        message.error(response.message || "Failed to update password");
      }
    } catch (error) {
      console.error("Update password error:", error);
      message.error(
        error.response?.data?.message ||
          error.message ||
          "An error occurred while updating password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto">
      <div className="mb-6">
        <h2 className="font-semibold text-xl text-secondary">
          Update Password
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Please enter your current password and set a new password.
        </p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <CustomForm
          form={form}
          formItems={formItems}
          onFinish={onFinish}
          submitButtonComponent={(props) => (
            <CommonButton
              type="primary"
              htmlType="submit"
              loading={loading}
              className="w-full !bg-primary hover:!bg-primary/80"
            >
              Update Password
            </CommonButton>
          )}
        ></CustomForm>
      </div>
    </div>
  );
};

export default UpdatePassword;
