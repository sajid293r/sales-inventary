"use client";
import React, { useState, useRef, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { MdArrowUpward, MdArrowDownward } from "react-icons/md";
import { FaChevronDown } from "react-icons/fa";
import SaleChannelPopup from "../../Popup/page";

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
    status: i % 2 === 0 ? "Archived" : "Draft",
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
    <>
      <div
        className={`p-2 sm:p-4 mx-auto w-full min-w-[320px] md:w-[1000px] max-w-screen-lg ${
          dropdown.filterPanel ? "overflow-visible" : "overflow-x-hidden"
        }`}
      >
        <div className="flex flex-col sm:flex-row justify-between mb-4 gap-3">
          <h1 className="text-base sm:text-lg text-black font-semibold">
            Pricing
          </h1>
          <div className="flex gap-4 justify-end items-center">
            <button className="text-md hover:bg-gray-100 transition">
              Import
            </button>
           
            <button
              className="bg-[#52ce66] text-white py-2 px-4 rounded-md text-sm hover:bg-[#48b55a] transition"
              onClick={() => setIsOpenpop(true)}
            >
              Create
            </button>
          </div>
          {isOpenpop && <SaleChannelPopup onClose={() => setIsOpenpop(false)} />}
        </div>
      </div>

      <div className="rounded-xl border w-[300px] lg:w-full md:w-full bg-white border-gray-300 shadow-lg overflow-x-hidden">
        <div className="flex flex-wrap gap-2 p-2 border-b border-gray-200">
          {["Active", "Unactive"].map(
            (region) => (
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
            )
          )}
        </div>

        <div className="flex flex-col sm:flex-row justify-between py-1 px-4 gap-4 items-center border-b border-gray-200">
          <div className="relative w-full sm:w-80">
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
              className="pl-10 pr-3 py-1 w-full md:w-[300px] lg:[300px] border border-gray-300 rounded-lg focus:border-blue-500 bg-transparent focus:outline-none text-sm"
            />
          </div>
          <div className="flex gap-6">
<h1 className=" text-black font-semibold">Form :</h1>
<span className="border border-gray-300 rounded-md ">
<input type="date"  className=" outline-none border-none text-sm px-1  "/>
</span>
<h1 className=" text-black font-semibold">To:</h1>
<span className="border border-gray-300 rounded-md ">
<input type="date"  className="text-sm outline-none border-none px-1"/>
</span>
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
                className="md:w-[170px] lg:w-[170px] w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow-sm absolute z-30 top-full right-0 mt-2"
              >
                <form className="space-y-1">
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
                  <label className="flex items-center space-x-2 whitespace-nowrap">
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
                  <label className="flex items-center space-x-3 border-t border-gray-200 mt-2">
                    <MdArrowUpward />
                    <span className="text-gray-700 text-sm font-semibold">Ascending</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <MdArrowDownward />
                    <span className="text-gray-700 text-sm font-semibold">Descending</span>
                  </label>
                </form>
              </div>
            )}
            {dropdown.filterPanel && (
              <div
                ref={filterPanelRef}
                className="md:w-[250px] lg:w-[250px] w-full space-y-3 max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow-sm absolute z-30 top-full right-0 mt-2"
              >
                <form className="space-y-3">
                  {["Can be Sold", "Can be Purchased", "Bundle", "Kitting", "Spare Parts", "Assembly Required"].map((type) => (
                    <label key={type} className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="filterType"
                        value={type}
                        checked={filterType === type}
                        onChange={() => setFilterType(type)}
                        className="text-blue-600 focus:ring-blue-500 focus:ring-2"
                      />
                      <span className="text-gray-700 text-sm font-semibold">{type}</span>
                    </label>
                  ))}
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="filterType"
                      value="none"
                      checked={filterType === "none"}
                      onChange={() => setFilterType("none")}
                      className="text-blue-600 focus:ring-blue-500 focus:ring-2"
                    />
                    <span className="text-gray-700 text-sm font-semibold">status</span>
                  </label>
                  <select className="text-sm border w-full p-1 rounded-md" placeholder="status">
                    <option value="" placeholder="status">Status</option>
                    <option value="">Active</option>
                    <option value="Unarchived">Unactive</option>
                  </select>
                </form>
                <label className="flex gap-4">
                  <input
                    type="radio"
                    name="filterType"
                    value="none"
                    checked={filterType1 === "none"}
                    onChange={() => setFilterType1("none")}
                    className="text-blue-600 focus:ring-blue-500 focus:ring-2"
                  />
                  <span className="text-gray-700 text-sm font-semibold">Brand</span>
                </label>
                <select className="text-sm border w-full p-1 rounded-md" placeholder="status">
                  <option value="" placeholder="status">Brand</option>
                  <option value="">Watch</option>
                  <option value="Unarchived">Casio</option>
                </select>
              </div>
            )}
          </div>
        </div>

        <div ref={buttonsRef} className="flex gap-4 mb-2 px-4">
          <div className="flex gap-1">
            
          
          </div>
        </div>

        <div className="hidden sm:block overflow-x-hidden">
          <table className="w-full border-collapse text-sm ml-4">
            <thead>
              <tr className="text-xs bg-[#f7f7f7]">
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
                <th className="p-2 border-b text-center">Pricelist Name</th>
                <th className="p-2 border-b text-center">Sale Channel</th>
                <th className="p-2 border-b text-center">Currency</th>
                <th className="p-2 border-b text-center">Price</th>
                <th className="p-2 border-b text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleRowClick(row)}
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
                  <td className="p-2 border-b text-center">{row.pricelistName}</td>
                  <td className="p-2 border-b text-center">{row.salechannel}</td>
                  <td className="p-2 border-b text-center">{row.currency}</td>
                  <td className="p-2 border-b text-center">${row.price}</td>
                  <td className="p-2 border-b text-center">
                    <span
                      className={`py-1 px-4 rounded-md text-xs ${
                        row.status === "Archived"
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
                    <td className="font-semibold py-1">Pricelist Name</td>
                    <td>{row.pricelistName}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold py-1">Sale Channel</td>
                    <td>{row.salechannel}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold py-1">Currency</td>
                    <td>{row.currency}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold py-1">Price</td>
                    <td>${row.price}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold py-1">Status</td>
                    <td>
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-xs ${
                          row.status === "Archived"
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
              className={`border border-gray-400 px-2 rounded-md text-sm ${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {"<"}
            </button>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`border border-gray-400 px-2 rounded-md text-sm ${
                currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
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
    </>
  );
};

export default TableWithCheckboxes;