"use client";
import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { MdArrowUpward, MdArrowDownward } from "react-icons/md";
import { FaArrowLeft, FaTimes } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import layer from "../../image/Layer_1.png";
import SaleChannelPopup from "../../Popup/page";

const TableWithCheckboxes = () => {
  const [deletedRows, setDeletedRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({ status: [], region: "" });
  const [sortOptions, setSortOptions] = useState({ name: false });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isOpenpop, setIsOpenpop] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const data = Array.from({ length: 80 }, (_, i) => ({
    id: i + 1,
    sku: `SKU-${String(i + 1).padStart(4, "0")}`,
    title: `Product ${String.fromCharCode(65 + (i % 26))} ${i + 1}`,
    warehouse: ["WH-NY", "WH-CA", "WH-TX", "WH-FL"][i % 4],
    costUnit: (19.99 + (i % 5) * 5).toFixed(2),
  }));

  const handleDeleteRow = (id) => {
    setDeletedRows((prev) => [...prev, id]);
  };

  const handleRowClick = (row) => {
    console.log("Row clicked:", row);
    setSelectedRow(row.id);
  };

  const handleRadioChange = (id) => {
    setSelectedRow(id);
  };

  const totalItems = data.filter((item) => !deletedRows.includes(item.id)).length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const filteredData = data
    .filter((item) => !deletedRows.includes(item.id))
    .filter((item) =>
      searchQuery
        ? item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.title.toLowerCase().includes(searchQuery.toLowerCase())
        : true
    );

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortOptions.name) {
      return sortOptions.name
        ? a.sku.localeCompare(b.sku)
        : b.sku.localeCompare(a.sku);
    }
    return 0;
  });

  const paginatedData = sortedData.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="w-full min-w-[640px] md:min-w-[800px] lg:min-w-[1000px] xl:min-w-[1300px] 2xl:min-w-[1300px] 3xl:min-w-[1400px] 4xl:min-w-[1600px] mx-auto table-auto">
      {isOpenpop && <SaleChannelPopup onClose={() => setIsOpenpop(false)} />}
      <div className="flex flex-col sm:flex-row justify-between mb-4 gap-3 items-center">
        <div className="flex items-center gap-2">
          <Link href="/Inventory_list/Inventorylist">
            <div className="border rounded-md p-1 hover:bg-gray-100">
              <FaArrowLeft className="text-sm" />
            </div>
          </Link>
          <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">
            BulkEditor2
          </h1>
        </div>
        <div>
          <button className="bg-green-600 p-1 px-2 rounded-md text-white">
            Save
          </button>
        </div>
      </div>

      <div className="border rounded-lg bg-white shadow-sm overflow-hidden">
        <div className="hidden sm:block overflow-x-auto">
          <table className="border-collapse text-sm w-full mx-auto table-auto">
            <thead>
              <tr className="bg-[#D9D9D9] text-xs">
                <th className="p-1 py-2 border-b-2 border-r-2 border-[#D9D9D9] w-12 text-center">Select</th>
                <th className="p-1 py-2 border-b-2 border-r-2 border-[#D9D9D9] text-center">SKU</th>
                <th className="p-1 py-2 border-b-2 border-r-2 border-[#D9D9D9] text-center">Title</th>
                <th className="p-1 py-2 border-b-2 border-r-2 border-[#D9D9D9] text-center">Warehouse</th>
                <th className="p-1 py-2 border-b-2 border-r-2 border-[#D9D9D9] text-center">Cost Unit</th>
                <th className="p-1 py-2 border-b-2 border-[#D9D9D9] text-center w-12">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleRowClick(row)}
                >
                  <td className="p-1 py-2 border-b-2 border-r-2 border-[#D9D9D9] text-center w-12">
  <input
  type="radio"
  name="row-select"
  checked={selectedRow === row.id}
  onClick={(e) => e.stopPropagation()} // prevent row click
  onChange={() => handleRadioChange(row.id)}
  className="cursor-pointer"
/>
                  </td>
                  <td className="p-1 py-2 border-b-2 border-r-2 border-[#D9D9D9] text-center">{row.sku}</td>
                  <td className="p-1 py-2 border-b-2 border-r-2 border-[#D9D9D9] text-center">{row.title}</td>
                  <td className="p-1 py-2 border-b-2 border-r-2 border-[#D9D9D9] text-center">{row.warehouse}</td>
                  <td className="p-1 py-2 border-b-2 border-r-2 border-[#D9D9D9] text-center">${row.costUnit}</td>
                  <td className="p-1 py-2 border-b-2 border-[#D9D9D9] text-center w-12">
                    <FaTimes
                      className="text-[#DE6361] hover:text-red-700 cursor-pointer mx-auto border"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteRow(row.id);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="block sm:hidden divide-y divide-[#D9D9D9] p-4">
          {paginatedData.map((row) => (
            <div
              key={row.id}
              className="p-4 bg-gray-50 mb-3 rounded-lg shadow-sm cursor-pointer"
              onClick={() => handleRowClick(row)}
            >
              <div className="flex items-center justify-between mb-2">
             <input
  type="radio"
  name="row-select"
  checked={selectedRow === row.id}
  onChange={(e) => {
    e.stopPropagation(); // Prevent row click from also firing
    handleRadioChange(row.id);
  }}
  className="cursor-pointer"
/>
                <FaTimes
                  className="text-red-500 hover:text-red-700 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteRow(row.id);
                  }}
                />
              </div>
              <div className="grid grid-cols-1 gap-2 text-sm">
                <div>
                  <span className="font-semibold">SKU:</span> {row.sku}
                </div>
                <div>
                  <span className="font-semibold">Title:</span> {row.title}
                </div>
                <div>
                  <span className="font-semibold">Warehouse:</span> {row.warehouse}
                </div>
                <div>
                  <span className="font-semibold">Cost Unit:</span> ${row.costUnit}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between p-4 gap-4 border-t border-[#D9D9D9]">
          <div className="text-sm text-gray-600 font-semibold">
            Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of{" "}
            {totalItems} entries
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`border border-gray-300 px-3 py-1 rounded-md text-sm ${
                currentPage === 1
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-100"
              }`}
            >
              {"<"}
            </button>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`border border-gray-300 px-3 py-1 rounded-md text-sm ${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-100"
              }`}
            >
              {">"}
            </button>
          </div>
          <select
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default TableWithCheckboxes;