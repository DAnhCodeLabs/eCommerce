// src/components/InputField.jsx
import React from "react";
import {
  Form,
  Input,
  Select,
  DatePicker,
  TimePicker,
  InputNumber,
  Switch,
} from "antd";

// Sửa cách import TextArea
const { TextArea } = Input;
const { Password } = Input;
const { RangePicker } = DatePicker;

const InputField = ({
  name,
  label,
  type = "text",
  prefix,
  suffix,
  className = "",
  rules = [],
  required = false,
  options = [],
  rows = 4,
  showCount = false,
  maxLength,
  disabled = false,
  allowClear = true,
  placeholder,
  mode, // For select multiple
  ...rest
}) => {
  const inputRules = [...rules];
  if (required) {
    inputRules.unshift({
      required: true,
      message: `${label || name} cannot be left blank.`,
    });
  }

  const renderInputComponent = () => {
    const baseProps = {
      prefix,
      suffix,
      disabled,
      allowClear,
      placeholder,
      className: `w-full !rounded-lg !px-4 !py-2 !text-sm !text-gray-700 ${className}`,
      ...rest,
    };

    switch (type) {
      case "password":
        return <Password {...baseProps} />;
      case "textarea":
        return (
          <TextArea
            {...baseProps}
            rows={rows}
            showCount={showCount}
            maxLength={maxLength}
          />
        );
      case "number":
        return (
          <InputNumber
            {...baseProps}
            className={`${baseProps.className} !w-full`}
          />
        );
      case "select":
        return (
          <Select
            {...baseProps}
            mode={mode}
            options={options.map((opt) =>
              typeof opt === "string" ? { value: opt, label: opt } : opt
            )}
          />
        );
      case "date":
        return (
          <DatePicker
            {...baseProps}
            className={`${baseProps.className} !w-full`}
          />
        );
      case "time":
        return (
          <TimePicker
            {...baseProps}
            className={`${baseProps.className} !w-full`}
          />
        );
      case "datetime":
        return (
          <DatePicker
            {...baseProps}
            showTime
            className={`${baseProps.className} !w-full`}
          />
        );
      case "daterange":
        return (
          <RangePicker
            {...baseProps}
            className={`${baseProps.className} !w-full`}
          />
        );
      case "switch":
        return <Switch {...rest} />;
      default:
        return <Input type={type} {...baseProps} />;
    }
  };

  if (type === "switch") {
    return (
      <Form.Item
        name={name}
        label={label}
        rules={inputRules}
        valuePropName="checked"
      >
        {renderInputComponent()}
      </Form.Item>
    );
  }

  return (
    <Form.Item name={name} label={label} rules={inputRules}>
      {renderInputComponent()}
    </Form.Item>
  );
};

export default InputField;
