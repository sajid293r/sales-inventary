"use client";
import React, { useState, useRef, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { MdArrowUpward, MdArrowDownward } from "react-icons/md";
import { FaChevronDown ,FaEdit, FaTrash} from "react-icons/fa";
import EditDetailsPopup from '../EditDetailsPopup/page'
import RowDetailsPopup from "../RowDetailsPopup/page";
import { getAllSalesChannels } from "@/actions/getAllSalesChannels";
import { deleteSalesChannel } from '@/actions/deleteSalesChannel';
import SaleChannelPopup from "../Popup/page";
import HeaderAddSale from  '../AddSaleChannel/HeaderAddSale/page'
import { toast } from 'react-hot-toast';
const TableWithCheckboxes = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [salesChannels, setSalesChannels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
const [editingRow, setEditingRow] = useState(null);
const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);

  const buttonsRef = useRef(null);
  const filterButtonRef = useRef(null);
  const filterPanelRef = useRef(null);
  const sortButtonRef = useRef(null);
  const sortTooltipRef = useRef(null);
  const searchInputRef = useRef(null);

  const options = [
    "UK",
    "USA",
    "India",
    "Germany",
    "South Africa",
    "Australia"
  ];
  const options1 = ["Plateform", "Price List", "Dropshiper", "DropshiperNZ", "Others"];
  const options2 = ["Net 30", "Prepaid", "7 Day", "14 Days", "15 Days"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data1 = await getAllSalesChannels();
        console.log("Sales Channels Data:", data1);
        setSalesChannels(data1);
      } catch (error) {
        console.error("Error fetching sales channels:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

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
    if (!isEditPopupOpen) {
      // Refetch data when the edit popup is closed
      const fetchData = async () => {
        try {
          setIsLoading(true);
          const data1 = await getAllSalesChannels();
          console.log("Sales Channels Data:", data1);
          setSalesChannels(data1);
        } catch (error) {
          console.error("Error fetching sales channels:", error);
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchData();
    }
  }, [isEditPopupOpen]);
  
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

  const filteredData = salesChannels
    .filter((item) => {
      // Status filter
      const matchStatus =
        filters.status.length === 0 || 
        (filters.status.includes("Active") && item.emailPlatforminvoice) ||
        (filters.status.includes("Inactive") && !item.emailPlatforminvoice);

      // Type filter
      const matchType = 
        selected1.length === 0 || 
        selected1.includes(item.salesChannelType);

      // Payment Term filter
      const matchPayment =
        selected2.length === 0 || 
        selected2.includes(item.payementterm);

      // Region filter
      const matchRegion =
        selected.length === 0 || 
        selected.includes(item.suburbState);

      // Region button filter
      const matchRegionButton =
        filters.region === "" || 
        (filters.region === "Asia" && ["India", "China", "Japan", "Korea"].includes(item.suburbState)) ||
        (filters.region === "North America" && ["USA", "Canada", "Mexico"].includes(item.suburbState)) ||
        (filters.region === "South America" && ["Brazil", "Argentina", "Chile"].includes(item.suburbState)) ||
        (filters.region === "Europe" && ["UK", "Germany", "France", "Italy"].includes(item.suburbState)) ||
        (filters.region === "Oceania" && ["Australia", "New Zealand"].includes(item.suburbState)) ||
        (filters.region === "Africa" && ["South Africa", "Nigeria", "Kenya"].includes(item.suburbState));

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
        ? item.salesChannelName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.suburbState.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.salesChannelType.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.payementterm.toLowerCase().includes(searchQuery.toLowerCase())
        : true
    );

  // const sortedData = [...filteredData].sort((a, b) => {
  //   if (sortOptions.salesChannel) {
  //     return sortOptions.salesChannel
  //       ? a.salesChannelName.localeCompare(b.salesChannelName)
  //       : b.salesChannelName.localeCompare(a.salesChannelName);
  //   }
  //   if (sortOptions.country) {
  //     return sortOptions.country
  //       ? a.suburbState.localeCompare(b.suburbState)
  //       : b.suburbState.localeCompare(a.suburbState);
  //   }
  //   return 0;
  // });
  const sortedData = [...filteredData].sort((a, b) => {
    if (sortOptions.salesChannel) {
      const nameA = a.salesChannelName || "";
      const nameB = b.salesChannelName || "";
      return sortOptions.salesChannel
        ? nameA.localeCompare(nameB)
        : nameB.localeCompare(nameA);
    }
  
    if (sortOptions.country) {
      const stateA = a.suburbState || "";
      const stateB = b.suburbState || "";
      return sortOptions.country
        ? stateA.localeCompare(stateB)
        : stateB.localeCompare(stateA);
    }
  
    return 0;
  });
  
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, endIndex);

  const toggleSelectAll = (e) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPageData = filteredData.slice(startIndex, endIndex);
    setSelectedRows(e.target.checked ? currentPageData.map((d) => d._id) : []);
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
const onEdit = (row) => {
  setEditingRow(row);
  setIsEditPopupOpen(true);
};


// const onDelete = (id) => {
//   console.log("delete", id);
// };


const onDelete = async (id) => {
  const confirmDelete = confirm('Are you sure you want to delete this sales channel?');
  if (!confirmDelete) return;

  try {
    const res = await deleteSalesChannel(id);

    if (res.success) {
      toast.success('Sales channel deleted');
      // Optional: Refresh data manually after delete
      const updated = await getAllSalesChannels();
      setSalesChannels(updated);
    } else {
      toast.error(res.error || 'Failed to delete');
    }
  } catch (error) {
    console.error('❌ Delete failed:', error);
    toast.error('Unexpected error occurred');
  }
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
                  <h4 className="font-medium mb-2">Status</h4>
                  <div className="space-y-2">
                    {["Active", "Inactive"].map((status) => (
                      <label key={status} className="flex items-center">
                        <input
                          type="checkbox"
                          className="mr-2"
                          checked={filters.status.includes(status)}
                          onChange={() => handleFilterChange("status", status)}
                        />
                        {status}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="mb-3">
                  <div className="flex gap-2 items-center">
                    <h4 className="font-medium">Location</h4>
                    <div className="relative w-full">
                      <button
                        onClick={handleContinentDropdown}
                        className="w-full sm:w-40 px-4 py-1 border border-gray-300 rounded-md bg-white text-left focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <div className="flex justify-between items-center">
                          {selected.length > 0
                            ? selected.join(", ")
                            : "Select Location"}
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
                    <h4 className="font-medium">Payment Term</h4>
                    <div className="relative w-full">
                      <button
                        onClick={handlePaymentDropdown}
                        className="w-full sm:w-40 px-4 py-1 border border-gray-300 rounded-md bg-white text-left focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <div className="flex justify-between items-center">
                          {selected2.length > 0
                            ? selected2.join(", ")
                            : "Select Payment Term"}
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

        {isLoading ? (
          <div className="flex flex-col justify-center items-center min-h-[400px] gap-4">
            <div className="relative">
              {/* Outer pulsing circles */}
              <div className="absolute w-24 h-24 border-[3px] border-[#449ae6] rounded-full animate-[ping_2s_ease-in-out_infinite] opacity-60"></div>
              <div className="absolute w-24 h-24 border-[3px] border-[#52ce66] rounded-full animate-[ping_2s_ease-in-out_infinite_0.6s] opacity-60"></div>
              <div className="absolute w-24 h-24 border-[3px] border-[#f0ad4e] rounded-full animate-[ping_2s_ease-in-out_infinite_1.2s] opacity-60"></div>
              
              {/* Inner spinning circle */}
              <div className="w-24 h-24 border-[3px] border-[#449ae6] rounded-full animate-spin border-t-transparent"></div>
              
              {/* Center dot */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-[#449ae6] rounded-full"></div>
            </div>
            <div className="text-[#449ae6] text-sm font-medium animate-pulse">Loading...</div>
            <style jsx>{`
              @keyframes ping {
                0% {
                  transform: scale(0.8);
                  opacity: 0.6;
                }
                50% {
                  transform: scale(1.1);
                  opacity: 0.3;
                }
                100% {
                  transform: scale(0.8);
                  opacity: 0.6;
                }
              }
            `}</style>
          </div>
        ) : (
          <>
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
                    <th className="p-2 border-b text-center">Location</th>
                    <th className="p-2 border-b text-center">Created Date</th>
                    <th className="p-2 border-b text-center">Status</th>
                    <th className="p-2 border-b text-center">Action</th>

                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((row) => (
                    <tr
                      key={row._id}
                      className="hover:bg-gray-50 cursor-pointer"
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
                      <td className="p-2 border-b text-center"
                        onClick={() => handleRowClick(row)}
                      >
                        {row.salesChannelName}
                      </td>
                      <td className="p-2 border-b text-center"
                        onClick={() => handleRowClick(row)}
                      >{row.salesChannelType}</td>
                      <td className="p-2 border-b text-center" onClick={() => handleRowClick(row)}
                      >
                        {row.payementterm}
                      </td>
                      <td className="p-2 border-b text-center" onClick={() => handleRowClick(row)}
                      >{row.suburbState}</td>
                      <td className="p-2 border-b text-center" onClick={() => handleRowClick(row)}
                      >
                        {new Date(row.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-2 border-b text-center" onClick={() => handleRowClick(row)}
                      >
                        <span
                          className={`py-1 px-4 rounded-md text-xs ${row.emailPlatforminvoice
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                            }`}
                        >
                          {row.emailPlatforminvoice ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="p-2 border-b text-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(row);
            }}
            className="text-blue-500 hover:text-blue-700 mx-1 cursor-pointer"
            title="Edit"
          >
 <FaEdit />          </button>
          <button
       onClick={(e) => {
      e.stopPropagation();
      onDelete(row._id);
    }}
            className="text-red-500 hover:text-red-700 mx-1 cursor-pointer"
            title="Delete"
          >
            <FaTrash/>
          </button>
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
                  key={row._id}
                  className="p-3 bg-gray-50 mb-3 rounded-lg shadow-sm cursor-pointer"
                  onClick={() => handleRowClick(row)}
                >
                  <table className="w-full text-sm">
                    <tbody>
                      <tr>
                        <td className="font-semibold py-1">Sales Channel</td>
                        <td>{row.salesChannelName}</td>
                      </tr>
                      <tr>
                        <td className="font-semibold py-1">Type</td>
                        <td>{row.salesChannelType}</td>
                      </tr>
                      <tr>
                        <td className="font-semibold py-1">Payment Term</td>
                        <td>{row.payementterm}</td>
                      </tr>
                      <tr>
                        <td className="font-semibold py-1">Location</td>
                        <td>{row.suburbState}</td>
                      </tr>
                      <tr>
                        <td className="font-semibold py-1">Created Date</td>
                        <td>{new Date(row.createdAt).toLocaleDateString()}</td>
                      </tr>
                      <tr>
                        <td className="font-semibold py-1">Status</td>
                        <td>
                          <span
                            className={`inline-block px-2 py-0.5 rounded text-xs ${row.emailPlatforminvoice
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                              }`}
                          >
                            {row.emailPlatforminvoice ? "Active" : "Inactive"}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </>
        )}

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
      {isOpenpop && (
            <HeaderAddSale onClose={() => setIsOpenpop(false)} />
          )}
{isEditPopupOpen && editingRow && (
  <EditDetailsPopup
    rowData={editingRow}
    onClose={() => {
      setIsEditPopupOpen(false); // This will trigger the useEffect
      setEditingRow(null);
    }}
  />
)}

      {/* {isEditPopupOpen && editingRow && (
        <EditDetailsPopup
          onClose={() => {
            setIsEditPopupOpen(false);
            setEditingRow(null);
          }}
          rowData={editingRow}
        />
      )} */}
    </div>
  );
};

export default TableWithCheckboxes;
