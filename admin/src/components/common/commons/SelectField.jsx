import React from "react";
import { Form, Select } from "antd";

const { Option } = Select;

// components/SelectField.jsx (phần cần sửa)
const SelectField = ({
  name,
  label,
  options = [],
  placeholder = "Vui lòng chọn...",
  rules = [],
  className = "",
  value, // Thêm prop value
  onChange, // Thêm prop onChange

  ...rest
}) => (
  <Form.Item name={name} label={label} rules={rules}>
    <Select
      allowClear
      placeholder={placeholder || "Vui lòng chọn..."}
      className={`!rounded-lg ${className}`}
      value={value}
      onChange={onChange}
      {...rest}
    >
      {options.map((opt) => (
        <Option key={opt.value} value={opt.value}>
          {opt.label}
        </Option>
      ))}
    </Select>
  </Form.Item>
);

export default SelectField;
