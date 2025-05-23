"use client";
import React, { useState } from "react";
import { X } from "lucide-react";
import { FaCheckCircle, FaTimesCircle, FaChevronRight } from "react-icons/fa";

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
  console.log("Display ID:", rowData?.displayId);

  // console.log("Row Data in Popup:", rowData);
  // console.log("NZ Dropship Value:", rowData?.nzDropshippingDropdown);

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
        {/* <div className="flex flex-col sm:flex-row sm:gap-24 py-3">
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
        </div> */}





        <div className="flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-8">
            <p className="font-semibold w-40">Sales Channel ID</p>
            <p className="text-gray-800">{rowData?.displayId || "N/A"}</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-8">
            <p className="font-semibold w-40">Sales Channel Name</p>
            <p className="bg-green-100 w-[300px] px-2 py-1 shadow-sm rounded text-gray-800">
              {rowData?.salesChannelName || "N/A"}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-8">
            <p className="font-semibold w-40">Type</p>
            <p className="bg-green-100  w-[300px] px-2 py-1 shadow-sm rounded text-gray-800">
              {rowData?.salesChannelType || "N/A"}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-8">
            <p className="font-semibold w-40">Location</p>
            <p className="bg-green-100 w-[300px] px-2 py-1 shadow-sm rounded text-gray-800">
              {rowData?.suburbState || "N/A"}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-8">
            <p className="font-semibold w-40 mb-2">Status</p>
            <p className={`px-3 py-1 rounded text-sm font-medium shadow-sm ${rowData?.emailPlatforminvoice
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
                className="bg-green-100  w-[300px] px-2 py-1 shadow-sm rounded text-gray-800"
              />
            </div>
            <button
              onClick={increaseNumber}
              className="border border-gray-400 rounded-sm p-2 -py-1 bg-white"
            >
              <FaChevronRight size={10} />
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {Object.keys(detailsMap).map((field) => (
            <button
              key={field}
              onClick={() => setActiveField(field)}
              className={`inline-block px-2 py-0.5 rounded text-xs ${rowData?.status === "Active"
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
                  <span className="bg-green-100 text-black font-bold px-3 py-1 rounded-md shadow-sm w-full sm:w-auto text-center">
                    {rowData?.commissionPercentage || "N/A"}
                  </span>
                  {/* <input
                    id="commission"
                    name="commissionPercentage"
                    type="text"
                    value={formData.commissionPercentage}
                    onChange={handleInputChange}
                    placeholder="10.00"
                    className="bg-white border py-0.5 border-gray-600 rounded px-2 shadow-sm text-black text-right w-full sm:w-auto"
                  /> */}

                </div>
              </div>
              {/* DropShipping Section */}
              <div className="relative border border-gray-400 rounded-md p-4 sm:p-6 mt-4">
                <span className="absolute -top-3 left-2 text-black bg-gray-200 px-1 text-sm font-bold">
                  DropShipping
                </span>
                <div className="flex gap-2 py-3">
                  <div className="flex items-center gap-2">
                    {rowData?.nzDropshippingAutoCalculate ? (
                      <FaCheckCircle className="text-green-500 text-lg" title="Enabled" />
                    ) : (
                      <FaTimesCircle className="text-gray-400 text-lg" title="Disabled" />
                    )}

                  </div>
                  {/* <input
                    type="checkbox"
                    name="nzDropshippingAutoCalculate"
                    checked={formData.nzDropshippingAutoCalculate}
                    onChange={handleInputChange}
                    className="h-4 w-4 bg-white border-gray-300 rounded mt-0.5"
                    aria-label="Auto calculate dropship pricing"
                  /> */}
                  <span className="text-black text-sm font-bold">
                    Auto calculate dropship pricing
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 py-1">
                  <div className="flex items-center gap-2">
                    {rowData?.nzDropshipping ? (
                      <FaCheckCircle className="text-green-500 text-lg" title="Enabled" />
                    ) : (
                      <FaTimesCircle className="text-gray-400 text-lg" title="Disabled" />
                    )}

                  </div>
                  {/* <input
                    type="checkbox"
                    name="nzDropshipping"
                    checked={formData.nzDropshipping}
                    onChange={handleInputChange}
                    className="h-4 w-4 bg-white border-gray-300 rounded mt-0.5"
                    aria-label="NZ dropship pricing"
                  /> */}
                  <label
                    htmlFor="dropship"
                    className="text-black text-sm font-bold"
                  >
                    NZ dropship pricing
                  </label>
                  <div className="flex flex-col sm:flex-row sm:gap-24">
                    <div></div>
                    {/* <div className="flex items-center w-full sm:w-56 px-2 py-0.5 border rounded-sm bg-white">
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
                    </div> */}
                    <span className="bg-green-100 text-black font-bold px-3 py-1 rounded-md shadow-sm w-full sm:w-auto text-center">
                      {rowData?.nzDropshippingDropdown || "N/A"}
                    </span>

                  </div>
                </div>
              </div>
            </div>
          ) : activeField === "Customer" ? (
            // <div className="space-y-4">
            //   {[
            //     {
            //       id: "customer-type",
            //       name: "company",
            //       label: "Customer Type",
            //       type: "select",
            //       options: [
            //         "dropship1",
            //         "dropship2",
            //         "dropship3",
            //         "dropship4",
            //       ].map((val) => ({ value: val, label: `UI ${val}` })),
            //     },
            //     {
            //       id: "company-name",
            //       name: "company",
            //       label: "Company Name",
            //       type: "text",
            //       placeholder: "THECBFStore",
            //     },
            //     {
            //       id: "website",
            //       name: "website",
            //       label: "Website",
            //       type: "text",
            //     },
            //     {
            //       id: "first-name",
            //       name: "firstName",
            //       label: "Name",
            //       type: "text",
            //       placeholder: "First Name",
            //       isDouble: true,
            //       secondField: {
            //         id: "last-name",
            //         name: "lastName",
            //         placeholder: "Last Name",
            //       },
            //     },
            //     {
            //       id: "address1",
            //       name: "address1",
            //       label: "Address 1",
            //       type: "text",
            //     },
            //     {
            //       id: "address2",
            //       name: "address2",
            //       label: "Address 2",
            //       type: "text",
            //     },
            //     {
            //       id: "state",
            //       name: "suburbState",
            //       label: "Sub/State",
            //       type: "text",
            //       placeholder: "State",
            //       isDouble: true,
            //       secondField: {
            //         id: "country",
            //         name: "country",
            //         placeholder: "Country",
            //       },
            //     },
            //     {
            //       id: "post-code",
            //       name: "postcode",
            //       label: "Post Code",
            //       type: "text",
            //       placeholder: "Post Code",
            //       isDouble: true,
            //       secondField: {
            //         id: "post-code-alt",
            //         name: "postcodeAlt",
            //         placeholder: "Alternate Post Code",
            //       },
            //     },
            //     {
            //       id: "email",
            //       name: "email",
            //       label: "Email",
            //       type: "email",
            //       placeholder: "bV4W9@example.com",
            //     },
            //     { id: "phone", name: "phone", label: "Phone", type: "text" },
            //     { id: "abn", name: "abn", label: "ABN", type: "text" },
            //   ].map((field) => (
            //     <div
            //       key={field.id}
            //       className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6"
            //     >
            //       <label
            //         htmlFor={field.id}
            //         className="w-full sm:w-32 text-sm font-bold text-black"
            //       >
            //         {field.label}
            //       </label>
            //       <div
            //         className={`flex ${
            //           field.isDouble
            //             ? "gap-4 w-full sm:w-auto"
            //             : "w-full sm:w-80"
            //         }`}
            //       >
            //         {field.type === "select" ? (
            //           <div className="flex items-center w-full px-2 py-1 border rounded-sm bg-slate-100">
            //             <select
            //               id={field.id}
            //               name={field.name}
            //               value={formData[field.name]}
            //               onChange={handleInputChange}
            //               className="w-full bg-transparent outline-none"
            //               aria-label={field.label}
            //             >

            //               {field.options.map((option) => (
            //                 <option key={option.value} value={option.value}>
            //                   {option.label}
            //                 </option>
            //               ))}
            //             </select>
            //           </div>
            //         ) : (
            //           <input
            //             id={field.id}
            //             name={field.name}
            //             type={field.type}
            //             value={formData[field.name]}
            //             onChange={handleInputChange}
            //             placeholder={field.placeholder}
            //             className={`w-full ${
            //               field.isDouble ? "sm:w-40" : ""
            //             } px-2 py-1 border border-gray-600 rounded bg-slate-100 shadow-sm`}
            //           />

            //         )}
            //         {field.isDouble && (
            //           <input
            //             id={field.secondField.id}
            //             name={field.secondField.name}
            //             type="text"
            //             value={formData[field.secondField.name]}
            //             onChange={handleInputChange}
            //             placeholder={field.secondField.placeholder}
            //             className="w-full sm:w-36 px-2 py-1 border border-gray-600 rounded bg-slate-100 shadow-sm"
            //           />
            //         )}
            //       </div>
            //     </div>
            //   ))}
            // </div>
            <div className="space-y-4">
              {[
                { id: "customer-type", name: "company", label: "Customer Type" },
                { id: "company-name", name: "company", label: "Company Name" },
                { id: "website", name: "website", label: "Website" },
                { id: "first-name", name: "firstName", label: "First Name" },
                { id: "last-name", name: "lastName", label: "Last Name" },
                { id: "address1", name: "address1", label: "Address 1" },
                { id: "address2", name: "address2", label: "Address 2" },
                { id: "suburbState", name: "suburbState", label: "Sub/State" },
                { id: "country", name: "country", label: "Country" },
                { id: "postcode", name: "postcode", label: "Post Code" },
                { id: "postcodeAlt", name: "postcodeAlt", label: "Alternate Post Code" },
                { id: "email", name: "email", label: "Email" },
                { id: "phone", name: "phone", label: "Phone" },
                { id: "abn", name: "abn", label: "ABN" },
              ].map((field) => (
                <div key={field.id} className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                  <label htmlFor={field.id} className="w-full sm:w-32 text-sm font-bold text-black">
                    {field.label}
                  </label>
                  <div className="w-full sm:w-80">
                    <span className="bg-green-100 text-black font-semibold px-3 py-1 rounded-md shadow-sm block w-full">
                      {rowData?.[field.name] || "N/A"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : activeField === "Orders" ? (
            // <div>
            //   <div className="relative border border-gray-400 rounded-md p-4 sm:p-6 mt-4">
            //     <span className="absolute -top-3 left-2 text-black bg-gray-200 px-1 text-sm font-bold">
            //       Order Template
            //     </span>
            //     <div className="space-y-2">
            //       {[1, 2, 3].map((num) => (
            //         <div key={num} className="flex items-center gap-4">
            //           <div className="w-6">{num}</div>
            //           <div className="flex items-center w-full sm:w-56 px-2 py-0.5 border rounded-sm bg-white">
            //             <select
            //               id={`order-template-${num}`}
            //               name={`orderTemplate${num}`}
            //               value={formData[`orderTemplate${num}`]}
            //               onChange={handleInputChange}
            //               className="w-full bg-transparent outline-none"
            //               aria-label={`Order template ${num}`}
            //             >
            //               <option value="">--- Please Select ----</option>
            //               <option value="Order_555Shopper">Order_555Shopper</option>
            //               <option value="Order_Adventure">Order_Adventure</option>
            //               <option value="Order_ApplianceStar">Order_ApplianceStar</option>
            //               <option value="Order_ArtiloKitchenware">Order_ArtiloKitchenware</option>
            //               <option value="Order_AussieArtificialPlants">Order_AussieArtificialPlants</option>
            //               <option value="Order_AussieBulk">Order_AussieBulk</option>
            //             </select>
            //           </div>
            //         </div>
            //       ))}
            //     </div>
            //   </div>
            //   <div className="relative border border-gray-400 rounded-md p-4 sm:p-6 mt-4">
            //     <span className="absolute -top-3 left-2 text-black bg-gray-200 px-1 text-sm font-bold">
            //       Tracking Template
            //     </span>
            //     <div className="flex items-center gap-4 py-3">
            //       <input
            //         type="checkbox"
            //         name="Emailplatformatrackingfile"
            //         checked={formData.Emailplatformatrackingfile}
            //         onChange={handleInputChange}
            //         className="w-4 h-4 bg-gray-100 border-gray-300 rounded"
            //         aria-label="Email platform tracking file"
            //       />
            //       <span className="text-black text-sm font-bold">
            //         Email platform a tracking file
            //       </span>
            //     </div>
            //     <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 ml-0 sm:ml-6">
            //       <label
            //         htmlFor="tracking-template"
            //         className="inline-block w-auto text-sm font-bold text-black"
            //       >
            //         Tracking file template
            //       </label>
            //       <div className="flex items-center w-full sm:w-56 px-2 py-0.5 border rounded-sm bg-white">
            //         <select
            //           id="tracking-template"
            //           name="trackingFileTemplate"
            //           value={formData.trackingFileTemplate}
            //           onChange={handleInputChange}
            //           className="w-full bg-transparent outline-none"
            //           aria-label="Tracking file template"
            //         >
            //           <option value="">--- Please Select ----</option>
            //           <option value="Order_555Shopper">Order_555Shopper</option>
            //           <option value="Order_Adventure">Order_Adventure</option>
            //           <option value="Order_ApplianceStar">Order_ApplianceStar</option>
            //           <option value="Order_ArtiloKitchenware">Order_ArtiloKitchenware</option>
            //           <option value="Order_AussieArtificialPlants">Order_AussieArtificialPlants</option>
            //           <option value="Order_AussieBulk">Order_AussieBulk</option>
            //         </select>
            //       </div>
            //     </div>
            //   </div>
            //   <div className="relative border border-gray-400 rounded-md p-4 sm:p-6 mt-4">
            //     <span className="absolute -top-3 left-2 text-black bg-gray-200 px-1 text-sm font-bold">
            //       Ready to Ship
            //     </span>
            //     <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            //       <label
            //         htmlFor="rts-import"
            //         className="w-full sm:w-32 text-sm font-bold text-black"
            //       >
            //         Import from RTS
            //       </label>
            //       <input
            //         id="rts-import"
            //         name="ImportFromRTS"
            //         type="text"
            //         value={formData.ImportFromRTS}
            //         onChange={handleInputChange}
            //         className="w-full sm:w-80 px-2 py-0.5 border border-gray-600 rounded bg-white shadow-sm"
            //       />
            //     </div>
            //   </div>
            // </div>
            <div className="space-y-4">
              <div className="relative border border-gray-400 rounded-md p-4 sm:p-6 mt-4">
                <span className="absolute -top-3 left-2 text-black bg-gray-200 px-1 text-sm font-bold">
                  Order Template
                </span>
                <div className="space-y-2">
                  {[1, 2, 3].map((num) => (
                    <div key={num} className="flex flex-col sm:flex-row sm:items-center gap-4 py-1">
                      <div className="w-full sm:w-40 text-sm font-bold text-black">Template {num}</div>
                      <div className="bg-green-100 text-black font-semibold px-3 py-1 rounded-md shadow-sm w-full sm:w-auto text-center">
                        {rowData?.[`orderTemplate${num}`] || "N/A"}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative border border-gray-400 rounded-md p-4 sm:p-6 mt-4">
                <span className="absolute -top-3 left-2 text-black bg-gray-200 px-1 text-sm font-bold">
                  Tracking Template
                </span>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 py-2">
                  <span className="w-full sm:w-40 text-sm font-bold text-black">Tracking File Enabled</span>
                  <div className="flex items-center">
                    {rowData?.Emailplatformatrackingfile ? (
                      <FaCheckCircle className="text-green-500 text-lg" title="Enabled" />
                    ) : (
                      <FaTimesCircle className="text-gray-400 text-lg" title="Disabled" />
                    )}
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <span className="w-full sm:w-40 text-sm font-bold text-black">Tracking Template</span>
                  <div className="bg-green-100 text-black font-semibold px-3 py-1 rounded-md shadow-sm w-full sm:w-auto text-center">
                    {rowData?.trackingFileTemplate || "N/A"}
                  </div>
                </div>
              </div>
              <div className="relative border border-gray-400 rounded-md p-4 sm:p-6 mt-4">
                <span className="absolute -top-3 left-2 text-black bg-gray-200 px-1 text-sm font-bold">
                  Ready to Ship
                </span>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <span className="w-full sm:w-40 text-sm font-bold text-black">Import from RTS</span>
                  <div className="bg-green-100 text-black font-semibold px-3 py-1 rounded-md shadow-sm w-full sm:w-auto text-center">
                    {rowData?.ImportFromRTS || "N/A"}
                  </div>
                </div>
              </div>
            </div>

          ) : activeField === "Invoice" ? (
            <div>
              {/* Invoice Template Section */}
              <div className="relative border border-gray-400 rounded-md p-4 sm:p-6 mt-4">
                <span className="absolute -top-3 left-2 text-black bg-gray-200 px-1 text-sm font-bold">
                  Invoice Template
                </span>
                <div className="flex items-center gap-4 py-3">
                  <span className="text-gray-800 text-sm font-semibold w-full sm:w-40">
                    Email platform an invoice
                  </span>
                  {rowData?.emailPlatforminvoice ? (
                    <FaCheckCircle className="text-green-500 text-lg" title="Enabled" />
                  ) : (
                    <FaTimesCircle className="text-gray-400 text-lg" title="Disabled" />
                  )}
                </div>

                <div className="flex items-center gap-4 py-3">
                  <span className="text-gray-800 text-sm font-semibold w-full sm:w-40">
                    Invoice Template
                  </span>
                  <span className="bg-green-100 text-black font-bold px-3 py-1 rounded-md shadow-sm w-full sm:w-auto text-center">
                    {rowData?.invoiceTemplate || "--- Not Selected ---"}
                  </span>
                </div>
              </div>

              {/* Invoice General Section */}
              <div className="relative border border-gray-400 rounded-md p-4 sm:p-6 mt-4">
                <span className="absolute -top-3 left-2 text-black bg-gray-200 px-1 text-sm font-bold">
                  Invoice General
                </span>

                <div className="flex items-center gap-4 py-3">
                  <span className="text-gray-800 text-sm font-semibold w-full sm:w-40">
                    Invoice or PO
                  </span>
                  <span className="bg-green-100 text-black font-bold px-3 py-1 rounded-md shadow-sm w-full sm:w-auto text-center">
                    {rowData?.invoiceOrPO || "N/A"}
                  </span>
                </div>

                <div className="flex items-center gap-4 py-3">
                  <span className="text-gray-800 text-sm font-semibold w-full sm:w-40">
                    Invoice Folder
                  </span>
                  <span className="bg-green-100 text-black font-bold px-3 py-1 rounded-md shadow-sm w-full sm:w-auto text-center">
                    {rowData?.invoiceFolder || "N/A"}
                  </span>
                </div>

                {[
                  { name: "1POINV", label: "Upon invoice" },
                  { name: "CustomerinvoicelncGST", label: "Customer invoice" },
                  { name: "missinginvoice", label: "Check missing invoice" },
                  { name: "paymentrequired", label: "Repayment" },
                  { name: "Emailinvoicerequired", label: "Email required" }
                ].map(({ name, label }) => (
                  <div key={name} className="flex items-center gap-4 py-2">
                    <span className="text-gray-800 text-sm font-semibold w-full sm:w-40">
                      {label}
                    </span>
                    {rowData?.[name] ? (
                      <FaCheckCircle className="text-green-500 text-lg" title="Enabled" />
                    ) : (
                      <FaTimesCircle className="text-gray-400 text-lg" title="Disabled" />
                    )}
                  </div>
                ))}
              </div>
            </div>


          ) : activeField === "Payment" ? (
            <div className="space-y-4">
              <div className="relative border border-gray-400 rounded-md p-4 sm:p-6 mt-4">
                <span className="absolute -top-3 left-2 text-black bg-gray-200 px-1 text-sm font-bold">Payment</span>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-10 py-3">
                  <label className="text-black text-sm font-bold min-w-[180px]">Payment Term</label>
                  <span className="bg-green-100 text-black font-bold px-3 py-1 rounded-md shadow-sm w-full sm:w-auto text-center">
                    {rowData?.payementterm || "N/A"}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-10 py-3">
                  <label className="text-black text-sm font-bold min-w-[180px]">Bank Reference Name</label>
                  <span className="bg-green-100 text-black font-bold px-3 py-1 rounded-md shadow-sm w-full sm:w-auto text-center">
                    {rowData?.bankReferenceName || "N/A"}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-10 py-3">
                  <label className="text-black text-sm font-bold min-w-[180px]">Is this prepaid customer</label>
                  <div className="flex items-center gap-2">
                    {rowData?.paymentrequired ? (
                      <FaCheckCircle className="text-green-500 text-lg" title="Enabled" />
                    ) : (
                      <FaTimesCircle className="text-gray-400 text-lg" title="Disabled" />
                    )}
                  </div>
                </div>
              </div>

              <div className="relative border border-gray-400 rounded-md p-4 sm:p-6 mt-4">
                <span className="absolute -top-3 left-2 text-black bg-gray-200 px-1 text-sm font-bold">QuickBooks</span>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-20 py-3">
                  <label className="text-black text-sm font-bold min-w-[180px]">QuickBooks Order ID Fields</label>
                  <span className="bg-green-100 text-black font-bold px-3 py-1 rounded-md shadow-sm w-full sm:w-auto text-center">
                    {rowData?.QuickBooksOrderID || "N/A"}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-10 py-2">
                  <label className="text-black text-sm font-bold min-w-[180px]">Text to remove from delivery notes</label>
                  <span className="bg-green-100 text-black font-bold px-3 py-1 rounded-md shadow-sm w-full sm:w-auto text-center">
                    {rowData?.removedtext || "N/A"}
                  </span>
                </div>
              </div>
            </div>

          ) : activeField === "Email" ? (
            <div className="relative border border-gray-400 rounded-md p-4 sm:p-6 mt-4">
              <span className="absolute -top-3 left-2 text-black bg-gray-200 px-1 text-sm font-bold">
                Email
              </span>

              {[
                {
                  name: "accountmanagar",
                  label: "Accounting Manager",
                },
                {
                  name: "invoice",
                  label: "Invoice/PO",
                },
                {
                  name: "tracking",
                  label: "Tracking",
                },
                {
                  name: "cancleorder",
                  label: "Cancel Order",
                },
              ].map((field) => (
                <div
                  key={field.name}
                  className="flex items-center gap-4 sm:gap-8 py-2"
                >
                  <span className="text-gray-800 text-sm font-semibold w-full sm:w-40">
                    {field.label}
                  </span>
                  <span className="bg-green-100 text-black font-bold px-3 py-1 rounded-md shadow-sm w-full sm:w-auto text-center">
                    {rowData?.[field.name] || "N/A"}
                  </span>
                </div>
              ))}

              <div className="flex items-start gap-4 sm:gap-8 py-2">
                <span className="text-gray-800 text-sm font-semibold w-full sm:w-40 pt-1">
                  Payment Order
                </span>
                <div className="bg-green-100 text-black font-bold px-3 py-1 rounded-md shadow-sm w-full sm:w-auto text-left whitespace-pre-wrap">
                  {rowData?.paymentNote || "N/A"}
                </div>
              </div>
            </div>

          ) : activeField === "Pricing" ? (
            <div className="relative border border-gray-400 rounded-md p-4 sm:p-6 mt-4">
              <span className="absolute -top-3 left-2 text-black bg-gray-200 px-1 text-sm font-bold">
                Currency & Pricing
              </span>

              {/* Currency Field */}
              <div className="flex items-center gap-4 sm:gap-8 py-2">
                <span className="text-gray-800 text-sm font-semibold w-full sm:w-40">
                  Currency
                </span>
                <span className="bg-green-100 text-black font-bold px-3 py-1 rounded-md shadow-sm w-full sm:w-auto text-center">
                  {rowData?.Currency || "N/A"}
                </span>
              </div>

              {/* Pricing Checkboxes with Input Display */}
              {[
                {
                  name: "offSellingPrice",
                  checkboxName: "offSellingPricecheckbox",
                  label: "Off sale price",
                },

              ].map((field) => (
                <div key={field.name} className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 py-2">
                  <div className="flex items-center gap-3">
                    {rowData?.[field.checkboxName] ? (
                      <FaCheckCircle className="text-green-500 text-lg" title="Enabled" />
                    ) : (
                      <FaTimesCircle className="text-gray-400 text-lg" title="Disabled" />
                    )}

                  </div><span className="text-gray-800 text-sm font-semibold w-full sm:w-40">
                    {field.label}
                  </span>
                  <div className="flex items-center gap-3">

                    <span className="bg-green-100 text-black font-bold px-3 py-1 rounded-md shadow-sm w-24 text-center">
                      {rowData?.[field.name] || "0.00"}
                    </span>
                  </div>
                </div>

              ))}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 py-2">
                <div className="flex items-center gap-3">
                  {rowData?.plusShipping ? (
                    <FaCheckCircle className="text-green-500 text-lg" title="Enabled" />
                  ) : (
                    <FaTimesCircle className="text-gray-400 text-lg" title="Disabled" />
                  )}

                </div><span className="text-gray-800 text-sm font-semibold w-full sm:w-40">
                  Plus calculate
                </span>

              </div>
              {[

                {
                  name: "calculateNZPrice",
                  checkboxName: "calculateNZPricecheckbox",
                  label: "NZ Calculate price",
                },
                {
                  name: "calculateGST",
                  checkboxName: "calculateGSTcheckbox",
                  label: "Calculate GST",
                },
                {
                  name: "roundingLow",
                  checkboxName: "roundingLowcheckbox",
                  label: "Rounding low",
                },
                {
                  name: "roundingHigh",
                  checkboxName: "roundingHighcheckbox",
                  label: "Rounding high",
                },
              ].map((field) => (
                <div key={field.name} className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 py-2">
                  <div className="flex items-center gap-3">
                    {rowData?.[field.checkboxName] ? (
                      <FaCheckCircle className="text-green-500 text-lg" title="Enabled" />
                    ) : (
                      <FaTimesCircle className="text-gray-400 text-lg" title="Disabled" />
                    )}

                  </div><span className="text-gray-800 text-sm font-semibold w-full sm:w-40">
                    {field.label}
                  </span>
                  <div className="flex items-center gap-3">

                    <span className="bg-green-100 text-black font-bold px-3 py-1 rounded-md shadow-sm w-24 text-center">
                      {rowData?.[field.name] || "0.00"}
                    </span>
                  </div>
                </div>

              ))}
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
            <div className="relative border border-gray-400 rounded-md p-4 sm:p-6 mt-4">
              <span className="absolute -top-3 left-2 text-black bg-gray-200 px-1 text-sm font-bold">
                Campaign
              </span>

              {/* Start Campaign */}
              <div className="flex items-center gap-4 py-2">
                <span className="text-gray-800 text-sm font-semibold w-full sm:w-40">
                  Start a Campaign
                </span>
                {rowData?.startOnCampaign ? (
                  <FaCheckCircle className="text-green-500 text-lg" title="Enabled" />
                ) : (
                  <FaTimesCircle className="text-gray-400 text-lg" title="Disabled" />
                )}
              </div>

              {/* Date From */}
              <div className="flex items-center gap-4 py-2">
                <span className="text-gray-800 text-sm font-semibold w-full sm:w-40">
                  Date From
                </span>
                <span className="bg-green-100 text-black font-bold px-3 py-1 rounded-md shadow-sm text-center">
                  {rowData?.dateFrom || "N/A"}
                </span>
              </div>

              {/* Date To */}
              <div className="flex items-center gap-4 py-2">
                <span className="text-gray-800 text-sm font-semibold w-full sm:w-40">
                  Date To
                </span>
                <span className="bg-green-100 text-black font-bold px-3 py-1 rounded-md shadow-sm text-center">
                  {rowData?.dateTo || "N/A"}
                </span>
              </div>

              {/* Discount Percentage */}
              <div className="flex items-center gap-4 py-2">
                <span className="text-gray-800 text-sm font-semibold w-full sm:w-40">
                  Discount Percentage
                </span>
                <span className="bg-green-100 text-black font-bold px-3 py-1 rounded-md shadow-sm text-center">
                  {rowData?.discountPercentage || "N/A"}
                </span>
              </div>

              {/* Campaign Notes */}
              <div className="py-2">
                <h1 className="text-sm font-semibold text-gray-800 mb-1">Campaign Notes</h1>
                <div className="bg-green-100 text-black font-medium px-3 py-2 rounded-md shadow-sm whitespace-pre-wrap">
                  {rowData?.campaignNote || "No notes provided."}
                </div>
              </div>
            </div>

          ) : (
            <p>
              <span className="font-medium">{activeField}: </span>
              {activeField === "Status" ? (
                <span
                  className={`inline-block px-2 py-0.5 rounded text-xs ${rowData?.status === "Active"
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