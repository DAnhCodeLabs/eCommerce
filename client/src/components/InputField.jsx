// src/components/InputField.jsx
import React from "react";
import { Form, Input } from "antd";

const InputField = ({
  name,
  label,
  type = "text",
  prefix,
  suffix,
  className = "",
  rules = [],
  required = false,
  ...rest
}) => {
  const inputRules = [...rules];
  if (required) {
    inputRules.unshift({
      required: true,
      message: `${label || name} không được để trống.`,
    });
  }

  return (
    <Form.Item name={name} label={label} rules={inputRules}>
      <Input
        type={type}
        prefix={prefix}
        suffix={suffix}
        className={`w-full !rounded-3xl !px-4 !py-2 !text-sm !text-gray-700 ${className}`}
        {...rest}
      />
    </Form.Item>
  );
};

export default InputField;
