import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import UpdateProfile from "./features/UpdateProfile";
import UpdatePassword from "./features/UpdatePassword";
import Dashboard from "./features/Dashboard";
import { FaCamera, FaRegUser, FaStore } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import AddressList from "./features/AddressList/AddressList";

const MyProfile = () => {
  const [isActive, setIsActive] = useState("profile");
  const { user } = useAuth();
  const renderContent = () => {
    switch (isActive) {
      case "dashboard":
        return <Dashboard />;
      case "profile":
        return <UpdateProfile />;
      case "password":
        return <UpdatePassword />;
      case "address":
        return <AddressList />;
      default:
        return <UpdateProfile />;
    }
  };

  const baseNavItems = [
    {
      id: "profile",
      label: "My Profile",
      icon: <FaRegUser />,
    },
    {
      id: "password",
      label: "Change Password",
      icon: <FaRegUser />,
    },
    {
      id: "address",
      label: "Address List",
      icon: <FaRegUser />,
    },
  ];

  const addressNavItem = {};

  const sellerNavItems = [
    {
      id: "dashboard",
      label: "Quản lý cửa hàng",
      icon: <FaStore />,
    },
    ...baseNavItems,
  ];

  const userNavItems = [...baseNavItems, addressNavItem];

  const navItems = user?.role === "seller" ? sellerNavItems : userNavItems;
  return (
    <div>
      <main className="max-w-[1400px] mx-auto w-full flex flex-col md:flex-row gap-6 py-16">
        <aside className="w-full md:w-1/4 bg-white p-6 rounded-lg shadow-md">
          <nav className="w-full">
            <ul className="space-y-4">
              {navItems.map((item) => (
                <li
                  key={item.id}
                  className={`text-text-primary font-semibold hover:text-secondary rounded hover:bg-gray-100 ${
                    isActive === item.id ? "bg-gray-200" : ""
                  }`}
                >
                  <NavLink
                    to="#"
                    className={`flex items-center gap-2 p-2 transition-all duration-300 hover:translate-x-1 `}
                    onClick={() => setIsActive(item.id)}
                  >
                    {item.icon}
                    <p>{item.label}</p>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <section className="w-full md:w-3/4 bg-white p-6 rounded-lg shadow-md">
          {renderContent()}
        </section>
      </main>
    </div>
  );
};

export default MyProfile;
