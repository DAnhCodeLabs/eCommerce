// components/Banner/BannerStatus.jsx
import React from "react";
import { Tag } from "antd";

const BannerStatus = ({ isActive }) => {
  return (
    <Tag color={isActive ? "green" : "red"}>
      {isActive ? "Active" : "Inactive"}
    </Tag>
  );
};

export default BannerStatus;
