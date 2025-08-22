import React from "react";
import { Route, Routes, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AdminPages from "../pages/AdminPages";
import Dashboard from "../features/Dashboard/Dashboard";
import Login from "../pages/Login";
import Users from "../features/Users/Users";
import Categories from "../features/Categories/Categories";
import Banner from "../features/Banner/Banner";
import AddBanner from "../features/Banner/components/AddBanner";

const ProtectedRoute = ({ token, redirectPath = "/login" }) => {
  const storedToken = localStorage.getItem("token"); // Kiểm tra token từ localStorage

  if (!token && !storedToken) {
    return <Navigate to={redirectPath} replace />;
  }
  return <Outlet />;
};
const AppRouter = () => {
  const { token } = useAuth();
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/admin" replace />} />
        <Route element={<ProtectedRoute token={token} />}>
          <Route path="/admin" element={<AdminPages />}>
            <Route index element={<Dashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="categories" element={<Categories />} />
            <Route path="banner" element={<Banner />} />
            <Route path="add-banner" element={<AddBanner />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </div>
  );
};

export default AppRouter;
