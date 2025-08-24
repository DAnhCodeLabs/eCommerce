import React, { useState } from "react";
import BreadcrumbHeader from "../../../components/BreadcrumbHeader";
import { useNavigate } from "react-router-dom";
import CustomForm from "../../../components/common/commons/CustomForm";
import { Form, message } from "antd";
import { httpPost } from "../../../services/httpService";
import CommonButton from "../../../components/common/commons/CommonButton";

const AddBanner = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      setLoading(true);

      // Tạo FormData để gửi file ảnh
      const formData = new FormData();

      // Thêm các trường dữ liệu vào FormData
      formData.append("title", values.title);
      formData.append("subTitle", values.subTitle);
      formData.append("description", values.description);
      formData.append("isActive", values.isActive || true);

      // Xử lý ngày tháng
      if (values.startDate) {
        formData.append("startDate", values.startDate.format("YYYY-MM-DD"));
      }
      if (values.endDate) {
        formData.append("endDate", values.endDate.format("YYYY-MM-DD"));
      }

      // Thêm file ảnh nếu có
      if (values.image && values.image.length > 0) {
        formData.append("image", values.image[0].originFileObj);
      }

      // Gọi API thêm banner
      const response = await httpPost("/admin/add-banner", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Hiển thị thông báo thành công
      message.success(response.message || "Banner added successfully");

      // Quay lại trang quản lý banner
      navigate("/admin/banner");
    } catch (error) {
      console.error("Error adding banner:", error);

      // Hiển thị thông báo lỗi
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
    navigate("/admin/banner");
  };
  const formItems = [
    {
      name: "title",
      label: "Title",
      type: "text",
      placeholder: "Enter banner title",
      rules: [{ required: true, message: "Title is required" }],
    },
    {
      name: "subTitle",
      label: "Sub Title",
      type: "text",
      placeholder: "Enter banner sub title",
      rules: [{ required: true, message: "Sub Title is required" }],
    },
    {
      name: "description",
      label: "Description",
      type: "text",
      placeholder: "Enter banner description",
      rules: [{ required: true, message: "Description is required" }],
    },
    {
      name: "startDate",
      label: "Start Date",
      type: "datetime",
      ShowTime: true,
      placeholder: "Enter banner start date",
      rules: [{ required: true, message: "Start date is required" }],
      colSpan: 12,
    },
    {
      name: "endDate",
      label: "End Date",
      type: "datetime",
      ShowTime: true,
      placeholder: "Select end date",
      rules: [
        { required: true, message: "End date is required" },
        ({ getFieldValue }) => ({
          validator(_, value) {
            const startDate = getFieldValue("startDate");
            if (!value || !startDate || value.isAfter(startDate)) {
              return Promise.resolve();
            }
            return Promise.reject(
              new Error("End date must be after start date")
            );
          },
        }),
      ],
      colSpan: 12,
    },

    {
      name: "image",
      label: "Banner Image",
      type: "upload",
      listType: "picture-card",
      acceptType: "image",
      multiple: false,
      maxCount: 1,
      rules: [{ required: true, message: "Banner image is required" }],
    },
  ];
  return (
    <div className="flex flex-col gap-4">
      <div className="px-6 py-4 bg-white rounded-xl">
        <BreadcrumbHeader
          title={"Add Banner"}
          breadcrumbItems={[
            { title: "Dashboard", href: "/admin" },
            { title: "Banner", href: "/admin/banner" },
            { title: "Add Banner" },
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

export default AddBanner;
