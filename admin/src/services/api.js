// src/services/api.js
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

// Tạo Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor để tự động đính kèm token nếu có
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor để xử lý lỗi toàn cục
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const message = error?.response?.data?.message || error.message;

    if (status === 401) {
      console.warn("Bạn chưa đăng nhập hoặc token hết hạn.");
      // Có thể redirect đến /login nếu muốn
    } else if (status === 403) {
      console.warn("Bạn không có quyền truy cập.");
    } else {
      console.error("Lỗi API:", message);
    }

    return Promise.reject(error);
  }
);

export default api;
