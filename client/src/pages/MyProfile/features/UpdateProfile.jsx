import React, { useEffect, useState } from "react";
import { Form, Card, message } from "antd";
import { useAuth } from "../../../contexts/AuthContext";
import { httpPut } from "../../../services/httpService";
import CommonButton from "../../../components/commons/CommonButton";
import CustomForm from "../../../components/commons/CustomForm";

const UpdateProfile = () => {
  const [state, setState] = useState("profile");
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useAuth();

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        username: user.name,
        email: user.email,
        phone: user.phone,
      });
    }
  }, [user, form]);

  const formItems = [
    {
      type: "email",
      name: "email",
      label: "Email",
      placeholder: "Nhập email",
      disabled: true,
    },
    {
      type: "text",
      name: "username",
      label: "Username",
      required: true,
      placeholder: "Enter your username",
      disabled: state === "profile",
      rules: [
        {
          min: 3,
          message: "Username phải có ít nhất 3 ký tự",
        },
        {
          max: 30,
          message: "Username không được quá 30 ký tự",
        },
      ],
    },
    {
      type: "text",
      name: "phone",
      label: "Phone Number",
      required: true,
      placeholder: "Nhập số điện thoại",
      disabled: state === "profile",
      rules: [
        {
          pattern: /^[0-9]+$/,
          message: "Số điện thoại chỉ chứa chữ số.",
        },
        {
          min: 10,
          message: "Số điện thoại phải có ít nhất 10 số",
        },
        {
          max: 15,
          message: "Số điện thoại không được quá 15 số",
        },
      ],
    },
  ];

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await httpPut("/auth/update-profile", {
        username: values.username,
        phone: values.phone,
      });

      if (response.success) {
        const updatedUser = {
          ...user,
          name: response.account.name,
          phone: response.account.phone,
        };
        localStorage.setItem("account", JSON.stringify(updatedUser));
        setUser(updatedUser);

        message.success(response.message);
        setTimeout(() => {
          setState("profile");
        }, 1000);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      console.error("Update profile error:", error);
      message.error(
        error.response?.data?.message ||
          error.message ||
          "Lỗi khi cập nhật thông tin"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = () => {
    setState("edit");
  };

  return (
    <div className="mx-auto">
      <h2 className="font-semibold text-xl text-secondary mb-6 md:mb-0">
        {state === "profile" ? "My Profile" : "Update Profile"}
      </h2>
      <p className="text-sm text-text-secondary mb-6 hidden md:block">
        This is where you can update your profile information.
      </p>

      {state === "profile" ? (
        <Card className="shadow-lg rounded-xl border-0">
          <div className="p-6 space-y-4">
            <div className="space-y-1">
              <p className="text-gray-500 text-sm font-medium">Email</p>
              <p className="text-gray-800 text-base font-normal truncate">
                {user?.email || "-"}
              </p>
              <div className="border-b border-gray-100 pt-1"></div>
            </div>
            <div className="space-y-1">
              <p className="text-gray-500 text-sm font-medium">Username</p>
              <p className="text-gray-800 text-base font-normal">
                {user?.name || "-"}
              </p>
              <div className="border-b border-gray-100 pt-1"></div>
            </div>
            <div className="space-y-1">
              <p className="text-gray-500 text-sm font-medium">Phone Number</p>
              <p className="text-gray-800 text-base font-normal">
                {user?.phone || "Not provided"}
              </p>
              <div className="border-b border-gray-100 pt-1"></div>
            </div>

            <div className="pt-2">
              <CommonButton
                type="primary"
                onClick={handleEditClick}
                block
                className="h-10 font-medium bg-secondary hover:bg-secondary/80 text-white rounded-lg"
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                }
              >
                Edit Profile
              </CommonButton>
            </div>
          </div>
        </Card>
      ) : (
        <CustomForm
          form={form}
          formItems={formItems}
          onFinish={onFinish}
          onCancel={() => setState("profile")}
          loading={loading}
          submitButtonComponent={(props) => (
            <CommonButton
              type="primary"
              htmlType="submit"
              loading={loading}
              disabled={loading}
              className="bg-blue-600 text-white hover:bg-blue-700"
              {...props}
            >
              Update
            </CommonButton>
          )}
          cancelButtonComponent={(props) => (
            <CommonButton
              htmlType="button"
              className="bg-gray-200 text-gray-700 hover:bg-gray-300"
              {...props}
            >
              Cancel
            </CommonButton>
          )}
          buttonsLayout="end"
        />
      )}
    </div>
  );
};

export default UpdateProfile;
