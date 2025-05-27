"use client";
import React, { useState, useRef, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { MdArrowUpward, MdArrowDownward } from "react-icons/md";
import { FaChevronDown } from "react-icons/fa";
import SaleChannelPopup from "../../Popup/page";

const TableWithCheckboxes = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [filters, setFilters] = useState({
    type: [],
    paymentTerm: [],
    region: "",
  });
  const [dropdown, setDropdown] = useState({
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
  const [filterType, setFilterType] = useState("");
  const [filterType1, setFilterType1] = useState("");

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
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showButtons]);

  useEffect(() => {
    const adjustDropdownPosition = (dropdownClass, isOpen) => {
      if (isOpen) {
        const dropdownElement = document.querySelector(dropdownClass);
        if (dropdownElement) {
          const rect = dropdownElement.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          const viewportWidth = window.innerWidth;
          dropdownElement.style.position = "absolute";
          dropdownElement.style.zIndex = "40";
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
    pricelistName: `Pricelist ${String(i + 1).padStart(2, "0")}`,
    salechannel: ["Online", "Retail", "Wholesale", "Marketplace"][i % 4],
    currency: ["USD", "EUR", "GBP", "INR"][i % 4],
    price: (50 + (i % 151)).toFixed(2),
    region: ["Asia", "North America", "Europe", "Africa"][i % 4],
    country: ["USA", "UK", "Germany", "India"][i % 4],
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
      type: false,
      paymentTerm: false,
      sortTooltip: false,
    }));
  };

  const handleRowClick = (row) => {
    setSelectedRowData(row);
    console.log("Row clicked:", row);
  };

  const filteredData = data
    .filter((item) => {
      const matchType = selected1.length === 0 || selected1.includes(item.type);
      const matchPayment =
        selected2.length === 0 || selected2.includes(item.paymentTerm);
      const matchRegion =
        selected.length === 0 || selected.includes(item.region);
      const matchRegionButton =
        filters.region === "" || item.region === filters.region;
      return matchType && matchPayment && matchRegion && matchRegionButton;
    })
    .filter((item) =>
      searchQuery
        ? item.pricelistName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.country.toLowerCase().includes(searchQuery.toLowerCase())
        : true
    );

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortOptions.name) {
      return sortOptions.name
        ? a.pricelistName.localeCompare(b.pricelistName)
        : b.pricelistName.localeCompare(a.pricelistName);
    }
    if (sortOptions.country) {
      return sortOptions.country
        ? a.country.localeCompare(b.country)
        : b.country.localeCompare(a.country);
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
    <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-6  min-w-[640px] xl:min-w-[1300px] 2xl:min-w-[1700px] 3xl:min-w-[1800px] 4xl:min-w-[1900px]">
      <div className="flex flex-col sm:flex-row justify-between mb-6 gap-4">
        <h1 className="text-lg sm:text-xl text-gray-900 font-semibold">
          Pricing
        </h1>
        <div className="flex gap-3 justify-end items-center">
          <button className="text-sm sm:text-base px-4 py-2 hover:bg-gray-100 rounded-md transition">
            Import
          </button>
          <button
            className="bg-[#52ce66] text-white py-2 px-4 rounded-md text-sm sm:text-base hover:bg-[#48b55a] transition"
            onClick={() => setIsOpenpop(true)}
          >
            Create
          </button>
          {isOpenpop && <SaleChannelPopup onClose={() => setIsOpenpop(false)} />}
        </div>
      </div>

      <div className="rounded-xl border min-w-full bg-white border-gray-300 shadow-lg">
        <div className="flex flex-wrap gap-2 p-4 border-b border-gray-200">
          {["Active", "Unactive"].map((region) => (
            <button
              key={region}
              className={`py-1.5 px-3 rounded-md text-sm transition ${
                filters.region === region
                  ? "bg-[#449ae6] text-white"
                  : "text-gray-700 hover:bg-[#449ae6] hover:text-white"
              }`}
              onClick={() => handleRegionFilter(region)}
            >
              {region}
            </button>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-between py-3 px-4 gap-4 items-center border-b border-gray-200">
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
              className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-lg focus:border-blue-500 bg-transparent focus:outline-none text-sm"
            />
          </div>
          <div className="flex flex-wrap gap-3 items-center">
            <span className="text-sm font-semibold text-gray-900">From:</span>
            <input
              type="date"
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm font-semibold text-gray-900">To:</span>
            <input
              type="date"
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-2 relative w-full sm:w-auto justify-center sm:justify-end">
            <button
              ref={filterButtonRef}
              className="border border-gray-300 py-2 px-4 rounded-md text-sm hover:bg-gray-100 transition"
              onClick={() => toggleDropdown("filterPanel")}
            >
              Filter
            </button>
            <button
              ref={sortButtonRef}
              className="border py-2 px-4 border-gray-300 rounded-md text-sm hover:bg-gray-100 transition"
              onClick={() => toggleDropdown("sortTooltip")}
            >
              Sort
            </button>
            {dropdown.sortTooltip && (
              <div
                ref={sortTooltipRef}
                className="w-full sm:w-48 p-4 bg-white border border-gray-200 rounded-lg shadow-sm absolute z-40 top-full right-0 mt-2"
              >
                <form className="space-y-2">
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="sort"
                      value="name"
                      checked={sortOptions.name !== false}
                      onChange={() => handleSortChange("name")}
                      className="text-blue-600 focus:ring-blue-500 focus:ring-2"
                    />
                    <span className="text-gray-700 text-sm font-semibold">Name</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="sort"
                      value="none"
                      checked={!sortOptions.name && !sortOptions.country}
                      onChange={() => setSortOptions({ name: false, country: false })}
                      className="text-blue-600 focus:ring-blue-500 focus:ring-2"
                    />
                    <span className="text-gray-700 text-sm font-semibold">Date Created</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="sort"
                      value="none"
                      checked={!sortOptions.name && !sortOptions.country}
                      onChange={() => setSortOptions({ name: false, country: false })}
                      className="text-blue-600 focus:ring-blue-500 focus:ring-2"
                    />
                    <span className="text-gray-700 text-sm font-semibold">Date Modify</span>
                  </label>
                  <div className="border-t border-gray-200 pt-2">
                    <label className="flex items-center space-x-3">
                      <MdArrowUpward />
                      <span className="text-gray-700 text-sm font-semibold">Ascending</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <MdArrowDownward />
                      <span className="text-gray-700 text-sm font-semibold">Descending</span>
                    </label>
                  </div>
                </form>
              </div>
            )}
            {dropdown.filterPanel && (
              <div
                ref={filterPanelRef}
                className="w-full sm:w-64 p-4 bg-white border border-gray-200 rounded-lg shadow-sm absolute z-40 top-full right-0 mt-2"
              >
                <form className="space-y-3">
                  <div className="relative">
                    <button
                      type="button"
                      className="w-full text-left border border-gray-300 rounded-md px-3 py-2 text-sm flex justify-between items-center"
                      onClick={handleContinentDropdown}
                    >
                      Region {isOpen && <FaChevronDown />}
                    </button>
                    {isOpen && (
                      <div className="continent-dropdown absolute w-full bg-white border border-gray-200 rounded-md mt-1 z-50">
                        {options.map((option) => (
                          <label
                            key={option}
                            className="flex items-center space-x-2 px-3 py-2 hover:bg-gray-100"
                          >
                            <input
                              type="checkbox"
                              checked={selected.includes(option)}
                              onChange={() => toggleOption(option)}
                              className="text-blue-600"
                            />
                            <span>{option}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="relative">
                    <button
                      type="button"
                      className="w-full text-left border border-gray-300 rounded-md px-3 py-2 text-sm flex justify-between items-center"
                      onClick={handleTypeDropdown}
                    >
                      Type {isOpen1 && <FaChevronDown />}
                    </button>
                    {isOpen1 && (
                      <div className="type-dropdown absolute w-full bg-white border border-gray-200 rounded-md mt-1 z-50">
                        {options1.map((option) => (
                          <label
                            key={option}
                            className="flex items-center space-x-2 px-3 py-2 hover:bg-gray-100"
                          >
                            <input
                              type="checkbox"
                              checked={selected1.includes(option)}
                              onChange={() => toggleOption1(option)}
                              className="text-blue-600"
                            />
                            <span>{option}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="relative">
                    <button
                      type="button"
                      className="w-full text-left border border-gray-300 rounded-md px-3 py-2 text-sm flex justify-between items-center"
                      onClick={handlePaymentDropdown}
                    >
                      Payment Term {isOpen2 && <FaChevronDown />}
                    </button>
                    {isOpen2 && (
                      <div className="payment-dropdown absolute w-full bg-white border border-gray-200 rounded-md mt-1 z-50">
                        {options2.map((option) => (
                          <label
                            key={option}
                            className="flex items-center space-x-2 px-3 py-2 hover:bg-gray-100"
                          >
                            <input
                              type="checkbox"
                              checked={selected2.includes(option)}
                              onChange={() => toggleOption2(option)}
                              className="text-blue-600"
                            />
                            <span>{option}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Product Type
                    </label>
                    <select
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                    >
                      <option value="none">Select Type</option>
                      {[
                        "Can be Sold",
                        "Can be Purchased",
                        "Bundle",
                        "Kitting",
                        "Spare Parts",
                        "Assembly Required",
                      ].map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Brand
                    </label>
                    <select
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={filterType1}
                      onChange={(e) => setFilterType1(e.target.value)}
                    >
                      <option value="none">Select Brand</option>
                      <option value="Watch">Watch</option>
                      <option value="Casio">Casio</option>
                    </select>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full w-full  mx-auto table-auto text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="p-3 border-b-2 border-[#E7E7E7] text-center w-12">
                  <input
                    type="checkbox"
                    checked={
                      paginatedData.length > 0 &&
                      selectedRows.length === paginatedData.length
                    }
                    onChange={toggleSelectAll}
                    className="text-blue-600"
                  />
                </th>
                <th className="p-1 py-1 border-b-2 border-[#E7E7E7] text-center">Pricelist Name</th>
                <th className="p-1 py-1 border-b-2 border-[#E7E7E7] text-center">Sale Channel</th>
                {/* <th className "p-1 py-1 border-b-2 border-[#E7E7E7] text-center">Currency</th> */}
                <th className="p-1 py-1 border-b-2 border-[#E7E7E7] text-center">Currency</th>

                <th className="p-1 py-1 border-b-2 border-[#E7E7E7] text-center">Price</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleRowClick(row)}
                >
                  <td className="p-1 py-1 border-b-2 border-[#E7E7E7] text-center">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(row.id)}
                      onChange={(e) => {
                        e.stopPropagation();
                        toggleRow(row.id);
                      }}
                      className="text-blue-600"
                    />
                  </td>
                  <td className="p-1 py-1 border-b-2 border-[#E7E7E7] text-center">{row.pricelistName}</td>
                  <td className="p-1 py-1 border-b-2 border-[#E7E7E7] text-center">{row.salechannel}</td>
                  <td className="p-1 py-1 border-b-2 border-[#E7E7E7] text-center">{row.currency}</td>
                  <td className="p-1 py-1 border-b-2 border-[#E7E7E7] text-center">${row.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="block sm:hidden divide-y divide-gray-200 px-4 py-4">
          {paginatedData.map((row) => (
            <div
              key={row.id}
              className="p-4 bg-gray-50 mb-4 rounded-lg shadow-sm cursor-pointer"
              onClick={() => handleRowClick(row)}
            >
              <div className="flex items-center mb-3">
                <input
                  type="checkbox"
                  checked={selectedRows.includes(row.id)}
                  onChange={(e) => {
                    e.stopPropagation();
                    toggleRow(row.id);
                  }}
                  className="text-blue-600 mr-3"
                />
                <span className="font-semibold text-gray-900">{row.pricelistName}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="font-semibold text-gray-700">Sale Channel:</span>{" "}
                  {row.salechannel}
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Currency:</span>{" "}
                  {row.currency}
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Price:</span> $
                  {row.price}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between p-4 gap-4">
          <div className="text-sm text-gray-700">
            Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of{" "}
            {totalItems} entries
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 border border-gray-400 rounded-md text-sm ${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {"<"}
            </button>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 border border-gray-400 rounded-md text-sm ${
                currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {">"}
            </button>
          </div>
          <select
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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