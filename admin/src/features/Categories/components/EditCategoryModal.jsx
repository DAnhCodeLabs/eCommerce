// src/pages/admin/categories/components/EditCategoryModal.jsx
import React, { useState, useEffect } from "react";
import { Form, Modal, message } from "antd";
import CommonButton from "../../../components/common/commons/CommonButton";
import CustomForm from "../../../components/common/commons/CustomForm";
import { httpGet, httpPut } from "../../../services/httpService";

const EditCategoryModal = ({ category, visible, onCancel, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [parentCategories, setParentCategories] = useState([]);
  const [isSubcategory, setIsSubcategory] = useState(false);

  useEffect(() => {
    if (visible && category) {
      fetchParentCategories();

      // Kiểm tra nếu là subcategory (có parent)
      // category.parent có thể là ObjectId string hoặc object được populate
      const hasParent = !!category.parent;
      setIsSubcategory(hasParent);

      // Determine parent id (category.parent can be populated object or id string)
      const parentId = hasParent
        ? category.parent && category.parent._id
          ? category.parent._id
          : category.parent
        : null;

      // Set giá trị form ban đầu
      form.setFieldsValue({
        name: category.name,
        description: category.description || "",
        parent: parentId,
        isActive: category.isActive,
        isEnabled: category.isEnabled,
      });
    } else if (!visible) {
      form.resetFields();
    }
  }, [visible, category, form]);

  const fetchParentCategories = async () => {
    try {
      const response = await httpGet("/admin/parent-categories");
      if (response.success) {
        setParentCategories(response.parentCategories);
      }
    } catch (error) {
      console.error("Error fetching parent categories:", error);
      message.error("Failed to load parent categories");
    }
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const formData = new FormData();

      // Thêm các trường dữ liệu vào formData
      Object.keys(values).forEach((key) => {
        if (key === "image" && values[key] && values[key].fileList) {
          // Xử lý file ảnh
          const fileList = values[key].fileList;
          if (fileList.length > 0 && fileList[0].originFileObj) {
            formData.append("image", fileList[0].originFileObj);
          }
        } else if (key === "parent") {
          // Chỉ append parent nếu đang chỉnh sửa subcategory
          if (isSubcategory) {
            formData.append("parent", values.parent || "");
          }
        } else if (values[key] !== undefined && values[key] !== null) {
          formData.append(key, values[key]);
        }
      });

      const response = await httpPut(
        `/admin/update-category/${category._id}`,
        formData
      );

      if (response.success) {
        message.success("Category updated successfully");
        onSuccess();
        onCancel();
      } else {
        message.error(response.message || "Failed to update category");
      }
    } catch (error) {
      console.error("Error updating category:", error);
      message.error("Error updating category");
    } finally {
      setLoading(false);
    }
  };

  // Build form items - chỉ hiển thị parent selector cho subcategory
  const formItems = [
    {
      name: "name",
      label: "Category Name",
      type: "text",
      placeholder: "Enter category name",
      required: true,
      colSpan: 24,
    },
    // Chỉ hiển thị parent selector khi là subcategory
    ...(isSubcategory
      ? [
          {
            name: "parent",
            label: "Parent Category",
            type: "select",
            placeholder: "Select parent category",
            options: parentCategories.map((p) => ({
              label: p.name,
              value: p._id,
            })),
            allowClear: true,
            colSpan: 24,
            rules: [
              {
                required: true,
                message: "Please select a parent category",
              },
            ],
          },
        ]
      : []),
    {
      name: "description",
      label: "Description",
      type: "textarea",
      placeholder: "Enter category description",
      rows: 3,
      colSpan: 24,
    },
    {
      name: "isActive",
      label: "Active Status",
      type: "checkbox",
      colSpan: 12,
    },
    {
      name: "isEnabled",
      label: "Enabled Status",
      type: "checkbox",
      colSpan: 12,
    },
  ];

  return (
    <Modal
      title={`Edit ${isSubcategory ? "Subcategory" : "Category"}: ${
        category?.name
      }`}
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={600}
      destroyOnClose
    >
      <CustomForm
        form={form}
        formItems={formItems}
        onFinish={handleSubmit}
        onCancel={onCancel}
        loading={loading}
        submitText="Update Category"
        cancelText="Cancel"
        layout="vertical"
        buttonsLayout="end"
        submitButtonComponent={(props) => (
          <CommonButton
            {...props}
            type="primary"
            htmlType="submit"
            className="bg-blue-600 hover:bg-blue-700"
          >
            {props.children}
          </CommonButton>
        )}
        cancelButtonComponent={(props) => (
          <CommonButton
            {...props}
            type="default"
            className="border-gray-300 hover:border-gray-400"
          >
            {props.children}
          </CommonButton>
        )}
      />
    </Modal>
  );
};

export default EditCategoryModal;
