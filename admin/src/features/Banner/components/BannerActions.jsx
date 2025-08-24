// components/Banner/BannerActions.jsx
import React from "react";
import { Space } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CommonButton from "../../../components/common/commons/CommonButton";
import { Link } from "react-router-dom";

const BannerActions = ({ record, onDelete }) => {
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this banner?")) {
      onDelete(record._id);
    }
  };

  return (
    <Space size="middle">
      <Link to={`/admin/banner-details/${record._id}`}>
        <CommonButton type="default" size="small" icon={<EyeOutlined />}>
          View
        </CommonButton>
      </Link>
      <Link to={`/admin/banner-update/${record._id}`}>
        <CommonButton type="primary" size="small" icon={<EditOutlined />}>
          Edit
        </CommonButton>
      </Link>
      <CommonButton
        type="primary"
        danger
        size="small"
        icon={<DeleteOutlined />}
        onClick={handleDelete}
      >
        Delete
      </CommonButton>
    </Space>
  );
};

export default BannerActions;
