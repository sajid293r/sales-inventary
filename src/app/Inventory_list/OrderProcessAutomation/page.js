'use client'
import React from 'react'
import { AiOutlinePlusCircle } from "react-icons/ai";
import { FaTrash, FaArrowLeft } from "react-icons/fa";
import Link from "next/link";

const Page = () => {
  return (
    <div className="p-4 sm:p-6 min-w-[640px] md:min-w-[800px] lg:min-w-[800px] xl:min-w-[1300px] 2xl:min-w-[1300px] 3xl:min-w-[1400px] 4xl:min-w-[1600px]  table-auto mx-auto">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="flex items-center gap-3">
          <div className="border rounded-md p-2 hover:bg-gray-100 transition">
            <Link href="/Inventory_list/Inventorylist">
              <FaArrowLeft size={18} className="text-gray-700" />
            </Link>
          </div>
          <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">
            Automation
          </h1>
        </div>
        <button className="bg-[#52ce66] text-white py-1 px-4 rounded-md text-sm sm:text-base font-medium hover:bg-[#48b55a] transition w-full sm:w-auto">
          Save
        </button>
      </div>

      {/* Form Section */}
      <div className="border w-full bg-white p-4 sm:p-6 rounded-md shadow-sm">
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 sm:gap-6 md:gap-8">
          {/* Conditions Dropdown */}
          <label className="flex flex-col w-full sm:w-auto">
            <span className="text-sm sm:text-base font-medium text-gray-700 mb-2">
              Conditions
            </span>
            <select className="w-full sm:w-[200px] border rounded-md p-1 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#52ce66]">
              <option>Option 1</option>
              <option>Option 2</option>
              <option>Option 3</option>
              <option>Option 4</option>
            </select>
          </label>

          {/* Rule Input */}
          <label className="flex flex-col w-full sm:w-auto">
            <span className="text-sm sm:text-base font-medium text-gray-700 mb-2">
              Rule
            </span>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
              <span className="text-sm sm:text-base">Every</span>
              <input
                type="text"
                className="w-full sm:w-[100px] border rounded-md p-1 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#52ce66]"
                placeholder="Enter days"
              />
              <span className="text-sm sm:text-base">Days</span>
            </div>
          </label>

          {/* Set-up Time Dropdown */}
          <label className="flex flex-col w-full sm:w-auto">
            <span className="text-sm sm:text-base font-medium text-gray-700 mb-2">
              Set-up Time
            </span>
            <select className="w-full sm:w-[200px] border rounded-md p-1 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#52ce66]">
              <option>Hour 1</option>
              <option>Hour 2</option>
              <option>Hour 3</option>
              <option>Hour 4</option>
            </select>
          </label>

          {/* All Days Checkbox */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              className="h-4 w-4 mt-6 text-[#52ce66] rounded focus:ring-[#52ce66]"
            />
            <label className="text-sm sm:text-base text-gray-700 mt-6">All Days</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;