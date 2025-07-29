import React, { useState } from "react";
import { assets } from "../assets/assets";
import {
  IoSearchOutline,
  IoLogOutOutline,
  IoLogInOutline,
} from "react-icons/io5";
import {
  FaRegUserCircle,
  FaClipboardList,
  FaShoppingCart,
  FaRegHeart,
} from "react-icons/fa";
import { PiSealPercentFill } from "react-icons/pi";
import InputField from "./InputField";
import { Avatar, Badge, Button, Dropdown } from "antd";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [menu, setMenu] = useState("home");

  const items = user
    ? [
        {
          key: "profile",
          icon: <FaRegUserCircle className="w-4 h-4" />,
          label: <Link to="/profile">My Account</Link>,
        },
        {
          key: "orders",
          icon: <FaClipboardList className="w-4 h-4" />,
          label: <Link to="/orders">Orders</Link>,
        },
        {
          key: "logout",
          icon: <IoLogOutOutline className="w-4 h-4" />,
          label: <span onClick={logout}>Logout</span>,
        },
      ]
    : [
        {
          key: "login",
          icon: <IoLogInOutline className="w-4 h-4" />,
          label: <Link to="/login">Log in / Register</Link>,
        },
      ];

  return (
    <div className="bg-white w-full flex items-center justify-center py-4">
      <div className="w-[1400px] mx-auto">
        <div className="flex flex-col items-center w-full gap-4">
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
            <div className="flex items-center justify-between gap-6">
              <div className="flex items-center gap-2">
                <Badge>
                  <Dropdown menu={{ items }} placement="bottomRight" arrow>
                    <Avatar
                      src={
                        user ? (
                          user.avatar
                        ) : (
                          <FaRegUserCircle className="text-black/60 hover:text-tertiary text-2xl transform transition-all duration-200" />
                        )
                      }
                      className="cursor-pointer"
                    />
                  </Dropdown>
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Badge count={5}>
                  <Avatar
                    src={
                      <FaShoppingCart className="text-black/60 hover:text-tertiary text-2xl transform transition-all duration-200" />
                    }
                    className="cursor-pointer"
                  />
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Badge count={5}>
                  <Avatar
                    src={
                      <FaRegHeart className="text-black/60 hover:text-tertiary text-2xl transform transition-all duration-200" />
                    }
                    className="cursor-pointer"
                  />
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between w-full gap-12">
            <ul className="flex items-center justify-center gap-8 text-gray-700 font-medium flex-1 mx-auto">
              <li
                onClick={() => setMenu("home")}
                className={`hover:text-tertiary transition-all duration-200 ${
                  menu === "home" ? "text-tertiary" : ""
                }`}
              >
                <Link to="/">Home</Link>
              </li>
              <li
                onClick={() => setMenu("shop")}
                className={`hover:text-tertiary transition-all duration-200 ${
                  menu === "shop" ? "text-tertiary" : ""
                }`}
              >
                <Link to="/shop">Shop</Link>
              </li>
              <li
                onClick={() => setMenu("collections")}
                className={`hover:text-tertiary transition-all duration-200 ${
                  menu === "collections" ? "text-tertiary" : ""
                }`}
              >
                <Link to="/collections">Collections</Link>
              </li>
              <li
                onClick={() => setMenu("about")}
                className={`hover:text-tertiary transition-all duration-200 ${
                  menu === "about" ? "text-tertiary" : ""
                }`}
              >
                <Link to="/about">About</Link>
              </li>
              <li
                onClick={() => setMenu("contact-us")}
                className={`hover:text-tertiary transition-all duration-200 ${
                  menu === "contact-us" ? "text-tertiary" : ""
                }`}
              >
                <Link to="/contact-us">Contact Us</Link>
              </li>
            </ul>
            <div className="flex items-center gap-2">
              <PiSealPercentFill className="text-2xl text-tertiary"/>
              <p className="text-gray-900 font-medium">Top Deals</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
