import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
const page = () => {
  return (
    <div
      className={`p-2 sm:p-4 mx-auto w-full min-w-[320px] md:w-[1000px] max-w-screen-auto `}
    >
      <div className="flex flex-col sm:flex-row justify-between mb-4 gap-3">
        <div className="flex items-center gap-2">
          <div className="border rounded-md p-1">
            <Link href="/Inventory_list/Inventorylist">
              <FaArrowLeft size={16} className="text-sm" />
            </Link>
          </div>
          <h1 className="text-base sm:text-lg md:text-xl text-black font-semibold">
            Shipping Carrier Integration
          </h1>
        </div>
        <div className="flex gap-2 sm:gap-4 justify-end items-center">
          <button className="text-sm sm:text-md hover:bg-gray-100 transition px-2 py-1 rounded-md">
            Rate Automation
          </button>
          <button className="bg-[#52ce66] text-white py-1 sm:py-2 px-3 sm:px-4 rounded-md text-sm hover:bg-[#48b55a] transition">
            Save
          </button>
        </div>
      </div>
      <div className="w-full border h-auto bg-white p-6 rounded-md">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 ">
          <label className="flex flex-col">
            <span className="mb-2 text-gray-900 text-sm sm:text-base">
              Carrier Name
            </span>
            <input
              type="text"
              className="border border-gray-400 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              placeholder="Please enter carrier name"
            />
          </label>
          <label className="flex flex-col">
            <span className="mb-2 text-gray-900 text-sm sm:text-base">
              Coutry Name
            </span>
            <input
              type="text"
              className="border border-gray-400 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              placeholder="Country Name"
            />
          </label>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 ">
          <label className="flex flex-col">
            <span className="mb-2 text-gray-900 text-sm sm:text-base">
              Client ID
            </span>
            <input
              type="text"
              className="border border-gray-400 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              placeholder="Please enter  id"
            />
          </label>
          <label className="flex flex-col">
            <span className="mb-2 text-gray-900 text-sm sm:text-base">
              Client secret ApI key
            </span>
            <input
              type="text"
              className="border border-gray-400 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              placeholder="api key "
            />
          </label>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 ">
          <label className="flex flex-col">
            <span className="mb-2 text-gray-900 text-sm sm:text-base">URL</span>
            <input
              type="text"
              className="border border-gray-400 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              placeholder="please web url"
            />
          </label>
          <label className="flex gap-2 mt-10">
            <input
              type="checkbox"
              className="border border-gray-400 rounded py-5  focus:outline-none focus:ring-2 focus:ring-blue-500 w-4 h-4"
            />
            <span className=" text-gray-900 text-sm sm:text-base">
              Product key
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default page;
