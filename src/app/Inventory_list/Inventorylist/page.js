"use client";
import React, { useState, useRef, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { MdArrowUpward, MdArrowDownward } from "react-icons/md";
import { FaChevronDown, FaTrash } from "react-icons/fa";
import SaleChannelPopup from "../../Popup/page";
import { getAllInventory } from "@/actions/getAllInventory";
import { deleteInventory } from "@/actions/deleteInventory";

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
  const [inventory, setInventory] = useState([]);
  const [error, setError] = useState("");

  const buttonsRef = useRef(null);
  const filterButtonRef = useRef(null);
  const filterPanelRef = useRef(null);
  const sortButtonRef = useRef(null);
  const sortTooltipRef = useRef(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const res = await getAllInventory();
        if (res.success) {
          setInventory(res.data);
        } else {
          setError(res.error);
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchInventory();
  }, []);

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
    name: `Product ${String(i + 1).padStart(2, "0")}`,
    sku: `SKU${String(i + 1).padStart(3, "0")}`,
    rrp: (50 + (i % 151)).toFixed(2),
    sellingPrice: (30 + (i % 121)).toFixed(2),
    stockLevel: 10 + (i % 91),
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

  const filteredData = inventory
    .filter((item) => {
      const matchStatus =
        filters.status.length === 0 || filters.status.includes(item.status);
      const matchType = selected1.length === 0 || selected1.includes(item.organization?.producttype);
      const matchRegion =
        selected.length === 0 || selected.includes(item.region);
      const matchRegionButton =
        filters.region === "" || item.status === filters.region;
      return (
        matchStatus &&
        matchType &&
        matchRegion &&
        matchRegionButton
      );
    })
    .filter((item) =>
      searchQuery
        ? item.productTitle?.toLowerCase().includes(searchQuery.toLowerCase())
        : true
    );

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortOptions.name) {
      return sortOptions.name
        ? (a.productTitle || "").localeCompare(b.productTitle || "")
        : (b.productTitle || "").localeCompare(a.productTitle || "");
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
  const handleDelete = async (id,name) => {
    if (confirm(`Are you sure you want to delete "${name}" item?`)) {
      const res = await deleteInventory(id);
      if (res.success) {
        setInventory(prev => prev.filter(item => item._id !== id));
      } else {
        alert("Failed to delete: " + res.error);
      }
    }
  };
 
  return (
    <>
      <div
        className={`p-2 sm:p-4 mx-auto w-full min-w-[320px] md:w-[1000px] max-w-screen-lg ${dropdown.filterPanel ? "overflow-visible" : "overflow-x-hidden"
          }`}
      >
        <div className="flex flex-col sm:flex-row justify-between mb-4 gap-3">
          <h1 className="text-base sm:text-lg text-black font-semibold">
            Inventory List
          </h1>
          <div className="flex gap-4 justify-end items-center">
            <button className="text-md hover:bg-gray-100 transition">
              Import
            </button>
            <button className="text-md hover:bg-gray-100 transition">
              Bundling/Kitting
            </button>
            <button
              className="bg-[#52ce66] text-white py-2 px-4 rounded-md text-sm hover:bg-[#48b55a] transition"
              onClick={() => setIsOpenpop(true)}
            >
              Create Inventory
            </button>
          </div>
          {isOpenpop && <SaleChannelPopup onClose={() => setIsOpenpop(false)} />}
        </div>
      </div>

      <div className="rounded-xl border w-[300px] lg:w-full md:w-full bg-white border-gray-300 shadow-lg overflow-x-hidden">
        <div className="flex flex-wrap gap-2 p-2 border-b border-gray-200">
          {["All", "In Stock", "Out of Stock", "Product Listed", "Archived"].map(
            (region) => (
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
                    <option value="" placeholder="status" >Status</option>
                    <option value="">Active </option>
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
                    className="text-blue-600 focus:ring-blue-500 focus:ring-2 "
                  />
                  <span className="text-gray-700 text-sm font-semibold">
                    Brand
                  </span>

                </label>
                <select className="text-sm border w-full p-1 rounded-md" placeholder="status">
                  <option value="" placeholder="status" >Brand</option>
                  <option value="">Watch </option>
                  <option value="Unarchived">Casio</option>

                </select>
              </div>
            )}
          </div>
        </div>

        <div ref={buttonsRef} className="flex gap-4 mb-2 px-4">
          <div className="flex gap-1">
            <div className="border border-gray-300 p-1 px-4 rounded-md gap-2 flex items-center">
              <input type="checkbox" />
              <button className="ml-2 text-sm">{selectedRows.length} Select</button>
            </div>
            <div className="inline-block">
              <button className="border border-gray-300 p-1 rounded-md">
                <select className="text-sm border-none outline-none px-2">
                  <option value="">More Actions</option>
                  <option value="">Bulk Edit</option>
                  <option value="Unarchived">Bundle Update</option>
                  <option value="Remove">Update Stock Level</option>
                  <option value="Remove">Move to Listings</option>
                  <option value="Remove">Export Add Notes</option>
                </select>
              </button>
            </div>
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
                <th className="p-2 border-b text-center">Name</th>
                <th className="p-2 border-b text-center">SKU</th>
                <th className="p-2 border-b text-center">RRP</th>
                <th className="p-2 border-b text-center">Selling Price</th>
                <th className="p-2 border-b text-center">Stock Level</th>
                <th className="p-2 border-b text-center">Status</th>
                <th className="p-2 border-b text-center">Action</th>

              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row) => (
                <tr
                  key={row._id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleRowClick(row)}
                >
                  <td className="p-2 border-b text-center w-12">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(row._id)}
                      onChange={(e) => {
                        e.stopPropagation();
                        toggleRow(row._id);
                      }}
                    />
                  </td>
                  <td className="p-2 border-b text-center">{row.productTitle}</td>
                  <td className="p-2 border-b text-center">{row.sku}</td>
                  <td className="p-2 border-b text-center">${row.rrp}</td>
                  <td className="p-2 border-b text-center">${row.sellingPrice}</td>
                  <td className="p-2 border-b text-center">{row.stockLevel?.stocklevel}</td>
                  <td className="p-2 border-b text-center">
                    <span
                      className={`py-1 px-4 rounded-md text-xs ${row.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : row.status === "Inactive"
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-100 text-gray-700"
                        }`}
                    >
                      {row.status || "N/A"}
                    </span>
                  </td>
                  <td className="p-2 border-b text-center">
                    <button
                      className="text-red-600 hover:text-red-800 transition"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent row click
                        handleDelete(row._id, row.productTitle);
                      }}
                    >
                      <FaTrash className="cursor-pointer" />
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="block sm:hidden divide-y divide-gray-200 px-4">
          {paginatedData.map((row) => (
            <div
              key={row._id}
              className="p-3 bg-gray-50 mb-3 rounded-lg shadow-sm cursor-pointer"
              onClick={() => handleRowClick(row)}
            >
              <table className="w-full text-sm">
                <tbody>
                  <tr>
                    <td className="font-semibold py-1">Name</td>
                    <td>{row.productTitle}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold py-1">SKU</td>
                    <td>{row.sku}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold py-1">RRP</td>
                    <td>${row.rrp}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold py-1">Selling Price</td>
                    <td>${row.sellingPrice}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold py-1">Stock Level</td>
                    <td>{row.stockLevel?.stocklevel}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold py-1">Status</td>
                    <td>
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-xs ${row.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : row.status === "Inactive"
                            ? "bg-red-100 text-red-700"
                            : "bg-gray-100 text-gray-700"
                          }`}
                      >
                        {row.status || "N/A"}
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
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`border border-gray-400 px-2 rounded-md text-sm ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
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