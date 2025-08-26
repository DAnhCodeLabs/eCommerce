// Banner.jsx (Component chính đã được tái cấu trúc)
import React, { useState, useEffect } from "react";
import { Form, message } from "antd";
import BreadcrumbHeader from "../../components/BreadcrumbHeader";
import CommonButton from "../../components/common/commons/CommonButton";
import { Link } from "react-router-dom";
import { httpGet, httpDelete } from "../../services/httpService";
import { BannerTable, BannerFilters } from "./components";

const Banner = () => {
  const [form] = Form.useForm();
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  // Fetch banners from API
  const fetchBanners = async (params = {}) => {
    try {
      setLoading(true);

      // Get current form values for filtering
      const formValues = form.getFieldsValue();

      const query = {
        page: params.current || pagination.current,
        limit: params.pageSize || pagination.pageSize,
        ...(formValues.search && { search: formValues.search }),
        ...(formValues.isActive !== undefined && {
          isActive: formValues.isActive,
        }),
        ...(formValues.dateRange &&
          formValues.dateRange[0] && {
            startDate: formValues.dateRange[0].toISOString(),
          }),
        ...(formValues.dateRange &&
          formValues.dateRange[1] && {
            endDate: formValues.dateRange[1].toISOString(),
          }),
        ...(params.sortBy && { sortBy: params.sortBy }),
        ...(params.sortOrder && { sortOrder: params.sortOrder }),
      };

      const queryParams = new URLSearchParams(query).toString();
      const response = await httpGet(`/admin/banners?${queryParams}`);

      setBanners(response.banners);
      setPagination({
        current: response.pagination.currentPage,
        pageSize: response.pagination.itemsPerPage,
        total: response.pagination.totalItems,
      });
    } catch (error) {
      console.error("Error fetching banners:", error);
      message.error("Failed to fetch banners");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  // Handle table changes (pagination, sorting)
  const handleTableChange = (newPagination, filters, sorter) => {
    const params = {
      current: newPagination.current,
      pageSize: newPagination.pageSize,
      ...(sorter.field && { sortBy: sorter.field }),
      ...(sorter.order && {
        sortOrder: sorter.order === "ascend" ? "asc" : "desc",
      }),
    };
    fetchBanners(params);
  };

  const handleFormChange = () => {
    setPagination({ ...pagination, current: 1 });
    clearTimeout(window.filterTimeout);
    window.filterTimeout = setTimeout(() => {
      fetchBanners({ current: 1 });
    }, 500);
  };

  const handleReset = () => {
    form.resetFields();
    setPagination({ ...pagination, current: 1 });
    fetchBanners({ current: 1 });
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const response = await httpDelete(`/admin/delete-banner/${id}`);

      message.success(response.message);
      fetchBanners({
        current: pagination.current,
        pageSize: pagination.pageSize,
      });
    } catch (error) {
      console.error("Error deleting banner:", error);

      if (error.response?.status === 404) {
        message.error("Banner not found");
      } else if (error.response?.status === 400) {
        message.error("Invalid banner ID");
      } else {
        message.error("Failed to delete banner");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="px-6 py-4 bg-white rounded-xl">
        <BreadcrumbHeader
          title={"Banner Management"}
          breadcrumbItems={[
            { title: "Dashboard", href: "/admin" },
            { title: "Banner" },
          ]}
        />
      </div>

      {/* Filter Section */}
      <div className="bg-white rounded-xl p-6">
        <BannerFilters
          form={form}
          onFormChange={handleFormChange}
          onReset={handleReset}
        />
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Banner List</h3>
          <CommonButton type="primary">
            <Link to={"/admin/add-banner"}>Add Banner</Link>
          </CommonButton>
        </div>

        <BannerTable
          banners={banners}
          loading={loading}
          pagination={pagination}
          onTableChange={handleTableChange}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default Banner;
