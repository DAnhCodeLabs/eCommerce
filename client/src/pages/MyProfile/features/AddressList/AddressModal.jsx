import React, { useEffect, useState } from "react";
import { Modal, Form, message } from "antd";
import { httpPost, httpPut } from "../../../../services/httpService";
import CommonButton from "../../../../components/commons/CommonButton";
import CustomForm from "../../../../components/commons/CustomForm";

const formItems = [
  {
    name: "fullName",
    label: "Full Name",
    type: "text",
    rules: [{ required: true, message: "Please input the name!" }],
  },
  {
    name: "phone",
    label: "Phone Number",
    type: "input",
    rules: [{ required: true, message: "Please input the phone number!" }],
  },
  {
    name: "province",
    label: "Province/City",
    type: "text",
    rules: [{ required: true, message: "Please select a province/city!" }],
  },
  {
    name: "district",
    label: "District",
    type: "text",
    rules: [{ required: true, message: "Please select a district!" }],
  },
  {
    name: "ward",
    label: "Ward/Commune",
    type: "text",
    rules: [{ required: true, message: "Please select a ward/commune!" }],
  },
  {
    name: "addressLine",
    label: "Address Line",
    type: "text",
    rules: [{ required: true, message: "Please input the address detail!" }],
  },
  { name: "note", label: "Note", type: "textarea" },
];

const AddressModal = ({
  visible,
  onCancel,
  onSave,
  initialValues,
  isEditing,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (visible) {
      form.resetFields();
      if (initialValues) form.setFieldsValue(initialValues);
    }
  }, [visible, initialValues]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      const addressData = {
        fullName: values.fullName,
        phone: values.phone,
        province: values.province,
        district: values.district,
        ward: values.ward,
        addressLine: values.addressLine,
        note: values.note || "",
      };

      const endpoint = isEditing
        ? `/auth/update-address/${initialValues._id}`
        : "/auth/create-address";

      const httpMethod = isEditing ? httpPut : httpPost;
      const { success, message: responseMessage } = await httpMethod(
        endpoint,
        addressData
      );

      if (success) {
        message.success(responseMessage);
        onSave();
        onCancel();
      }
    } catch (error) {
      message.error(error.response?.data?.message || "Operation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      width={800}
      title={isEditing ? "Edit Address" : "Add New Address"}
      visible={visible}
      onCancel={onCancel}
      footer={[
        <CommonButton key="back" onClick={onCancel}>
          Cancel
        </CommonButton>,
        <CommonButton
          key="submit"
          type="primary"
          loading={loading}
          onClick={handleSubmit}
        >
          {isEditing ? "Update" : "Save"}
        </CommonButton>,
      ]}
    >
      <CustomForm form={form} formItems={formItems} />
    </Modal>
  );
};

export default AddressModal;
