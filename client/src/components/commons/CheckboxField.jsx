import React from "react";
import { Form, Checkbox } from "antd";

const CheckboxField = ({
  name,
  label,
  rules = [],
  className = "",
  ...rest
}) => (
  <Form.Item name={name} valuePropName="checked" rules={rules}>
    <Checkbox className={className} {...rest}>
      {label}
    </Checkbox>
  </Form.Item>
);

export default CheckboxField;
