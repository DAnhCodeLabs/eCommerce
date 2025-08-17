import React from "react";
import { Form, DatePicker } from "antd";

const DatePickerField = ({
  name,
  label,
  rules = [],
  className = "",
  ...rest
}) => (
  <Form.Item name={name} label={label} rules={rules}>
    <DatePicker className={`!rounded-lg ${className}`} {...rest} />
  </Form.Item>
);

export default DatePickerField;
