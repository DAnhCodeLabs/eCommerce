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
  Checkbox,
  Radio,
  Upload,
  Button,
} from "antd";
import { UploadOutlined, InboxOutlined, PlusOutlined } from "@ant-design/icons";

// Sửa cách import TextArea
const { TextArea } = Input;
const { Password } = Input;
const { RangePicker } = DatePicker;
const { Dragger } = Upload;

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
  mode,
  value,
  onChange,
  checkboxLabel,
  radioOptions = [],
  uploadProps = {},
  uploadText = "Tải lên",
  multiple = false,
  showUploadList = true,
  listType = "text", // 'text', 'picture', 'picture-card', 'picture-circle'
  maxCount, // Số lượng ảnh tối đa
  ...rest
}) => {
  const inputRules = [...rules];
  if (
    required &&
    type !== "checkbox" &&
    type !== "radio" &&
    type !== "upload"
  ) {
    inputRules.unshift({
      required: true,
      message: `${label || name} không được để trống.`,
    });
  }

  // Hàm xử lý custom request để không tự động upload
  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const renderInputComponent = () => {
    const baseProps = {
      prefix,
      suffix,
      disabled,
      allowClear: !["checkbox", "radio", "upload"].includes(type)
        ? allowClear
        : undefined,
      placeholder: !["checkbox", "radio", "upload"].includes(type)
        ? placeholder
        : undefined,
      value,
      onChange,
      className: `w-full !text-sm !text-gray-700 ${className}`,
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
            format="YYYY-MM-DD"
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
            showTime={{
              format: "HH:mm",
              minuteStep: 15,
            }}
            format="YYYY-MM-DD HH:mm"
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
        return <Switch {...baseProps} />;
      case "checkbox":
        return <Checkbox {...baseProps}>{checkboxLabel || label}</Checkbox>;
      case "radio":
        return (
          <Radio.Group {...baseProps}>
            {radioOptions.map((option, index) => (
              <Radio key={index} value={option.value || option}>
                {option.label || option}
              </Radio>
            ))}
          </Radio.Group>
        );
      case "upload":
        const getAcceptType = (acceptType) => {
          switch (acceptType) {
            case "image":
              return "image/*";
            case "document":
              return ".pdf,.doc,.docx,.txt,.xlsx,.xls";
            case "all":
              return "*";
            case "image-or-document":
              return "image/*,.pdf,.doc,.docx,.txt,.xlsx,.xls";
            default:
              return acceptType || "*";
          }
        };

        const getBeforeUpload = (acceptType, file) => {
          const isImage = file.type.startsWith("image/");
          const isDocument = [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "text/plain",
            "application/vnd.ms-excel",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          ].includes(file.type);

          switch (acceptType) {
            case "image":
              if (!isImage) {
                message.error("Chỉ được upload file ảnh!");
                return false;
              }
              break;
            case "document":
              if (!isDocument) {
                message.error("Chỉ được upload file tài liệu!");
                return false;
              }
              break;
            case "image-or-document":
              if (!isImage && !isDocument) {
                message.error("Chỉ được upload file ảnh hoặc tài liệu!");
                return false;
              }
              break;
            default:
              break;
          }
          return false; // Ngăn tự động upload
        };

        return (
          <Upload
            {...baseProps}
            {...uploadProps}
            multiple={multiple}
            showUploadList={showUploadList}
            listType={listType}
            maxCount={maxCount}
            accept={getAcceptType(rest.acceptType)}
            beforeUpload={(file) => getBeforeUpload(rest.acceptType, file)}
          >
            {listType === "picture-card" ? (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>{uploadText}</div>
              </div>
            ) : (
              <Button icon={<UploadOutlined />}>{uploadText}</Button>
            )}
          </Upload>
        );
      case "dragger":
        return (
          <Dragger
            {...baseProps}
            {...uploadProps}
            multiple={multiple}
            showUploadList={showUploadList}
            listType={listType}
            maxCount={maxCount}
            customRequest={dummyRequest}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Nhấp hoặc kéo thả file vào đây để tải lên
            </p>
          </Dragger>
        );
      default:
        return <Input type={type} {...baseProps} />;
    }
  };

  // Xử lý các trường hợp đặc biệt cần valuePropName
  if (["switch", "checkbox"].includes(type)) {
    return (
      <Form.Item
        name={name}
        label={type === "switch" ? label : undefined}
        rules={inputRules}
        valuePropName="checked"
      >
        {renderInputComponent()}
      </Form.Item>
    );
  }

  // Xử lý upload field
  if (type === "upload" || type === "dragger") {
    return (
      <Form.Item
        name={name}
        label={label}
        rules={inputRules}
        valuePropName="fileList"
        getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
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
