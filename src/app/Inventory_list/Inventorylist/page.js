"use client";
import React, { useState, useRef, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { MdArrowUpward, MdArrowDownward } from "react-icons/md";
import { FaChevronDown, FaEdit, FaTrash } from "react-icons/fa";
import SaleChannelPopup from "../../Popup/page";
import { getAllInventory } from "@/actions/getAllInventory";
import { deleteInventory } from "@/actions/deleteInventory";
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAllSalesChannels } from "@/actions/getAllSalesChannels";
// import  FaChevronDown  from "react-icons/fa";
import Image from 'next/image';
import arrowup from '../../image/Icons/arrowup.png'
import arrowdown from '../../image/Icons/arrowdown.png'
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
    field: "",
    direction: "asc"
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
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [inventory, setInventory] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [salesChannels, setSalesChannels] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState("");
  const [filteredChannels, setFilteredChannels] = useState([]);
  const buttonsRef = useRef(null);
  const filterButtonRef = useRef(null);
  const filterPanelRef = useRef(null);
  const sortButtonRef = useRef(null);
  const sortTooltipRef = useRef(null);
  const searchInputRef = useRef(null);
  const fileInputRef = useRef(null);

  const router = useRouter();
  const [channelDropdownOpen, setChannelDropdownOpen] = useState(false);
const [channelSearch, setChannelSearch] = useState("");

// Filtered sales channels
const visibleChannels = salesChannels.filter((channel) =>
  channel.salesChannelName.toLowerCase().includes(channelSearch.toLowerCase())
);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // setIsLoading(true);
        const data = await getAllSalesChannels();
        setSalesChannels(data);         // keep full copy
        setFilteredChannels(data);
      } catch (error) {
        console.error("Error fetching sales channels:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        setIsLoading(true);
        const res = await getAllInventory();
        if (res.success) {
          setInventory(res.data);
        } else {
          setError(res.error);
          toast.error("Failed to load inventory data");
        }
      } catch (err) {
        setError(err.message);
        toast.error("Error loading inventory data");
      } finally {
        setIsLoading(false);
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
    if (e.target.checked) {
      const allIds = filteredData.map(item => item._id);
      setSelectedRows(allIds);
    } else {
      setSelectedRows([]);
    }
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

  const handleRegionFilter = (region) => {
    setFilters((prev) => ({
      ...prev,
      region: prev.region === region ? "" : region,
    }));
    setCurrentPage(1);
  };

  const handleSortChange = (field) => {
    setSortOptions(prev => ({
      field: field,
      direction: prev.field === field ? (prev.direction === "asc" ? "desc" : "asc") : "asc"
    }));
  };

  const handleEdit = (row) => {
    // e.preventDefault();
    const query = encodeURIComponent(JSON.stringify(row));
    router.push(`/Inventory_list/Bundlingkit?action=update&data=${query}`);
  };

  const handleRowClick = (row) => {
    toggleRow(row._id);
  };

  const filteredData = inventory
    .filter((item) => {
      const matchSearch = searchQuery
        ? item.productTitle?.toLowerCase().includes(searchQuery.toLowerCase())
        : true;

      const matchRegionButton = !filters.region || filters.region === "All" ||
        // (filters.region === "In Stock" && Number(item.stockLevel?.stocklevel) > 0) ||
        // (filters.region === "Out of Stock" && Number(item.stockLevel?.stocklevel) <= 0) ||
        (filters.region === "In Stock" && item.status === "InStock") ||
        (filters.region === "Out of Stock" && item.status === "OutofStock") ||
        (filters.region === "Product Listed" && item.status === "Active") ||
        (filters.region === "Archived" && item.status === "Archived") ||

        (filters.region === "Pending Approval" && item.status === "Pending Approval") ||
        (filters.region === "Recent Updated" && item.status === "Archived") ||
        (filters.region === "New Updated" && item.status === "Archived");

      const matchType = !filterType ||
        (filterType === "Can be Sold" && item.canBeSold) ||
        (filterType === "Can be Purchased" && item.canBePurchased) ||
        (filterType === "Bundle" && item.isBundle) ||
        (filterType === "Kitting" && item.isKitting) ||
        (filterType === "Spare Parts" && item.spareParts) ||
        (filterType === "Assembly Required" && item.assemblyRequired);

      const matchStatus = !selectedStatus || item.status === selectedStatus;

      const matchBrand = !selectedBrand || item.brand === selectedBrand;

      return matchSearch && matchRegionButton && matchType && matchStatus && matchBrand;
    });

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortOptions.field) return 0;

    switch (sortOptions.field) {
      case "name":
        const nameA = (a.productTitle || "").toLowerCase();
        const nameB = (b.productTitle || "").toLowerCase();
        return sortOptions.direction === "asc"
          ? nameA.localeCompare(nameB)
          : nameB.localeCompare(nameA);

      case "sku":
        const skuA = (a.sku || "").toLowerCase();
        const skuB = (b.sku || "").toLowerCase();
        return sortOptions.direction === "asc"
          ? skuA.localeCompare(skuB)
          : skuB.localeCompare(skuA);

      case "rrp":
        const rrpA = Number(a.rrp) || 0;
        const rrpB = Number(b.rrp) || 0;
        return sortOptions.direction === "asc" ? rrpA - rrpB : rrpB - rrpA;

      case "sellingPrice":
        const spA = Number(a.sellingPrice) || 0;
        const spB = Number(b.sellingPrice) || 0;
        return sortOptions.direction === "asc" ? spA - spB : spB - spA;

      case "stockLevel":
        const stockA = Number(a.stockLevel?.stocklevel) || 0;
        const stockB = Number(b.stockLevel?.stocklevel) || 0;
        return sortOptions.direction === "asc" ? stockA - stockB : stockB - stockA;

      case "status":
        const statusA = (a.status || "").toLowerCase();
        const statusB = (b.status || "").toLowerCase();
        return sortOptions.direction === "asc"
          ? statusA.localeCompare(statusB)
          : statusB.localeCompare(statusA);

      case "dateCreated":
        const createdAtA = new Date(a.createdAt || 0).getTime();
        const createdAtB = new Date(b.createdAt || 0).getTime();
        return sortOptions.direction === "asc"
          ? createdAtA - createdAtB
          : createdAtB - createdAtA;

      case "dateModified":
        const updatedAtA = new Date(a.updatedAt || 0).getTime();
        const updatedAtB = new Date(b.updatedAt || 0).getTime();
        return sortOptions.direction === "asc"
          ? updatedAtA - updatedAtB
          : updatedAtB - updatedAtA;

      default:
        return 0;
    }
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
  const onDelete = (id, productTitle) => {
    toast.info(
      <div className="flex flex-col gap-2">
        <p>{`Are you sure you want to delete "${productTitle}"`}</p>
        <div className="flex justify-end gap-2 mt-2">
          <button
            className="px-3 py-1 bg-gray-200 text-gray-800 rounded-md text-sm hover:bg-gray-300 cursor-pointer"
            onClick={() => toast.dismiss()}
          >
            Cancel
          </button>
          <button
            className="px-3 py-1 bg-red-500 text-white rounded-md text-sm hover:bg-red-600 cursor-pointer"
            onClick={() => {
              toast.dismiss();

              const loadingToast = toast.loading("Deleting item...");

              deleteInventory(id)
                .then((res) => {
                  if (res.success) {
                    toast.update(loadingToast, {
                      render: "Item deleted successfully",
                      type: "success",
                      isLoading: false,
                      autoClose: 3000
                    });
                    setInventory((prev) => prev.filter((item) => item._id !== id));
                  } else {
                    toast.update(loadingToast, {
                      render: `Failed to delete item: ${res.error}`,
                      type: "error",
                      isLoading: false,
                      autoClose: 5000
                    });
                  }
                })
                .catch((error) => {
                  toast.update(loadingToast, {
                    render: `Error deleting item: ${error.message}`,
                    type: "error",
                    isLoading: false,
                    autoClose: 5000
                  });
                });
            }}
          >
            Delete
          </button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );
  };

  const handleImportClick = () => {
    fileInputRef.current.click();
  };

  const getAllHeaders = () => {
    return [
      'Product Title',
      'SKU',
      'GTIN',
      'Brand',
      'Status',
      'RRP',
      'Selling Price',
      'Shipping',
      'Shipping Price',

      'UPC',
      'UPC Amazon Catch',
      'Certification No',
      'Previous SKU',

      'Can Be Sold',
      'Can Be Purchased',
      'Track Inventory',

      'Product Length',
      'Product Height',
      'Product Width',
      'Product Weight',
      'Product Volume',

      'Package1 Length',
      'Package1 Height',
      'Package1 Width',
      'Package1 Weight',
      'Package1 Volume',

      'Package2 Length',
      'Package2 Height',
      'Package2 Width',
      'Package2 Weight',
      'Package2 Volume',

      'Package3 Length',
      'Package3 Height',
      'Package3 Width',
      'Package3 Weight',
      'Package3 Volume',

      'Stock Level',
      'Sold',
      'Factory Second',
      'Damaged',

      'Purchase Price',
      'Cost in AUS',
      'Profit',
      'Profit Ratio',
      'Return Ratio',

      'Category Product',
      'Product Type',
      'Collection',
      'Tags',

      'Notes',

      'Image Name',
      'Image URL'
    ];
  };

  const convertItemToRow = (item) => {
    return [
      item.productTitle || '',
      item.sku || '',
      item.gtin || '',
      item.brand || '',
      item.status || '',
      item.rrp || '',
      item.sellingPrice || '',
      item.shipping || '',
      item.shippingPrice || '',

      item.upc || '',
      item.upcAmazonCatch || '',
      item.certificationNo || '',
      item.previousSku || '',

      item.canBeSold ? 'Yes' : 'No',
      item.canBePurchased ? 'Yes' : 'No',
      item.trackInventory ? 'Yes' : 'No',

      item.productDimensions?.length || '',
      item.productDimensions?.height || '',
      item.productDimensions?.width || '',
      item.productDimensions?.weight || '',
      item.productDimensions?.volume || '',

      item.package1?.length || '',
      item.package1?.height || '',
      item.package1?.width || '',
      item.package1?.weight || '',
      item.package1?.volume || '',

      item.package2?.length || '',
      item.package2?.height || '',
      item.package2?.width || '',
      item.package2?.weight || '',
      item.package2?.volume || '',

      item.package3?.length || '',
      item.package3?.height || '',
      item.package3?.width || '',
      item.package3?.weight || '',
      item.package3?.volume || '',

      item.stockLevel?.stocklevel || '',
      item.stockLevel?.sold || '',
      item.stockLevel?.factorysecond || '',
      item.stockLevel?.damaged || '',

      item.purchase?.purchaseprice || '',
      item.purchase?.costinaus || '',
      item.purchase?.profit || '',
      item.purchase?.profitratio || '',
      item.purchase?.returnratio || '',

      item.organization?.categoryproduct || '',
      item.organization?.producttype || '',
      item.organization?.collection || '',
      item.organization?.tags || '',

      item.notes || '',

      item.imageName || '',
      item.imageUrl || ''
    ];
  };

  const handleExportSelectedCSV = () => {
    const itemsToExport = selectedRows.length === 0 ? filteredData : filteredData.filter(item => selectedRows.includes(item._id));

    if (itemsToExport.length === 0) {
      toast.error("No items to export");
      return;
    }

    const headers = getAllHeaders();
    const dataToExport = itemsToExport.map(convertItemToRow);
    const csvData = [headers, ...dataToExport];

    const csvString = csvData.map(row =>
      row.map(cell => {
        if (cell && (cell.includes(',') || cell.includes('"') || cell.includes('\n'))) {
          return `"${cell.replace(/"/g, '""')}"`;
        }
        return cell;
      }).join(',')
    ).join('\n');

    const date = new Date().toISOString().split('T')[0];
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `inventory_export_${date}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success(`Successfully exported ${itemsToExport.length} items`);
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log('File Details:', {
        name: file.name,
        type: file.type,
        size: `${(file.size / 1024).toFixed(2)} KB`,
        lastModified: new Date(file.lastModified).toLocaleString()
      });

      if (file.type !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" &&
        file.type !== "application/vnd.ms-excel" &&
        file.type !== "text/csv") {
        toast.error("Please upload an Excel or CSV file");
        return;
      }

      const loadingToast = toast.loading("Processing file...");

      const reader = new FileReader();
      reader.onload = async (e) => {
        const content = e.target.result;

        try {
          const rows = content.split('\n').map(row =>
            row.split(',').map(cell =>
              cell.trim().replace(/(^"|"$)/g, '')
            )
          );

          const headers = rows[0];
          const data = rows.slice(1).filter(row => row.some(cell => cell.trim()));

          const requiredFields = ['Product Title', 'SKU'];
          const missingFields = requiredFields.filter(field => !headers.includes(field));

          if (missingFields.length > 0) {
            toast.update(loadingToast, {
              render: `Missing Required Fields: ${missingFields.join(', ')}`,
              type: "error",
              isLoading: false,
              autoClose: 5000
            });
            return;
          }

          const results = {
            updated: 0,
            created: 0,
            failed: 0,
            total: data.length
          };

          for (const row of data) {
            try {
              const inventoryItem = {};
              headers.forEach((header, index) => {
                switch (header) {
                  case 'Product Title':
                    inventoryItem.productTitle = row[index];
                    break;
                  case 'SKU':
                    inventoryItem.sku = row[index];
                    break;
                  case 'RRP':
                    inventoryItem.rrp = row[index];
                    break;
                  case 'Selling Price':
                    inventoryItem.sellingPrice = row[index];
                    break;
                  case 'Stock Level':
                    inventoryItem.stockLevel = { stocklevel: row[index] };
                    break;
                  case 'Brand':
                    inventoryItem.brand = row[index];
                    break;
                  case 'Status':
                    inventoryItem.status = row[index];
                    break;
                  case 'Can Be Sold':
                    inventoryItem.canBeSold = row[index].toLowerCase() === 'yes';
                    break;
                  case 'Can Be Purchased':
                    inventoryItem.canBePurchased = row[index].toLowerCase() === 'yes';
                    break;
                  case 'Track Inventory':
                    inventoryItem.trackInventory = row[index].toLowerCase() === 'yes';
                    break;
                  case 'GTIN':
                    inventoryItem.gtin = row[index];
                    break;
                  case 'UPC':
                    inventoryItem.upc = row[index];
                    break;
                  case 'Notes':
                    inventoryItem.notes = row[index];
                    break;
                  case 'Product Length':
                    inventoryItem.productDimensions = inventoryItem.productDimensions || {};
                    inventoryItem.productDimensions.length = row[index];
                    break;
                  case 'Product Height':
                    inventoryItem.productDimensions = inventoryItem.productDimensions || {};
                    inventoryItem.productDimensions.height = row[index];
                    break;
                  case 'Product Width':
                    inventoryItem.productDimensions = inventoryItem.productDimensions || {};
                    inventoryItem.productDimensions.width = row[index];
                    break;
                  case 'Product Weight':
                    inventoryItem.productDimensions = inventoryItem.productDimensions || {};
                    inventoryItem.productDimensions.weight = row[index];
                    break;
                }
              });

              if (!inventoryItem.productTitle) {
                console.warn('Skipping row: Missing Product Title');
                results.failed++;
                continue;
              }

              const response = await fetch('/api/inventory/import', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(inventoryItem)
              });

              const result = await response.json();

              if (result.success) {
                if (result.action === 'updated') {
                  results.updated++;
                } else {
                  results.created++;
                }
              } else {
                results.failed++;
                if (result.error && result.error.includes("MongoDB Atlas cluster")) {
                  toast.update(loadingToast, {
                    render: <div className="flex flex-col gap-2">
                      <p className="font-semibold">Database Connection Error</p>
                      <p className="text-sm">Unable to connect to the database. Please check:</p>
                      <ul className="list-disc list-inside text-sm ml-2">
                        <li>Your internet connection</li>
                        <li>IP whitelist in MongoDB Atlas</li>
                        <li>Database credentials</li>
                      </ul>
                      <p className="text-sm mt-1">Contact your administrator for assistance.</p>
                    </div>,
                    type: "error",
                    isLoading: false,
                    autoClose: false,
                    closeButton: true
                  });
                  break;
                } else {
                  console.error('Error processing row:', result.error);
                }
              }
            } catch (error) {
              results.failed++;
              if (error.message && error.message.includes("MongoDB Atlas cluster")) {
                toast.update(loadingToast, {
                  render: <div className="flex flex-col gap-2">
                    <p className="font-semibold">Database Connection Error</p>
                    <p className="text-sm">Unable to connect to the database. Please check:</p>
                    <ul className="list-disc list-inside text-sm ml-2">
                      <li>Your internet connection</li>
                      <li>IP whitelist in MongoDB Atlas</li>
                      <li>Database credentials</li>
                    </ul>
                    <p className="text-sm mt-1">Contact your administrator for assistance.</p>
                  </div>,
                  type: "error",
                  isLoading: false,
                  autoClose: false,
                  closeButton: true
                });
                break;
              } else {
                console.error('Error processing row:', error);
              }
            }
          }

          if (!results.failed || (results.updated > 0 || results.created > 0)) {
            toast.update(loadingToast, {
              render: `Import completed: ${results.created} created, ${results.updated} updated, ${results.failed} failed`,
              type: results.failed === 0 ? "success" : "warning",
              isLoading: false,
              autoClose: 5000
            });
          }

          if (results.updated > 0 || results.created > 0) {
            const res = await getAllInventory();
            if (res.success) {
              setInventory(res.data);
            }
          }

        } catch (error) {
          console.error('Error parsing file:', error);
          toast.update(loadingToast, {
            render: 'Error processing file. Please check the console for details.',
            type: "error",
            isLoading: false,
            autoClose: 5000
          });
        }
      };

      reader.onerror = (error) => {
        console.error('Error reading file:', error);
        toast.update(loadingToast, {
          render: 'Error reading file. Please try again.',
          type: "error",
          isLoading: false,
          autoClose: 5000
        });
      };

      reader.readAsText(file);
      event.target.value = null;
    }
  };

  const Loader = () => (
    <div className="flex flex-col items-center justify-center min-h-[400px] w-full">
      <div className="relative w-20 h-20">
        <div className="absolute top-0 left-0 right-0 bottom-0">
          <div className="border-4 border-gray-200 border-t-[#52ce66] rounded-full w-20 h-20 animate-spin"></div>
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-[#52ce66] rounded-full"></div>
          </div>
        </div>
      </div>
      <p className="mt-4 text-black text-sm font-medium">Loading Inventory...</p>
      <p className="text-black text-xs mt-2">Please wait while we fetch the data</p>
    </div>
  );

  const handleInventory = (e) => {
    e.preventDefault();
    // const query = encodeURIComponent(JSON.stringify(row));
    router.push(`/Inventory_list/Bundlingkit`);
  };
const handleApply = () => {
  if (selectedChannel === "") {
    toast.error("Please select a sales channel");
    return;
  }

  // 1. Filter to get selected channel
  const filtered = salesChannels.filter(
    (channel) => channel.salesChannelName === selectedChannel
  );

  setFilteredChannels(filtered);

  // 2. Get the first matched channel's offSellingPrice
  const offPrice = Number(filtered[0]?.offSellingPrice || 0);
  const adjustment = offPrice / 100;

  // 3. Update inventory sellingPrice only for selectedRows (frontend only)
  const updatedInventory = inventory.map((item) => {
    if (selectedRows.includes(item._id)) {
      const newPrice = Number(item.rrp || 0) + adjustment;
      return { ...item, adjustedSellingPrice: newPrice.toFixed(2) };
    }
    return { ...item, adjustedSellingPrice: item.sellingPrice }; // fallback
  });

  setInventory(updatedInventory); // update local display
};

// const handleApply = () => {
//     if (selectedChannel === "") {
// toast.error("Please select a sales channel");

// } else {
//       const filtered = salesChannels.filter(
//         (channel) => channel.salesChannelName === selectedChannel
//       );
//       setFilteredChannels(filtered);
// filtered.forEach((channel) => {
//   console.log("Filtered Channel Price:", channel.offSellingPrice);
// });
//     // console.log("Filtered Channel Price:", selectedRows);
// const filteredArray = inventory.filter(item => selectedRows.includes(item._id));
// const sellingPrices = filteredArray.map(item => item.sellingPrice);
// console.log("Selling Price:", sellingPrices[0]);


//     }
//   };
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
       <div

      // className=" mt-10 w-full max-w-screen-xl mx-auto grid grid-cols-1 gap-4 md:grid-cols-12"
      className={`pr-4 sm:pt-4 mx-auto  w-full    min-w-[640px] md:min-w-[800px] lg:min-w-[1000px] xl:min-w-[1000px] 2xl:min-w-[1300px] 3xl:min-w-[1400px] 4xl:min-w-[1600px]  table-auto justify-center items-center  `}

    >
      <div className={`p-2 sm:p-4 w-full  min-w-[640px] md:min-w-[800px] lg:min-w-[800px] xl:min-w-[100px] 2xl:min-w-[1300px] 3xl:min-w-[1400px] 4xl:min-w-[1600px]  ${dropdown.filterPanel ? "overflow-visible" : "overflow-x-hidden"
        }`}>
        <div className="flex flex-col sm:flex-row justify-between gap-3">
          <h1 className="text-base sm:text-lg mt-1 text-black font-semibold">
            Inventory List
          </h1>
          <div className="flex gap-4 justify-end items-center">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept=".xlsx,.xls,.csv"
              className="hidden"
            />
            {/* <button 
              className="bg-[#52ce66] text-white py-2 px-4 rounded-md text-sm hover:bg-[#48b55a] transition cursor-pointer"
              onClick={handleImportClick}
              disabled={isLoading}
            >
              Import
            </button>
            <button 
              className="bg-[#52ce66] text-white py-2 px-4 rounded-md text-sm hover:bg-[#48b55a] transition cursor-pointer"
              onClick={handleExportSelectedCSV}
              disabled={isLoading}
            >
              Export
            </button> */}
             <h1
              className="text-md hover:bg-gray-100 transition"
              // disabled={isLoading}
            >
             Add import 
            </h1>
            <h1
              className="text-md hover:bg-gray-100 transition"
              // disabled={isLoading}
            >
              Bundling/Kitting
            </h1>
            <button
              className="bg-[#52ce66] text-white py-1 px-4 mb-1 rounded-md text-sm hover:bg-[#48b55a] transition cursor-pointer"
              // onClick={() => setIsOpenpop(true)}
              onClick={(e) => handleInventory(e)}
              disabled={isLoading}
            >
              Create Inventory
            </button>
          </div>
          {isOpenpop && <SaleChannelPopup onClose={() => setIsOpenpop(false)} />}
        </div>
      </div>

      <div className=" rounded-xl border border-[#888888] w-[300px] lg:w-full md:w-full bg-white  shadow-lg overflow-x-hidden min-h-[500px]">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className="flex flex-wrap gap-2 p-2 border-b border-[#888888]">
              {["All", "In Stock", "Out of Stock", "Product Listed", "Archived", "Pending Approval", "Recent Updated", "New Products"].map(
                (region) => (
                  <button
                    key={region}
                    className={`py-1.5 px-3 cursor-pointer rounded-md text-sm transition ${filters.region === region
                        ? "underline decoration-[#449ae6] decoration-2 underline-offset-4  "
                        : "text-black cursor-pointer"
                      }`}
                    onClick={() => handleRegionFilter(region)}
                  >
                    {region}
                  </button>
                )
              )}
            </div>

            <div className="flex flex-col sm:flex-row justify-between py-1 px-4 gap-4 items-center ">
              <div className="relative w-full sm:w-80 ">
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
                <button
                  ref={sortButtonRef}
                  className="border py-1 px-4 border-[#888888] rounded-md text-sm hover:bg-gray-100 transition max-w-full"
                  onClick={() => toggleDropdown("sortTooltip")}
                >
                  Sort
                </button>
                {dropdown.sortTooltip && (
                  <div
                    ref={sortTooltipRef}
                    className="md:w-[170px] lg:w-[170px] w-full max-w-md p-4 bg-white border border-[#888888] rounded-lg shadow-sm absolute z-30 top-full right-0 mt-2"
                  >
                    <form className="space-y-1">
                      <label className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name="sort"
                          value="name"
                          checked={sortOptions.field === "name"}
                          onChange={() => handleSortChange("name")}
                          className="text-blue-600 focus:ring-blue-500 focus:ring-2"
                        />
                        <span className="text-black text-sm font-semibold">Name</span>
                      </label>
                      <label className="flex items-center space-x-3 whitespace-nowrap">
                        <input
                          type="radio"
                          name="sort"
                          value="dateCreated"
                          checked={sortOptions.field === "dateCreated"}
                          onChange={() => handleSortChange("dateCreated")}
                          className="text-blue-600 focus:ring-blue-500 focus:ring-2"
                        />
                        <span className="text-black text-sm font-semibold">Date Created</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name="sort"
                          value="dateModified"
                          checked={sortOptions.field === "dateModified"}
                          onChange={() => handleSortChange("dateModified")}
                          className="text-blue-600 focus:ring-blue-500 focus:ring-2"
                        />
                        <span className="text-black text-sm font-semibold">Date Modified</span>
                      </label>
                      <div className="border-t border-[#888888] mt-2 pt-2">
                        <label className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="radio"
                            name="direction"
                            checked={sortOptions.direction === "asc"}
                            onChange={() => setSortOptions(prev => ({ ...prev, direction: "asc" }))}
                            className="text-blue-600 focus:ring-blue-500 focus:ring-2"
                          />
                          <div className="flex items-center space-x-2">
                            <MdArrowUpward />
                            <span className="text-black text-sm font-semibold">Ascending</span>
                          </div>
                        </label>
                        <label className="flex items-center space-x-3 mt-1 cursor-pointer">
                          <input
                            type="radio"
                            name="direction"
                            checked={sortOptions.direction === "desc"}
                            onChange={() => setSortOptions(prev => ({ ...prev, direction: "desc" }))}
                            className="text-blue-600 focus:ring-blue-500 focus:ring-2"
                          />
                          <div className="flex items-center space-x-2">
                            <MdArrowDownward />
                            <span className="text-black text-sm font-semibold">Descending</span>
                          </div>
                        </label>
                      </div>
                    </form>
                  </div>
                )}
                {dropdown.filterPanel && (
                  <div
                    ref={filterPanelRef}
                    className="md:w-[250px] lg:w-[250px] w-full space-y-3 max-w-md p-4 bg-white border border-[#888888] rounded-lg shadow-sm absolute z-30 top-full right-0 mt-2"
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
                          <span className="text-black text-sm font-semibold">{type}</span>
                        </label>
                      ))}
                    
                  Status

                      <select
                        className="text-sm border border-[#888888] w-full p-1 rounded-md"
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                      >
                        <option value="">All Status</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>

                      <label className="flex gap-4">
                        <input
                          type="radio"
                          name="filterType"
                          value="none"
                          checked={filterType1 === "none"}
                          onChange={() => setFilterType1("none")}
                          className="text-blue-600 focus:ring-blue-500 focus:ring-2"
                        />
                        <span className="text-black text-sm font-semibold">Brand</span>
                      </label>

                      <select
                        className="text-sm border border-[#888888] w-full p-1 rounded-md"
                        value={selectedBrand}
                        onChange={(e) => setSelectedBrand(e.target.value)}
                      >
                        <option value="">All Brands</option>
                        {[...new Set(inventory.map(item => item.brand))].filter(Boolean).map(brand => (
                          <option key={brand} value={brand}>{brand}</option>
                        ))}
                      </select>

                      <button
                        type="button"
                        onClick={() => {
                          setFilterType("");
                          setFilterType1("");
                          setSelectedStatus("");
                          setSelectedBrand("");
                        }}
                        className="w-full mt-2 bg-gray-100 text-black py-1 px-3  border border-[#888888] rounded-md hover:bg-gray-200 text-sm"
                      >
                        Clear Filters
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
{/* {selectedRows.length > 0 &&  */}
 {selectedRows.length > 0 && (
            <div ref={buttonsRef} className="flex gap-4 mb-2 px-4 ">
              <div className="flex gap-1 mt-1 ">
                <div className="border border-[#888888] p-1 px-4 rounded-md gap-2 flex items-center">
                  <div className="flex flex-col items-center ">
                    {selectedRows.length}
                  </div>
                </div>
                <div className="inline-block flex gap-2">
                  <button className="border border-[#888888] p-1 rounded-md">
                    <select className="text-sm border-none outline-none px-2" disabled={selectedRows.length === 0}>
                      <option value="">More Actions</option>
                      <option value="BulkEdit">Bulk Edit</option>
                      <option value="Unarchived">Bulk Edit Bundle</option>
                      <option value="Remove">Update Stock Level</option>
                      <option value="Remove">Move to Listings</option>
                      <option value="Remove">Export</option>
                      <option value="Remove">Add Notes</option>

                    </select>
                  </button>
                </div>
                {/* <div className="inline-block flex gap-2">
                  <button className="border border-[#888888] p-1 rounded-md">
                     <select
            className="text-sm border-none outline-none px-2"
            value={selectedChannel}
            onChange={(e) => setSelectedChannel(e.target.value)}
          >
            <option value="">Select Sales Channel</option>
            {salesChannels.map((channel) => (
              <option key={channel._id} value={channel.salesChannelName}>
                {channel.salesChannelName}
              </option>
            ))}
          </select>
                  </button>
                </div> */}
                <div className="relative inline-block">
  <button
    onClick={() => setChannelDropdownOpen(!channelDropdownOpen)}
    className="border border-[#888888] p-1 rounded-md flex items-center gap-2 w-[200px] justify-between"
  >
    <span className="text-sm">
      {selectedChannel || "Select Sales Channel"}
    </span>
    <FaChevronDown className="text-xs" />
  </button>

  {channelDropdownOpen && (
    <div className="absolute z-10 mt-1 w-[250px] bg-white border border-gray-300 rounded shadow-lg">
      <div className="p-2">
        <input
          type="text"
          placeholder="Search Channel"
          value={channelSearch}
          onChange={(e) => setChannelSearch(e.target.value)}
          className="w-full px-2 py-1 text-sm border border-[#888888] rounded-lg focus:border-blue-500 bg-transparent focus:outline-none text-sm"
        />
      </div>
      <ul className="max-h-48 overflow-y-auto text-sm">
        {visibleChannels.length > 0 ? (
          visibleChannels.map((channel) => (
            <li
              key={channel._id}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                setSelectedChannel(channel.salesChannelName);
                setChannelDropdownOpen(false);
                setChannelSearch("");
              }}
            >
              {channel.salesChannelName}
            </li>
          ))
        ) : (
          <li className="px-4 py-2 text-gray-500">No match found</li>
        )}
      </ul>
    </div>
  )}
</div>

<div className="inline-block flex gap-2">
                  <button className="border border-[#888888] p-1 rounded-md"
                         onClick={handleApply}>
                    Apply
                  </button>
                </div>
              </div>
            </div>
)}
            <div className="hidden sm:block overflow-x-hidden">
              {/* <table className="w-full border-collapse text-sm ml-4">
            <thead>
              <tr className="text-xs bg-[#f7f7f7]">
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
                <th className="p-2 border-b text-center cursor-pointer hover:bg-gray-100">
                  Name
                </th>
                <th className="p-2 border-b text-center">SKU</th>
                <th className="p-2 border-b text-center">RRP</th>
                <th className="p-2 border-b text-center">Selling Price</th>
                <th className="p-2 border-b text-center">Stock Level</th>
                <th className="p-2 border-b text-center">Status</th>
             //    <th className="p-2 border-b text-center">Action</th> 
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row) => (
                <tr
                  key={row._id}
                  className={`hover:bg-gray-50 cursor-pointer ${
                    selectedRows.includes(row._id) ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => handleRowClick(row)}
                >
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
                  <td className="p-2 border-b text-center">{row.productTitle}</td>
                  <td className="p-2 border-b text-center">{row.sku}</td>
                  <td className="p-2 border-b text-center">${row.rrp}</td>
                  <td className="p-2 border-b text-center">${row.sellingPrice}</td>
                  <td className="p-2 border-b text-center">{row.stockLevel?.stocklevel}</td>
                 
                  <td className="p-2 border-b text-center">
  <span
    className={`py-1 px-4 rounded-md text-xs inline-block min-w-[120px] text-center ${
      row.status === "InStock"
        ? "bg-green-100 text-green-700"
        : row.status === "OutofStock"
        ? "bg-red-100 text-red-700"
        : row.status === "Archived"
        ? "bg-yellow-100 text-yellow-700"
        : row.status === "Pending Approval"
        ? "bg-blue-100 text-blue-700"
        : "bg-gray-100 text-black"
    }`}
  >
    {row.status || "N/A"}
  </span>
</td>

                 
                </tr>
              ))}
            </tbody>
          </table> */}
              <table className="w-full border-collapse text-sm ">
                <thead>
                  {/* <tr className="text-xs border-b border-[#888888] ">
                    <th className="p-2  w-12 text-center">
                      <div className="flex flex-col items-center ">
                        <input
                          type="checkbox"
                          checked={filteredData.length > 0 && selectedRows.length === filteredData.length}
                          onChange={toggleSelectAll}
                          title="Select all inventory items"
                        />
                      </div>
                    </th>                    
                    <th className="p-2 border-b border-[#888888] text-center cursor-pointer hover:bg-gray-100">Name</th>

                    <th className="p-2  text-center">SKU</th>
                    <th className="p-2  text-center">RRP</th>
                    <th className="p-2  text-center">Selling Price</th>
                    <th className="p-2  text-center">Stock Level</th>
                    <th className="p-2  text-center">Status</th>
                  </tr> */}
                  <tr className="text-xs border-b border-[#888888]">
  <th className="p-2 w-12 text-center border-t border-[#888888]">
    <div className="flex flex-col items-center">
      <input
        type="checkbox"
        checked={filteredData.length > 0 && selectedRows.length === filteredData.length}
        onChange={toggleSelectAll}
        title="Select all inventory items"
      />
    </div>
  </th>

  <th
    className="p-2 border-t border-[#888888] text-center cursor-pointer select-none relative"
    onClick={() => handleSortChange('name')}
  >
    <div className="flex justify-center items-center gap-1">
      Name
      {sortOptions.field === 'name'
        ? (sortOptions.direction === 'desc'
            ? <Image src={arrowdown} alt="Arrow Down" width={16} height={16} className="ml-1" />
            : <Image src={arrowup} alt="Arrow Up" width={16} height={16} className="ml-1" />)
        : <Image src={arrowdown} alt="Arrow Down" width={16} height={16} className="ml-1" />
      }
    </div>
  </th>

  <th
    className="p-2 border-t border-[#888888] text-center cursor-pointer select-none relative"
    onClick={() => handleSortChange('sku')}
  >
    <div className="flex justify-center items-center gap-1">
      SKU
      {sortOptions.field === 'sku'
        ? (sortOptions.direction === 'desc'
            ? <Image src={arrowdown} alt="Arrow Down" width={16} height={16} className="ml-1" />
            : <Image src={arrowup} alt="Arrow Up" width={16} height={16} className="ml-1" />)
        : <Image src={arrowdown} alt="Arrow Down" width={16} height={16} className="ml-1" />
      }
    </div>
  </th>

  <th
    className="p-2 border-t border-[#888888] text-center cursor-pointer select-none relative"
    onClick={() => handleSortChange('rrp')}
  >
    <div className="flex justify-center items-center gap-1">
      RRP
      {sortOptions.field === 'rrp'
        ? (sortOptions.direction === 'desc'
            ? <Image src={arrowdown} alt="Arrow Down" width={16} height={16} className="ml-1" />
            : <Image src={arrowup} alt="Arrow Up" width={16} height={16} className="ml-1" />)
        : <Image src={arrowdown} alt="Arrow Down" width={16} height={16} className="ml-1" />
      }
    </div>
  </th>

  <th
    className="p-2 border-t border-[#888888] text-center cursor-pointer select-none relative"
    onClick={() => handleSortChange('sellingPrice')}
  >
    <div className="flex justify-center items-center gap-1">
      Selling Price
      {sortOptions.field === 'sellingPrice'
        ? (sortOptions.direction === 'desc'
            ? <Image src={arrowdown} alt="Arrow Down" width={16} height={16} className="ml-1" />
            : <Image src={arrowup} alt="Arrow Up" width={16} height={16} className="ml-1" />)
        : <Image src={arrowdown} alt="Arrow Down" width={16} height={16} className="ml-1" />
      }
    </div>
  </th>

  <th
    className="p-2 border-t border-[#888888] text-center cursor-pointer select-none relative"
    onClick={() => handleSortChange('stockLevel')}
  >
    <div className="flex justify-center items-center gap-1">
      Stock Level
      {sortOptions.field === 'stockLevel'
        ? (sortOptions.direction === 'desc'
            ? <Image src={arrowdown} alt="Arrow Down" width={16} height={16} className="ml-1" />
            : <Image src={arrowup} alt="Arrow Up" width={16} height={16} className="ml-1" />)
        : <Image src={arrowdown} alt="Arrow Down" width={16} height={16} className="ml-1" />
      }
    </div>
  </th>

  <th
    className="p-2 border-t border-[#888888] text-center cursor-pointer select-none relative"
    onClick={() => handleSortChange('status')}
  >
    <div className="flex justify-center items-center gap-1">
      Status
      {sortOptions.field === 'status'
        ? (sortOptions.direction === 'desc'
            ? <Image src={arrowdown} alt="Arrow Down" width={16} height={16} className="ml-1" />
            : <Image src={arrowup} alt="Arrow Up" width={16} height={16} className="ml-1" />)
        : <Image src={arrowdown} alt="Arrow Down" width={16} height={16} className="ml-1" />
      }
    </div>
  </th>
  {/* <th className="p-2 border-t border-[#888888] text-center">
Action  </th> */}
</tr>

                </thead>
                <tbody>
                  {paginatedData.map((row) => (
                    <tr
                      key={row._id}
                      className={`hover:bg-gray-50 cursor-pointer ${selectedRows.includes(row._id) ? 'bg-blue-50' : ''
                        }`}
                      // onClick={() => handleRowClick(row)}
                       onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleEdit(row);
                                                  }}
                    >
                      <td className="p-2 border-b border-[#888888] text-center w-12" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(row._id)}
                          onChange={(e) => {
                            e.stopPropagation();
                            toggleRow(row._id);
                          }}
                        />
                      </td>
                      <td className="p-2 border-b border-[#888888] text-center">{row.productTitle}</td>
                      <td className="p-2 border-b border-[#888888] text-center">{row.sku}</td>
                      <td className="p-2 border-b border-[#888888] text-center">${row.rrp}</td>
                      <td className="p-2 border-b border-[#888888] text-center"> ${row.adjustedSellingPrice || row.sellingPrice}</td>
                      <td className="p-2 border-b border-[#888888] text-center">{row.stockLevel?.stocklevel}</td>
                      <td className="p-2 border-b border-[#888888] text-center">
                        <span
                          className={`py-1 px-4 rounded-md text-xs inline-block min-w-[120px] text-center ${row.status === "InStock"
                              ? "bg-green-100 text-green-700"
                              : row.status === "OutofStock"
                                ? "bg-red-100 text-red-700"
                                : row.status === "Archived"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : row.status === "Pending Approval"
                                    ? "bg-blue-100 text-blue-700"
                                    : "bg-gray-100 text-black"
                            }`}
                        >
                          {row.status || "N/A"}
                        </span>
                      </td>
                      {/* <td className="p-2  border-b border-[#888888] text-center">
                                                <button
                                                  onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleEdit(row);
                                                  }}
                                                  className="text-blue-500 hover:text-blue-700 mx-1 cursor-pointer"
                                                  title="Edit"
                                                >
                                                  <FaEdit />
                                                </button>
                                                </td> */}
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
                        <td> ${row.adjustedSellingPrice || row.sellingPrice}</td>
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
                                  : "bg-gray-100 text-black"
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
              <div className="flex gap-2 flex-wrap justify-center items-center">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`border border-[#888888] px-2 justify-center items-center rounded-md text-sm ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "text-blue-500"
                    }`}
                >
                  {"<"}
                </button>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`border border-[#888888] px-2 justify-center items-center text-blue-500 rounded-md text-sm ${currentPage === totalPages ? "opacity-50 cursor-not-allowed text-gray-500" : ""
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
          </>
        )}
      </div>
      </div>
    </>
  );
};

export default TableWithCheckboxes;