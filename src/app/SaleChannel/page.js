"use client";
import React, { useState, useRef, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { MdArrowUpward, MdArrowDownward } from "react-icons/md";
import { FaChevronDown } from "react-icons/fa";
import SaleChannelPopup from "../Popup/page";
import RowDetailsPopup from "../RowDetailsPopup/page";
import { getAllSalesChannels } from "@/actions/getAllSalesChannels";

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
    salesChannel: false,
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
  const [isRowPopupOpen, setIsRowPopupOpen] = useState(false);
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
    const data1 = getAllSalesChannels();
    console.log("data1", data1);
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
    salesChannel: `Channel ${i + 1}`,
    type: i % 2 === 0 ? "Online" : "Retail",
    paymentTerm: i % 3 === 0 ? "Net 30" : "Prepaid",
    country: ["USA", "UK", "Germany", "India"][i % 4],
    authorizedDate: `2025-05-${String(i + 1).padStart(2, "0")}`,
    status: i % 2 === 0 ? "Active" : "Inactive",
    region: ["Asia", "North America", "Europe", "Africa"][i % 4],
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

  const handleRowClick = (row) => {
    setSelectedRowData(row);
    setIsRowPopupOpen(true);
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
        ? item.salesChannel.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.country.toLowerCase().includes(searchQuery.toLowerCase())
        : true
    );

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortOptions.salesChannel) {
      return sortOptions.salesChannel
        ? a.salesChannel.localeCompare(b.salesChannel)
        : b.salesChannel.localeCompare(a.salesChannel);
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
    <div
      className={`p-2  mt-10 sm:p-4 mx-auto w-full min-w-[320px] md:w-[1000px] max-w-screen-lg ${dropdown.filterPanel ? "overflow-visible" : "overflow-x-hidden"
        }`}
    >
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-3">
        <h1 className="text-base sm:text-lg text-black font-semibold">
          Sales Channel
        </h1>
        <div>
          <button
            onClick={() => setIsOpenpop(true)}
            className="bg-[#52ce66] text-white py-2 px-4 rounded-md text-sm hover:bg-[#48b55a] transition"
          >
            Add
          </button>
          {isOpenpop && (
            <SaleChannelPopup onClose={() => setIsOpenpop(false)} />
          )}
        </div>
      </div>

      <div className="rounded-xl border w-[300px] lg:w-full md:w-full bg-white border-gray-300 shadow-lg overflow-x-hidden">
        <div className="flex flex-wrap gap-2 p-4 border-b border-gray-200">
          {[
            "Asia",
            "North America",
            "South America",
            "Europe",
            "Oceania",
            "Africa",
          ].map((region) => (
            <button
              key={region}
              className={`py-1.5 px-3 rounded-md text-sm transition ${filters.region === region
                ? "bg-[#449ae6] text-white"
                : "text-gray-700 hover:bg-[#449ae6] hover:text-white"
                }`}
              onClick={() => handleRegionFilter(region)}
            >
              {region}
            </button>
          ))}
          <button
            onClick={() => setShowButtons(true)}
            className="hover:bg-[#449ae6] p-2 rounded-md text-gray-700"
          >
            Archived
          </button>
        </div>

        <div className="flex flex-col sm:flex-row justify-between py-1 px-4 gap-4 items-center border-b border-gray-200">
          <div className="relative w-full sm:w-80">
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
              className="pl-10 pr-3 py-1 w-full md:w-[780px] lg:[780px] border border-gray-300 rounded-lg focus:border-blue-500 bg-transparent focus:outline-none text-sm"
            />
          </div>
          <div className="flex gap-2 relative w-full sm:w-auto justify-center sm:justify-end">
            <button
              ref={filterButtonRef}
              className="border border-gray-300 py-1 px-4 rounded-md text-sm hover:bg-gray-100 transition max-w-full"
              onClick={() => toggleDropdown("filterPanel")}
            >
              Filter
            </button>
            <button
              ref={sortButtonRef}
              className="border py-1 px-4 border-gray-300 rounded-md text-sm hover:bg-gray-100 transition max-w-full"
              onClick={() => toggleDropdown("sortTooltip")}
            >
              Sort
            </button>
            {dropdown.sortTooltip && (
              <div
                ref={sortTooltipRef}
                className="absolute z-20 bg-white border p-4 rounded-md shadow-lg top-full right-0 sm:right-16 mt-2 w-64 text-sm"
              >
                <h3 className="font-semibold mb-2">Sort Options</h3>
                <label className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    checked={sortOptions.salesChannel}
                    onChange={() => handleSortChange("salesChannel")}
                    className="mr-2"
                  />
                  <div className="flex gap-2 items-center">
                    <span>Sales Channel</span>
                    <span>
                      {sortOptions.salesChannel ? (
                        <MdArrowUpward />
                      ) : (
                        <MdArrowDownward />
                      )}
                    </span>
                  </div>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={sortOptions.country}
                    onChange={() => handleSortChange("country")}
                    className="mr-2"
                  />
                  <div className="flex gap-2 items-center">
                    <span>Country</span>
                    <span>
                      {sortOptions.country ? (
                        <MdArrowUpward />
                      ) : (
                        <MdArrowDownward />
                      )}
                    </span>
                  </div>
                </label>
              </div>
            )}
            {dropdown.filterPanel && (
              <div
                ref={filterPanelRef}
                className="absolute z-30 bg-white border p-4 rounded-md shadow-lg top-full right-0 mt-2 w-64 sm:w-72 text-sm overflow-visible"
              >
                <h3 className="font-semibold mb-2">Filters</h3>
                <div className="mb-3">
                  <div className="flex gap-2 items-center">
                    <h4 className="font-medium">Continent</h4>
                    <div className="relative w-full">
                      <button
                        onClick={handleContinentDropdown}
                        className="w-full sm:w-40 px-4 py-1 border border-gray-300 rounded-md bg-white text-left focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <div className="flex justify-between items-center">
                          {selected.length > 0
                            ? selected.join(", ")
                            : "Select Continent"}
                          <FaChevronDown className="text-sm" />
                        </div>
                      </button>
                      {isOpen && (
                        <div className="absolute z-50 mt-1 w-full sm:w-40 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto continent-dropdown">
                          {options.map((option) => (
                            <label
                              key={option}
                              className="flex items-center px-4 py-2 hover:bg-gray-100"
                            >
                              <input
                                type="checkbox"
                                className="mr-2"
                                checked={selected.includes(option)}
                                onChange={() => toggleOption(option)}
                              />
                              {option}
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="flex gap-2 items-center">
                    <h4 className="font-medium">Type</h4>
                    <div className="relative w-full">
                      <button
                        onClick={handleTypeDropdown}
                        className="w-full sm:w-40 px-4 py-1 border border-gray-300 rounded-md bg-white text-left focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <div className="flex justify-between items-center">
                          {selected1.length > 0
                            ? selected1.join(", ")
                            : "Select Type"}
                          <FaChevronDown className="text-sm" />
                        </div>
                      </button>
                      {isOpen1 && (
                        <div className="absolute z-50 mt-1 w-full sm:w-40 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto type-dropdown">
                          {options1.map((option) => (
                            <label
                              key={option}
                              className="flex items-center px-4 py-2 hover:bg-gray-100"
                            >
                              <input
                                type="checkbox"
                                className="mr-2"
                                checked={selected1.includes(option)}
                                onChange={() => toggleOption1(option)}
                              />
                              {option}
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="flex gap-2 items-center">
                    <h4 className="font-medium">Payment</h4>
                    <div className="relative w-full">
                      <button
                        onClick={handlePaymentDropdown}
                        className="w-full sm:w-40 px-4 py-1 border border-gray-300 rounded-md bg-white text-left focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <div className="flex justify-between items-center">
                          {selected2.length > 0
                            ? selected2.join(", ")
                            : "Select Payment"}
                          <FaChevronDown className="text-sm" />
                        </div>
                      </button>
                      {isOpen2 && (
                        <div className="absolute z-50 mt-1 w-full sm:w-40 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto payment-dropdown">
                          {options2.map((option) => (
                            <label
                              key={option}
                              className="flex items-center px-4 py-2 hover:bg-gray-100"
                            >
                              <input
                                type="checkbox"
                                className="mr-2"
                                checked={selected2.includes(option)}
                                onChange={() => toggleOption2(option)}
                              />
                              {option}
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {showButtons && (
          <div ref={buttonsRef} className="flex gap-4 mb-2 px-4">
            <div className="flex gap-4">
              <div className="border p-1 px-4 rounded-md gap-2 flex items-center">
                <input type="checkbox" />
                <button className="ml-2 text-sm">1 Select</button>
              </div>
              <button className="border p-1 px-4 rounded-md">
                <select className="text-sm">
                  <option value="">Action</option>
                  <option value="Unarchived">Unarchived</option>
                  <option value="Remove">Remove</option>
                </select>
              </button>
            </div>
          </div>
        )}

        <div className="hidden sm:block overflow-x-hidden">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="text-xs">
                <th className="p-2 border-b w-12 text-center">
                  <input
                    type="checkbox"
                    checked={
                      paginatedData.length > 0 &&
                      selectedRows.length === paginatedData.length
                    }
                    onChange={toggleSelectAll}
                  />
                </th>
                <th className="p-2 border-b text-center">Sales Channel</th>
                <th className="p-2 border-b text-center">Type</th>
                <th className="p-2 border-b text-center">Payment Term</th>
                <th className="p-2 border-b text-center">Country</th>
                <th className="p-2 border-b text-center">Authorized Date</th>
                <th className="p-2 border-b text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-gray-50 cursor-pointer"
                >
                  <td className="p-2 border-b text-center w-12">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(row.id)}
                      onChange={(e) => {
                        e.stopPropagation();
                        toggleRow(row.id);
                      }}
                    />
                  </td>
                  <td className="p-2 border-b text-center"
                    onClick={() => handleRowClick(row)}
                  >
                    {row.salesChannel}
                  </td>
                  <td className="p-2 border-b text-center"
                    onClick={() => handleRowClick(row)}
                  >{row.type}</td>
                  <td className="p-2 border-b text-center" onClick={() => handleRowClick(row)}
                  >
                    {row.paymentTerm}
                  </td>
                  <td className="p-2 border-b text-center" onClick={() => handleRowClick(row)}
                  >{row.country}</td>
                  <td className="p-2 border-b text-center" onClick={() => handleRowClick(row)}
                  >
                    {row.authorizedDate}
                  </td>
                  <td className="p-2 border-b text-center" onClick={() => handleRowClick(row)}
                  >
                    <span
                      className={`py-1 px-4 rounded-md text-xs ${row.status === "Active"
                        ? "bg-green-100 text-green-700"
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
        {/* mobile view content  */}
        <div className="block sm:hidden divide-y divide-gray-200 px-4">
          {paginatedData.map((row) => (
            <div
              key={row.id}
              className="p-3 bg-gray-50 mb-3 rounded-lg shadow-sm cursor-pointer"
              onClick={() => handleRowClick(row)}
            >
              <table className="w-full text-sm">
                <tbody>
                  <tr>
                    <td className="font-semibold py-1">ID</td>
                    <td>{row.id}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold py-1">Sales Channel</td>
                    <td>{row.salesChannel}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold py-1">Type</td>
                    <td>{row.type}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold py-1">Payment Term</td>
                    <td>{row.paymentTerm}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold py-1">Country</td>
                    <td>{row.country}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold py-1">Authorized Date</td>
                    <td>{row.authorizedDate}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold py-1">Status</td>
                    <td>
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-xs ${row.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                          }`}
                      >
                        {row.status}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between p-2 py-4 mx-2 gap-4">
          <div>
            <h1 className="text-black text-sm font-bold">
              Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of{" "}
              {totalItems} entries
            </h1>
          </div>
          <div className="flex gap-2 flex-wrap justify-center">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`border border-gray-400 px-2 rounded-md text-sm ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
            >
              {"<"}
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .slice(
                Math.max(0, currentPage - 2),
                Math.min(totalPages, currentPage + 1)
              )
              .map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`border border-gray-400 px-2 rounded-md text-sm ${currentPage === page ? "bg-[#449ae6] text-white" : ""
                    }`}
                >
                  {page}
                </button>
              ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`border border-gray-400 px-2 rounded-md text-sm ${currentPage === totalPages
                ? "opacity-50 cursor-not-allowed"
                : ""
                }`}
            >
              {">"}
            </button>
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

      {isRowPopupOpen && selectedRowData && (
        <RowDetailsPopup
          rowData={selectedRowData}
          onClose={() => setIsRowPopupOpen(false)}
        />
      )}
    </div>
  );
};

export default TableWithCheckboxes;
