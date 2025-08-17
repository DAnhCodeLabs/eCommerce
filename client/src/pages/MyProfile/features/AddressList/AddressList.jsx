import React, { useState, useEffect } from "react";
import { Table, Button, message, Popconfirm, Tooltip } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { FaPlus } from "react-icons/fa";
import AddressModal from "./AddressModal";
import { httpGet, httpDelete } from "../../../../services/httpService";
import CommonButton from "../../../../components/commons/CommonButton";
import Loader from "../../../../components/commons/Loader";

const AddressList = () => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  const fetchAddress = async () => {
    try {
      setLoading(true);
      const {
        success,
        address,
        message: responseMessage,
      } = await httpGet("/auth/get-address");

      if (success) {
        setDataSource(
          address.map((addr) => ({
            key: addr._id,
            name: addr.fullName,
            address: (
              <div className="flex flex-col">
                <p className="text-text-primary font-medium">{`${addr.ward}, ${addr.district}, ${addr.province}`}</p>
                <p className="text-text-secondary text-sm">{`${addr.addressLine}`}</p>
              </div>
            ),
            phone: addr.phone,
            originalData: addr,
          }))
        );
      } else {
        message.error(responseMessage);
      }
    } catch (error) {
      message.error(
        error?.response?.data?.message || "Failed to get address list"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      const { success, message: responseMessage } = await httpDelete(
        `/auth/delete-address/${id}`
      );

      if (success) {
        message.success(responseMessage);
        await fetchAddress();
      } else {
        message.error(responseMessage || "Failed to delete address");
      }
    } catch (error) {
      message.error(
        error?.response?.data?.message ||
          error.message ||
          "Failed to delete address"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddress();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => (
        <span className="text-blue-400 font-semibold">{text}</span>
      ),
    },
    { title: "Address", dataIndex: "address", key: "address" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-2">
        <Tooltip placement="top" title={"Edit Address"}>
          <Button
            icon={<EditOutlined />}
            className="border border-gray-300 text-gray-600 hover:text-gray-900 hover:border-gray-400"
            onClick={() => {
              setCurrentRecord(record);
              setIsModalVisible(true);
            }}
          ></Button>
        </Tooltip>

          <Popconfirm
            title="Are you sure to delete this address?"
            onConfirm={() => handleDelete(record.key)}
            okText="Yes"
            cancelText="No"
            placement="topRight"
          >
            <Tooltip placement="top" title={"Delete Address"}>
              <Button
                icon={<DeleteOutlined />}
                className="border border-red-400 text-red-500 hover:bg-red-100"
                danger
              ></Button>
            </Tooltip>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex justify-between items-center border-b border-gray-200 pb-3 mb-6">
        <div>
          <h2 className="text-xl font-semibold text-secondary">Address List</h2>
          <p className="text-sm text-text-secondary">
            This is where your shipping address information is located.
          </p>
        </div>
        <CommonButton
          type="primary"
          icon={<FaPlus />}
          onClick={() => {
            setCurrentRecord(null);
            setIsModalVisible(true);
          }}
        >
          Add Address
        </CommonButton>
      </div>

      <Table
        loading={{
          spinning: loading,
          indicator: <Loader />,
        }}
        dataSource={dataSource}
        columns={columns}
        className="custom-ant-table"
        pagination={false}
      />

      <AddressModal
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setCurrentRecord(null);
        }}
        onSave={fetchAddress}
        initialValues={currentRecord?.originalData}
        isEditing={!!currentRecord}
      />
    </div>
  );
};

export default AddressList;
