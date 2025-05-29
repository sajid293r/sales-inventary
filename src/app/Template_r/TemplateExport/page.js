"use client";
import React, { useState, useRef, useEffect } from "react";
import { FiSearch, FiChevronDown } from "react-icons/fi"; // Added FiChevronDown
import { MdArrowUpward, MdArrowDownward } from "react-icons/md";
import { FaArrowLeft, FaTimes } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { useDebounce } from "use-debounce";
import layer from "../../image/Layer_1.png"; // Adjust path as needed
import SaleChannelPopup from "../../Popup/page"; // Adjust path as needed

const TableWithCheckboxes = () => {
  const [deletedRows, setDeletedRows] = useState([]);
  const [filters, setFilters] = useState({
    status: [],
    type: [],
    paymentTerm: [],
  });
  const [dropdown, setDropdown] = useState({
    status: false,
    type: false,
    paymentTerm: false,
    filterPanel: false,
    sortTooltip: false,
  });
  const [sortOptions, setSortOptions] = useState({
    field: "none",
    ascending: true,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery] = useDebounce(searchQuery, 300);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState([]);
  const [isOpen1, setIsOpen1] = useState(false);
  const [selected1, setSelected1] = useState([]);
  const [isOpen2, setIsOpen2] = useState(false);
  const [selected2, setSelected2] = useState([]);
  const [isOpenpop, setIsOpenpop] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

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
  const statusOptions = ["Complete", "InComplete"];

  // Handle clicks outside dropdowns to close them
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
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Adjust dropdown position to stay within viewport
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
    adjustDropdownPosition(".status-dropdown", dropdown.status);
  }, [isOpen, isOpen1, isOpen2, dropdown.status]);

  // Sample data
  const data = Array.from({ length: 80 }, (_, i) => ({
    id: i + 1,
    fileName: `File ${String(i + 1).padStart(2, "0")}`,
    description: `Description for file ${i + 1}`,
    dateCreation: `2025-05-${String((i % 20) + 1).padStart(2, "0")}`,
    status: i % 2 === 0 ? "Complete" : "InComplete",
    region: ["Asia", "North America", "Europe", "Africa"][i % 4],
    type: i % 2 === 0 ? "Online" : "Retail",
    paymentTerm: i % 3 === 0 ? "Net 30" : "Prepaid",
  }));

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

  const handleSortChange = (field) => {
    setSortOptions((prev) => ({
      field,
      ascending: prev.field === field ? !prev.ascending : true,
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

  const handleStatusDropdown = () => {
    setDropdown((prev) => ({
      ...prev,
      status: !prev.status,
      filterPanel: true,
      type: false,
      paymentTerm: false,
      sortTooltip: false,
    }));
    setIsOpen(false);
    setIsOpen1(false);
    setIsOpen2(false);
  };

  const handleRowClick = (row) => {
    setSelectedRowData(row);
    console.log("Row clicked:", row);
  };

  const handleDeleteRow = (id) => {
    setDeletedRows((prev) => [...prev, id]);
  };

  const resetFilters = () => {
    setFilters({ status: [], type: [], paymentTerm: [] });
    setSelected([]);
    setSelected1([]);
    setSelected2([]);
    setSearchQuery("");
    setDateFrom("");
    setDateTo("");
    setCurrentPage(1);
  };

  // Filtering logic
  const filteredData = data
    .filter((item) => !deletedRows.includes(item.id))
    .filter((item) => {
      const matchStatus =
        filters.status.length === 0 || filters.status.includes(item.status);
      const matchType = selected1.length === 0 || selected1.includes(item.type);
      const matchPayment =
        selected2.length === 0 || selected2.includes(item.paymentTerm);
      const matchRegion = selected.length === 0 || selected.includes(item.region);
      const matchDate =
        (!dateFrom || new Date(item.dateCreation) >= new Date(dateFrom)) &&
        (!dateTo || new Date(item.dateCreation) <= new Date(dateTo));
      return matchStatus && matchType && matchPayment && matchRegion && matchDate;
    })
    .filter((item) =>
      debouncedSearchQuery
        ? item.fileName.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
        : true
    );

  // Sorting logic
  const sortedData = [...filteredData].sort((a, b) => {
    if (sortOptions.field === "name") {
      return sortOptions.ascending
        ? a.fileName.localeCompare(b.fileName)
        : b.fileName.localeCompare(a.fileName);
    } else if (sortOptions.field === "date") {
      return sortOptions.ascending
        ? new Date(a.dateCreation) - new Date(b.dateCreation)
        : new Date(b.dateCreation) - new Date(a.dateCreation);
    }
    return 0;
  });

  // Pagination
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
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
            Import
          </h1>
        </div>
      </div>

      {/* Template Section */}
      <div className="border rounded-lg bg-white p-6 mb-6 shadow-sm">
        <div className="p-4 space-y-6">
          <div>
            <h1 className="mb-2 text-sm font-medium">Template</h1>
            <input
              type="text"
              className="border rounded-sm w-full max-w-3xl py-1 px-2"
              placeholder="Please enter Template"
            />
          </div>
          <div className="flex flex-wrap gap-42 gap-y-2">
            <div className="flex items-center gap-2">
              <input type="checkbox" />
              <label className="text-sm">Current page</label>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <input type="checkbox" />
              <span className="text-sm">Selected: 0 Product</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-y-2 gap-44">
            <div className="flex items-center gap-2">
              <input type="checkbox" />
              <label className="text-sm">All Products</label>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <input type="checkbox" />
              <span className="text-sm">0 Product Matching your Search</span>
            </div>
          </div>
          <div>
            <h1 className="mb-2 text-sm font-medium">Export as Type</h1>
            <select className="border w-full max-w-3xl rounded-md py-1 px-2">
              <option>Template1</option>
              <option>Template2</option>
              <option>Template3</option>
              <option>Template4</option>
            </select>
          </div>
          <div className="flex justify-end">
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-700">Config</span>
              <button className="border border-gray-300 bg-green-500 text-white rounded-md px-4 py-2 text-sm hover:bg-green-600">
                Import
              </button>
            </div>
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
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              aria-label="Search files"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center">
            <span className="text-sm font-semibold text-gray-900">From:</span>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => {
                setDateFrom(e.target.value);
                setCurrentPage(1);
              }}
              className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Filter by start date"
            />
            <span className="text-sm font-semibold text-gray-900">To:</span>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => {
                setDateTo(e.target.value);
                setCurrentPage(1);
              }}
              className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Filter by end date"
            />
          </div>
          <div className="flex gap-2">
            <button
              ref={filterButtonRef}
              className="border border-gray-300 py-1 px-4 rounded-md text-sm hover:bg-gray-100 transition flex items-center gap-2"
              onClick={() => toggleDropdown("filterPanel")}
              aria-expanded={dropdown.filterPanel}
              aria-label="Toggle filter panel"
            >
              Filter
             
              
            </button>
            <button
              ref={sortButtonRef}
              className="border border-gray-300 py-1 px-4 rounded-md text-sm hover:bg-gray-100 transition flex items-center gap-2"
              onClick={() => toggleDropdown("sortTooltip")}
              aria-expanded={dropdown.sortTooltip}
              aria-label="Toggle sort options"
            >
              Sort
           
           
            </button>
          </div>
        </div>

        {/* Sort Tooltip */}
        {dropdown.sortTooltip && (
          <div
            ref={sortTooltipRef}
            className="w-full sm:w-44 p-4 bg-white border border-gray-200 rounded-lg shadow-sm absolute z-30 right-12 top-full -mt-40"
            role="menu"
          >
            <form className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="sort"
                  value="name"
                  checked={sortOptions.field === "name"}
                  onChange={() => handleSortChange("name")}
                  className="text-blue-600 focus:ring-blue-500"
                  aria-label="Sort by file name"
                />
                <span className="text-sm text-gray-700 font-semibold">
                  File Name
                </span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="sort"
                  value="date"
                  checked={sortOptions.field === "date"}
                  onChange={() => handleSortChange("date")}
                  className="text-blue-600 focus:ring-blue-500"
                  aria-label="Sort by date created"
                />
                <span className="text-sm text-gray-700 font-semibold">
                  Date Created
                </span>
              </label>
              <label className="flex items-center gap-2 border-t border-gray-200 pt-2">
                <input
                  type="radio"
                  name="order"
                  checked={sortOptions.ascending}
                  onChange={() =>
                    setSortOptions((prev) => ({ ...prev, ascending: true }))
                  }
                  className="text-blue-600 focus:ring-blue-500"
                  aria-label="Sort ascending"
                />
                <span className="text-sm text-gray-700 font-semibold">
                  Ascending
                </span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="order"
                  checked={!sortOptions.ascending}
                  onChange={() =>
                    setSortOptions((prev) => ({ ...prev, ascending: false }))
                  }
                  className="text-blue-600 focus:ring-blue-500"
                  aria-label="Sort descending"
                />
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
            className="w-full sm:w-64 p-4 bg-white border border-gray-200 rounded-lg shadow-sm absolute z-30 right-12 top-full -mt-40"
            role="menu"
          >
            <form className="space-y-3">
              <div className="relative">
                <button
                  type="button"
                  className="w-full text-left border border-gray-300 rounded-md px-3 py-2 text-sm flex items-center justify-between"
                  onClick={handleStatusDropdown}
                  aria-expanded={dropdown.status}
                  aria-label="Toggle status filter"
                >
                  <span>
                    Status{" "}
                    {filters.status.length > 0 && `(${filters.status.length})`}
                  </span>
                  <FiChevronDown
                    className={`transform transition-transform duration-200 ${
                      dropdown.status ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {dropdown.status && (
                  <div className="status-dropdown absolute w-full bg-white border border-gray-200 rounded-md mt-1 shadow-sm z-10">
                    {statusOptions.map((option) => (
                      <label
                        key={option}
                        className="flex items-center gap-2 p-2 hover:bg-gray-100"
                      >
                        <input
                          type="checkbox"
                          checked={filters.status.includes(option)}
                          onChange={() => handleFilterChange("status", option)}
                          className="text-blue-600"
                          aria-label={`Filter by status ${option}`}
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
                  className="w-full text-left border border-gray-300 rounded-md px-3 py-2 text-sm flex items-center justify-between"
                  onClick={handleContinentDropdown}
                  aria-expanded={isOpen}
                  aria-label="Toggle region filter"
                >
                  <span>
                    Region {selected.length > 0 && `(${selected.length})`}
                  </span>
                  <FiChevronDown
                    className={`transform transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
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
                          aria-label={`Filter by region ${option}`}
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
                  className="w-full text-left border border-gray-300 rounded-md px-3 py-2 text-sm flex items-center justify-between"
                  onClick={handleTypeDropdown}
                  aria-expanded={isOpen1}
                  aria-label="Toggle type filter"
                >
                  <span>
                    Type {selected1.length > 0 && `(${selected1.length})`}
                  </span>
                  <FiChevronDown
                    className={`transform transition-transform duration-200 ${
                      isOpen1 ? "rotate-180" : ""
                    }`}
                  />
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
                          aria-label={`Filter by type ${option}`}
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
                  className="w-full text-left border border-gray-300 rounded-md px-3 py-2 text-sm flex items-center justify-between"
                  onClick={handlePaymentDropdown}
                  aria-expanded={isOpen2}
                  aria-label="Toggle payment term filter"
                >
                  <span>
                    Payment Term{" "}
                    {selected2.length > 0 && `(${selected2.length})`}
                  </span>
                  <FiChevronDown
                    className={`transform transition-transform duration-200 ${
                      isOpen2 ? "rotate-180" : ""
                    }`}
                  />
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
                          aria-label={`Filter by payment term ${option}`}
                        />
                        <span className="text-sm text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={resetFilters}
                className="w-full text-left border border-gray-300 rounded-md px-3 py-2 text-sm bg-red-100 hover:bg-red-200"
                aria-label="Clear all filters"
              >
                Clear Filters
              </button>
            </form>
          </div>
        )}

        {/* Table for Desktop */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="border-collapse text-sm w-full mx-auto table-auto">
            <thead>
              <tr className="bg-gray-50 text-xs">
                <th className="p-1 py-2 border-b-2 border-[#E7E7E7] w-12 text-center"></th>
                <th className="p-1 py-2 border-b-2 border-[#E7E7E7] text-center">
                  File Name
                </th>
                <th className="p-1 py-2 border-b-2 border-[#E7E7E7] text-center">
                  Description
                </th>
                <th className="p-1 py-2 border-b-2 border-[#E7E7E7] text-center">
                  Date Creation
                </th>
                <th className="p-1 py-2 border-b-2 border-[#E7E7E7] text-center">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleRowClick(row)}
                  role="row"
                >
                  <td className="p-1 py-2 border-b-2 border-[#E7E7E7] text-center w-12">
                    <FaTimes
                      className="text-[#DE6361] hover:text-red-700 cursor-pointer ml-4 border"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteRow(row.id);
                      }}
                      aria-label={`Delete row ${row.fileName}`}
                    />
                  </td>
                  <td className="p-1 py-2 border-b-2 border-[#E7E7E7] text-center">
                    {row.fileName}
                  </td>
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
              role="row"
            >
              <div className="flex items-center gap-2 mb-2">
                <FaTimes
                  className="text-red-500 hover:text-red-700 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteRow(row.id);
                  }}
                  aria-label={`Delete row ${row.fileName}`}
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
              aria-label="Previous page"
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
              aria-label="Next page"
            >
              {">"}
            </button>
          </div>
          <select
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Items per page"
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