"use client";
import React, { useState } from "react";

import { X } from "lucide-react";
import { FaArrowLeft } from "react-icons/fa";

const dummyData = [
  {
    orderNo: "ORD-1001",
    notes: "First order note",
    status: "Pending",
    colorCode: "#ff0000",
    paymentStatus: "Paid",
  },
  {
    orderNo: "ORD-1002",
    notes: "Second order note",
    status: "Shipped",
    colorCode: "#00ff00",
    paymentStatus: "Unpaid",
  },
  {
    orderNo: "ORD-1003",
    notes: "Third order note",
    status: "Delivered",
    colorCode: "#0000ff",
    paymentStatus: "Refunded",
  },
  {
    orderNo: "ORD-1004",
    notes: "Fourth order note",
    status: "Cancelled",
    colorCode: "#ffa500",
    paymentStatus: "Paid",
  },
  {
    orderNo: "ORD-1005",
    notes: "Fifth order note",
    status: "Pending",
    colorCode: "#800080",
    paymentStatus: "Unpaid",
  },
  {
    orderNo: "ORD-1006",
    notes: "Sixth order note",
    status: "Shipped",
    colorCode: "#008080",
    paymentStatus: "Paid",
  },
  {
    orderNo: "ORD-1007",
    notes: "Seventh order note",
    status: "Delivered",
    colorCode: "#ffc0cb",
    paymentStatus: "Unpaid",
  },
  {
    orderNo: "ORD-1008",
    notes: "Eighth order note",
    status: "Pending",
    colorCode: "#ffff00",
    paymentStatus: "Refunded",
  },
  {
    orderNo: "ORD-1009",
    notes: "Ninth order note",
    status: "Cancelled",
    colorCode: "#00ffff",
    paymentStatus: "Paid",
  },
  {
    orderNo: "ORD-1010",
    notes: "Tenth order note",
    status: "Shipped",
    colorCode: "#a52a2a",
    paymentStatus: "Unpaid",
  },
];

const TableWithDropdowns = () => {
  const [data, setData] = useState(dummyData);
  const [selectedFields, setSelectedFields] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState(true); // true for ascending, false for descending

  // Pagination
  const totalItems = dummyData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const paginatedData = data
    .slice()
    .sort((a, b) => {
      if (!sortField) return 0;
      const valueA = a[sortField];
      const valueB = b[sortField];
      if (typeof valueA === "string") {
        return sortOrder
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }
      return sortOrder ? valueA - valueB : valueB - valueA;
    })
    .slice(startIndex, endIndex);

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
    setSelectedRows([]);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setSelectedRows([]);
    }
  };

  const toggleSelectAll = (e) => {
    const currentPageData = paginatedData;
    setSelectedRows(
      e.target.checked ? currentPageData.map((d) => d.orderNo) : []
    );
  };

  const toggleRowSelection = (orderNo) => {
    setSelectedRows((prev) =>
      prev.includes(orderNo)
        ? prev.filter((id) => id !== orderNo)
        : [...prev, orderNo]
    );
  };

  const handleFieldAdd = (e) => {
    const value = e.target.value;
    if (value !== "" && !selectedFields.includes(value)) {
      setSelectedFields([...selectedFields, value]);
    }
    e.target.selectedIndex = 0;
  };

  const handleFieldRemove = (field) => {
    setSelectedFields(selectedFields.filter((f) => f !== field));
  };

  const handleStatusChange = (e, index) => {
    const updatedData = [...data];
    updatedData[index].status = e.target.value;
    setData(updatedData);
  };

  const handlePaymentStatusChange = (e, index) => {
    const updatedData = [...data];
    updatedData[index].paymentStatus = e.target.value;
    setData(updatedData);
  };

  const handleColorChange = (e, index) => {
    const updatedData = [...data];
    updatedData[index].colorCode = e.target.value;
    setData(updatedData);
  };

  const handleSort = (field) => {
    setSortField(field);
    setSortOrder((prev) => (sortField === field ? !prev : true));
  };

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold mb-4 flex gap-2">
          <div className="mt-1 h-6">
            <FaArrowLeft className="border rounded-md px-2 py-1" />
          </div>
          Bulk Editor
        </h1>
        <button className="px-10 mb-2 bg-green-500 text-white rounded-md">
          Save
        </button>
      </div>

      {/* Editor Section */}
      <div className="border border-gray-300 rounded-md w-[280px] sm:w-[450px] md:w-[650px] lg:w-[750px] xl:w-[900px] bg-white mb-4 md:py-3">
      <div className="flex gap-4 px-4">
          <h1 className="text-lg font-semibold">Editor</h1>
        </div>
        <div className="flex md:flex-row sm:flex-col-1 gap-2 p-1">
          {selectedFields.map((field, i) => (
            <div key={i} className="relative border -py-2 rounded-md px-8">
              <label className="block text-sm font-medium rounded-md text-gray-700 capitalize mt-2">
                {field.replace(/([A-Z])/g, " $1")}
              </label>
              <button
                onClick={() => handleFieldRemove(field)}
                className="absolute top-0 left-0 mt-2 ml-2 border rounded-md text-gray-400 hover:text-red-500"
              >
                <X size={16} />
              </button>
            </div>
          ))}
          <div className="flex justify-between items-center">
            <div>
              <select
                onChange={handleFieldAdd}
                className="border -py-2 border-gray-300 rounded-md p-1"
              >
                <option value="">Add Fields</option>
                <option value="orderNo">Order No</option>
                <option value="notes">Notes</option>
                <option value="status">Status</option>
                <option value="colorCode">Color Code</option>
                <option value="paymentStatus">Payment Status</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile View: Card Layout */}
      <div className="md:hidden space-y-4 overflow-x-hidden w-[300px]">
        {paginatedData.map((row, index) => (
          <div
            key={row.orderNo}
            className="border border-gray-300 rounded-lg bg-white shadow-sm p-4"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium text-gray-900">
                {row.orderNo}
              </h3>
              <input
                type="checkbox"
                checked={selectedRows.includes(row.orderNo)}
                onChange={() => toggleRowSelection(row.orderNo)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-500">
                  Notes
                </label>
                <p className="text-sm text-gray-900">{row.notes}</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500">
                  Status
                </label>
                <select
                  value={row.status}
                  onChange={(e) => handleStatusChange(e, startIndex + index)}
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                >
                  <option value="Pending">Pending</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500">
                  Color Code
                </label>
                <select
                  value={row.colorCode}
                  onChange={(e) => handleColorChange(e, startIndex + index)}
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                >
                  <option
                    value="#ff0000"
                    style={{ backgroundColor: "#ff0000" }}
                    className="active:text-white"
                  >
                    Red
                  </option>
                  <option
                    value="#00ff00"
                    style={{ backgroundColor: "#00ff00" }}
                    className="active:text-white"
                  >
                    Green
                  </option>
                  <option
                    value="#0000ff"
                    style={{ backgroundColor: "#0000ff" }}
                    className="active:text-white"
                  >
                    Blue
                  </option>
                  <option
                    value="#ffa500"
                    style={{ backgroundColor: "#ffa500" }}
                    className="active:text-white"
                  >
                    Orange
                  </option>
                  <option
                    value="#800080"
                    style={{ backgroundColor: "#800080" }}
                    className="active:text-white"
                  >
                    Purple
                  </option>
                  <option
                    value="#008080"
                    style={{ backgroundColor: "#008080" }}
                    className="active:text-white"
                  >
                    Teal
                  </option>
                  <option
                    value="#ffc0cb"
                    style={{ backgroundColor: "#ffc0cb" }}
                    className="active:text-white"
                  >
                    Pink
                  </option>
                  <option
                    value="#ffff00"
                    style={{ backgroundColor: "#ffff00" }}
                    className="active:text-white"
                  >
                    Yellow
                  </option>
                  <option
                    value="#00ffff"
                    style={{ backgroundColor: "#00ffff" }}
                    className="active:text-white"
                  >
                    Cyan
                  </option>
                  <option
                    value="#a52a2a"
                    style={{ backgroundColor: "#a52a2a" }}
                    className="active:text-white"
                  >
                    Brown
                  </option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500">
                  Payment Status
                </label>
                <select
                  value={row.paymentStatus}
                  onChange={(e) =>
                    handlePaymentStatusChange(e, startIndex + index)
                  }
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                >
                  <option value="Paid">Paid</option>
                  <option value="Unpaid">Unpaid</option>
                  <option value="Refunded">Refunded</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop View: Table Layout */}
      <div className="border border-gray-300 rounded-md w-[280px] sm:w-[450px] md:w-[650px] lg:w-[750px] xl:w-[900px] bg-white mb-4 md:py-3">
      <table className="min-w-full divide-y divide-gray-200">
      <thead>
            <tr className="bg-white">
              <th className="p-3 text-center text-xs sm:text-sm font-medium text-black tracking-wider">
                <input
                  type="checkbox"
                  onChange={toggleSelectAll}
                  checked={
                    paginatedData.length > 0 &&
                    paginatedData.every((row) =>
                      selectedRows.includes(row.orderNo)
                    )
                  }
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
              </th>
              <th
                className="p-3 text-center text-xs sm:text-sm font-medium text-black tracking-wider cursor-pointer"
                onClick={() => handleSort("orderNo")}
              >
                Order No {sortField === "orderNo" && (sortOrder ? "↑" : "↓")}
              </th>
              <th
                className="p-3 text-center text-xs sm:text-sm font-medium text-black tracking-wider cursor-pointer"
                onClick={() => handleSort("notes")}
              >
                Notes {sortField === "notes" && (sortOrder ? "↑" : "↓")}
              </th>
              <th
                className="p-3 text-center text-xs sm:text-sm font-medium text-black tracking-wider cursor-pointer"
                onClick={() => handleSort("status")}
              >
                Status {sortField === "status" && (sortOrder ? "↑" : "↓")}
              </th>
              <th
                className="p-3 text-center text-xs sm:text-sm font-medium text-black tracking-wider cursor-pointer"
                onClick={() => handleSort("colorCode")}
              >
                Color Code{" "}
                {sortField === "colorCode" && (sortOrder ? "↑" : "↓")}
              </th>
              <th
                className="p-3 text-center text-xs sm:text-sm font-medium text-black tracking-wider cursor-pointer"
                onClick={() => handleSort("paymentStatus")}
              >
                Payment Status{" "}
                {sortField === "paymentStatus" && (sortOrder ? "↑" : "↓")}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedData.map((row, index) => (
              <tr key={row.orderNo} className="hover:bg-gray-50">
                <td className="p-3 text-center">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(row.orderNo)}
                    onChange={() => toggleRowSelection(row.orderNo)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                </td>
                <td className="p-3 text-center text-sm text-gray-900">
                  {row.orderNo}
                </td>
                <td className="p-3 text-center text-sm text-gray-900">
                  <span className="border rounded-md px-4 py-[2px]">
                    {row.notes}
                  </span>
                </td>
                <td className="p-3 text-center">
                  <select
                    value={row.status}
                    onChange={(e) => handleStatusChange(e, startIndex + index)}
                    className="block w-full sm:w-32 mx-auto py-[2px] px-1 border border-gray-900 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="p-3 text-center">
                  <select
                    value={row.colorCode}
                    onChange={(e) => handleColorChange(e, startIndex + index)}
                    className="block w-full sm:w-32 mx-auto py-[2px] px-1 border border-gray-900 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  >
                    <option
                      value="#ff0000"
                      style={{ backgroundColor: "#ff0000", color: "white" }}
                    >
                      Red
                    </option>
                    <option
                      value="#00ff00"
                      style={{ backgroundColor: "#00ff00" }}
                    >
                      Green
                    </option>
                    <option
                      value="#0000ff"
                      style={{ backgroundColor: "#0000ff", color: "white" }}
                    >
                      Blue
                    </option>
                    <option
                      value="#ffa500"
                      style={{ backgroundColor: "#ffa500" }}
                    >
                      Orange
                    </option>
                    <option
                      value="#800080"
                      style={{ backgroundColor: "#800080", color: "white" }}
                    >
                      Purple
                    </option>
                    <option
                      value="#008080"
                      style={{ backgroundColor: "#008080", color: "white" }}
                    >
                      Teal
                    </option>
                    <option
                      value="#ffc0cb"
                      style={{ backgroundColor: "#ffc0cb" }}
                    >
                      Pink
                    </option>
                    <option
                      value="#ffff00"
                      style={{ backgroundColor: "#ffff00" }}
                    >
                      Yellow
                    </option>
                    <option
                      value="#00ffff"
                      style={{ backgroundColor: "#00ffff" }}
                    >
                      Cyan
                    </option>
                    <option
                      value="#a52a2a"
                      style={{ backgroundColor: "#a52a2a", color: "white" }}
                    >
                      Brown
                    </option>
                  </select>
                </td>
                <td className="p-2">
                  <select
                    value={row.paymentStatus}
                    onChange={(e) =>
                      handlePaymentStatusChange(e, startIndex + index)
                    }
                    className="block w-full sm:w-32 mx-auto py-[2px] px-1 gap-20 border border-gray-900 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  >
                    <option value="Paid">Paid</option>
                    <option value="Unpaid">Unpaid</option>
                    <option value="Refunded">Refunded</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-between border-t border-gray-900 py-4 px-4 ">
          <div className="">
            <h1 className="text-black text-sm font-bold">
              Showing {startIndex + 1} to {endIndex} of {totalItems} entries
            </h1>
          </div>
          
          <div className="w-14">
            <select
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="px-2 py-1 text-sm border rounded-md w-full"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>
      </div>
     
    </div>
  );
};

export default TableWithDropdowns;
