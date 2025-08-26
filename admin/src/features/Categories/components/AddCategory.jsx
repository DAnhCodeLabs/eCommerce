import React, { useState } from "react";
import BreadcrumbHeader from "../../../components/BreadcrumbHeader";
import CustomForm from "../../../components/common/commons/CustomForm";
import { Form, message } from "antd";
import CommonButton from "../../../components/common/commons/CommonButton";
import { useNavigate } from "react-router-dom";
import { httpPost } from "../../../services/httpService";

const AddCategory = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.description || "");
      formData.append("isActive", values.isActive);
      if (values.image && values.image.length > 0) {
        formData.append("image", values.image[0].originFileObj);
      }
      const response = await httpPost("/admin/add-category", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      message.success(response.message);
      navigate("/admin/categories");
    } catch (error) {
      console.error("Error adding banner:", error);
      if (error.response?.data?.message) {
        message.error(error.response.data.message);
      } else {
        message.error("Failed to add banner. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };
  const handleCancel = () => {
    navigate("/admin/categories");
  };
  const formItems = [
    {
      name: "name",
      label: "Category Name",
      type: "text",
      rules: [{ required: true, message: "Please enter category name" }],
      placeholder: "Enter category name",
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      rules: [{ required: false }],
      placeholder: "Enter description",
    },
    {
      name: "image",
      label: "Image URL",
      type: "upload",
      listType: "picture-card",
      acceptType: "image",
      multiple: false,
      maxCount: 1,
      rules: [{ required: true, message: "Category image is required" }],
    },
    {
      name: "isActive",
      label: "Active Status",
      type: "checkbox",
      rules: [{ required: false }],
      initialValue: true,
    },
  ];
  return (
    <div className="flex flex-col gap-4">
      <div className="px-6 py-4 bg-white rounded-xl">
        <BreadcrumbHeader
          title={"Categories Management"}
          breadcrumbItems={[
            { title: "Dashboard", href: "/admin" },
            { title: "Categories", href: "/admin/categories" },
            { title: "Add Category" },
          ]}
        />
      </div>
      <div className="bg-white rounded-xl p-6">
        <CustomForm
          form={form}
          formItems={formItems}
          onFinish={onFinish}
          onCancel={handleCancel}
          loading={loading}
          submitButtonComponent={(props) => (
            <CommonButton
              type="primary"
              htmlType="submit"
              loading={loading}
              {...props}
            >
              Create
            </CommonButton>
          )}
          cancelButtonComponent={(props) => (
            <CommonButton type="default" onClick={handleCancel}>
              Cancel
            </CommonButton>
          )}
          buttonsLayout="end"
        />
      </div>
    </div>
  );
};

export default AddCategory;
