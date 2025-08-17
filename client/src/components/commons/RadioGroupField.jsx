import React from "react";
import { Form, Radio } from "antd";

const RadioGroupField = ({
  name,
  label,
  options = [], // [{ label, value }]
  rules = [],
  className = "",
  ...rest
}) => (
  <Form.Item name={name} label={label} rules={rules}>
    <Radio.Group className={className} {...rest}>
      {options.map((opt) => (
        <Radio key={opt.value} value={opt.value}>
          {opt.label}
        </Radio>
      ))}
    </Radio.Group>
  </Form.Item>
);

export default RadioGroupField;
