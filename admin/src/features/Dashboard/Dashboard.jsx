import React from 'react'
import BreadcrumbHeader from "../../components/BreadcrumbHeader";
import { FaLayerGroup, FaSyncAlt, FaUserCircle } from "react-icons/fa";
import { BiSolidBadgeDollar } from "react-icons/bi";
import { FaBasketShopping } from "react-icons/fa6";
const Dashboard = () => {
  return (
    <div>
      <BreadcrumbHeader
        title={"Dashboard"}
        breadcrumbItems={[{ title: "Dashboard" }]}
      />
      <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 mt-6">
        <div className="bg-white rounded-lg p-6 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-semibold text-gray-400 uppercase">
                Orders
              </p>
              <p className="text-lg font-extrabold text-gray-900 mt-1">1,587</p>
            </div>
            <FaLayerGroup className=" text-gray-400 text-2xl mt-1" />
          </div>
          <div className="mt-4 flex items-center space-x-2">
            <span className="text-sm font-semibold bg-green-600 text-white rounded px-1.5 py-[1px]">
              +11%
            </span>
            <p className="text-sm text-gray-400">From previous period</p>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-semibold text-gray-400 uppercase">
                Revenue
              </p>
              <p className="text-lg font-extrabold text-gray-900 mt-1">
                $46,782
              </p>
            </div>
            <BiSolidBadgeDollar className=" text-gray-400 text-2xl mt-1" />
          </div>
          <div className="mt-4 flex items-center space-x-2">
            <span className="text-sm font-semibold bg-red-500 text-white rounded px-1.5 py-[1px]">
              -29%
            </span>
            <p className="text-sm text-gray-400">From previous period</p>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-semibold text-gray-400 uppercase">
                Average Price
              </p>
              <p className="text-lg font-extrabold text-gray-900 mt-1">$15.9</p>
            </div>
            <FaSyncAlt className=" text-gray-400 text-2xl mt-1" />
          </div>
          <div className="mt-4 flex items-center space-x-2">
            <span className="text-sm font-semibold bg-yellow-400 text-white rounded px-1.5 py-[1px]">
              0%
            </span>
            <p className="text-sm text-gray-400">From previous period</p>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-semibold text-gray-400 uppercase">
                Product Sold
              </p>
              <p className="text-lg font-extrabold text-gray-900 mt-1">1,890</p>
            </div>
            <FaBasketShopping className=" text-gray-400 text-2xl mt-1" />
          </div>
          <div className="mt-4 flex items-center space-x-2">
            <span className="text-sm font-semibold bg-green-600 text-white rounded px-1.5 py-[1px]">
              +89%
            </span>
            <p className="text-sm text-gray-400">Last year</p>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-semibold text-gray-400 uppercase">
                Users
              </p>
              <p className="text-lg font-extrabold text-gray-900 mt-1">1,890</p>
            </div>
            <FaUserCircle className=" text-gray-400 text-2xl mt-1" />
          </div>
          <div className="mt-4 flex items-center space-x-2">
            <span className="text-sm font-semibold bg-green-600 text-white rounded px-1.5 py-[1px]">
              +89%
            </span>
            <p className="text-sm text-gray-400">Last year</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard