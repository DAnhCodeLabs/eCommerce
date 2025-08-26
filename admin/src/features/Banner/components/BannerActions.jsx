// components/Banner/BannerActions.jsx
import React from "react";
import { Space, Popconfirm, Button } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CommonButton from "../../../components/common/commons/CommonButton";
import { Link } from "react-router-dom";

const BannerActions = ({ record, onDelete }) => {
  const handleConfirmDelete = () => {
    onDelete(record._id);
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
      <Popconfirm
        title="Delete Banner"
        description="Are you sure you want to delete this banner?"
        onConfirm={handleConfirmDelete}
        okText="Yes"
        cancelText="No"
        okType="danger"
      >
        <Button
          danger
          size="small"
          icon={<DeleteOutlined />}
        >
          Delete
        </Button>
      </Popconfirm>
    </Space>
  );
};

export default BannerActions;
