"use client";
import React, { useState, useRef, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { MdArrowUpward, MdArrowDownward } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import layer from "../../image/Layer_1.png"; // Adjust path as needed
import SaleChannelPopup from "../../Popup/page"; // Adjust path as needed

const TableWithCheckboxes = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [filters, setFilters] = useState({
    status: [],
    type: [],
    paymentTerm: [],
    region: "",
  });
  const [dropdown, setDropdown] = useState({
    status: false,
    type: false,
    paymentTerm: false,
    filterPanel: false,
    sortTooltip: false,
  });
  const [sortOptions, setSortOptions] = useState({
    name: false,
    country: false,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState([]);
  const [isOpen1, setIsOpen1] = useState(false);
  const [selected1, setSelected1] = useState([]);
  const [isOpen2, setIsOpen2] = useState(false);
  const [selected2, setSelected2] = useState([]);
  const [showButtons, setShowButtons] = useState(false);
  const [isOpenpop, setIsOpenpop] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const buttonsRef = useRef(null);
  const filterButtonRef = useRef(null);
  const filterPanelRef = useRef(null);
  const sortButtonRef = useRef(null);
  const sortTooltipRef = useRef(null);
  const searchInputRef = useRef(null);

  const options = [
    "Asia",
    "North America",
    "South America",
    "Europe",
    "Africa",
    "Oceania",
  ];
  const options1 = ["Online", "Retail"];
  const options2 = ["Net 30", "Prepaid"];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sortButtonRef.current &&
        !sortButtonRef.current.contains(event.target) &&
        sortTooltipRef.current &&
        !sortTooltipRef.current.contains(event.target)
      ) {
        setDropdown((prev) => ({ ...prev, sortTooltip: false }));
      }
      if (
        filterButtonRef.current &&
        !filterButtonRef.current.contains(event.target) &&
        filterPanelRef.current &&
        !filterPanelRef.current.contains(event.target)
      ) {
        setDropdown((prev) => ({ ...prev, filterPanel: false }));
        setIsOpen(false);
        setIsOpen1(false);
        setIsOpen2(false);
      }
      if (
        showButtons &&
        buttonsRef.current &&
        !buttonsRef.current.contains(event.target)
      ) {
        setShowButtons(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showButtons]);

  useEffect(() => {
    const adjustDropdownPosition = (dropdownClass, isOpen) => {
      if (isOpen) {
        const dropdownElement = document.querySelector(dropdownClass);
        if (dropdownElement) {
          const rect = dropdownElement.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          const viewportWidth = window.innerWidth;
          if (rect.bottom > viewportHeight) {
            dropdownElement.style.top = "auto";
            dropdownElement.style.bottom = "100%";
          } else {
            dropdownElement.style.top = "100%";
            dropdownElement.style.bottom = "auto";
          }
          if (rect.right > viewportWidth) {
            dropdownElement.style.left = "auto";
            dropdownElement.style.right = "0";
          } else if (rect.left < 0) {
            dropdownElement.style.left = "0";
            dropdownElement.style.right = "auto";
          }
        }
      }
    };
    adjustDropdownPosition(".continent-dropdown", isOpen);
    adjustDropdownPosition(".type-dropdown", isOpen1);
    adjustDropdownPosition(".payment-dropdown", isOpen2);
  }, [isOpen, isOpen1, isOpen2]);

  const data = Array.from({ length: 80 }, (_, i) => ({
    id: i + 1,
    fileName: `File ${String(i + 1).padStart(2, "0")}`,
    description: `Description for file ${i + 1}`,
    dateCreation: `2025-05-${String((i % 20) + 1).padStart(2, "0")}`,
    status: i % 2 === 0 ? "Complete" : "InComplete",
    action: i % 2 === 0 ? "Download file" : "Download error file",
    region: ["Asia", "North America", "Europe", "Africa"][i % 4],
    type: i % 2 === 0 ? "Online" : "Retail",
    paymentTerm: i % 3 === 0 ? "Net 30" : "Prepaid",
  }));

  const toggleSelectAll = (e) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPageData = filteredData.slice(startIndex, endIndex);
    setSelectedRows(e.target.checked ? currentPageData.map((d) => d.id) : []);
  };

  const toggleRow = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleDropdown = (field) => {
    setDropdown((prev) => ({
      status: false,
      type: false,
      paymentTerm: false,
      filterPanel: false,
      sortTooltip: false,
      [field]: !prev[field],
    }));
    setIsOpen(false);
    setIsOpen1(false);
    setIsOpen2(false);
  };

  const toggleOption = (value) => {
    setSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
    setCurrentPage(1);
  };

  const toggleOption1 = (value) => {
    setSelected1((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
    setCurrentPage(1);
  };

  const toggleOption2 = (value) => {
    setSelected2((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
    setCurrentPage(1);
  };

  const handleFilterChange = (field, value) => {
    setFilters((prev) => {
      const values = prev[field];
      return {
        ...prev,
        [field]: values.includes(value)
          ? values.filter((v) => v !== value)
          : [...values, value],
      };
    });
    setCurrentPage(1);
  };

  const handleRegionFilter = (region) => {
    setFilters((prev) => ({
      ...prev,
      region: prev.region === region ? "" : region,
    }));
    setCurrentPage(1);
  };

  const handleSortChange = (option) => {
    setSortOptions((prev) => ({
      ...prev,
      [option]: !prev[option],
    }));
  };

  const handleContinentDropdown = () => {
    setIsOpen((prev) => !prev);
    setIsOpen1(false);
    setIsOpen2(false);
    setDropdown((prev) => ({
      ...prev,
      filterPanel: true,
      status: false,
      type: false,
      paymentTerm: false,
      sortTooltip: false,
    }));
  };

  const handleTypeDropdown = () => {
    setIsOpen1((prev) => !prev);
    setIsOpen(false);
    setIsOpen2(false);
    setDropdown((prev) => ({
      ...prev,
      filterPanel: true,
      status: false,
      type: false,
      paymentTerm: false,
      sortTooltip: false,
    }));
  };

  const handlePaymentDropdown = () => {
    setIsOpen2((prev) => !prev);
    setIsOpen(false);
    setIsOpen1(false);
    setDropdown((prev) => ({
      ...prev,
      filterPanel: true,
      status: false,
      type: false,
      paymentTerm: false,
      sortTooltip: false,
    }));
  };

  const handleRowClick = (row) => {
    setSelectedRowData(row);
    console.log("Row clicked:", row);
  };

  const handleAction = (row, action) => {
    if (selectedRows.length === 0) {
      alert("Please select at least one file to perform this action.");
      return;
    }
    if (action === "Download file") {
      console.log(`Downloading file: ${row.fileName}`);
    } else if (action === "Download error file") {
      console.log(`Re-uploading file: ${row.fileName}`);
    }
  };

  const filteredData = data
    .filter((item) => {
      const matchStatus =
        filters.status.length === 0 || filters.status.includes(item.status);
      const matchType = selected1.length === 0 || selected1.includes(item.type);
      const matchPayment =
        selected2.length === 0 || selected2.includes(item.paymentTerm);
      const matchRegion =
        selected.length === 0 || selected.includes(item.region);
      const matchRegionButton =
        filters.region === "" || item.region === filters.region;
      return (
        matchStatus &&
        matchType &&
        matchPayment &&
        matchRegion &&
        matchRegionButton
      );
    })
    .filter((item) =>
      searchQuery
        ? item.fileName.toLowerCase().includes(searchQuery.toLowerCase())
        : true
    );

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortOptions.name) {
      return sortOptions.name
        ? a.fileName.localeCompare(b.fileName)
        : b.fileName.localeCompare(a.fileName);
    }
    return 0;
  });

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setSelectedRows([]);
    }
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
    setSelectedRows([]);
  };

  return (
    <div className="   w-full  min-w-[640px] md:min-w-[800px] lg:min-w-[1000px] xl:min-w-[1300px] 2xl:min-w-[1300px] 3xl:min-w-[1400px] 4xl:min-w-[1600px]  mx-auto table-auto">
      {isOpenpop && <SaleChannelPopup onClose={() => setIsOpenpop(false)} />}
      <div className="flex flex-col sm:flex-row justify-between mb-4 gap-3 items-center">
        <div className="flex items-center gap-2">
          <Link href="/Inventory_list/Inventorylist">
            <div className="border rounded-md p-1 hover:bg-gray-100">
              <FaArrowLeft className="text-sm" />
            </div>
          </Link>
          <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">
            Import
          </h1>
        </div>
      </div>

      {/* Template Section */}
      <div className="border rounded-lg bg-white p-6 mb-6 shadow-sm">
        <div className="flex gap-6">
          <div className="flex gap-6">
            <h1>Sale channel</h1>
            <select className="border py-0.5  lg:w-[300px] md:w-[400px] w-auto rounded-md">
              <option>channel1</option>
              <option>channel2</option>
              <option>channel3</option>
              <option>channel4</option>
            </select>
          </div>
          <div className="flex gap-6">
            <h1>Template Name</h1>
            <select className="border py-0.5 lg:w-[400px] md:w-[400px] w-auto rounded-md">
              <option>Template1</option>
              <option>Template2</option>
              <option>Template3</option>
              <option>Template4</option>
            </select>
          </div>
        </div>
        <p className="mt-2 text-sm text-gray-600">
          Download{" "}
          <span className="text-blue-500 cursor-pointer hover:underline">
            Sample CSV File/API Link
          </span>{" "}
          to see an example of the required format
        </p>
        <div className="border-2 border-dashed border-gray-300 p-4 mt-4">
          {/* Grid layout for image */}
          <div className="flex justify-center items-center min-h-[100px] w-full mb-4">
            <Image
              src={layer}
              alt="Upload placeholder"
              className="h-16 w-auto"
            />
          </div>

          {/* File input and Add URL text */}
          <div className="flex flex-col sm:flex-row gap-2 justify-center items-center">
            <input
              type="file"
              className="text-sm text-gray-600 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            <span className="text-blue-500 text-sm cursor-pointer hover:underline">
              Add File URL
            </span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-4">
          <div className="flex items-center gap-2">
            <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" />
            <span className="text-sm text-gray-700">
              Existing product that match SKU will be updated
            </span>
          </div>
          <div className="flex gap-2 items-center">
            <span className="text-sm text-gray-700">Config</span>
            <button className="border border-gray-300 bg-green-500 text-white rounded-md px-4 py-2 text-sm hover:bg-green-600">
              Import
            </button>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="border rounded-lg bg-white shadow-sm overflow-hidden">
        <div className="flex flex-col sm:flex-row justify-between items-center p-4 gap-4 border-b border-gray-200">
          <div className="relative w-full sm:w-64 md:w-80">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search..."
              value={searchQuery ?? ""}
              onChange={(e) => {
                setSearchQuery(e.target.value || "");
                setCurrentPage(1);
              }}
              className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center">
            <span className="text-sm font-semibold text-gray-900">From:</span>
            <input
              type="date"
              className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm font-semibold text-gray-900">To:</span>
            <input
              type="date"
              className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-2">
            <button
              ref={filterButtonRef}
              className="border border-gray-300 py-1 px-4 rounded-md text-sm hover:bg-gray-100 transition"
              onClick={() => toggleDropdown("filterPanel")}
            >
              Filter
            </button>
            <button
              ref={sortButtonRef}
              className="border border-gray-300 py-1 px-4 rounded-md text-sm hover:bg-gray-100 transition"
              onClick={() => toggleDropdown("sortTooltip")}
            >
              Sort
            </button>
          </div>
        </div>

        {/* Sort Tooltip */}
        {dropdown.sortTooltip && (
          <div
            ref={sortTooltipRef}
            className="w-full sm:w-44 p-4 bg-white border border-gray-200 rounded-lg shadow-sm absolute z-30 right-0 top-full mt-2"
          >
            <form className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="sort"
                  value="name"
                  checked={sortOptions.name !== false}
                  onChange={() => handleSortChange("name")}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 font-semibold">
                  File Name
                </span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="sort"
                  value="none"
                  checked={!sortOptions.name && !sortOptions.country}
                  onChange={() =>
                    setSortOptions({ name: false, country: false })
                  }
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 font-semibold">
                  Date Created
                </span>
              </label>
              <label className="flex items-center gap-2 border-t border-gray-200 pt-2">
                <MdArrowUpward />
                <span className="text-sm text-gray-700 font-semibold">
                  Ascending
                </span>
              </label>
              <label className="flex items-center gap-2">
                <MdArrowDownward />
                <span className="text-sm text-gray-700 font-semibold">
                  Descending
                </span>
              </label>
            </form>
          </div>
        )}

        {/* Filter Panel */}
        {dropdown.filterPanel && (
          <div
            ref={filterPanelRef}
            className="w-full sm:w-64 p-4 bg-white border border-gray-200 rounded-lg shadow-sm absolute z-30 right-0 top-full mt-2"
          >
            <form className="space-y-3">
              <div className="relative">
                <button
                  type="button"
                  className="w-full text-left border border-gray-300 rounded-md px-3 py-2 text-sm"
                  onClick={handleContinentDropdown}
                >
                  Region {selected.length > 0 && `(${selected.length})`}
                </button>
                {isOpen && (
                  <div className="continent-dropdown absolute w-full bg-white border border-gray-200 rounded-md mt-1 shadow-sm z-10">
                    {options.map((option) => (
                      <label
                        key={option}
                        className="flex items-center gap-2 p-2 hover:bg-gray-100"
                      >
                        <input
                          type="checkbox"
                          checked={selected.includes(option)}
                          onChange={() => toggleOption(option)}
                          className="text-blue-600"
                        />
                        <span className="text-sm text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
              <div className="relative">
                <button
                  type="button"
                  className="w-full text-left border border-gray-300 rounded-md px-3 py-2 text-sm"
                  onClick={handleTypeDropdown}
                >
                  Type {selected1.length > 0 && `(${selected1.length})`}
                </button>
                {isOpen1 && (
                  <div className="type-dropdown absolute w-full bg-white border border-gray-200 rounded-md mt-1 shadow-sm z-10">
                    {options1.map((option) => (
                      <label
                        key={option}
                        className="flex items-center gap-2 p-2 hover:bg-gray-100"
                      >
                        <input
                          type="checkbox"
                          checked={selected1.includes(option)}
                          onChange={() => toggleOption1(option)}
                          className="text-blue-600"
                        />
                        <span className="text-sm text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
              <div className="relative">
                <button
                  type="button"
                  className="w-full text-left border border-gray-300 rounded-md px-3 py-2 text-sm"
                  onClick={handlePaymentDropdown}
                >
                  Payment Term {selected2.length > 0 && `(${selected2.length})`}
                </button>
                {isOpen2 && (
                  <div className="payment-dropdown absolute w-full bg-white border border-gray-200 rounded-md mt-1 shadow-sm z-10">
                    {options2.map((option) => (
                      <label
                        key={option}
                        className="flex items-center gap-2 p-2 hover:bg-gray-100"
                      >
                        <input
                          type="checkbox"
                          checked={selected2.includes(option)}
                          onChange={() => toggleOption2(option)}
                          className="text-blue-600"
                        />
                        <span className="text-sm text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </form>
          </div>
        )}

        {/* Table for Desktop */}
        <div className="hidden sm:block overflow-x-auto">
          <table className=" border-collapse text-sm w-full  mx-auto table-auto">
            <thead>
              <tr className="bg-gray-50 text-xs">
                <th className="p-1 py-2 border-b-2 border-[#E7E7E7] w-12 text-center"></th>
                <th className="p-1 py-2 border-b-2 border-[#E7E7E7] text-center">File Name</th>
                <th className="p-1 py-2 border-b-2 border-[#E7E7E7] text-center">Description</th>
                <th className="p-1 py-2 border-b-2 border-[#E7E7E7] text-center">Date Creation</th>
                <th className="p-1 py-2 border-b-2 border-[#E7E7E7] text-center">Status</th>
                <th className="p-1 py-2 border-b-2 border-[#E7E7E7] text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleRowClick(row)}
                >
                  <td className="p-1 py-2 border-b-2 border-[#E7E7E7] text-center w-12"></td>
                  <td className="p-1 py-2 border-b-2 border-[#E7E7E7] text-center">{row.fileName}</td>
                  <td className="p-1 py-2 border-b-2 border-[#E7E7E7] text-center">
                    {row.description}
                  </td>
                  <td className="p-1 py-2 border-b-2 border-[#E7E7E7] text-center">
                    {row.dateCreation}
                  </td>
                  <td className="p-1 py-2 border-b-2 border-[#E7E7E7] text-center">
                    <span
                      className={`inline-block px-3 py-2 rounded-md text-xs ${
                        row.status === "Complete"
                          ? "bg-green-100 text-green-700 px-4"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="p-1 py-2 border-b-2 border-[#E7E7E7] text-center">
                    {row.action === "Download file" ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAction(row, "Download file");
                        }}
                        className={`text-blue-600 hover:underline text-sm ${
                          selectedRows.length === 0
                            ? "opacity-100 cursor-not-allowed"
                            : ""
                        }`}
                        disabled={selectedRows.length === 0}
                      >
                        Download
                      </button>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAction(row, "Download error file");
                        }}
                        className={`text-blue-600 hover:underline text-sm ${
                          selectedRows.length === 0
                            ? "opacity-100 cursor-not-allowed"
                            : ""
                        }`}
                        disabled={selectedRows.length === 0}
                      >
                        Re-upload
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="block sm:hidden divide-y divide-gray-200 p-4">
          {paginatedData.map((row) => (
            <div
              key={row.id}
              className="p-4 bg-gray-50 mb-3 rounded-lg shadow-sm cursor-pointer"
              onClick={() => handleRowClick(row)}
            >
              <div className="flex items-center gap-2 mb-2">
                <input
                  type="checkbox"
                  checked={selectedRows.includes(row.id)}
                  onChange={(e) => {
                    e.stopPropagation();
                    toggleRow(row.id);
                  }}
                  className="text-blue-600"
                />
                <span className="font-semibold text-sm">{row.fileName}</span>
              </div>
              <div className="grid grid-cols-1 gap-2 text-sm">
                <div>
                  <span className="font-semibold">Description:</span>{" "}
                  {row.description}
                </div>
                <div>
                  <span className="font-semibold">Date Creation:</span>{" "}
                  {row.dateCreation}
                </div>
                <div>
                  <span className="font-semibold">Status:</span>{" "}
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-xs ${
                      row.status === "Complete"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {row.status}
                  </span>
                </div>
                <div>
                  <span className="font-semibold">Action:</span>{" "}
                  {row.action === "Download" ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAction(row, "Download");
                      }}
                      className={`text-blue-600 hover:underline text-sm ${
                        selectedRows.length === 0
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                      disabled={selectedRows.length === 0}
                    >
                      Download
                    </button>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAction(row, "Re-upload");
                      }}
                      className={`text-green-600 hover:underline text-sm ${
                        selectedRows.length === 0
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                      disabled={selectedRows.length === 0}
                    >
                      Re-upload
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between p-4 gap-4 border-t border-gray-200">
          <div className="text-sm text-gray-700 font-semibold">
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
