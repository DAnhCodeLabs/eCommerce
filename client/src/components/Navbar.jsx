import React from "react";
import { assets } from "../assets/assets";
const Navbar = () => {
  return (
    <div className="bg-white w-full flex items-center justify-center py-4">
      <div className="w-[1400px]  mx-auto">
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-between w-full">
            <div>
              <img src={assets.logo} alt="" />
            </div>
            <div className="flex flex-1 justify-center items-center gap-2">
              <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
