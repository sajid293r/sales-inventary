"use client";
import React, { useState } from "react";
import { X } from "lucide-react";
import { FaCheckCircle, FaTimesCircle , FaChevronRight} from "react-icons/fa";

const DROPSHIP_OPTIONS = [
  { value: "", label: "--- Please Select ----" },
  { value: "AlphaCateringEqipment", label: "AlphaCateringEqipment" },
  { value: "Amazon", label: "Amazon" },
  { value: "AUDropship", label: "AUDropship" },
  { value: "AUDropship20223", label: "AUDropship20223" },
  { value: "BarbequestGalore", label: "BarbequestGalore" }
];

const RowDetailsPopup = ({ rowData, onClose }) => {
  const [activeField, setActiveField] = useState("General");
  const [number, setNumber] = useState(0);

  // Add console logging to debug the data
  console.log("Row Data in Popup:", rowData);
  console.log("NZ Dropship Value:", rowData?.nzDropshippingDropdown);

  const [formData, setFormData] = useState({
    // General Information
    salesChannelName: rowData?.salesChannelName || "",
    salesChannelType: rowData?.salesChannelType || "",
    salesChannelCode: rowData?.salesChannelCode || "",
    orderNumberPrefix: rowData?.orderNumberPrefix || "",
    descriptionChannel: rowData?.descriptionChannel || false,
    sellingChannel: rowData?.sellingChannel || false,
    commissionPercentage: rowData?.commissionPercentage || "10.00",
    
    // Company Information
    company: rowData?.company || "",
    website: rowData?.website || "",
    address1: rowData?.address1 || "",
    address2: rowData?.address2 || "",
    firstName: rowData?.firstName || "",
    lastName: rowData?.lastName || "",
    suburbState: rowData?.suburbState || "",
    postcode: rowData?.postcode || "",
    email: rowData?.email || "",
    phone: rowData?.phone || "",
    abn: rowData?.abn || "",
    
    // Email and Tracking
    emailPlatforminvoice: rowData?.emailPlatforminvoice || false,
    Emailplatformatrackingfile: rowData?.Emailplatformatrackingfile || false,
    accountmanagar: rowData?.accountmanagar || "",
    invoice: rowData?.invoice || "",
    tracking: rowData?.tracking || "",
    cancleorder: rowData?.cancleorder || "",
    
    // Campaign Information
    startOnCampaign: rowData?.startOnCampaign || false,
    dateFrom: rowData?.dateFrom || "",
    dateTo: rowData?.dateTo || "",
    discountPercentage: rowData?.discountPercentage || "",
    campaignNote: rowData?.campaignNote || "",
    
    // Templates
    orderTemplate1: rowData?.orderTemplate1 || "",
    orderTemplate2: rowData?.orderTemplate2 || "",
    orderTemplate3: rowData?.orderTemplate3 || "",
    trackingFileTemplate: rowData?.trackingFileTemplate || "",
    invoiceTemplate: rowData?.invoiceTemplate || "",
    invoiceOrPO: rowData?.invoiceOrPO || "",
    invoiceFolder: rowData?.invoiceFolder || "",
    
    // Invoice Settings
    "1POINV": rowData?.["1POINV"] || false,
    CustomerinvoicelncGST: rowData?.CustomerinvoicelncGST || false,
    missinginvoice: rowData?.missinginvoice || false,
    Emailinvoicerequired: rowData?.Emailinvoicerequired || false,
    paymentrequired: rowData?.paymentrequired || false,
    
    // Payment Information
    payementterm: rowData?.payementterm || "7 days",
    bankReferenceName: rowData?.bankReferenceName || "",
    QuickBooksOrderID: rowData?.QuickBooksOrderID || "1",
    paymentNote: rowData?.paymentNote || "",
    Currency: rowData?.Currency || "USD",
    
    // Pricing Rules
    pricingRules: rowData?.pricingRules || "",
    offSellingPrice: rowData?.offSellingPrice || "0.00",
    offSellingPricecheckbox: rowData?.offSellingPricecheckbox || false,
    plusShipping: rowData?.plusShipping || false,
    calculateNZPricecheckbox: rowData?.calculateNZPricecheckbox || false,
    calculateNZPrice: rowData?.calculateNZPrice || "0.00",
    calculateRetailPricecheckbox: rowData?.calculateRetailPricecheckbox || false,
    calculateRetailPrice: rowData?.calculateRetailPrice || "0.00",
    calculateGSTcheckbox: rowData?.calculateGSTcheckbox || false,
    calculateGST: rowData?.calculateGST || "0.00",
    roundingLowcheckbox: rowData?.roundingLowcheckbox || false,
    roundingLow: rowData?.roundingLow || "0.00",
    roundingHighcheckbox: rowData?.roundingHighcheckbox || false,
    roundingHigh: rowData?.roundingHigh || "0.00",
    
    // NZ Dropshipping
    nzDropshipping: rowData?.nzDropshipping || false,
    nzDropshippingAutoCalculate: rowData?.nzDropshippingAutoCalculate || false,
    nzDropshippingDropdown: rowData?.nzDropshippingDropdown || "",
    ImportFromRTS: rowData?.ImportFromRTS || "",
    dropshippingValue: rowData?.dropshippingValue || "",
    imageOutputPath: rowData?.imageOutputPath || "",
    removedtext: rowData?.removedtext || "",
  });

  const detailsMap = {
    General: `Last updated on ${new Date(rowData?.updatedAt || rowData?.createdAt).toLocaleString()}`,
    Customer: rowData?.salesChannelName || "N/A",
    Orders: rowData?.orderNumberPrefix || "N/A",
    Invoice: rowData?.invoiceOrPO || "N/A",
    Payment: rowData?.payementterm || "N/A",
    Email: rowData?.email || "N/A",
    Pricing: rowData?.commissionPercentage ? `${rowData.commissionPercentage}% commission` : "N/A",
    Campaign: rowData?.campaignNote || "N/A",
    Description: rowData?.descriptionChannel ? "Enabled" : "Disabled",
  };

  const increaseNumber = () => {
    setNumber((prev) => prev + 1);
  };

  const handleNumberChange = (e) => {
    const value = e.target.value;
    setNumber(value === "" ? 0 : Number(value));
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "number"
          ? value === ""
            ? 0
            : Number(value)
          : type === "checkbox"
          ? e.target.checked
          : value,
    }));
  };

  return (
    <div className="fixed inset-0 bg-black  bg-opacity-50 flex items-center justify-center z-50 overflow-auto p-4 sm:p-6">
      <div className="bg-gray-200 p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-[800px] max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between">
          <h2 className="text-lg font-semibold mb-4">Sales Channel Details</h2>
          <button
            onClick={onClose}
            className="hover:text-red-400 cursor-pointer"
          >
            <X size={20} className="border rounded-lg" />
          </button>
        </div>
        {/* Sales channel id */}
        <div className="flex flex-col sm:flex-row sm:gap-24 py-3">
          <p className="font-semibold">Sales Channel ID</p>
          <p>{rowData?._id || "N/A"}</p>
        </div>
        <div className="flex flex-col sm:flex-row sm:gap-12 pb-3">
          <p className="font-semibold">Sales Channel Name</p>
          <p className="bg-white w-[300px] px-2 shadow-sm">
            {rowData?.salesChannelName || "N/A"}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row sm:gap-12 pb-3">
          <p className="font-semibold">Type</p>
          <p className="bg-white w-[300px] px-2 shadow-sm">
            {rowData?.salesChannelType || "N/A"}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row sm:gap-12 pb-3">
          <p className="font-semibold">Location</p>
          <p className="bg-white w-[300px] px-2 shadow-sm">
            {rowData?.suburbState || "N/A"}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row sm:gap-12 pb-3">
          <p className="font-semibold">Status</p>
          <p className={`px-2 py-1 rounded-md text-xs ${
            rowData?.emailPlatforminvoice
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}>
            {rowData?.emailPlatforminvoice ? "Active" : "Inactive"}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <div className="flex flex-wrap items-center gap-4 sm:gap-8 md:gap-12 lg:gap-24 ml-2 sm:ml-3">
            <h1 className="text-sm sm:text-base">Customer ID</h1>
            <input
              type="number"
              value={number}
              onChange={handleNumberChange}
              className="border px-2 w-32 sm:w-36 md:w-44 rounded-sm border-gray-400 shadow-md"
            />
          </div>
          <button
            onClick={increaseNumber}
            className="border border-gray-400 rounded-sm p-2 -py-1 bg-white"
          >
            <FaChevronRight size={10} />
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {Object.keys(detailsMap).map((field) => (
            <button
              key={field}
              onClick={() => setActiveField(field)}
              className={`inline-block px-2 py-0.5 rounded text-xs ${
                rowData?.status === "Active"
                  ? "bg-[#449ae6] text-white"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {field}
            </button>
          ))}
        </div>

        <div className="text-sm">
          {activeField === "General" ? (
            <div>
              {/* General Settings Section */}
              <div className="relative border border-gray-400 rounded-md p-4 sm:p-6 mt-4">
                <span className="absolute -top-3 left-2 text-black bg-gray-200 px-1 text-sm font-bold">
                  General Settings
                </span>
                {/* <div className="flex flex-col sm:flex-row sm:gap-11 py-3">
                  <span className="text-black text-sm font-bold">
                    Sales Channel Code
                  </span>
                  <input
                    type="text"
                    name="salesChannelCode"
                    value={formData.salesChannelCode}
                    onChange={handleInputChange}
                    className="bg-green-400 w-full sm:w-24 py-1 px-2 shadow-sm font-bold"
                    placeholder="Enter code"
                  /> 
                  <span 
                    className="bg-green-400 w-full sm:w-24 py-1 px-2 shadow-sm font-bold" >
                    {rowData?.salesChannelCode}
                  </span>
                </div> */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-8 py-3">
  <span className="text-black text-sm font-bold w-full sm:w-40">
    Sales Channel Code
  </span>
  <span className="bg-green-100 text-black font-bold px-3 py-1 rounded-md shadow-sm w-full sm:w-auto text-center">
    {rowData?.salesChannelCode || "N/A"}
  </span>
</div>
<div className="flex flex-col sm:flex-row sm:items-center sm:gap-8 py-3">
  <span className="text-black text-sm font-bold w-full sm:w-40">
  Order Number Prefix
  </span>
  <span className="bg-green-100 text-black font-bold px-3 py-1 rounded-md shadow-sm w-full sm:w-auto text-center">
    {rowData?.orderNumberPrefix || "N/A"}
  </span>
</div>


                {/* <div className="flex flex-col sm:flex-row sm:gap-8">
                  <span className="text-black text-sm font-bold">
                    Order Number Prefix
                  </span>
           <input
                    type="text"
                    name="orderNumberPrefix"
                    value={formData.orderNumberPrefix}
                    onChange={handleInputChange}
                    className="bg-green-400 py-1 w-full sm:w-24 px-2 shadow-sm"
                    placeholder="Enter prefix"
                  /> 
                   <span 
                    className="bg-green-400 w-full sm:w-24 py-1 px-2 shadow-sm font-bold" >
                    {rowData?.orderNumberPrefix}
                  </span>
                </div> */}
              </div>
              {/* Appear in Section */}
              <div className="relative border border-gray-400 rounded-md p-4 sm:p-6 mt-4">
                <span className="absolute -top-3 left-2 text-black bg-gray-200 px-1 text-sm font-bold">
                  Appear in
                </span>
                <div>
                  {/* <div className="flex items-center gap-4 sm:gap-8 py-1">
                    <span className="text-black text-sm font-bold w-full sm:w-40">
                      Description
                    </span>
                    // {/* <input
                    //   type="checkbox"
                    //   name="descriptionChannel"
                    //   checked={formData.descriptionChannel}
                    //   onChange={handleInputChange}
                    //   className="w-4 h-4 bg-gray-100 border-gray-300 rounded"
                    //   aria-label="Description checkbox"
                    // /> 
                     <span 
                      className="w-4 h-4 bg-gray-100 border-gray-300 rounded"
                      >
                      {rowData?.descriptionChannel}
                  </span>
                  </div> */}

<div className="flex items-center gap-4 sm:gap-8 py-2">
  <span className="text-gray-800 text-sm font-semibold w-full sm:w-40">
    Description
  </span>
  <div className="flex items-center gap-2">
    {rowData?.descriptionChannel ? (
      <FaCheckCircle className="text-green-500 text-lg" title="Enabled" />
    ) : (
      <FaTimesCircle className="text-gray-400 text-lg" title="Disabled" />
    )}

  </div>
</div>


                  {/* <div className="flex items-center gap-4 sm:gap-8 py-1">
                    <span className="text-black text-sm font-bold w-full sm:w-40">
                      Selling Channel
                    </span>
                    <input
                      type="checkbox"
                      name="sellingChannel"
                      checked={formData.sellingChannel}
                      onChange={handleInputChange}
                      className="w-4 h-4 bg-gray-100 border-gray-300 rounded"
                      aria-label="Selling Channel checkbox"
                    />
                  </div> */}
                  <div className="flex items-center gap-4 sm:gap-8 py-2">
  <span className="text-gray-800 text-sm font-semibold w-full sm:w-40">
  Selling Channel
  </span>
  <div className="flex items-center gap-2">
    {rowData?.sellingChannel ? (
      <FaCheckCircle className="text-green-500 text-lg" title="Enabled" />
    ) : (
      <FaTimesCircle className="text-gray-400 text-lg" title="Disabled" />
    )}

  </div>
</div>
                </div>
              </div>
              {/* Commission Section */}
              <div className="relative border border-gray-400 rounded-md p-4 sm:p-6 mt-4">
                <span className="absolute -top-3 left-2 text-black bg-gray-200 px-1 text-sm font-bold">
                  Commission
                </span>
                <div className="flex flex-col sm:flex-row sm:gap-12 py-3">
                  <label
                    htmlFor="commission"
                    className="text-black text-sm font-bold"
                  >
                    Commission
                  </label>
                  <input
                    id="commission"
                    name="commissionPercentage"
                    type="text"
                    value={formData.commissionPercentage}
                    onChange={handleInputChange}
                    placeholder="10.00"
                    className="bg-white border py-0.5 border-gray-600 rounded px-2 shadow-sm text-black text-right w-full sm:w-auto"
                  />
                </div>
              </div>
              {/* DropShipping Section */}
              <div className="relative border border-gray-400 rounded-md p-4 sm:p-6 mt-4">
                <span className="absolute -top-3 left-2 text-black bg-gray-200 px-1 text-sm font-bold">
                  DropShipping
                </span>
                <div className="flex gap-2 py-3">
                  <input
                    type="checkbox"
                    name="nzDropshippingAutoCalculate"
                    checked={formData.nzDropshippingAutoCalculate}
                    onChange={handleInputChange}
                    className="h-4 w-4 bg-white border-gray-300 rounded mt-0.5"
                    aria-label="Auto calculate dropship pricing"
                  />
                  <span className="text-black text-sm font-bold">
                    Auto calculate dropship pricing
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 py-1">
                  <input
                    type="checkbox"
                    name="nzDropshipping"
                    checked={formData.nzDropshipping}
                    onChange={handleInputChange}
                    className="h-4 w-4 bg-white border-gray-300 rounded mt-0.5"
                    aria-label="NZ dropship pricing"
                  />
                  <label
                    htmlFor="dropship"
                    className="text-black text-sm font-bold"
                  >
                    NZ dropship pricing
                  </label>
                  <div className="flex flex-col sm:flex-row sm:gap-24">
                    <div></div>
                    <div className="flex items-center w-full sm:w-56 px-2 py-0.5 border rounded-sm bg-white">
                      <select
                        id="dropship"
                        name="nzDropshippingDropdown"
                        value={formData.nzDropshippingDropdown || ""}
                        onChange={handleInputChange}
                        className="w-full bg-transparent outline-none"
                        aria-label="Dropship pricing options"
                      >
                        {DROPSHIP_OPTIONS.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : activeField === "Customer" ? (
            <div className="space-y-4">
              {[
                {
                  id: "customer-type",
                  name: "company",
                  label: "Customer Type",
                  type: "select",
                  options: [
                    "dropship1",
                    "dropship2",
                    "dropship3",
                    "dropship4",
                  ].map((val) => ({ value: val, label: `UI ${val}` })),
                },
                {
                  id: "company-name",
                  name: "company",
                  label: "Company Name",
                  type: "text",
                  placeholder: "THECBFStore",
                },
                {
                  id: "website",
                  name: "website",
                  label: "Website",
                  type: "text",
                },
                {
                  id: "first-name",
                  name: "firstName",
                  label: "Name",
                  type: "text",
                  placeholder: "First Name",
                  isDouble: true,
                  secondField: {
                    id: "last-name",
                    name: "lastName",
                    placeholder: "Last Name",
                  },
                },
                {
                  id: "address1",
                  name: "address1",
                  label: "Address 1",
                  type: "text",
                },
                {
                  id: "address2",
                  name: "address2",
                  label: "Address 2",
                  type: "text",
                },
                {
                  id: "state",
                  name: "suburbState",
                  label: "Sub/State",
                  type: "text",
                  placeholder: "State",
                  isDouble: true,
                  secondField: {
                    id: "country",
                    name: "country",
                    placeholder: "Country",
                  },
                },
                {
                  id: "post-code",
                  name: "postcode",
                  label: "Post Code",
                  type: "text",
                  placeholder: "Post Code",
                  isDouble: true,
                  secondField: {
                    id: "post-code-alt",
                    name: "postcodeAlt",
                    placeholder: "Alternate Post Code",
                  },
                },
                {
                  id: "email",
                  name: "email",
                  label: "Email",
                  type: "email",
                  placeholder: "bV4W9@example.com",
                },
                { id: "phone", name: "phone", label: "Phone", type: "text" },
                { id: "abn", name: "abn", label: "ABN", type: "text" },
              ].map((field) => (
                <div
                  key={field.id}
                  className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6"
                >
                  <label
                    htmlFor={field.id}
                    className="w-full sm:w-32 text-sm font-bold text-black"
                  >
                    {field.label}
                  </label>
                  <div
                    className={`flex ${
                      field.isDouble
                        ? "gap-4 w-full sm:w-auto"
                        : "w-full sm:w-80"
                    }`}
                  >
                    {field.type === "select" ? (
                      <div className="flex items-center w-full px-2 py-1 border rounded-sm bg-slate-100">
                        <select
                          id={field.id}
                          name={field.name}
                          value={formData[field.name]}
                          onChange={handleInputChange}
                          className="w-full bg-transparent outline-none"
                          aria-label={field.label}
                        >
                          {field.options.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    ) : (
                      <input
                        id={field.id}
                        name={field.name}
                        type={field.type}
                        value={formData[field.name]}
                        onChange={handleInputChange}
                        placeholder={field.placeholder}
                        className={`w-full ${
                          field.isDouble ? "sm:w-40" : ""
                        } px-2 py-1 border border-gray-600 rounded bg-slate-100 shadow-sm`}
                      />
                    )}
                    {field.isDouble && (
                      <input
                        id={field.secondField.id}
                        name={field.secondField.name}
                        type="text"
                        value={formData[field.secondField.name]}
                        onChange={handleInputChange}
                        placeholder={field.secondField.placeholder}
                        className="w-full sm:w-36 px-2 py-1 border border-gray-600 rounded bg-slate-100 shadow-sm"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : activeField === "Orders" ? (
            <div>
              {/* Order Template Section */}
              <div className="relative border border-gray-400 rounded-md p-4 sm:p-6 mt-4">
                <span className="absolute -top-3 left-2 text-black bg-gray-200 px-1 text-sm font-bold">
                  Order Template
                </span>
                <div className="space-y-2">
                  {[1, 2, 3].map((num) => (
                    <div key={num} className="flex items-center gap-4">
                      <div className="w-6">{num}</div>
                      <div className="flex items-center w-full sm:w-56 px-2 py-0.5 border rounded-sm bg-white">
                        <select
                          id={`order-template-${num}`}
                          name={`orderTemplate${num}`}
                          value={formData[`orderTemplate${num}`]}
                          onChange={handleInputChange}
                          className="w-full bg-transparent outline-none"
                          aria-label={`Order template ${num}`}
                        >
                          <option value="">--- Please Select ----</option>
                          <option value="Order_555Shopper">Order_555Shopper</option>
                          <option value="Order_Adventure">Order_Adventure</option>
                          <option value="Order_ApplianceStar">Order_ApplianceStar</option>
                          <option value="Order_ArtiloKitchenware">Order_ArtiloKitchenware</option>
                          <option value="Order_AussieArtificialPlants">Order_AussieArtificialPlants</option>
                          <option value="Order_AussieBulk">Order_AussieBulk</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative border border-gray-400 rounded-md p-4 sm:p-6 mt-4">
                <span className="absolute -top-3 left-2 text-black bg-gray-200 px-1 text-sm font-bold">
                  Tracking Template
                </span>
                <div className="flex items-center gap-4 py-3">
                  <input
                    type="checkbox"
                    name="Emailplatformatrackingfile"
                    checked={formData.Emailplatformatrackingfile}
                    onChange={handleInputChange}
                    className="w-4 h-4 bg-gray-100 border-gray-300 rounded"
                    aria-label="Email platform tracking file"
                  />
                  <span className="text-black text-sm font-bold">
                    Email platform a tracking file
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 ml-0 sm:ml-6">
                  <label
                    htmlFor="tracking-template"
                    className="inline-block w-auto text-sm font-bold text-black"
                  >
                    Tracking file template
                  </label>
                  <div className="flex items-center w-full sm:w-56 px-2 py-0.5 border rounded-sm bg-white">
                    <select
                      id="tracking-template"
                      name="trackingFileTemplate"
                      value={formData.trackingFileTemplate}
                      onChange={handleInputChange}
                      className="w-full bg-transparent outline-none"
                      aria-label="Tracking file template"
                    >
                      <option value="">--- Please Select ----</option>
                      <option value="Order_555Shopper">Order_555Shopper</option>
                      <option value="Order_Adventure">Order_Adventure</option>
                      <option value="Order_ApplianceStar">Order_ApplianceStar</option>
                      <option value="Order_ArtiloKitchenware">Order_ArtiloKitchenware</option>
                      <option value="Order_AussieArtificialPlants">Order_AussieArtificialPlants</option>
                      <option value="Order_AussieBulk">Order_AussieBulk</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="relative border border-gray-400 rounded-md p-4 sm:p-6 mt-4">
                <span className="absolute -top-3 left-2 text-black bg-gray-200 px-1 text-sm font-bold">
                  Ready to Ship
                </span>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                  <label
                    htmlFor="rts-import"
                    className="w-full sm:w-32 text-sm font-bold text-black"
                  >
                    Import from RTS
                  </label>
                  <input
                    id="rts-import"
                    name="ImportFromRTS"
                    type="text"
                    value={formData.ImportFromRTS}
                    onChange={handleInputChange}
                    className="w-full sm:w-80 px-2 py-0.5 border border-gray-600 rounded bg-white shadow-sm"
                  />
                </div>
              </div>
            </div>
          ) : activeField === "Invoice" ? (
            <div>
              <div className="relative border border-gray-400 rounded-md p-4 sm:p-6 mt-4">
                <span className="absolute -top-3 left-2 text-black bg-gray-200 px-1 text-sm font-bold">
                  Invoice Template
                </span>
                <div className="flex gap-2 py-3">
                  <input
                    type="checkbox"
                    name="emailPlatforminvoice"
                    checked={formData.emailPlatforminvoice}
                    onChange={handleInputChange}
                    className="w-4 h-4"
                    aria-label="Email platform an invoice"
                  />
                  <span className="text-black text-sm font-bold">
                    Email platform an invoice
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:gap-8">
                  <label
                    htmlFor="invoice-template"
                    className="text-black text-sm font-bold"
                  >
                    Invoice Template
                  </label>
                  <div className="flex items-center w-full sm:w-56 px-2 py-0.5 border rounded-sm bg-white">
                    <select
                      id="invoice-template"
                      name="invoiceTemplate"
                      value={formData.invoiceTemplate}
                      onChange={handleInputChange}
                      className="w-full bg-transparent outline-none"
                      aria-label="Invoice template"
                    >
                      <option value="">--- Please Select ----</option>
                      <option value="SalesInvoiceV4_robot.html">SalesInvoiceV4_robot.html</option>
                      <option value="SalesInvoiceV4nz_robot.html">SalesInvoiceV4nz_robot.html</option>
                      <option value="SalesInvoiceV4.coles.html">SalesInvoiceV4.coles.html</option>
                      <option value="SalesInvoiceV3_robot.html">SalesInvoiceV3_robot.html</option>
                      <option value="SalesInvoiceV4coles_robot.html">SalesInvoiceV4coles_robot.html</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="relative border border-gray-400 rounded-md p-4 sm:p-6 mt-4">
                <span className="absolute -top-3 left-2 text-black bg-gray-200 px-1 text-sm font-bold">
                  Invoice General
                </span>
                <div className="flex flex-col sm:flex-row sm:gap-2 py-3">
                  <label
                    htmlFor="invoice-or-po"
                    className="text-black text-sm font-bold"
                  >
                    Invoice or PO
                  </label>
                  <input
                    id="invoice-or-po"
                    name="invoiceOrPO"
                    type="text"
                    value={formData.invoiceOrPO}
                    onChange={handleInputChange}
                    className="w-full sm:w-24 px-2 py-0.5 border border-gray-600 rounded bg-white shadow-sm"
                  />
                </div>
                <div className="flex flex-col sm:flex-row sm:gap-2 py-3">
                  <label
                    htmlFor="invoice-folder"
                    className="text-black text-sm font-bold"
                  >
                    Invoice Folder
                  </label>
                  <input
                    id="invoice-folder"
                    name="invoiceFolder"
                    type="text"
                    value={formData.invoiceFolder}
                    onChange={handleInputChange}
                    className="w-full sm:w-56 px-2 py-0.5 border border-gray-600 rounded bg-white shadow-sm"
                    readOnly
                  />
                </div>
                {[
                  { name: "1POINV", label: "Upon invoice" },
                  { name: "CustomerinvoicelncGST", label: "Customer invoice" },
                  { name: "missinginvoice", label: "Check missing invoice" },
                  { name: "paymentrequired", label: "Repayment" },
                  { name: "Emailinvoicerequired", label: "Email required" }
                ].map(({ name, label }) => (
                  <div key={name} className="flex gap-2 py-1">
                    <input
                      type="checkbox"
                      name={name}
                      checked={formData[name]}
                      onChange={handleInputChange}
                      className="w-4 h-4"
                      aria-label={label}
                    />
                    <span className="text-black text-sm font-bold">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : activeField === "Payment" ? (
            <div>
              {/* Payment Section */}
              <div className="relative border border-gray-400 rounded-md p-4 sm:p-6 mt-4">
                <span className="absolute -top-3 left-2 text-black bg-gray-200 px-1 text-sm font-bold">
                  Payment
                </span>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-10 py-3">
                  <label
                    htmlFor="payment-term"
                    className="text-black text-sm font-bold min-w-[180px]"
                  >
                    Payment Term
                  </label>
                  <div className="flex items-center w-full sm:w-56 px-2 py-0.5 border rounded-sm bg-white">
                    <select
                      id="payment-term"
                      name="payementterm"
                      value={formData.payementterm}
                      onChange={handleInputChange}
                      className="w-full bg-transparent outline-none"
                      aria-label="Payment term"
                    >
                      <option value="">--- Please Select ----</option>
                      <option value="Net 30">Net 30</option>
                      <option value="Prepaid">Prepaid</option>
                      <option value="7 days">7 days</option>
                      <option value="14 days">14 days</option>
                      <option value="15 days">15 days</option>
                      <option value="30 days">30 days</option>
                      <option value="60 days">60 days</option>
                    </select>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-10 py-3">
                  <label
                    htmlFor="bank-reference"
                    className="text-black text-sm font-bold min-w-[180px]"
                  >
                    Bank Reference Name
                  </label>
                  <input
                    id="bank-reference"
                    name="bankReferenceName"
                    type="text"
                    value={formData.bankReferenceName}
                    onChange={handleInputChange}
                    className="w-full sm:w-56 px-2 py-0.5 border rounded-sm"
                  />
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-10 py-3">
                  <label
                    htmlFor="prepaid-customer"
                    className="text-black text-sm font-bold min-w-[180px]"
                  >
                    Is this prepaid customer
                  </label>
                  <input
                    id="prepaid-customer"
                    name="paymentrequired"
                    type="text"
                    value={formData.paymentrequired}
                    onChange={handleInputChange}
                    className="w-full sm:w-56 px-2 py-0.5 border rounded-sm"
                  />
                </div>
              </div>
              {/* QuickBooks Section */}
              <div className="relative border border-gray-400 rounded-md p-4 sm:p-6 mt-4">
                <span className="absolute -top-3 left-2 text-black bg-gray-200 px-1 text-sm font-bold">
                  QuickBooks
                </span>
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-20">
                    <label
                      htmlFor="quickbooks-orderid"
                      className="text-black text-sm font-bold min-w-[180px]"
                    >
                      QuickBooks Order ID Fields
                    </label>
                    <div className="flex items-center w-full sm:w-56 px-2 ml-0 sm:ml-3 py-0.5 border rounded-sm bg-white">
                      <select
                        id="quickbooks-orderid"
                        name="QuickBooksOrderID"
                        value={formData.QuickBooksOrderID}
                        onChange={handleInputChange}
                        className="w-full bg-transparent outline-none"
                        aria-label="QuickBooks order ID"
                      >
                        <option value="">--- Please Select ----</option>
                        <option value="Order Doc Num1">Order Doc Num1</option>
                        <option value="Order Doc Num2">Order Doc Num2</option>
                        <option value="Invoice Doc Num">Invoice Doc Num</option>
                        <option value="Delivery Notes">Delivery Notes</option>
                        <option value="Delivery Notes2">Delivery Notes2</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-10 py-2">
                    <label
                      htmlFor="delivery-notes"
                      className="text-black text-sm font-bold min-w-[180px]"
                    >
                      Text to remove from delivery notes
                    </label>
                    <input
                      id="delivery-notes"
                      name="removedtext"
                      type="text"
                      value={formData.removedtext}
                      onChange={handleInputChange}
                      className="w-full sm:w-56 px-2 py-0.5 border rounded-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : activeField === "Email" ? (
            <div className="py-1">
              {[
                {
                  id: "accounting-manager",
                  name: "accountmanagar",
                  label: "Accounting Manager",
                  type: "text",
                },
                {
                  id: "invoice-po",
                  name: "invoice",
                  label: "Invoice/PO",
                  type: "text",
                },
                {
                  id: "tracking",
                  name: "tracking",
                  label: "Tracking",
                  type: "text",
                },
                {
                  id: "cancel-order",
                  name: "cancleorder",
                  label: "Cancel Order",
                  type: "text",
                },
              ].map((field) => (
                <div
                  key={field.id}
                  className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 py-2"
                >
                  <label
                    htmlFor={field.id}
                    className="text-sm font-semibold min-w-[150px]"
                  >
                    {field.label}
                  </label>
                  <input
                    id={field.id}
                    name={field.name}
                    type={field.type}
                    value={formData[field.name]}
                    onChange={handleInputChange}
                    className="w-full sm:w-80 px-2 py-0.5 border rounded-sm bg-white"
                  />
                </div>
              ))}
              <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6 py-2">
                <label
                  htmlFor="payment-order"
                  className="text-sm font-semibold min-w-[150px] pt-1"
                >
                  Payment Order
                </label>
                <textarea
                  id="payment-order"
                  name="paymentNote"
                  value={formData.paymentNote}
                  onChange={handleInputChange}
                  rows="5"
                  className="w-full sm:w-80 px-2 py-0.5 border rounded-sm bg-white"
                ></textarea>
              </div>
            </div>
          ) : activeField === "Pricing" ? (
            <div>
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 py-1">
                  <label
                    htmlFor="currency"
                    className="text-black text-sm font-bold min-w-[160px]"
                  >
                    Currency
                  </label>
                  <div className="flex items-center w-full sm:w-40 px-2 py-0.5 border rounded-sm bg-white">
                    <select
                      id="currency"
                      name="Currency"
                      value={formData.Currency}
                      onChange={handleInputChange}
                      className="w-full bg-transparent outline-none"
                      aria-label="Currency"
                    >
                      <option value="USD">USD</option>
                      <option value="SDFS">SDFS</option>
                      <option value="MAP">MAP</option>
                      <option value="MMP">MMP</option>
                    </select>
                  </div>
                </div>
                {[
                  {
                    id: "off-sale-price",
                    name: "offSellingPrice",
                    checkboxName: "offSellingPricecheckbox",
                    label: "Off sale price",
                  },
                  {
                    id: "plus-calculate",
                    name: "plusShipping",
                    checkboxName: "plusShipping",
                    label: "Plus calculate",
                  },
                  {
                    id: "nz-calculate",
                    name: "calculateNZPrice",
                    checkboxName: "calculateNZPricecheckbox",
                    label: "NZ Calculate price",
                  },
                  {
                    id: "gst-calculate",
                    name: "calculateGST",
                    checkboxName: "calculateGSTcheckbox",
                    label: "Calculate GST",
                  },
                  {
                    id: "rounding-low",
                    name: "roundingLow",
                    checkboxName: "roundingLowcheckbox",
                    label: "Rounding low",
                  },
                  {
                    id: "rounding-high",
                    name: "roundingHigh",
                    checkboxName: "roundingHighcheckbox",
                    label: "Rounding high",
                  },
                ].map((field) => (
                  <div
                    key={field.id}
                    className="flex flex-col sm:flex-row sm:items-center gap-4 py-1"
                  >
                    <div className="flex items-center gap-4">
                      <input
                        type="checkbox"
                        name={field.checkboxName}
                        checked={formData[field.checkboxName]}
                        onChange={handleInputChange}
                        className="w-4 h-4"
                        aria-label={field.label}
                      />
                      <label
                        htmlFor={field.id}
                        className="text-sm text-black min-w-[160px]"
                      >
                        {field.label}
                      </label>
                    </div>
                    <input
                      id={field.id}
                      name={field.name}
                      type="text"
                      value={formData[field.name]}
                      onChange={handleInputChange}
                      placeholder="0.00"
                      className={`w-full sm:w-20 px-2 py-0.5 border rounded-sm ${
                        formData[field.checkboxName] ? "bg-white" : "bg-gray-200"
                      }`}
                      disabled={!formData[field.checkboxName]}
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : activeField === "Description" ? (
            <div className="border rounded-sm border-gray-300 shadow-md p-8">
              <div className="flex flex-col sm:flex-row gap-2">
                <label htmlFor="image-upload" className="text-sm font-bold">
                  Image Field
                </label>
                <input
                  id="image-upload"
                  type="file"
                  className="border border-gray-600 rounded-sm px-2 w-full sm:w-auto"
                  aria-label="Upload campaign image"
                />
              </div>
            </div>
          ) : activeField === "Campaign" ? (
            <div className="border rounded-sm border-gray-400 shadow-md p-8 space-y-2 w-full">
              {/* Start Campaign */}
              <div className="flex items-center gap-4">
                <input
                  type="checkbox"
                  name="startOnCampaign"
                  checked={formData.startOnCampaign}
                  onChange={handleInputChange}
                  className="w-4 h-4"
                />
                <h1 className="font-semibold text-sm">Start a Campaign</h1>
              </div>
              {/* Date From */}
              <div className="flex gap-4">
                <label className="font-semibold text-sm w-1/4">Date From</label>
                <input
                  type="date"
                  name="dateFrom"
                  value={formData.dateFrom}
                  onChange={handleInputChange}
                  className="border rounded-sm border-gray-600 p-1 w-1/5"
                />
              </div>
              {/* Date To */}
              <div className="flex items-center gap-4">
                <label className="font-semibold text-sm w-1/4">Date To</label>
                <input
                  type="date"
                  name="dateTo"
                  value={formData.dateTo}
                  onChange={handleInputChange}
                  className="border rounded-sm border-gray-600 p-1 w-1/5"
                />
              </div>
              <div className="flex items-center gap-4">
                <label className="inline font-semibold text-sm w-1/4">
                  Discount Percentage
                </label>
                <input
                  type="text"
                  name="discountPercentage"
                  value={formData.discountPercentage}
                  onChange={handleInputChange}
                  className="border rounded-sm border-gray-600 p-1 w-1/5"
                />
              </div>
              <div>
                <h1 className="font-semibold text-sm py-2">Campaign Notes</h1>
                <textarea
                  name="campaignNote"
                  value={formData.campaignNote}
                  onChange={handleInputChange}
                  className="w-full h-32 p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your message here..."
                ></textarea>
              </div>
            </div>
          ) : (
            <p>
              <span className="font-medium">{activeField}: </span>
              {activeField === "Status" ? (
                <span
                  className={`inline-block px-2 py-0.5 rounded text-xs ${
                    rowData?.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {rowData?.status || "N/A"}
                </span>
              ) : (
                detailsMap[activeField]
              )}
            </p>
          )}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="bg-[#449ae6] text-white py-1 px-4 rounded-md hover:bg-[#3a8cd1] transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default RowDetailsPopup;