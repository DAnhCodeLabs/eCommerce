import React from "react";
import { assets } from "../assets/assets";

const Navbar = () => {
  return (
    <div className="bg-white w-full flex items-center justify-center py-2">
      <div className="w-[1400px]  mx-auto">
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-between w-full">
            <div>
              <img src={assets.logo} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
