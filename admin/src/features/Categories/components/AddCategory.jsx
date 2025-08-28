import React, { useEffect, useState } from "react";
import BreadcrumbHeader from "../../../components/BreadcrumbHeader";
import CustomForm from "../../../components/common/commons/CustomForm";
import { Form, message } from "antd";
import CommonButton from "../../../components/common/commons/CommonButton";
import { useNavigate, useSearchParams } from "react-router-dom";
import { httpGet, httpPost } from "../../../services/httpService";

const AddCategory = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isSubcategory, setIsSubcategory] = useState(false);
  const [parentCategories, setParentCategories] = useState([]);

  useEffect(() => {
    const type = searchParams.get("type");
    setIsSubcategory(type === "subcategory");

    if (type === "subcategory") {
      fetchParentCategories();
    }
  }, [searchParams]);

  const fetchParentCategories = async () => {
    try {
      const response = await httpGet("/admin/parent-categories");
      setParentCategories(response.parentCategories);
    } catch (error) {
      console.error("Error fetching parent categories:", error);
      message.error("Failed to load parent categories");
    }
  };
  const onFinish = async (values) => {
    setLoading(true);
    try {
      const formData = new FormData();
      if (isSubcategory) {
        formData.append("name", values.name);
        formData.append("parentId", values.parentId);
        formData.append("description", values.description || "");

        const response = await httpPost("/admin/add-subcategory", {
          name: values.name,
          parentId: values.parentId,
          description: values.description || "",
          isEnabled: values.isEnabled || false,
        });
        message.success(response.message);
      } else {
        formData.append("name", values.name);
        formData.append("description", values.description || "");
        formData.append("isActive", values.isActive || false);
        formData.append("isEnabled", values.isEnabled || false);
        if (values.image && values.image.length > 0) {
          formData.append("image", values.image[0].originFileObj);
        }

        const response = await httpPost("/admin/add-category", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        message.success(response.message);
      }

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
  const baseFormItems = [
    {
      name: "name",
      label: isSubcategory ? "Subcategory Name" : "Category Name",
      type: "text",
      rules: [
        {
          required: true,
          message: `Please enter ${
            isSubcategory ? "subcategory" : "category"
          } name`,
        },
      ],
      placeholder: `Enter ${isSubcategory ? "subcategory" : "category"} name`,
    },
  ];

  const subcategoryFormItems = [
    {
      name: "parentId",
      label: "Parent Category",
      type: "select",
      options: parentCategories.map((cat) => ({
        value: cat._id,
        label: cat.name,
      })),
      rules: [{ required: true, message: "Please select a parent category" }],
      placeholder: "Select parent category",
    },
    {
      name: "isEnabled",
      label: "Enabled Category",
      type: "checkbox",
      rules: [{ required: false }],
      initialValue: false,
      valuePropName: "checked",
    },
  ];

  const categoryFormItems = [
    {
      name: "description",
      label: "Description",
      type: "textarea",
      rules: [{ required: false }],
      placeholder: "Enter description",
    },
    {
      name: "image",
      label: "Image",
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
      initialValue: false,
      valuePropName: "checked",
    },
    {
      name: "isEnabled",
      label: "Enabled Category",
      type: "checkbox",
      rules: [{ required: false }],
      initialValue: false,
      valuePropName: "checked",
    },
  ];

  const formItems = isSubcategory
    ? [...baseFormItems, ...subcategoryFormItems]
    : [...baseFormItems, ...categoryFormItems];

  return (
    <div className="flex flex-col gap-4">
      <div className="px-6 py-4 bg-white rounded-xl">
        <BreadcrumbHeader
          title={"Categories Management"}
          breadcrumbItems={[
            { title: "Dashboard", href: "/admin" },
            { title: "Categories", href: "/admin/categories" },
            { title: isSubcategory ? "Add Subcategory" : "Add Category" },
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
              {isSubcategory ? "Create Subcategory" : "Create Category"}
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
