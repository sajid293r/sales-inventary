"use client";
import React, { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";

const FilterButton = () => {
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
  
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState([]);
  const [isOpen1, setIsOpen1] = useState(false);
  const [selected1, setSelected1] = useState([]);
  const [isOpen2, setIsOpen2] = useState(false);
  const [selected2, setSelected2] = useState([]);
  const [showButtons, setShowButtons] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

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

  return (
    <div>
      <button
        ref={filterButtonRef}
        className="border border-gray-300 py-1 px-4 rounded-md text-sm hover:bg-gray-100 transition max-w-full"
        onClick={() => toggleDropdown("filterPanel")}
      >
        Filter
      </button>
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
  );
};

export default FilterButton;
