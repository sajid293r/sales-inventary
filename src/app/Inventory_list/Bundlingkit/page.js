"use client";
import React, { useState, useRef, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";

const Page = () => {
  // Individual states for each section, General open by default
  const [isGeneralOpen, setIsGeneralOpen] = useState(true);
  const [isPackageOpen, setIsPackageOpen] = useState(false);
  const [isStockOpen, setIsStockOpen] = useState(false);
  const [isPurchaseOpen, setIsPurchaseOpen] = useState(false);
  const [isNotesOpen, setIsNotesOpen] = useState(false);

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
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="p-2 sm:p-4 mx-auto w-full min-w-[640px] xl:min-w-[1300px] 2xl:min-w-[1700px] 3xl:min-w-[1800px] 4xl:min-w-[1900px]">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between mb-4 gap-3">
        <div className="flex items-center gap-2">
          <div className="border rounded-md p-1">
            <Link href="/Inventory_list/Inventorylist">
              <FaArrowLeft size={16} className="text-sm" />
            </Link>
          </div>
          <h1 className="text-base sm:text-lg md:text-xl text-black font-semibold">
            Inventory List
          </h1>
        </div>
        <div className="flex gap-2 sm:gap-4 justify-end items-center">
          <button className="text-sm sm:text-md hover:bg-gray-100 transition px-2 py-1 rounded-md">
            Bundling/Kitting
          </button>
          <button className="bg-[#52ce66] text-white py-1 sm:py-2 px-3 sm:px-4 rounded-md text-sm hover:bg-[#48b55a] transition">
            Save
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
        {/* Left Section */}
        <div className="border rounded-md w-full lg:w-3/4 bg-white p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mb-4">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4" />
              <span className="text-sm sm:text-base">Can be Sold</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4" />
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
            />
          </label>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-4">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4" />
              <span className="text-sm sm:text-base">Can be Sold</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4" />
              <span className="text-sm sm:text-base">Can be Purchased</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4" />
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
              <select className="text-sm border w-full p-2 rounded-md">
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
                        />
                      </div>
                    )
                  )}
                  <div className="flex gap-2 justify-end pt-4">
                    <button className="bg-green-600 text-white px-3 sm:px-4 py-1 rounded-md hover:bg-green-700 text-sm">
                      Add
                    </button>
                    <button className="bg-red-600 text-white px-3 sm:px-4 py-1 rounded-md hover:bg-red-700 text-sm">
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Purchase Section */}
            <div ref={purchaseRef}>
              {isPurchaseOpen && (
                <div className="space-y-4 mt-4">
                  {[
                    "Purchase Price (RMB)",
                    "Cost in Aus (AUD)",
                    "Profit (AUD)",
                    "Profit Ratio",
                    "Return Ratio",
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
                />
              </label>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
