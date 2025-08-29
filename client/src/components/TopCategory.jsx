import React, { useState, useEffect } from "react";
import SectionHeader from "./SectionHeader";
import { assets } from "../assets/assets";
import { FaShoppingBag } from "react-icons/fa";
import { httpGet } from "../services/httpService";

const TopCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await httpGet("/auth/get-categories");

        if (response.success) {
          setCategories(response.categories);
        } else {
          setError("Không thể tải danh mục");
        }
      } catch (err) {
        console.error("Lỗi khi tải danh mục:", err);
        setError("Đã xảy ra lỗi khi tải danh mục");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-start w-full md:w-[1400px] mx-auto my-10 gap-6">
        <SectionHeader
          title={"Top Category"}
          icon={<img src={assets.topCategory} alt="Top Category" />}
        />
        <div className="max-w-full mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="bg-secondary/20 rounded-xl px-10 py-4 flex flex-col items-center animate-pulse"
            >
              <div className="bg-gray-300 rounded-full p-3 mb-3 flex items-center justify-center h-16 w-16"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-300 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-start w-full md:w-[1400px] mx-auto my-10 gap-6">
        <SectionHeader
          title={"Top Category"}
          icon={<img src={assets.topCategory} alt="Top Category" />}
        />
        <div className="text-center text-red-500 py-4">{error}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-start w-full md:w-[1400px] mx-auto my-10 gap-6">
      <SectionHeader
        title={"Top Category"}
        icon={<img src={assets.topCategory} alt="Top Category" />}
      />

      {categories.length === 0 ? (
        <div className="text-center text-text-secondary py-4">
          Chưa có danh mục nào
        </div>
      ) : (
        <div className="max-w-full mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {categories.map((category) => (
            <div
              key={category._id}
              className="bg-secondary/20 rounded-xl px-4 py-4 flex flex-col items-center transition-transform duration-300 hover:scale-105 cursor-pointer"
            >
              <div className="bg-primary rounded-full p-3 mb-3 flex items-center justify-center">
                <img src={category.image} alt="" className="w-12 h-12" />
              </div>
              <h3 className="font-semibold text-sm text-center text-text-primary">
                {category.name}
              </h3>
              <p className="text-xs text-text-secondary mt-1">
                {category.itemCount}
                {category.itemCount === 1 ? " Item" : " Items"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopCategory;
