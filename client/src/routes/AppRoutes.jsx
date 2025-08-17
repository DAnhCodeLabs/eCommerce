import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login/Login";
import PrivateRoute from "./PrivateRoute";
import Orders from "../pages/Orders";
import MyProfile from "../pages/MyProfile/MyProfile";
import Home from "../pages/Home/Home";
import RegisterSeller from "../pages/RegisterSeller/RegisterSeller";
const AppRoutes = () => {
  return (
    <div>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register-seller" element={<RegisterSeller />} />
        {/* Protected User Routes */}
        <Route
          path="/orders"
          element={
            <PrivateRoute>
              <Orders />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <MyProfile />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default AppRoutes;
