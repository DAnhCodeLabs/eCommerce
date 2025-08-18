import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-secondary/50 bg-opacity-50 z-50">
      <span class="loader"></span>
    </div>
  );
};

export default Loader;
