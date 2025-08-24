// UpdateBanner.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Form, message, Spin } from "antd";
import BreadcrumbHeader from "../../../components/BreadcrumbHeader";
import { httpGet, httpPut } from "../../../services/httpService";
import CommonButton from "../../../components/common/commons/CommonButton";
import CustomForm from "../../../components/common/commons/CustomForm";
import dayjs from "dayjs";

const UpdateBanner = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [banner, setBanner] = useState(null);

  useEffect(() => {
    fetchBannerDetails();
  }, [id]);

  const fetchBannerDetails = async () => {
    try {
      setInitialLoading(true);
      const response = await httpGet(`/admin/banners/${id}`);

      if (!response.banner) {
        message.error("Banner not found");
        navigate("/admin/banner");
        return;
      }

      setBanner(response.banner);

      // Format dates for form using dayjs
      const formData = {
        ...response.banner,
        startDate: response.banner.startDate
          ? dayjs(response.banner.startDate)
          : null,
        endDate: response.banner.endDate
          ? dayjs(response.banner.endDate)
          : null,
      };

      form.setFieldsValue(formData);
    } catch (error) {
      console.error("Error fetching banner details:", error);
      message.error(
        error.response?.data?.message || "Failed to load banner details"
      );
      navigate("/admin/banner");
    } finally {
      setInitialLoading(false);
    }
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);

      // Convert dayjs objects to ISO strings và xử lý giá trị checkbox
      const formattedValues = {
        ...values,
        startDate: values.startDate ? values.startDate.toISOString() : null,
        endDate: values.endDate ? values.endDate.toISOString() : null,
        isActive: values.isActive ?? false,
      };

      const response = await httpPut(
        `/admin/update-banner/${id}`,
        formattedValues
      );

      if (response.message) {
        message.success(response.message || "Banner updated successfully");
        navigate("/admin/banner");
      } else {
        message.error(response.error || "Failed to update banner");
      }
    } catch (error) {
      console.error("Error updating banner:", error);
      const errorMessage =
        error.response?.data?.error ||
        error.response?.data?.message ||
        error.message ||
        "Failed to update banner";
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/admin/banner");
  };

  // Custom validator for date comparison
  const validateEndDate = ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value) {
        return Promise.resolve();
      }

      const startDate = getFieldValue("startDate");
      if (!startDate) {
        return Promise.resolve();
      }

      if (value.isAfter(startDate)) {
        return Promise.resolve();
      }

      return Promise.reject(new Error("End date must be after start date"));
    },
  });

  const formItems = [
    {
      name: "title",
      label: "Title",
      type: "text",
      required: true,
      placeholder: "Enter banner title",
      colSpan: 24,
      rules: [
        { required: true, message: "Please enter banner title" },
        { min: 3, message: "Title must be at least 3 characters" },
        { max: 100, message: "Title cannot exceed 100 characters" },
      ],
    },
    {
      name: "subTitle",
      label: "Subtitle",
      type: "text",
      required: true,
      placeholder: "Enter banner subtitle",
      colSpan: 24,
      rules: [
        { required: true, message: "Please enter banner subtitle" },
        { min: 3, message: "Subtitle must be at least 3 characters" },
        { max: 200, message: "Subtitle cannot exceed 200 characters" },
      ],
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      required: true,
      placeholder: "Enter banner description",
      rows: 4,
      colSpan: 24,
      rules: [
        { required: true, message: "Please enter banner description" },
        { min: 10, message: "Description must be at least 10 characters" },
        { max: 500, message: "Description cannot exceed 500 characters" },
      ],
    },
    {
      name: "startDate",
      label: "Start Date",
      type: "datetime",
      ShowTime: true,
      required: true,
      placeholder: "Select start date",
      rules: [{ required: true, message: "Start date is required" }],
      colSpan: 12,
    },
    {
      name: "endDate",
      label: "End Date",
      type: "datetime",
      ShowTime: true,
      required: true,
      placeholder: "Select end date",
      rules: [
        { required: true, message: "End date is required" },
        validateEndDate,
      ],
      colSpan: 12,
    },
    {
      name: "isActive",
      label: "Active Status",
      type: "checkbox",
      colSpan: 12,
    },
  ];

  if (initialLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="px-6 py-4 bg-white rounded-xl">
        <BreadcrumbHeader
          title="Update Banner"
          breadcrumbItems={[
            { title: "Dashboard", href: "/admin" },
            { title: "Banner Management", href: "/admin/banner" },
            { title: "Update Banner" },
          ]}
        />
      </div>

      <Card
        title={`Update Banner: ${banner?.title || ""}`}
        className="shadow-md"
      >
        <CustomForm
          form={form}
          formItems={formItems}
          onFinish={handleSubmit}
          onCancel={handleCancel}
          loading={loading}
          submitText="Update Banner"
          cancelText="Cancel"
          buttonsLayout="end"
          submitButtonComponent={(props) => (
            <CommonButton
              type="primary"
              htmlType="submit"
              loading={loading}
              {...props}
            />
          )}
          cancelButtonComponent={(props) => (
            <CommonButton type="default" disabled={loading} {...props} />
          )}
        />
      </Card>
    </div>
  );
};

export default UpdateBanner;
