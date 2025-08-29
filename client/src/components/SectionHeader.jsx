import React from "react";
import { FaArrowRight } from "react-icons/fa6";

const SectionHeader = ({ title, icon }) => {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center justify-center gap-4">
        {icon && <span className="w-8 h-8">{icon}</span>}
        <h2 className="text-2xl font-bold text-text-primary">{title}</h2>
      </div>
      <p className="text-text-secondary cursor-pointer hover:underline flex items-center gap-1 justify-center">
        View More
        <FaArrowRight />
      </p>
    </div>
  );
};

export default SectionHeader;
