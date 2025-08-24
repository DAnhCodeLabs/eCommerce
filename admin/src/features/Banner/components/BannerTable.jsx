// components/Banner/BannerTable.jsx
import React from "react";
import { Space, Tag, Image } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import BannerImage from "./BannerImage";
import BannerStatus from "./BannerStatus";
import BannerActions from "./BannerActions";
import CustomTable from "../../../components/common/commons/CustomTable";

const BannerTable = ({
  banners,
  loading,
  pagination,
  onTableChange,
  onDelete,
}) => {
  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      width: 100,
      render: (image) => <BannerImage image={image} />,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      sorter: true,
    },
    {
      title: "Subtitle",
      dataIndex: "subTitle",
      key: "subTitle",
      sorter: true,
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive) => <BannerStatus isActive={isActive} />,
      sorter: true,
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      render: (date) => new Date(date).toLocaleDateString(),
      sorter: true,
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      render: (date) => (date ? new Date(date).toLocaleDateString() : "-"),
      sorter: true,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <BannerActions record={record} onDelete={onDelete} />
      ),
    },
  ];

  return (
    <CustomTable
      columns={columns}
      data={banners}
      rowKey="_id"
      loading={loading}
      pagination={pagination}
      onChange={onTableChange}
      scroll={{ x: 1000 }}
    />
  );
};

export default BannerTable;
