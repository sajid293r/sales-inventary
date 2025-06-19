"use client";
import React, { useState, useRef, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { MdArrowUpward, MdArrowDownward } from "react-icons/md";
import { FaChevronDown, FaEdit, FaTrash } from "react-icons/fa";
import EditDetailsPopup from '../EditDetailsPopup/page'
import RowDetailsPopup from "../RowDetailsPopup/page";
import { getAllSalesChannels } from "@/actions/getAllSalesChannels";
import { deleteSalesChannel } from '@/actions/deleteSalesChannel';
import SaleChannelPopup from "../Popup/page";
import HeaderAddSale from '../AddSaleChannel/HeaderAddSale/page'
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import arrowup from '../image/Icons/arrowup.png'
import arrowdown from '../image/Icons/arrowdown.png'

import { bulkSaveSalesChannels } from '@/actions/bulkSaveSalesChannels';
const TableWithCheckboxes = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [salesChannels, setSalesChannels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const fileInputRef = useRef();
  const router = useRouter();

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
  // const [sortOptions, setSortOptions] = useState({
  //   salesChannel: false,
  //   country: false,
  // });
const [sortOption, setSortOption] = useState(null); // 'asc' | 'desc' | null

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
  const [message, setMessage] = useState('');
  const buttonsRef = useRef(null);
  const filterButtonRef = useRef(null);
  const filterPanelRef = useRef(null);
  const sortButtonRef = useRef(null);
  const sortTooltipRef = useRef(null);
  const searchInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const options = [
    "UK",
    "USA",
    "India",
    "Germany",
    "South Africa",
    "Australia"
  ];
  const options1 = ["Plateform", "Price List", "Dropshiper", "DropshiperNZ", "Others"];
  const options2 = ["7 Day", "14 Days", "30 Days", "60 Days", "90 Days", "120 Days"];

  const initialFormState = {
    canBeSold: false,
    canBePurchased: false,
    trackInventory: false,
    assemblyRequired: false,
    spareParts: false,
    saleExelude: false,
    productTitle: "",
    sku: "",
    numberOfCartons: "",
    productDimensions: {
      length: "",
      height: "",
      width: "",
      weight: "",
      volume: ""
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data1 = await getAllSalesChannels();
        // console.log("Sales Channels Data:", data1);
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

  // useEffect(() => {
  //   if (!isEditPopupOpen) {
  //     // Refetch data when the edit popup is closed
  //     const fetchData = async () => {
  //       try {
  //         // setIsLoading(true);
  //         const data1 = await getAllSalesChannels();
  //         // console.log("Sales Channels Data:", data1);
  //         setSalesChannels(data1);
  //       } catch (error) {
  //         console.error("Error fetching sales channels:", error);
  //       } 
  //     };

  //     fetchData();
  //   }
  // }, [isEditPopupOpen]);
  const masterCheckboxRef = useRef(null);

  useEffect(() => {
    const editPopupState = Boolean(isEditPopupOpen);
    const openPopState = Boolean(isOpenpop);

    if (!editPopupState && !openPopState) {
      const fetchData = async () => {
        try {
          const data1 = await getAllSalesChannels();
          setSalesChannels(data1);
        } catch (error) {
          console.error("Error fetching sales channels:", error);
        }
      };

      fetchData();
    }
  }, [isEditPopupOpen, isOpenpop]);

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
        ? (item.salesChannelName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.suburbState?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.salesChannelType?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.payementterm?.toLowerCase().includes(searchQuery.toLowerCase()))
        : true
    );
const sortedData = [...filteredData].sort((a, b) => {
  if (!sortOption) return 0;

  const aVal = (a.salesChannelName || '').toLowerCase();
  const bVal = (b.salesChannelName || '').toLowerCase();

  return sortOption === 'asc'
    ? aVal.localeCompare(bVal)
    : bVal.localeCompare(aVal);
});
  // const sortedData = [...filteredData].sort((a, b) => {
  //   if (sortOptions.salesChannel) {
  //     const nameA = a.salesChannelName || "";
  //     const nameB = b.salesChannelName || "";
  //     return sortOptions.salesChannel
  //       ? nameA.localeCompare(nameB)
  //       : nameB.localeCompare(nameA);
  //   }

  //   // if (sortOptions.country) {
  //   //   const stateA = a.suburbState || "";
  //   //   const stateB = b.suburbState || "";
  //   //   return sortOptions.country
  //   //     ? stateA.localeCompare(stateB)
  //   //     : stateB.localeCompare(stateA);
  //   // }

  //   return 0;
  // });
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, endIndex);

  const toggleSelectAll = (e) => {
    const currentPageIds = paginatedData.map((row) => row._id);
    if (e.target.checked) {
      setSelectedRows((prev) => [...new Set([...prev, ...currentPageIds])]);
    } else {
      setSelectedRows((prev) => prev.filter(id => !currentPageIds.includes(id)));
    }
  };

  const toggleRow = (id) => {
    setSelectedRows((prev) => {
      if (prev.includes(id)) {
        return prev.filter((rowId) => rowId !== id);
      } else {
        return [...prev, id];
      }
    });
  };
const handleSortChange = (direction) => {
  setSortOption((prev) => (prev === direction ? null : direction));
};


useEffect(() => {
  if (!masterCheckboxRef.current) return;

  const total = filteredData.length;
  const selected = filteredData.filter((row) => selectedRows.includes(row._id)).length;

  masterCheckboxRef.current.indeterminate = selected > 0 && selected < total;
}, [filteredData, selectedRows]);

  // const toggleRow = (id) => {
  //   setSelectedRows(prev => {
  //     if (prev.innavigationcludes(id)) {
  //       return prev.filter(rowId => rowId !== id);
  //     } else {
  //       return [...prev, id];
  //     }
  //   });
  // };

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

  const handleFiltnavigationerChange = (field, value) => {
    setFilters((prev) => {
      const values = prev[field];
      return {
        ...prev,
        [field]: values.includes(value)
          ? valuesnavigation.filter((v) => v !== value)
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

  // const handleSortChange = (option) => {
  //   setSortOptions((prev) => ({
  //     ...prev,
  //     [option]: !prev[option],
  //   }));
  // };
  const handleRowClick = (row, id) => {
    setSelectedRowData({ ...row, displayId: id }); // ✅ Add `displayId` to the row object
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

const handleSaleChannel=(e)=>{
 e.preventDefault();
    // const query = encodeURIComponent(JSON.stringify(row));
    router.push(`/AddSaleChannel/HeaderAddSale`);
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
    try {
      // Send the complete row data
      const query = encodeURIComponent(JSON.stringify(row));
      console.log('Complete row data being sent:', row);
      
      // Navigate to edit page with complete data
      router.push(`/AddSaleChannel/HeaderAddSale?action=update&data=${query}`);
    } catch (error) {
      console.error('Error in onEdit:', error);
      toast.error('Error preparing data for edit');
    }
  };

  const onDelete = async (id, name) => {
    // Show confirmation toast
    toast((t) => (
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="text-lg">🗑️</span>
          <p className="font-semibold">Confirm Delete</p>
        </div>
        <p className="text-sm opacity-90">{`Are you sure you want to delete "${name}" sales channel?`}</p>
        <div className="flex gap-2 mt-2">
          <button
            onClick={() => {
              toast.dismiss(t.id);
              handleDeleteConfirm(id, name);
            }}
            className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600 transition"
          >
            Delete
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="bg-gray-200 text-gray-800 px-3 py-1 rounded-md text-sm hover:bg-gray-300 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    ), {
      duration: 5000,
      style: {
        background: 'white',
        color: 'black',
        padding: '16px',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      },
    });
  };

  const handleDeleteConfirm = async (id, name) => {
    try {
      const res = await deleteSalesChannel(id);

      if (res.success) {
        toast.success(
          <div className="flex items-center gap-2">
            <span className="text-lg">✅</span>
            <div>
              <p className="font-semibold">Deleted Successfully</p>
              <p className="text-sm opacity-90">{`"${name}" has been removed`}</p>
            </div>
          </div>
        );
        // Refresh data
        const updated = await getAllSalesChannels();
        setSalesChannels(updated);
      } else {
        toast.error(
          <div className="flex items-center gap-2">
            <span className="text-lg">❌</span>
            <div>
              <p className="font-semibold">Delete Failed</p>
              <p className="text-sm opacity-90">{res.error || 'An error occurred'}</p>
            </div>
          </div>
        );
      }
    } catch (error) {
      console.error('❌ Delete failed:', error);
      toast.error(
        <div className="flex items-center gap-2">
          <span className="text-lg">⚠️</span>
          <div>
            <p className="font-semibold">Unexpected Error</p>
            <p className="text-sm opacity-90">Could not delete the sales channel</p>
          </div>
        </div>
      );
    }
  };

  const handleAddClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check file extension
    const fileExtension = file.name.split('.').pop().toLowerCase();
    if (!['csv'].includes(fileExtension)) {
      toast.error(
        <div className="flex items-center gap-2">
          <span className="text-lg">⚠️</span>
          <div>
            <p className="font-semibold">Invalid File Type</p>
            <p className="text-sm opacity-90">Please upload only CSV files</p>
          </div>
        </div>
      );
      // Reset file input
      e.target.value = '';
      return;
    }

    setIsUploading(true);

    // Show loading toast
    const loadingToast = toast.loading(
      <div className="flex items-center gap-3">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
        <p className="font-semibold">Uploading file...</p>
      </div>
    );

    const reader = new FileReader();

    reader.onload = async (event) => {
      try {
        const content = event.target.result;
        const parsedData = parseCSV(content);
        const result = await bulkSaveSalesChannels(parsedData);

        // Dismiss loading toast
        toast.dismiss(loadingToast);

        if (result.success) {
          toast.success(
            <div className="flex items-center gap-2">
              <span className="text-lg">✨</span>
              <div>
                <p className="font-semibold">Success!</p>
                <p className="text-sm opacity-90">
                  Updated: {result.updatedCount} • Added: {result.insertedCount}
                </p>
              </div>
            </div>
          );

          const updated = await getAllSalesChannels();
          setSalesChannels(updated);
        } else {
          toast.error(
            <div className="flex items-center gap-2">
              <span className="text-lg">❌</span>
              <div>
                <p className="font-semibold">Failed</p>
                <p className="text-sm opacity-90">{result.error}</p>
              </div>
            </div>
          );
        }
      } catch (error) {
        toast.dismiss(loadingToast);
        toast.error(
          <div className="flex items-center gap-2">
            <span className="text-lg">⚠️</span>
            <div>
              <p className="font-semibold">Error</p>
              <p className="text-sm opacity-90">{error.message}</p>
            </div>
          </div>
        );
      } finally {
        setIsUploading(false);
      }
    };

    reader.onerror = () => {
      toast.dismiss(loadingToast);
      setIsUploading(false);
      toast.error(
        <div className="flex items-center gap-2">
          <span className="text-lg">⚠️</span>
          <div>
            <p className="font-semibold">Error</p>
            <p className="text-sm opacity-90">Could not read file</p>
          </div>
        </div>
      );
    };

    reader.readAsText(file);
  };

  const parseCSV = (csv) => {
    try {
      const lines = csv.split('\n').filter(Boolean);
      if (lines.length < 2) {
        throw new Error('File must contain headers and at least one data row');
      }

      const headernavigations = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));

      // Validate required headers
      const requiredFields = ['salesChannelName', 'salesChannelType', 'suburbState'];
      const missingFields = requiredFields.filter(field => !headers.includes(field));
      if (missingFields.length > 0) {
        throw new Error(`Missing required headers: ${missingFields.join(', ')}`);
      }

      const booleanFields = [
        "emailPlatforminvoice", "Emailplatformatrackingfile", "CustomerinvoicelncGST",
        "Emailinvoicerequired", "1POINV", "startOnCampaign", "descriptionChannel",
        "sellingChannel", "plusShipping", "offSellingPricecheckbox", "calculateNZPricecheckbox",
        "calculateRetailPricecheckbox", "calculateGSTcheckbox", "roundingLowcheckbox",
        "roundingHighcheckbox", "nzDropshippingAutoCalculate", "missinginvoice", "paymentrequired",
        "versioncheckbox"
      ];

      const dateFields = ["dateFrom", "dateTo"];

      return lines.slice(1).map((line, index) => {
        const values = line.split(',').map(v => v.trim().replace(/^"|"$/g, ''));
        if (values.length !== headers.length) {
          throw new Error(`Row ${index + 2} has incorrect number of fields`);
        }

        const obj = {};

        headers.forEach((key, i) => {
          const val = values[i]?.trim();

          if (booleanFields.includes(key)) {
            obj[key] = val?.toLowerCase() === 'true';
          } else if (dateFields.includes(key)) {
            obj[key] = val ? new Date(val) : null;
          } else {
            obj[key] = val || '';
          }
        });

        // Validate required fields in each row
        const missingRequiredFields = requiredFields.filter(field => !obj[field]);
        if (missingRequiredFields.length > 0) {
          throw new Error(`Row ${index + 2} is missing required fields: ${missingRequiredFields.join(', ')}`);
        }

        return obj;
      });
    } catch (error) {
      console.error('CSV parsing error:', error);
      throw error;
    }
  };

  const handleExport = () => {
    try {
      setIsExporting(true);

      // Match the required fields from parseCSV validation
      const headers = [
        'salesChannelName',
        'salesChannelType',
        'suburbState',
        'payementterm',
        'emailPlatforminvoice',
        'Emailplatformatrackingfile',
        'CustomerinvoicelncGST',
        'Emailinvoicerequired',
        '1POINV',
        'startOnCampaign',
        'descriptionChannel',
        'sellingChannel',
        'plusShipping',
        'offSellingPricecheckbox',
        'calculateNZPricecheckbox',
        'calculateRetailPricecheckbox',
        'calculateGSTcheckbox',
        'roundingLowcheckbox',
        'roundingHighcheckbox',
        'nzDropshippingAutoCalculate',
        'missinginvoice',
        'paymentrequired',
        'versioncheckbox',
        'dateFrom',
        'dateTo'
      ];

      const csvData = [
        headers.join(','),
        ...salesChannels.map(row => {
          // Ensure all required fields are present and properly formatted
          const rowData = {
            salesChannelName: row.salesChannelName || '',
            salesChannelType: row.salesChannelType || '',
            suburbState: row.suburbState || '',
            payementterm: row.payementterm || '',
            emailPlatforminvoice: row.emailPlatforminvoice?.toString() || 'false',
            Emailplatformatrackingfile: row.Emailplatformatrackingfile?.toString() || 'false',
            CustomerinvoicelncGST: row.CustomerinvoicelncGST?.toString() || 'false',
            Emailinvoicerequired: row.Emailinvoicerequired?.toString() || 'false',
            '1POINV': row['1POINV']?.toString() || 'false',
            startOnCampaign: row.startOnCampaign?.toString() || 'false',
            descriptionChannel: row.descriptionChannel?.toString() || 'false',
            sellingChannel: row.sellingChannel?.toString() || 'false',
            plusShipping: row.plusShipping?.toString() || 'false',
            offSellingPricecheckbox: row.offSellingPricecheckbox?.toString() || 'false',
            calculateNZPricecheckbox: row.calculateNZPricecheckbox?.toString() || 'false',
            calculateRetailPricecheckbox: row.calculateRetailPricecheckbox?.toString() || 'false',
            calculateGSTcheckbox: row.calculateGSTcheckbox?.toString() || 'false',
            roundingLowcheckbox: row.roundingLowcheckbox?.toString() || 'false',
            roundingHighcheckbox: row.roundingHighcheckbox?.toString() || 'false',
            nzDropshippingAutoCalculate: row.nzDropshippingAutoCalculate?.toString() || 'false',
            missinginvoice: row.missinginvoice?.toString() || 'false',
            paymentrequired: row.paymentrequired?.toString() || 'false',
            versioncheckbox: row.versioncheckbox?.toString() || 'false',
            dateFrom: row.dateFrom || '',
            dateTo: row.dateTo || ''
          };
          // Return values in the same order as headers
          return headers.map(header => rowData[header]).join(',');
        })
      ].join('\n');

      // Create blob and download
      const blob = new Blob([csvData], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `sales_channels_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast.success(
        <div className="flex items-center gap-2">
          <span className="text-lg">✨</span>
          <div>
            <p className="font-semibold">Export Successful</p>
            <p className="text-sm opacity-90">Data exported in import-ready format</p>
          </div>
        </div>
      );
    } catch (error) {
      toast.error(
        <div className="flex items-center gap-2">
          <span className="text-lg">❌</span>
          <div>
            <p className="font-semibold">Export Failed</p>
            <p className="text-sm opacity-90">{error.message}</p>
          </div>
        </div>
      );
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div

      // className=" mt-10 w-full max-w-screen-xl mx-auto grid grid-cols-1 gap-4 md:grid-cols-12"
      className={`p-2 sm:pt-4 mx-auto  w-full    min-w-[640px] md:min-w-[800px] lg:min-w-[1000px] xl:min-w-[1000px] 2xl:min-w-[1300px] 3xl:min-w-[1400px] 4xl:min-w-[1600px]  table-auto justify-center items-center  `}

    >
      <div
        className={`sm:pt-4 mx-auto min-w-[640px] md:min-w-[800px] lg:min-w-[1000px] xl:min-w-[1000px] 2xl:min-w-[1300px] 3xl:min-w-[1400px] 4xl:min-w-[1600px]  table-auto justify-center items-center  ${dropdown.filterPanel ? "overflow-visible" : "overflow-x-hidden"
          }`}
      >
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-3">
          <h1 className="text-base sm:text-lg text-black font-semibold">
            Sales Channel
          </h1>
          <div className="flex gap-2">
            {/* <button
  onClick={handleAddClick}
  disabled={isUploading}
  className={`bg-[#52ce66] text-white py-2 px-4 rounded-md text-sm transition ${
    isUploading ? 'opacity-75 cursor-not-allowed' : 'hover:bg-[#48b55a]'
  }`}
>
  {isUploading ? (
    <div className="flex items-center gap-2">
      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
      <span>Importing...</span>
    </div>
  ) : (
    'Import'
  )}
</button>

<button
  onClick={handleExport}
  disabled={isExporting || isLoading}
  className={`bg-[#52ce66] text-white py-2 px-4 rounded-md text-sm transition ${
    isExporting || isLoading ? 'opacity-75 cursor-not-allowed' : 'hover:bg-[#48b55a]'
  }`}
>
  {isExporting ? (
    <div className="flex items-center gap-2">
      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
      <span>Exporting...</span>
    </div>
  ) : (
    'Export'
  )}
</button>

<input
  type="file"
  accept=".csp,.csv,.txt"
  ref={fileInputRef}
  onChange={handleFileUpload}
  className="hidden"
/> */}

            <button
              // onClick={() => setIsOpenpop(true)}
                onClick={(e)=>handleSaleChannel(e)}
              disabled={isLoading}
              className="bg-[#52ce66] text-white py-2 px-4 rounded-md text-sm hover:bg-[#48b55a] transition"
            >
              Add
            </button>

          </div>
          {message && <p className="mt-4 text-green-600 font-semibold">{message}</p>}
        </div>

        <div className="rounded-xl border w-[300px] lg:w-full md:w-full bg-white border-[#888888] shadow-lg overflow-x-hidden min-h-[500px]">
          <div className="flex flex-wrap gap-2 p-2 border-b border-[#888888]  ">
            {[
              "Asia",
              "North America",
              "South America",
              "Europe",
              "Oceania",
              "Africa",
              "Archived"
            ].map((region) => (
              <button
                key={region}
                className={`py-1.5 pl-3 cursor-pointer rounded-md text-sm transition  ${filters.region === region
                  ? "underline decoration-[#449ae6] decoration-2 underline-offset-4 "
                  : "text-gray-700"
                  }`}
                onClick={() => handleRegionFilter(region)}
              >
                {region}
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row justify-between py-1 px-4 gap-4 items-center border-b border-[#888888]">
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
                className="pl-10 pr-3 py-1 w-full md:w-[780px] lg:[780px] border border-[#888888] rounded-lg focus:border-blue-500 bg-transparent focus:outline-none text-sm"
              />
            </div>
            <div className="flex gap-2 relative w-full sm:w-auto justify-center sm:justify-end">
              <button
                ref={filterButtonRef}
                className="border border-[#888888] py-1 px-4 rounded-md text-sm hover:bg-gray-100 transition max-w-full"
                onClick={() => toggleDropdown("filterPanel")}
              >
                Filter
              </button>
              {/* <button
                ref={sortButtonRef}
                className="border py-1 px-4 border border-[#888888] rounded-md text-sm hover:bg-gray-100 transition max-w-full"
                onClick={() => toggleDropdown("sortTooltip")}
              >
                Sort
              </button> */}
           
              {dropdown.sortTooltip && (
  <div
    ref={sortTooltipRef}
    className="absolute z-20 bg-white border border-[#888888] p-4 rounded-md shadow-lg top-full right-0 sm:right-16 mt-2 w-64 text-sm"
  >
    <h3 className="font-semibold mb-2">Sort Options</h3>
    <div className="flex flex-col gap-2 w-full">

      {/* Ascending */}
      <label className="flex items-center w-full relative cursor-pointer">
        <input
          type="checkbox"
          checked={sortOption === 'asc'}
          onChange={() => handleSortChange('asc')}
          className="mr-2"
        />
        <div className="flex items-center w-full pr-6">
          <span>Sales Channel</span>
        </div>
        <span className="absolute right-0">
          <Image src={arrowup} alt="Arrow Up" width={16} height={16} />
        </span>
      </label>

      {/* Descending */}
      <label className="flex items-center w-full relative cursor-pointer">
        <input
          type="checkbox"
          checked={sortOption === 'desc'}
          onChange={() => handleSortChange('desc')}
          className="mr-2"
        />
        <div className="flex items-center w-full pr-6">
          <span>Sales Channel </span>
        </div>
        <span className="absolute right-0">
          <Image src={arrowdown} alt="Arrow Down" width={16} height={16} />
        </span>
      </label>

    </div>
  </div>
)}

              {dropdown.filterPanel && (
                <div
                  ref={filterPanelRef}
                  className="absolute z-30 bg-white border border-[#888888] p-4 rounded-md shadow-lg top-full right-0 mt-2 w-64 sm:w-72 text-sm overflow-visible overflow-y-auto "
                >
                  <h3 className="font-semibold mb-2">Filters</h3>

                  <div className="mb-3">
                    <h4 className="font-medium mb-2">Status</h4>
                    <div className="space-y-2">
                      {["Active", "Inactive"].map((status) => (
                        <label key={status} className="flex items-center">
                          <input
                            type="checkbox"
                            className="mr-2 border border-[#888888]"
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
                          className="w-full sm:w-40 px-4 py-1 border border-[#888888] rounded-md bg-white text-left focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <div className="flex justify-between items-center">
                            {selected.length > 0
                              ? selected.join(", ")
                              : "Select Location"}
                            <FaChevronDown className="text-sm" />
                          </div>
                        </button>
                        {isOpen && (
                          <div className="absolute z-50 mt-1 w-full sm:w-40 bg-white border border-[#888888] rounded-md shadow-lg max-h-60 overflow-y-auto continent-dropdown">
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
                          className="w-full sm:w-40 px-4 py-1 border border-[#888888] rounded-md bg-white text-left focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <div className="flex justify-between items-center">
                            {selected1.length > 0
                              ? selected1.join(", ")
                              : "Select Type"}
                            <FaChevronDown className="text-sm" />
                          </div>
                        </button>
                        {isOpen1 && (
                          <div className="absolute z-50 mt-1 w-full sm:w-40 bg-white border border-[#888888] rounded-md shadow-lg max-h-60 overflow-y-auto type-dropdown">
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
                          className="w-full sm:w-40 px-4 py-1 border border-[#888888] rounded-md bg-white text-left focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <div className="flex justify-between items-center">
                            {selected2.length > 0
                              ? selected2.join(", ")
                              : "Select Payment Term"}
                            <FaChevronDown className="text-sm" />
                          </div>
                        </button>
                        {isOpen2 && (
                          <div className="absolute z-50 mt-1 w-full sm:w-40 bg-white border border-[#888888] rounded-md shadow-lg max-h-60 overflow-y-auto payment-dropdown">
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

          {/* {showButtons && ( */}
          {selectedRows.length > 0 && (
          <div ref={buttonsRef} className="flex gap-4 mb-2 px-4 border-b border-[#888888]">
            <div className="flex gap-4  " style={{ margin: '1px' }}>
              
              <div className="border  p-1 px-4 rounded-md gap-2 flex items-center">
               
  {/* <input
  type="checkbox"
  checked={
    filteredData.length > 0 &&
    filteredData.every((row) => selectedRows.includes(row._id))
  }
  onChange={toggleSelectAll}
/> */}
<input
  type="checkbox"
  ref={masterCheckboxRef}
  checked={filteredData.length > 0 && filteredData.every(row => selectedRows.includes(row._id))}
  onChange={toggleSelectAll}
  className="cursor-pointer"
/>


                <button className="ml-2 text-sm">{selectedRows.length} Selected</button>
              </div>
              <button className="border border-[#888888] p-1 px-4 rounded-md">
                <select className="text-sm" disabled={selectedRows.length === 0}>
                  <option value="">Action</option>
                  <option value="Unarchived">Unarchived</option>
                  <option value="Remove">Remove</option>
                </select>
              </button>
             {/* <h1 className="text-sm  ml-10 mt-2">ALL {selectedRows.length} Entries on this page are selected</h1>
             <h1 className="text-[#3163FF] mt-2 text-sm"> Select all {totalItems} entries on {filters.region} </h1> */}
            </div>
          </div>
          )}
          {/* )} */}

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
              {/* <div className="hidden sm:block overflow-x-hidden">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="text-xs">
                      <th className="p-2 border-b w-12 text-center">
                  <div className="flex flex-col items-center">
                    <input
                      type="checkbox"
                      checked={filteredData.length > 0 && selectedRows.length === filteredData.length}
                      onChange={toggleSelectAll}
                      title="Select all inventory items"
                    />
                  </div>
                </th>
                      // <th className="p-2 border-b text-center">Id</th> 

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
                    {paginatedData.map((row, index) => (
                      <tr
                        key={row._id}
                        className="hover:bg-gray-50 cursor-pointer"
                        // onClick={() => handleRowClick(row, (startIndex + index + 1))}

                      >

                        // <td className="p-2 border-b text-center ">{(startIndex + index + 1).toString()}</td> 
<td className="p-2 border-b text-center w-12" onClick={(e) => e.stopPropagation()}>
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
                          // onClick={() => handleRowClick(row)}
                        >
                          {row.salesChannelName}
                        </td>
                        <td className="p-2 border-b text-center"
                          // onClick={() => handleRowClick(row)}
                        >{row.salesChannelType}</td>
                        <td className="p-2 border-b text-center" 
                        // onClick={() => handleRowClick(row)}
                        >
                          {row.payementterm}
                        </td>
                        <td className="p-2 border-b text-center" 
                        // onClick={() => handleRowClick(row)}
                        >{row.suburbState}</td>
                        <td className="p-2 border-b text-center" 
                        // onClick={() => handleRowClick(row)}
                        >
                          {new Date(row.createdAt).toLocaleDateString()}
                        </td>
                        <td className="p-2 border-b text-center" 
                        // onClick={() => handleRowClick(row)}
                        >
                          <span
                            className={`py-1 px-4 rounded-md text-xs ${row.emailPlatforminvoice
                              ? "bg-green-200 text-green-700"
                              : "bg-orange-200 text-red-700"
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
                              onDelete(row._id, row.salesChannelName);
                            }}
                            className="text-red-500 hover:text-red-700 mx-1 cursor-pointer"
                            title="Delete"
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div> */}
              <div className="hidden sm:block overflow-x-hidden">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="text-xs border-b border-[#888888]">
                      <th className="p-2 w-12 text-center">
                        <div className="flex flex-col items-center ">
                          <input
                            type="checkbox"
                            checked={paginatedData.length > 0 && paginatedData.every(row => selectedRows.includes(row._id))}
                            onChange={toggleSelectAll}
                            className="cursor-pointer border border-[#888888]"
                            title="Select all items on this page"
                          />
                        </div>
                      </th>
                  <th
  className="p-2 text-center relative cursor-pointer select-none"
  onClick={() => handleSortChange(sortOption === 'desc' ? 'asc' : 'desc')}
>
  <div className="flex justify-center items-center gap-1">
    <span>Sales Channel</span>
    {sortOption === 'desc' ? (
      <Image src={arrowdown} alt="Arrow Down" width={16} height={16} />
    ) : (
      <Image src={arrowup} alt="Arrow Up" width={16} height={16} />
    )}
  </div>
</th>

                      <th className="p-2 text-center">Type</th>
                      <th className="p-2 text-center">Payment Term</th>
                      <th className="p-2 text-center">Location</th>
                      <th className="p-2 text-center">Created Date</th>
                      <th className="p-2 text-center">Status</th>
                      {/* <th className="p-2 text-center">Action</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData.map((row, index) => (
                      <tr
                        key={row._id}
                        className="hover:bg-gray-50 cursor-pointer"
                      >
                        <td className="p-2 border-b border-[#888888] text-center w-12" onClick={(e) => e.stopPropagation()}>
                          <input
                            type="checkbox"
                            checked={selectedRows.includes(row._id)}
                            onChange={(e) => {
                              e.stopPropagation();
                              toggleRow(row._id);
                            }}
                            className="cursor-pointer" 
                          />
                        </td>
                        <td className="p-2 border-b border-[#888888] text-center" onClick={(e) => {
                              e.stopPropagation();
                              onEdit(row);
                            }}>{row.salesChannelName}</td>
                        <td className="p-2 border-b border-[#888888] text-center" onClick={(e) => {
                              e.stopPropagation();
                              onEdit(row);
                            }}>{row.salesChannelType}</td>
                        <td className="p-2 border-b border-[#888888] text-center" onClick={(e) => {
                              e.stopPropagation();
                              onEdit(row);
                            }}>{row.payementterm}</td>
                        <td className="p-2 border-b border-[#888888] text-center"onClick={(e) => {
                              e.stopPropagation();
                              onEdit(row);
                            }}>{row.suburbState}</td>
                        <td className="p-2 border-b border-[#888888] text-center"onClick={(e) => {
                              e.stopPropagation();
                              onEdit(row);
                            }}>
                          {new Date(row.createdAt).toLocaleDateString()}
                        </td>
                        <td className="p-2 border-b border-[#888888] text-center" onClick={(e) => {
                              e.stopPropagation();
                              onEdit(row);
                            }}>
                          <span
                            className={`py-1 px-4 rounded-md text-xs ${row.emailPlatforminvoice
                                ? "bg-green-200 text-green-700"
                                : "bg-orange-200 text-red-700"
                              }`}
                          >
                            {row.emailPlatforminvoice ? "Active" : "Inactive"}
                          </span>
                        </td>
                        {/* <td className="p-2  border-b border-[#888888] text-center">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onEdit(row);
                            }}
                            className="text-blue-500 hover:text-blue-700 mx-1 cursor-pointer"
                            title="Edit"
                          >
                            <FaEdit />
                          </button>
                         <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onDelete(row._id, row.salesChannelName);
                            }}
                            className="text-red-500 hover:text-red-700 mx-1 cursor-pointer"
                            title="Delete"
                          >
                            <FaTrash />
                          </button> 
                        </td> */}
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
                  // onClick={() => handleRowClick(row)}
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
            <div className="flex gap-2 flex-wrap justify-center items-center ">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`border border-gray-400 px-2 rounded-md text-sm ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "text-blue-500"
                  }`}
              >
                {"<"}
              </button>
              {/* {Array.from({ length: totalPages }, (_, i) => i + 1)
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
                ))} */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`border border-gray-400 px-2 text-blue-500 rounded-md text-sm ${currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed text-gray-500"
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
          <HeaderAddSale onClose={() => setIsOpenpop(false)}
          />
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
      </div>
    </div>
  );
};

export default TableWithCheckboxes;
