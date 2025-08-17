import React from "react";
import { Form, Input } from "antd";

const { TextArea } = Input;

const TextAreaField = ({
  name,
  label,
  rows = 4,
  rules = [],
  className = "",
  ...rest
}) => (
  <Form.Item name={name} label={label} rules={rules}>
    <TextArea rows={rows} className={`!rounded-lg ${className}`} {...rest} />
  </Form.Item>
);

export default TextAreaField;
