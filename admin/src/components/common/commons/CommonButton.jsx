import React from "react";
import { Button } from "antd";
import {
  LoadingOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";

const iconMap = {
  loading: <LoadingOutlined />,
  success: <CheckOutlined />,
  error: <CloseOutlined />,
};

const CommonButton = ({
  type = "primary",
  danger = false,
  loading = false,
  disabled = false,
  icon,
  children,
  block = false,
  size = "middle",
  shape, // "default" | "circle" | "round"
  htmlType = "button",
  onClick,
  className,
  style,
}) => {
  const buttonIcon = typeof icon === "string" ? iconMap[icon] : icon;

  return (
    <Button
      type={type}
      danger={danger}
      loading={loading}
      disabled={disabled}
      icon={buttonIcon}
      block={block}
      size={size}
      shape={shape}
      htmlType={htmlType}
      onClick={onClick}
      className={className}
      style={style}
    >
      {children}
    </Button>
  );
};

export default CommonButton;
