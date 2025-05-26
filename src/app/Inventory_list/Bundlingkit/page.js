"use client";
import React, { useState, useRef, useEffect, Suspense } from "react";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import { useSearchParams } from 'next/navigation';
import { submitProductAction } from "@/actions/inventory";

const initialFormState = {
  canBeSold: false,
  canBePurchased: false,
  trackInventory: false,
  productTitle: "",
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
  }
};

const BundlingkitContent = () => {
  const searchParams = useSearchParams();
  const action = searchParams.get('action') || 'add';
  const mounted = useRef(false);

  // Form state
  const [formData, setFormData] = useState(initialFormState);

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

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFileName(file ? file.name : "Choose a file");
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

  // Prevent double rendering
  if (!mounted.current) {
    return null;
  }

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
    console.log('Form Data:', JSON.stringify(formData, null, 2));

    const result = await submitProductAction(formData);

    if (result.success) {
      console.log(result.message);
      setFormData(initialFormState);
    } else {
      console.log(result.error);
    }
  };

  return (
    <div className="p-2 sm:p-4 mx-auto w-full min-w-[320px] max-w-screen-xl">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between mb-4 gap-3">
        <div className="flex items-center gap-2">
          <div className="border rounded-md p-1">
            <Link href="/Inventory_list/Inventorylist">
              <FaArrowLeft size={16} className="text-sm" />
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
              className="bg-[#52ce66] text-white py-1 sm:py-2 px-3 sm:px-4 rounded-md text-sm hover:bg-[#48b55a] transition"
            >
              Save
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
        {/* Left Section */}
        <div className="border rounded-md w-full lg:w-3/4 bg-white p-4 sm:p-6">
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
            <label className="flex items-center gap-2">
              <input 
                type="checkbox" 
                className="h-4 w-4" 
                disabled={isReadOnly}
                name="canBePurchased"
                checked={formData.canBePurchased}
                onChange={handleInputChange}
              />
              <span className="text-sm sm:text-base">Can be Purchased</span>
            </label>
          </div>

          <label className="flex flex-col mt-4">
            <span className="mb-2 text-gray-900 text-sm sm:text-base">
              Product Title
            </span>
            <input
              type="text"
              className="border border-gray-400 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              name="productTitle"
              value={formData.productTitle}
              onChange={handleInputChange}
              readOnly={isReadOnly}
            />
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <label className="flex flex-col">
              <span className="mb-2 text-gray-900 text-sm sm:text-base">
                SKU
              </span>
              <input
                type="text"
                className="border border-gray-400 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                placeholder="SKU"
                name="sku"
                value={formData.sku}
                onChange={handleInputChange}
                readOnly={isReadOnly}
              />
            </label>
            <label className="flex flex-col">
              <span className="mb-2 text-gray-900 text-sm sm:text-base">
                GTIN
              </span>
              <input
                type="text"
                className="border border-gray-400 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                placeholder="GTIN"
                name="gtin"
                value={formData.gtin}
                onChange={handleInputChange}
                readOnly={isReadOnly}
              />
            </label>
          </div>

          <label className="flex flex-col mt-4">
            <span className="mb-2 text-gray-900 text-sm sm:text-base">
              Brand
            </span>
            <input
              type="text"
              className="border border-gray-400 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-1/2"
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
                className="h-4 w-4" 
                disabled={isReadOnly}
                name="trackInventory"
                checked={formData.trackInventory}
                onChange={handleInputChange}
              />
              <span className="text-sm sm:text-base">Track Inventory</span>
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
              <select className="text-sm border w-full p-2 rounded-md" disabled={isReadOnly} name="status" value={formData.status} onChange={handleInputChange}>
                <option value="">Status</option>
                <option value="Active">Active</option>
                <option value="Unactive">Inactive</option>
              </select>
            </label>
          </div>

          {/* Pricing Section */}
          <div className="border rounded-md bg-white p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="flex flex-col">
                <span className="mb-2 text-gray-900 text-sm sm:text-base">
                  RRP (AUD)
                </span>
                <input
                  type="text"
                  className="border border-gray-400 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  placeholder="$ 0.00"
                  name="rrp"
                  value={formData.rrp}
                  onChange={handleInputChange}
                  readOnly={isReadOnly}
                />
              </label>
              <label className="flex flex-col">
                <span className="mb-2 text-gray-900 text-sm sm:text-base">
                  Selling Price
                </span>
                <input
                  type="text"
                  className="border border-gray-400 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  placeholder="$ 0.00"
                  name="sellingPrice"
                  value={formData.sellingPrice}
                  onChange={handleInputChange}
                  readOnly={isReadOnly}
                />
              </label>
              <label className="flex flex-col">
                <span className="mb-2 text-gray-900 text-sm sm:text-base">
                  Shipping
                </span>
                <input
                  type="text"
                  className="border border-gray-400 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  placeholder="$ 0.00"
                  name="shipping"
                  value={formData.shipping}
                  onChange={handleInputChange}
                  readOnly={isReadOnly}
                />
              </label>
              <label className="flex flex-col">
                <span className="mb-2 text-gray-900 text-sm sm:text-base">
                  ShippingPrice
                </span>
                <input
                  type="text"
                  className="border border-gray-400 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
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
          <div className="border rounded-md bg-white p-4">
            <h1 className="text-sm sm:text-base font-semibold">Media</h1>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center min-h-[100px] border-2 border-dashed border-gray-400 p-4">
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
              />
              <button
                onClick={handleClick}
                className="border w-full sm:w-auto border-gray-400 rounded px-3 py-1 bg-gray-100 hover:bg-gray-200"
              >
                {fileName}
              </button>
              <span className="text-blue-300 text-sm sm:text-base cursor-pointer hover:underline">
                Add File URL
              </span>
            </div>
          </div>

          {/* Toggleable Sections */}
          <div className="border rounded-md bg-white p-4">
            <div className="flex flex-wrap gap-4 sm:gap-6 mb-4">
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
            </div>

            {/* General Section */}
            <div ref={generalRef}>
              {isGeneralOpen && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="flex flex-col">
                    <span className="mb-1 text-gray-900 text-sm sm:text-base">
                      UPC
                    </span>
                    <input
                      type="text"
                      className="border border-gray-400 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                      placeholder="UPC"
                      name="upc"
                      value={formData.upc}
                      onChange={handleInputChange}
                    />
                  </label>
                  <label className="flex flex-col">
                    <span className="mb-1 text-gray-900 text-sm sm:text-base">
                      UPC Amazon/Catch
                    </span>
                    <input
                      type="text"
                      className="border border-gray-400 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                      placeholder="UPC Amazon/Catch"
                      name="upcAmazonCatch"
                      value={formData.upcAmazonCatch}
                      onChange={handleInputChange}
                    />
                  </label>
                  <label className="flex flex-col">
                    <span className="mb-1 text-gray-900 text-sm sm:text-base">
                      Certification No
                    </span>
                    <input
                      type="text"
                      className="border border-gray-400 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                      placeholder="Certification No"
                      name="certificationNo"
                      value={formData.certificationNo}
                      onChange={handleInputChange}
                    />
                  </label>
                  <label className="flex flex-col">
                    <span className="mb-1 text-gray-900 text-sm sm:text-base">
                      Previous SKU
                    </span>
                    <input
                      type="text"
                      className="border border-gray-400 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
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
                      <span className="mb-1 text-gray-900 text-sm sm:text-base">
                        Length(cm)
                      </span>
                      <input
                        type="text"
                        className="border border-gray-400 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-[100px]"
                        placeholder="0.0"
                        name="productDimensions.length"
                        value={formData.productDimensions.length}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="mb-1 text-gray-900 text-sm sm:text-base">
                        Height(cm)
                      </span>
                      <input
                        type="text"
                        className="border border-gray-400 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-[100px]"
                        placeholder="0.0"
                        name="productDimensions.height"
                        value={formData.productDimensions.height}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="mb-1 text-gray-900 text-sm sm:text-base">
                        Width(cm)
                      </span>
                      <input
                        type="text"
                        className="border border-gray-400 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-[100px]"
                        placeholder="0.0"
                        name="productDimensions.width"
                        value={formData.productDimensions.width}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="mb-1 text-gray-900 text-sm sm:text-base">
                        Weight(kg)
                      </span>
                      <input
                        type="text"
                        className="border border-gray-400 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-[100px]"
                        placeholder="0.0"
                        name="productDimensions.weight"
                        value={formData.productDimensions.weight}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="mb-1 text-gray-900 text-sm sm:text-base">
                        Volume(cm3)
                      </span>
                      <input
                        type="text"
                        className="border border-gray-400 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-[100px]"
                        placeholder="0.0"
                        name="productDimensions.volume"
                        value={formData.productDimensions.volume}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <h1 className="mt-2">Package1</h1>
                  <div className="flex gap-10 mt-4">
                    <div className="flex flex-col">
                      <span className="mb-1 text-gray-900 text-sm sm:text-base">
                        Length(cm)
                      </span>
                      <input
                        type="text"
                        className="border border-gray-400 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-[100px]"
                        placeholder="0.0"
                        name="package1.length"
                        value={formData.package1.length}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="mb-1 text-gray-900 text-sm sm:text-base">
                        Height(cm)
                      </span>
                      <input
                        type="text"
                        className="border border-gray-400 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-[100px]"
                        placeholder="0.0"
                        name="package1.height"
                        value={formData.package1.height}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="mb-1 text-gray-900 text-sm sm:text-base">
                        Width(cm)
                      </span>
                      <input
                        type="text"
                        className="border border-gray-400 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-[100px]"
                        placeholder="0.0"
                        name="package1.width"
                        value={formData.package1.width}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="mb-1 text-gray-900 text-sm sm:text-base">
                        Weight(kg)
                      </span>
                      <input
                        type="text"
                        className="border border-gray-400 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-[100px]"
                        placeholder="0.0"
                        name="package1.weight"
                        value={formData.package1.weight}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="mb-1 text-gray-900 text-sm sm:text-base">
                        Volume(cm3)
                      </span>
                      <input
                        type="text"
                        className="border border-gray-400 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-[100px]"
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
                      <span className="mb-1 text-gray-900 text-sm sm:text-base">
                        Length(cm)
                      </span>
                      <input
                        type="text"
                        className="border border-gray-400 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-[100px]"
                        placeholder="0.0"
                        name="package2.length"
                        value={formData.package2.length}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="mb-1 text-gray-900 text-sm sm:text-base">
                        Height(cm)
                      </span>
                      <input
                        type="text"
                        className="border border-gray-400 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-[100px]"
                        placeholder="0.0"
                        name="package2.height"
                        value={formData.package2.height}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="mb-1 text-gray-900 text-sm sm:text-base">
                        Width(cm)
                      </span>
                      <input
                        type="text"
                        className="border border-gray-400 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-[100px]"
                        placeholder="0.0"
                        name="package2.width"
                        value={formData.package2.width}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="mb-1 text-gray-900 text-sm sm:text-base">
                        Weight(kg)
                      </span>
                      <input
                        type="text"
                        className="border border-gray-400 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-[100px]"
                        placeholder="0.0"
                        name="package2.weight"
                        value={formData.package2.weight}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="mb-1 text-gray-900 text-sm sm:text-base">
                        Volume(cm3)
                      </span>
                      <input
                        type="text"
                        className="border border-gray-400 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-[100px]"
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
                      <span className="mb-1 text-gray-900 text-sm sm:text-base">
                        Length(cm)
                      </span>
                      <input
                        type="text"
                        className="border border-gray-400 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-[100px]"
                        placeholder="0.0"
                        name="package3.length"
                        value={formData.package3.length}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="mb-1 text-gray-900 text-sm sm:text-base">
                        Height(cm)
                      </span>
                      <input
                        type="text"
                        className="border border-gray-400 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-[100px]"
                        placeholder="0.0"
                        name="package3.height"
                        value={formData.package3.height}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="mb-1 text-gray-900 text-sm sm:text-base">
                        Width(cm)
                      </span>
                      <input
                        type="text"
                        className="border border-gray-400 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-[100px]"
                        placeholder="0.0"
                        name="package3.width"
                        value={formData.package3.width}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="mb-1 text-gray-900 text-sm sm:text-base">
                        Weight(kg)
                      </span>
                      <input
                        type="text"
                        className="border border-gray-400 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-[100px]"
                        placeholder="0.0"
                        name="package3.weight"
                        value={formData.package3.weight}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="mb-1 text-gray-900 text-sm sm:text-base">
                        Volume(cm3)
                      </span>
                      <input
                        type="text"
                        className="border border-gray-400 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-[100px]"
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
                        <label className="text-sm text-gray-900 w-full sm:w-32">
                          {label}
                        </label>
                        <input
                          type="text"
                          className="border border-gray-400 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-32"
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
                      <label className="text-sm text-gray-900 w-full sm:w-32">
                        {label}
                      </label>
                      <input
                        type="text"
                        className="border border-gray-400 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-32"
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
                    className="w-full h-40 sm:h-56 p-4 outline-none border border-gray-400 rounded-md focus:ring-2 focus:ring-blue-500"
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
                <span className="mb-2 text-gray-900 text-sm sm:text-base">
                  {label}
                </span>
                <input
                  type="text"
                  className="border border-gray-400 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
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
