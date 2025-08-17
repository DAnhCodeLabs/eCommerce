import React from "react";
import { Form, Select } from "antd";

const { Option } = Select;

const SelectField = ({
  name,
  label,
  options = [], // [{ label, value }]
  placeholder,
  rules = [],
  className = "",
  ...rest
}) => (
  <Form.Item name={name} label={label} rules={rules}>
    <Select
      placeholder={placeholder}
      className={`!rounded-lg ${className}`}
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
