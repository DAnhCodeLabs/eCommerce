// components/Banner/BannerImage.jsx
import React from "react";
import { Image } from "antd";

const BannerImage = ({ image }) => {
  return (
    <Image
      src={image}
      alt="Banner"
      width={80}
      height={50}
      style={{ objectFit: "cover" }}
    />
  );
};

export default BannerImage;
