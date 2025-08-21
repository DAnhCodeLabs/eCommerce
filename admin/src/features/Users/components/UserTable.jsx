// components/UserTable/UserTable.jsx
import React from "react";
import { Tag, Space, Button, Tooltip, Popconfirm } from "antd";
import {
  EyeOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import CustomTable from "../../../components/common/commons/CustomTable";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { MdOutlineDeleteForever } from "react-icons/md";

const UserTable = ({
  users,
  loading,
  pagination,
  onTableChange,
  onView,
  onDelete,
  onToggleBlock,
}) => {
  const handleConfirmBlock = async (user, e) => {
    try {
      e.preventDefault();
      await onToggleBlock(user);
    } catch (error) {
      console.error("Block error:", error);
    }
  };

  const handleConfirmUnblock = async (user, e) => {
    try {
      e.preventDefault();
      await onToggleBlock(user);
    } catch (error) {
      console.error("Unblock error:", error);
    }
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      width: 80,
      render: (id) => (
        <span className="text-xs text-gray-500">{id?.slice(-6)}</span>
      ),
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      sorter: true,
      render: (text) => <span className="font-medium">{text}</span>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: true,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      render: (phone) => phone || "-",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role) => (
        <Tag
          color={role === "seller" ? "blue" : "green"}
          className="capitalize"
        >
          {role}
        </Tag>
      ),
    },
    {
      title: "Email Verified",
      dataIndex: "emailVerified",
      key: "emailVerified",
      render: (verified) =>
        verified ? (
          <CheckCircleOutlined className="text-green-500 text-lg" />
        ) : (
          <CloseCircleOutlined className="text-red-500 text-lg" />
        ),
    },
    {
      title: "Status",
      dataIndex: "isBlocked",
      key: "isBlocked",
      render: (blocked) => (
        <Tag color={blocked ? "red" : "green"}>
          {blocked ? "Blocked" : "Active"}
        </Tag>
      ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: true,
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Actions",
      key: "actions",
      width: 120,
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="View Details">
            <Button
              type="text"
              icon={<EyeOutlined className="!text-xl" />}
              size="small"
              onClick={() => onView(record)}
            />
          </Tooltip>
          {record.isBlocked ? (
            <Popconfirm
              title="Unblock User"
              description="Are you sure you want to unblock this user?"
              onConfirm={(e) => handleConfirmUnblock(record, e)}
              onCancel={() => message.info("Unblock cancelled")}
              okText="Yes"
              cancelText="No"
              okType="primary"
            >
              <Tooltip title="Unblock User">
                <Button
                  type="text"
                  icon={<IoIosCheckmarkCircleOutline className="!text-xl" />}
                  size="small"
                  danger
                  className="text-red-600 hover:text-red-800"
                />
              </Tooltip>
            </Popconfirm>
          ) : (
            <Popconfirm
              title="Block User"
              description="Are you sure you want to block this user?"
              onConfirm={(e) => handleConfirmBlock(record, e)}
              onCancel={() => message.info("Block cancelled")}
              okText="Yes"
              cancelText="No"
              okType="danger"
            >
              <Tooltip title="Block User">
                <Button
                  type="text"
                  icon={<IoIosCheckmarkCircleOutline className="!text-xl" />}
                  size="small"
                  className="!text-green-600 hover:!text-green-800"
                />
              </Tooltip>
            </Popconfirm>
          )}
          <Tooltip title={"Delete User"}>
            <Button
              type="text"
              icon={<MdOutlineDeleteForever className="!text-xl" />}
              size="small"
              style={{
                color: "red",
              }}
              onClick={() => onDelete(record._id)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <CustomTable
      columns={columns}
      dataSource={users}
      rowKey="_id"
      loading={loading}
      pagination={{
        current: pagination.current,
        pageSize: pagination.pageSize,
        total: pagination.total,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ["10", "20", "50", "100"],
        showTotal: (total, range) =>
          `Showing ${range[0]}-${range[1]} of ${total} users`,
      }}
      onChange={onTableChange}
      scroll={{ x: 1000 }}
      className="rounded-lg"
      headerClassName="bg-blue-50 font-semibold"
      rowClassName="hover:bg-blue-50 transition-colors"
    />
  );
};

export default UserTable;
