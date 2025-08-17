import React, { useState } from "react";
import { assets } from "../assets/assets";
import {
  IoSearchOutline,
  IoLogOutOutline,
  IoLogInOutline,
  IoMenu,
  IoClose,
} from "react-icons/io5";
import {
  FaRegUserCircle,
  FaClipboardList,
  FaShoppingCart,
  FaRegHeart,
} from "react-icons/fa";
import { PiSealPercentFill } from "react-icons/pi";
import { Avatar, Badge, Dropdown } from "antd";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import CommonButton from "./commons/CommonButton";
import InputField from "./commons/InputField";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [menu, setMenu] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);

  const items = user
    ? [
        {
          key: "profile",
          icon: <FaRegUserCircle />,
          label: <Link to="/profile">My Account</Link>,
        },
        {
          key: "orders",
          icon: <FaClipboardList />,
          label: <Link to="/orders">Orders</Link>,
        },
        {
          key: "logout",
          icon: <IoLogOutOutline />,
          label: <span onClick={logout}>Logout</span>,
        },
      ]
    : [
        {
          key: "login",
          icon: <IoLogInOutline />,
          label: <Link to="/login">Log in / Register</Link>,
        },
      ];

  return (
    <div className="bg-white w-full py-4 shadow px-4">
      <div className="w-[95%] md:w-[1400px] mx-auto">
        {/* Top row */}
        <div className="flex items-center justify-between">
          {/* Logo */}
          <img src={assets.logo} alt="logo" className="w-32" />

          {/* Search (ẩn trên mobile) */}
          <div className="hidden md:flex flex-1 mx-6">
            <InputField
              name="search"
              placeholder="Tìm kiếm ..."
              suffix={<IoSearchOutline className="text-gray-400 text-2xl" />}
            />
          </div>

          {/* Icons */}
          <div className="flex items-center gap-4">
            {/* Avatar dropdown */}
            <Dropdown menu={{ items }} placement="bottomRight" arrow>
              <Avatar src={user?.avatar} className="cursor-pointer">
                {!user?.avatar && (
                  <FaRegUserCircle className="text-black/60 text-2xl" />
                )}
              </Avatar>
            </Dropdown>

            {/* Cart */}
            <Badge count={5}>
              <Avatar
                src={<FaShoppingCart className="text-black/60 text-2xl" />}
                className="cursor-pointer"
              />
            </Badge>

            {/* Wishlist */}
            <Badge count={5}>
              <Avatar
                src={<FaRegHeart className="text-black/60 text-2xl" />}
                className="cursor-pointer"
              />
            </Badge>

            {/* Hamburger (chỉ hiện trên mobile) */}
            <button
              className="md:hidden text-3xl"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <IoClose /> : <IoMenu />}
            </button>
          </div>
        </div>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center justify-between mt-4">
          <ul className="flex gap-8 text-gray-700 font-medium">
            {["home", "shop", "collections", "about", "contact-us"].map(
              (item) => (
                <li
                  key={item}
                  onClick={() => setMenu(item)}
                  className={`hover:text-secondary transition-all duration-300 ${
                    menu === item ? "text-secondary" : ""
                  }`}
                >
                  <Link to={`/${item === "home" ? "" : item}`}>
                    {item.replace("-", " ").toUpperCase()}
                  </Link>
                </li>
              )
            )}
          </ul>
          <div>
            <CommonButton
              className={
                "!hidden !bg-secondary !text-lg !font-semibold lg:!flex items-center justify-center !py-4"
              }
            >
              {user.role === "seller" ? (
                <div className="flex items-center gap-2">
                  <PiSealPercentFill className="text-2xl text-tertiary" />
                  <p className="text-white font-medium">Top Deals</p>
                </div>
              ) : (
                <Link to={"/register-seller"}>Become Seller</Link>
              )}
            </CommonButton>

            <p className="font-medium"></p>
          </div>
        </div>

        {/* Mobile menu (toggle) */}
        {mobileOpen && (
          <div className="md:hidden mt-4 bg-gray-50 rounded-lg shadow p-4 space-y-4">
            <InputField
              name="search"
              placeholder="Tìm kiếm ..."
              suffix={<IoSearchOutline className="text-gray-400 text-2xl" />}
            />
            <ul className="flex flex-col gap-4 text-gray-700 font-medium">
              {["home", "shop", "collections", "about", "contact-us"].map(
                (item) => (
                  <li
                    key={item}
                    onClick={() => {
                      setMenu(item);
                      setMobileOpen(false);
                    }}
                    className={`hover:text-secondary ${
                      menu === item ? "text-secondary" : ""
                    }`}
                  >
                    <Link to={`/${item === "home" ? "" : item}`}>
                      {item.replace("-", " ").toUpperCase()}
                    </Link>
                  </li>
                )
              )}
              <div className="flex items-center gap-2">
                <PiSealPercentFill className="text-2xl text-secondary" />
                <p className="font-medium">Top Deals</p>
              </div>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
