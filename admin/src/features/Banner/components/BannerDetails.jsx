import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Descriptions, Button, Spin, Image, Tag, message } from "antd";
import {
  EyeOutlined,
  EditOutlined,
  CalendarOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import BreadcrumbHeader from "../../../components/BreadcrumbHeader";
import { httpGet } from "../../../services/httpService";
import CommonButton from "../../../components/common/commons/CommonButton";

const BannerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBannerDetails();
  }, [id]);

  const fetchBannerDetails = async () => {
    try {
      setLoading(true);
      const response = await httpGet(`/admin/banners/${id}`);
      setBanner(response.banner);
    } catch (error) {
      console.error("Error fetching banner details:", error);
      message.error("Failed to load banner details");
    } finally {
      setLoading(false);
    }
  };

  const getStatusTag = (bannerData) => {
    const now = new Date();
    const startDate = new Date(bannerData.startDate);
    const endDate = bannerData.endDate ? new Date(bannerData.endDate) : null;

    if (!bannerData.isActive) {
      return <Tag color="red">Inactive</Tag>;
    }

    if (startDate > now) {
      return <Tag color="orange">Scheduled</Tag>;
    }

    if (endDate && endDate < now) {
      return <Tag color="red">Expired</Tag>;
    }

    return <Tag color="green">Active</Tag>;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }

  if (!banner) {
    return (
      <div className="flex flex-col gap-4">
        <div className="px-6 py-4 bg-white rounded-xl">
          <BreadcrumbHeader
            title={"Banner Details"}
            breadcrumbItems={[
              { title: "Dashboard", href: "/admin" },
              { title: "Banner Management", href: "/admin/banners" },
              { title: "Banner Details" },
            ]}
          />
        </div>
        <Card>
          <div className="text-center py-8">
            <p>Banner not found</p>
            <Button
              type="primary"
              onClick={() => navigate("/admin/banners")}
              className="mt-4"
            >
              Back to Banners
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="px-6 py-4 bg-white rounded-xl">
        <BreadcrumbHeader
          title={"Banner Details"}
          breadcrumbItems={[
            { title: "Dashboard", href: "/admin" },
            { title: "Banner Management", href: "/admin/banners" },
            { title: "Banner Details" },
          ]}
          extra={
            <div className="flex gap-2">
              <CommonButton
                icon={<ArrowLeftOutlined />}
                onClick={() => navigate("/admin/banners")}
              >
                Back
              </CommonButton>
              <CommonButton
                type="primary"
                icon={<EditOutlined />}
                onClick={() => navigate(`/admin/update-banner/${id}`)}
              >
                Edit Banner
              </CommonButton>
            </div>
          }
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Banner Image */}
        <Card title="Banner Image" className="h-fit">
          <div className="flex justify-center">
            <Image
              src={banner.image}
              alt={banner.title}
              className="w-full h-64 object-cover rounded-lg"
              fallback="https://via.placeholder.com/300x200?text=Image+Not+Found"
            />
          </div>
        </Card>

        {/* Banner Details */}
        <Card title="Banner Information">
          <Descriptions column={1} bordered>
            <Descriptions.Item label="Title">{banner.title}</Descriptions.Item>
            <Descriptions.Item label="Subtitle">
              {banner.subTitle}
            </Descriptions.Item>
            <Descriptions.Item label="Description">
              {banner.description}
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              {getStatusTag(banner)}
            </Descriptions.Item>
            <Descriptions.Item label="Active">
              {banner.isActive ? "Yes" : "No"}
            </Descriptions.Item>
            <Descriptions.Item label="Start Date">
              <div className="flex items-center gap-1">
                <CalendarOutlined />
                {formatDate(banner.startDate)}
              </div>
            </Descriptions.Item>
            <Descriptions.Item label="End Date">
              <div className="flex items-center gap-1">
                <CalendarOutlined />
                {banner.endDate ? formatDate(banner.endDate) : "No end date"}
              </div>
            </Descriptions.Item>
            <Descriptions.Item label="Created At">
              {formatDate(banner.createdAt)}
            </Descriptions.Item>
            <Descriptions.Item label="Last Updated">
              {formatDate(banner.updatedAt)}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </div>
    </div>
  );
};

export default BannerDetails;
