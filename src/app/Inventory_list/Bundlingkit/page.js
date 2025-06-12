"use client";
import React, { useState, useRef, useEffect, Suspense } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import Link from "next/link";
import { useSearchParams } from 'next/navigation';
import { submitProductAction } from "@/actions/inventory";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialFormState = {
  canBeSold: false,
  canBePurchased: false,
  assemblyRequired: false,
  spareParts: false,
  saleExelude: false,
  productTitle: "",
  numberOfCartons: "",
  sku: "",
  gtin: "",
  brand: "",
  status: "",
  rrp: "",
  sellingPrice: "",
  shipping: "",
  shippingPrice: "",
  upc: "",
  upcAmazonCatch: "",
  certificationNo: "",
  previousSku: "",
  imageName: "",
  imageUrl: "",
  productDimensions: {
    length: "",
    height: "",
    width: "",
    weight: "",
    volume: ""
  },
  package1: {
    length: "",
    height: "",
    width: "",
    weight: "",
    volume: ""
  },
  package2: {
    length: "",
    height: "",
    width: "",
    weight: "",
    volume: ""
  },
  package3: {
    length: "",
    height: "",
    width: "",
    weight: "",
    volume: ""
  },
  stockLevel: {
    stocklevel: "",
    sold: "",
    factorysecond: "",
    damaged: ""
  },
  purchase: {
    purchaseprice: "",
    costinaus: "",
    profit: "",
    profitratio: "",
    returnratio: ""
  },
  notes: "",
  organization: {
    categoryproduct: "",
    producttype: "",
    collection: "",
    tags: ""
  },
  fileUrl: ""
};

const BundlingkitContent = () => {
  const searchParams = useSearchParams();
  const action = searchParams.get('action') || 'add';
  const rowData = searchParams.get('data');
  const mounted = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null); // Store selected image temporarily
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [fileUrl, setFileUrl] = useState("");

  // Form state
  const [formData, setFormData] = useState(initialFormState);

  // Load row data when available
  useEffect(() => {
    if (rowData && action === 'update') {
      try {
        const parsedData = JSON.parse(rowData);
        setFormData(prev => ({
          ...prev,
          ...parsedData,
          // Ensure nested objects exist
          productDimensions: {
            ...prev.productDimensions,
            ...(parsedData.productDimensions || {})
          },
          stockLevel: {
            ...prev.stockLevel,
            ...(parsedData.stockLevel || {})
          },
          purchase: {
            ...prev.purchase,
            ...(parsedData.purchase || {})
          },
          organization: {
            ...prev.organization,
            ...(parsedData.organization || {})
          }
        }));
      } catch (error) {
        console.error('Error parsing row data:', error);
      }
    }
  }, [rowData, action]);

  // Individual states for each section, General open by default
  const [isGeneralOpen, setIsGeneralOpen] = useState(true);
  const [isPackageOpen, setIsPackageOpen] = useState(false);
  const [isStockOpen, setIsStockOpen] = useState(false);
  const [isPurchaseOpen, setIsPurchaseOpen] = useState(false);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [isReadOnly, setIsReadOnly] = useState(action === 'view');

  const generalRef = useRef(null);
  const packageRef = useRef(null);
  const stockRef = useRef(null);
  const purchaseRef = useRef(null);
  const noteRef = useRef(null);

  // Toggle General section
  const toggleText = () => {
    setIsGeneralOpen(!isGeneralOpen);
  };
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("Choose a file");

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    // Check if a file was selected
    if (!file) {
      toast.error('Please select a file');
      return;
    }

    // List of allowed image MIME types
    const allowedTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'image/webp'
    ];

    // Check if file is an image
    if (!allowedTypes.includes(file.type)) {
      toast.error('Please select a valid image file (JPEG, PNG, GIF, or WebP)');
      event.target.value = ''; // Clear the input
      setFileName("Choose a file");
      setSelectedImage(null);
      return;
    }

    // Check file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      toast.error('Image size should be less than 5MB');
      event.target.value = ''; // Clear the input
      setFileName("Choose a file");
      setSelectedImage(null);
      return;
    }

    // Store the file temporarily
    setSelectedImage(file);
    setFileName(file.name);
    toast.success('Image selected successfully');
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  // Toggle other sections, closing all other non-General sections
  const togglePackage = () => {
    setIsPackageOpen(!isPackageOpen);
    setIsStockOpen(false);
    setIsPurchaseOpen(false);
    setIsNotesOpen(false);
  };

  const toggleStock = () => {
    setIsStockOpen(!isStockOpen);
    setIsPackageOpen(false);
    setIsPurchaseOpen(false);
    setIsNotesOpen(false);
  };

  const togglePurchase = () => {
    setIsPurchaseOpen(!isPurchaseOpen);
    setIsPackageOpen(false);
    setIsStockOpen(false);
    setIsNotesOpen(false);
  };

  const toggleNotes = () => {
    setIsNotesOpen(!isNotesOpen);
    setIsPackageOpen(false);
    setIsStockOpen(false);
    setIsPurchaseOpen(false);
  };

  // Close all sections if clicking outside
  const handleClickOutside = (event) => {
    if (!mounted.current) return;

    if (
      generalRef.current &&
      !generalRef.current.contains(event.target) &&
      packageRef.current &&
      !packageRef.current.contains(event.target) &&
      stockRef.current &&
      !stockRef.current.contains(event.target) &&
      purchaseRef.current &&
      !purchaseRef.current.contains(event.target) &&
      noteRef.current &&
      !noteRef.current.contains(event.target)
    ) {
      setIsGeneralOpen(false);
      setIsPackageOpen(false);
      setIsStockOpen(false);
      setIsPurchaseOpen(false);
      setIsNotesOpen(false);
    }
  };

  useEffect(() => {
    mounted.current = true;
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      mounted.current = false;
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!mounted.current) return;
    setIsReadOnly(action === 'view');
  }, [action]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.includes('.')) {
      // Handle nested objects (e.g., productDimensions.length)
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      // Handle top-level fields
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  // Handle save
  const handleSave = async () => {
    setIsLoading(true);
    // console.log('Initial Form Data:', JSON.stringify(formData, null, 2));

    try {
      let imageFileName = formData.imageName;
      // console.log('Selected Image:', selectedImage);

      // Upload image if one is selected
      if (selectedImage) {
        const timestamp = new Date().getTime();
        const uniqueFileName = `${timestamp}_${selectedImage.name}`;
        // console.log('Generated filename:', uniqueFileName);

        const imageFormData = new FormData();
        imageFormData.append('file', selectedImage);

        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: imageFormData
        });

        if (!uploadResponse.ok) {
          throw new Error('Failed to upload image');
        }

        const uploadResult = await uploadResponse.json();
        // console.log('Upload result:', uploadResult);
        imageFileName = uploadResult.fileName;
        // console.log('Image file name to be saved:', imageFileName);
      }

      // Submit the form data with image name
      const dataToSubmit = {
        ...formData,
        imageName: imageFileName
      };
      // console.log('Data being submitted:', JSON.stringify(dataToSubmit, null, 2));
      console.log(dataToSubmit)
      const result = await submitProductAction(dataToSubmit);
      // console.log('Submit result:', result);

      if (result.success) {
        toast.success(action === 'update' ? 'Updated successfully!' : 'Saved successfully!');
        setTimeout(() => {
          window.location.href = '/Inventory_list/Inventorylist';
        }, 1500);
      } else {
        toast.error(result.error || 'An error occurred');
      }
    } catch (error) {
      console.error('Error in handleSave:', error);
      toast.error('An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle URL input
  const handleUrlSubmit = () => {
    if (fileUrl) {
      setFormData(prev => ({
        ...prev,
        imageUrl: fileUrl
      }));
      setShowUrlInput(false);
      toast.success('URL added successfully!');
    } else {
      toast.error('Please enter a valid URL');
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={1500} />
      {/* Header Section */}
      <div className="py-4 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 3xl:px-20 4xl:px-24">
        {/* Your entire content starts here */}
        <div className="flex flex-col sm:flex-row justify-between mb-4 gap-3">
          <div className="flex items-center gap-2">
            <div className="border border-[#888888]  rounded-md p-2">
              <Link href="/Inventory_list/Inventorylist">
<FaArrowLeftLong size={20} className="text-sm" />
              </Link>
            </div>
            <h1 className="text-base sm:text-lg md:text-xl text-black font-semibold">
              {action === 'add' ? 'Add Inventory' : action === 'update' ? 'Update Inventory' : 'View Inventory'}
            </h1>
          </div>
          <div className="flex gap-2 sm:gap-4 justify-end items-center">
            <button className="text-sm sm:text-md hover:bg-gray-100 transition px-2 py-1 rounded-md">
              Bundling/Kitting
            </button>
            {action !== 'view' && (
              <button
                onClick={handleSave}
                disabled={isLoading}
                className="bg-[#52ce66] text-white py-1 sm:py-2 px-3 sm:px-4 rounded-md text-sm hover:bg-[#48b55a] transition flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>{action === 'update' ? 'Updating...' : 'Saving...'}</span>
                  </>
                ) : (
                  action === 'update' ? 'Update' : 'Save'
                )}
              </button>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
          {/* Left Section */}
          <div className="border border-[#888888]  rounded-md w-full lg:w-3/4 bg-white p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mb-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="h-4 w-4"
                  disabled={isReadOnly}
                  name="canBeSold"
                  checked={formData.canBeSold}
                  onChange={handleInputChange}
                />
                <span className="text-sm sm:text-base">Can be Sold</span>
              </label>
              <label className="flex items-center gap-2 ">
                <input
                  type="checkbox"
                  className="h-4 w-4 border border-[#888888] "
                  disabled={isReadOnly}
                  name="canBePurchased"
                  checked={formData.canBePurchased}
                  onChange={handleInputChange}
                />
                <span className="text-sm sm:text-base">Can be Purchased</span>
              </label>
            </div>

            <label className="flex flex-col mt-4">
              <span className="mb-2 text-black text-sm sm:text-base">
                Product Title
              </span>
              <input
                type="text"
                className="border border-[#888888]  rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                name="productTitle"
                value={formData.productTitle}
                onChange={handleInputChange}
                readOnly={isReadOnly}
              />
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <label className="flex flex-col">
                <span className="mb-2 text-black text-sm sm:text-base">
                  SKU
                </span>
                <input
                  type="text"
                  className="border border-[#888888]  bg-green-500 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  placeholder="SKU"
                  name="sku"
                  value={formData.sku}
                  onChange={handleInputChange}
                  readOnly={isReadOnly}
                />
              </label>
              <label className="flex flex-col">
                <span className="mb-2 text-black text-sm sm:text-base">
                  GTIN
                </span>
                <input
                  type="text"
                  className="border border-[#888888] rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  placeholder="GTIN"
                  name="gtin"
                  value={formData.gtin}
                  onChange={handleInputChange}
                  readOnly={isReadOnly}
                />
              </label>
            </div>

            <label className="flex flex-col mt-4">
              <span className="mb-2 text-black text-sm sm:text-base">
                Brand
              </span>
              <input
                type="text"
                className="border border-[#888888] rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-1/2"
                placeholder="Brand"
                name="brand"
                value={formData.brand}
                onChange={handleInputChange}
                readOnly={isReadOnly}
              />
            </label>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 border border-[#888888] "
                  disabled={isReadOnly}
                  name="saleExelude"
                  checked={formData.saleExelude}
                  onChange={handleInputChange}
                />
                <span className="text-sm sm:text-base">Sale Exelude</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 border border-[#888888] "
                  disabled={isReadOnly}
                  name="assemblyRequired"
                  checked={formData.assemblyRequired}
                  onChange={handleInputChange}
                />
                <span className="text-sm sm:text-base">Assembly Required</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 border border-[#888888] "
                  disabled={isReadOnly}
                  name="spareParts"
                  checked={formData.spareParts}
                  onChange={handleInputChange}
                />
                <span className="text-sm sm:text-base">Spare Parts</span>
              </label>
            </div>

          </div>

          {/* Right Section */}
          <div className="flex flex-col gap-4 w-full lg:w-1/4">
            {/* Status Section */}
            <div className="border rounded-md bg-white p-4">
              <label className="flex flex-col">
                <span className="text-black text-sm font-semibold mb-2">
                  Status
                </span>
                <select className="text-sm border border-[#888888]  w-full p-2 rounded-md" disabled={isReadOnly} name="status" value={formData.status} onChange={handleInputChange}>
                  <option value="">Status</option>
                  <option value="InStock">InStock</option>
                  <option value="OutofStock">OutofStock</option>
                  <option value="Archived">Archived</option>

                  <option value="Pending Approval">Pending Approval</option>

                </select>
              </label>
            </div>

            {/* Pricing Section */}
            <div className="border rounded-md bg-white p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="flex flex-col">
                  <span className="mb-2 text-black text-sm sm:text-base">
                    RRP (AUD)
                  </span>
                  <input
                    type="text"
                    className="border border-[#888888]  bg-green-500  rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                    placeholder="$ 0.00"
                    name="rrp"
                    value={formData.rrp}
                    onChange={handleInputChange}
                    readOnly={isReadOnly}
                  />
                </label>
                <label className="flex flex-col">
                  <span className="mb-2 text-black text-sm sm:text-base">
                    Selling Price
                  </span>
                  <input
                    type="text"
                    className="border border-[#888888]  bg-green-500 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                    placeholder="$ 0.00"
                    name="sellingPrice"
                    value={formData.sellingPrice}
                    onChange={handleInputChange}
                    readOnly={isReadOnly}
                  />
                </label>
                <label className="flex flex-col">
                  <span className="mb-2 text-black text-sm sm:text-base">
                    Shipping
                  </span>
                  <input
                    type="text"
                    className="border border-[#888888] rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                    placeholder="$ 0.00"
                    name="shipping"
                    value={formData.shipping}
                    onChange={handleInputChange}
                    readOnly={isReadOnly}
                  />
                </label>
                <label className="flex flex-col">
                  <span className="mb-2 text-black text-sm sm:text-base">
                    ShippingPrice
                  </span>
                  <input
                    type="text"
                    className="border border-[#888888] rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                    placeholder="$ 0.00"
                    name="shippingPrice"
                    value={formData.shippingPrice}
                    onChange={handleInputChange}
                    readOnly={isReadOnly}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Sections */}
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 mt-6">
          {/* Media and Toggle Sections */}
          <div className="flex flex-col w-full lg:w-3/4 gap-4">
            {/* Media Section */}
            <div className="border border-[#888888]  rounded-md bg-white p-4">
              <h1 className="text-sm sm:text-base font-semibold">Media</h1>
              <div className="flex flex-col gap-3 min-h-[100px] border-2 border-dashed border-gray-400 p-4">
                <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden border border-[#888888] "
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                  <button
                    onClick={handleClick}
                    className="border w-full sm:w-auto border-gray-400 rounded px-3 py-1 bg-gray-100 hover:bg-gray-200"
                  >
                    {fileName}
                  </button>
                  <span
                    onClick={() => setShowUrlInput(true)}
                    className="text-blue-300 text-sm sm:text-base cursor-pointer hover:underline"
                  >
                    Add File URL
                  </span>
                </div>

                {showUrlInput && (
                  <div className="flex flex-col sm:flex-row gap-2 mt-2 w-full">
                    <input
                      type="url"
                      value={fileUrl}
                      onChange={(e) => setFileUrl(e.target.value)}
                      placeholder="Enter file URL"
                      className="flex-1 border border-[#888888] rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={handleUrlSubmit}
                        className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setShowUrlInput(false);
                          setFileUrl("");
                        }}
                        className="bg-gray-300 text-black px-4 py-1 rounded hover:bg-gray-400"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
                {formData.imageUrl && !showUrlInput && (
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-sm text-gray-600 max-w-xs truncate overflow-hidden">
                      Added URL: {formData.imageUrl}
                    </span>
                    <button
                      onClick={() => {
                        setFormData(prev => ({ ...prev, imageUrl: "" }));
                        setFileUrl("");
                      }}
                      className="text-red-500 hover:text-red-600"
                    >
                      ✕
                    </button>
                  </div>
                )}
                {/* {formData.imageUrl && !showUrlInput && (
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-sm text-gray-600">Added URL: {formData.imageUrl}</span>
                    <button
                      onClick={() => {
                        setFormData(prev => ({ ...prev, imageUrl: "" }));
                        setFileUrl("");
                      }}
                      className="text-red-500 hover:text-red-600"
                    >
                      ✕
                    </button>
                  </div>
                )} */}
              </div>
            </div>

            {/* Toggleable Sections */}
            <div className="border border-[#888888]  rounded-md bg-white p-4">
              {/* <div className="flex flex-wrap gap-4 sm:gap-6 mb-4">
                <span
                  onClick={toggleText}
                  className="cursor-pointer hover:text-gray-700 text-sm sm:text-base"
                >
                  General
                </span>
                <span
                  onClick={togglePackage}
                  className="cursor-pointer hover:text-gray-700 text-sm sm:text-base"
                >
                  Package
                </span>
                <span
                  onClick={toggleStock}
                  className="cursor-pointer hover:text-gray-700 text-sm sm:text-base"
                >
                  Stock Level
                </span>
                <span
                  onClick={togglePurchase}
                  className="cursor-pointer hover:text-gray-700 text-sm sm:text-base"
                >
                  Purchase
                </span>
                <span
                  onClick={toggleNotes}
                  className="cursor-pointer hover:text-gray-700 text-sm sm:text-base"
                >
                  Notes
                </span>
              </div> */}

              <div className="flex flex-wrap gap-4 sm:gap-6 mb-4">
                <span
                  onClick={toggleText}
                  className={`cursor-pointer text-sm sm:text-base border-b-4 ${isGeneralOpen ? 'border-blue-500 font-semibold' : 'border-transparent hover:text-gray-700'}`}
                >
                  General
                </span>
                <span
                  onClick={togglePackage}
                  className={`cursor-pointer text-sm sm:text-base border-b-4 ${isPackageOpen ? 'border-blue-500 font-semibold' : 'border-transparent hover:text-gray-700'}`}
                >
                  Package
                </span>
                <span
                  onClick={toggleStock}
                  className={`cursor-pointer text-sm sm:text-base border-b-4 ${isStockOpen ? 'border-blue-500 font-semibold' : 'border-transparent hover:text-gray-700'}`}
                >
                  Stock Level
                </span>
                <span
                  onClick={togglePurchase}
                  className={`cursor-pointer text-sm sm:text-base border-b-4 ${isPurchaseOpen ? 'border-blue-500 font-semibold' : 'border-transparent hover:text-gray-700'}`}
                >
                  Purchase
                </span>
                <span
                  onClick={toggleNotes}
                  className={`cursor-pointer text-sm sm:text-base border-b-4 ${isNotesOpen ? 'border-blue-500 font-semibold' : 'border-transparent hover:text-gray-700'}`}
                >
                  Notes
                </span>
              </div>



              {/* <div className="flex flex-wrap gap-4 sm:gap-6 mb-4">
  <span
    onClick={toggleText}
    className={`cursor-pointer text-sm sm:text-base border-b-2 ${isGeneralOpen ? 'border-blue-500  font-semibold' : 'border-transparent hover:text-gray-700'}`}
  >
    General
  </span>
  <span
    onClick={togglePackage}
    className={`cursor-pointer text-sm sm:text-base border-b-2 ${isPackageOpen ? 'border-blue-500  font-semibold' : 'border-transparent hover:text-gray-700'}`}
  >
    Package
  </span>
  <span
    onClick={toggleStock}
    className={`cursor-pointer text-sm sm:text-base border-b-2 ${isStockOpen ? 'border-blue-500  font-semibold' : 'border-transparent hover:text-gray-700'}`}
  >
    Stock Level
  </span>
  <span
    onClick={togglePurchase}
    className={`cursor-pointer text-sm sm:text-base border-b-2 ${isPurchaseOpen ? 'border-blue-500  font-semibold' : 'border-transparent hover:text-gray-700'}`}
  >
    Purchase
  </span>
  <span
    onClick={toggleNotes}
    className={`cursor-pointer text-sm sm:text-base border-b-2 ${isNotesOpen ? 'border-blue-500  font-semibold' : 'border-transparent hover:text-gray-700'}`}
  >
    Notes
  </span>
</div> */}

              {/* General Section */}
              <div ref={generalRef}>
                {isGeneralOpen && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <label className="flex flex-col">
                      <span className="mb-1 text-black text-sm sm:text-base">
                        UPC
                      </span>
                      <input
                        type="text"
                        className="border border-[#888888] rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                        placeholder="UPC"
                        name="upc"
                        value={formData.upc}
                        onChange={handleInputChange}
                      />
                    </label>
                    <label className="flex flex-col">
                      <span className="mb-1 text-black text-sm sm:text-base">
                        UPC Amazon/Catch
                      </span>
                      <input
                        type="text"
                        className="border border-[#888888] rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                        placeholder="UPC Amazon/Catch"
                        name="upcAmazonCatch"
                        value={formData.upcAmazonCatch}
                        onChange={handleInputChange}
                      />
                    </label>
                    <label className="flex flex-col">
                      <span className="mb-1 text-black text-sm sm:text-base">
                        Certification No
                      </span>
                      <input
                        type="text"
                        className="border border-[#888888] rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                        placeholder="Certification No"
                        name="certificationNo"
                        value={formData.certificationNo}
                        onChange={handleInputChange}
                      />
                    </label>
                    <label className="flex flex-col">
                      <span className="mb-1 text-black text-sm sm:text-base">
                        Previous SKU
                      </span>
                      <input
                        type="text"
                        className="border border-[#888888] rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                        placeholder="Previous SKU"
                        name="previousSku"
                        value={formData.previousSku}
                        onChange={handleInputChange}
                      />
                    </label>
                  </div>
                )}
              </div>

              {/* Package Section */}
              <div ref={packageRef}>
                {isPackageOpen && (
                  <div>
                    <h1>Product Dimensions</h1>
                    <div className="flex gap-10 mt-4">
                      <div className="flex flex-col">
                        <span className="mb-1 text-black text-sm sm:text-base">
                          Length(cm)
                        </span>
                        <input
                          type="number"
                          className="border border-[#888888] rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-[100px]"
                          placeholder="0.0"
                          name="productDimensions.length"
                          value={formData.productDimensions.length}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="mb-1 text-black text-sm sm:text-base">
                          Height(cm)
                        </span>
                        <input
                          type="number"
                          className="border border-[#888888] rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-[100px]"
                          placeholder="0.0"
                          name="productDimensions.height"
                          value={formData.productDimensions.height}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="mb-1 text-black text-sm sm:text-base">
                          Width(cm)
                        </span>
                        <input
                          type="number"
                          className="border border-[#888888] rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-[100px]"
                          placeholder="0.0"
                          name="productDimensions.width"
                          value={formData.productDimensions.width}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="mb-1 text-black text-sm sm:text-base">
                          Weight(kg)
                        </span>
                        <input
                          type="number"
                          className="border border-[#888888] rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-[100px]"
                          placeholder="0.0"
                          name="productDimensions.weight"
                          value={formData.productDimensions.weight}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="mb-1 text-black text-sm sm:text-base">
                          CBM (cm²)
                        </span>
                        <input
                          type="number"
                          className="border border-[#888888] rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-[100px]"
                          placeholder="0.0"
                          name="productDimensions.volume"
                          value={formData.productDimensions.volume}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 items-start sm:items-center mt-4">
                      <h1 className="text-sm text-black w-full sm:w-32">
                        Number of Cartons
                      </h1 >
                      <input
                        type="number"
                        className="border border-[#888888] rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-32"
                        name="numberOfCartons"
                        value={formData.numberOfCartons || ""}
                        onChange={handleInputChange}
                      />
                    </div>

                    <h1 className="mt-2">Package1</h1>
                    <div className="flex gap-10 mt-4">
                      <div className="flex flex-col">
                        <span className="mb-1 text-black text-sm sm:text-base">
                          Length(cm)
                        </span>
                        <input
                          type="number"
                          className="border border-[#888888]  bg-green-500 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-[100px]"
                          placeholder="0.0"
                          name="package1.length"
                          value={formData.package1.length}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="mb-1 text-black text-sm sm:text-base">
                          Height(cm)
                        </span>
                        <input
                          type="number"
                          className="border border-[#888888]  bg-green-500 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-[100px]"
                          placeholder="0.0"
                          name="package1.height"
                          value={formData.package1.height}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="mb-1 text-black text-sm sm:text-base">
                          Width(cm)
                        </span>
                        <input
                          type="number"
                          className="border border-[#888888]  bg-green-500 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-[100px]"
                          placeholder="0.0"
                          name="package1.width"
                          value={formData.package1.width}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="mb-1 text-black text-sm sm:text-base">
                          Weight(kg)
                        </span>
                        <input
                          type="number"
                          className="border border-[#888888]  bg-green-500 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-[100px]"
                          placeholder="0.0"
                          name="package1.weight"
                          value={formData.package1.weight}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="mb-1 text-black text-sm sm:text-base">
                          CBM (cm²)
                        </span>
                        <input
                          type="number"
                          className="border border-[#888888]  rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-[100px]"
                          placeholder="0.0"
                          name="package1.volume"
                          value={formData.package1.volume}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <h1 className="mt-2">Package2</h1>
                    <div className="flex gap-10 mt-4">
                      <div className="flex flex-col">
                        <span className="mb-1 text-black text-sm sm:text-base">
                          Length(cm)
                        </span>
                        <input
                          type="number"
                          className="border border-[#888888]  rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-[100px]"
                          placeholder="0.0"
                          name="package2.length"
                          value={formData.package2.length}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="mb-1 text-black text-sm sm:text-base">
                          Height(cm)
                        </span>
                        <input
                          type="number"
                          className="border border-[#888888]  rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-[100px]"
                          placeholder="0.0"
                          name="package2.height"
                          value={formData.package2.height}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="mb-1 text-black text-sm sm:text-base">
                          Width(cm)
                        </span>
                        <input
                          type="number"
                          className="border border-[#888888]  rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-[100px]"
                          placeholder="0.0"
                          name="package2.width"
                          value={formData.package2.width}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="mb-1 text-black text-sm sm:text-base">
                          Weight(kg)
                        </span>
                        <input
                          type="number"
                          className="border border-[#888888]  rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-[100px]"
                          placeholder="0.0"
                          name="package2.weight"
                          value={formData.package2.weight}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="mb-1 text-black text-sm sm:text-base">
                          CBM (cm²)
                        </span>
                        <input
                          type="number"
                          className="border border-[#888888]  rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-[100px]"
                          placeholder="0.0"
                          name="package2.volume"
                          value={formData.package2.volume}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <h1 className="mt-2">Package3</h1>
                    <div className="flex gap-10 mt-4">
                      <div className="flex flex-col">
                        <span className="mb-1 text-black text-sm sm:text-base">
                          Length(cm)
                        </span>
                        <input
                          type="number"
                          className="border border-[#888888]  rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-[100px]"
                          placeholder="0.0"
                          name="package3.length"
                          value={formData.package3.length}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="mb-1 text-black text-sm sm:text-base">
                          Height(cm)
                        </span>
                        <input
                          type="number"
                          className="border border-[#888888]  rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-[100px]"
                          placeholder="0.0"
                          name="package3.height"
                          value={formData.package3.height}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="mb-1 text-black text-sm sm:text-base">
                          Width(cm)
                        </span>
                        <input
                          type="number"
                          className="border border-[#888888]  rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-[100px]"
                          placeholder="0.0"
                          name="package3.width"
                          value={formData.package3.width}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="mb-1 text-black text-sm sm:text-base">
                          Weight(kg)
                        </span>
                        <input
                          type="number"
                          className="border border-[#888888]  rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-[100px]"
                          placeholder="0.0"
                          name="package3.weight"
                          value={formData.package3.weight}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="mb-1 text-black text-sm sm:text-base">
                          CBM (cm²)
                        </span>
                        <input
                          type="number"
                          className="border border-[#888888]  rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-[100px]"
                          placeholder="0.0"
                          name="package3.volume"
                          value={formData.package3.volume}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Stock Level Section */}
              <div ref={stockRef}>
                {isStockOpen && (
                  <div className="space-y-4 mt-4">
                    {["Stock Level", "Sold", "Factory Second", "Damaged"].map(
                      (label) => (
                        <div
                          key={label}
                          className="flex flex-col sm:flex-row gap-2 sm:gap-6 items-start sm:items-center"
                        >
                          <label className="text-sm text-black w-full sm:w-32">
                            {label}
                          </label>
                          <input
                            type="number"
                            className="border border-[#888888]  rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-32"
                            name={`stockLevel.${label.toLowerCase().replace(/\s+/g, '')}`}
                            value={formData.stockLevel[label.toLowerCase().replace(/\s+/g, '')] || ""}
                            onChange={handleInputChange}
                          />
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>

              {/* Purchase Section */}
              <div ref={purchaseRef}>
                {isPurchaseOpen && (
                  <div className="space-y-4 mt-4">

                    {[
                      "Purchase Price",
                      "Cost in Aus",
                      "Profit",
                      "Profit Ratio",
                      "Return Ratio"
                    ].map((label) => (
                      <div
                        key={label}
                        className="flex flex-col sm:flex-row gap-2 sm:gap-6 items-start sm:items-center"
                      >
                        <label className="text-sm text-black w-full sm:w-32">
                          {label}
                        </label>
                        <input
                          type="number"
                          className="border border-[#888888]  rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-32"
                          name={`purchase.${label.toLowerCase().replace(/[\s()]+/g, '')}`}
                          value={formData.purchase[label.toLowerCase().replace(/[\s()]+/g, '')] || ""}
                          onChange={handleInputChange}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Notes Section */}
              <div ref={noteRef}>
                {isNotesOpen && (
                  <div className="mt-4">
                    <textarea
                      className="w-full h-40 sm:h-56 p-4 outline-none border border-[#888888]  rounded-md focus:ring-2 focus:ring-blue-500"
                      placeholder="Note"
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      readOnly={isReadOnly}
                    ></textarea>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Product Organization Section */}
          <div className="border rounded-md bg-white p-4 w-full lg:w-1/4 lg:h-96 md:h-96">
            <h1 className="text-sm sm:text-base font-semibold">
              Product Organization
            </h1>
            {["Category Product", "Product Type", "Collection", "Tags"].map(
              (label) => (
                <label key={label} className="flex flex-col mt-4">
                  <span className="mb-2 text-black text-sm sm:text-base">
                    {label}
                  </span>
                  <input
                    type="text"
                    className="border border-[#888888]  rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                    placeholder={label}

                    name={`organization.${label.toLowerCase().replace(/\s+/g, '')}`}
                    value={formData.organization[label.toLowerCase().replace(/\s+/g, '')] || ""}
                    onChange={handleInputChange}
                  />
                </label>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BundlingkitContent />
    </Suspense>
  );
};

export default Page;
