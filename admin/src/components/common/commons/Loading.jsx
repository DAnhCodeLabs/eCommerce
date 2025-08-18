import React from "react";
import { Spin } from "antd";

const Loading = ({ transparent = true }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className={`absolute inset-0 ${
          transparent ? "bg-[#ccc]/60" : "bg-black/60"
        }`}
      />
      <Spin size="large" className="relative z-10" />
    </div>
  );
};

export default Loading;
