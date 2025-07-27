import React from "react";
import { assets } from "../assets/assets";
import { IoSearchOutline } from "react-icons/io5";
import InputField from "./InputField";

const Navbar = () => {
  return (
    <div className="bg-white w-full flex items-center justify-center py-4">
      <div className="w-[1400px] mx-auto">
        <div className="flex flex-col items-center w-full">
          <div className="flex items-center justify-between w-full gap-12">
            <div>
              <img src={assets.logo} alt="" />
            </div>
            <div className="flex-1 w-full">
              <div className="flex-1 w-full">
                <InputField
                  name="search"
                  className=""
                  placeholder="Tìm kiếm ..."
                  suffix={
                    <IoSearchOutline className="text-gray-400 text-2xl" />
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
