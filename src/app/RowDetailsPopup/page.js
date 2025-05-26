"use client";
import React, { useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { X } from "lucide-react";

const RowDetailsPopup = ({ rowData, onClose }) => {
  const [activeField, setActiveField] = useState("General");
  const [number, setNumber] = useState(0);

  const [formData, setFormData] = useState({
    customerType: "",
    companyName: "",
    website: "",
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    state: "",
    country: "",
    postCode: "",
    postCodeAlt: "",
    email: "",
    phone: "",
    ebn: "",
    commission: "10.00",
    invoiceOrPO: "",
    paymentTerm: "7 days",
    bankReference: "",
    prepaidCustomer: "",
    quickBooksOrderId: "1",
    deliveryNotes: "",
    accountingManager: 0,
    invoicePO: 0,
    tracking: 0,
    cancelOrder: 0,
    paymentOrder: "",
    currency: "USD",
    offSalePrice: "0.00",
    plusCalculate: "0.00",
    nzCalculate: "0.00",
    gstCalculate: "0.00",
    roundingLow: "0.00",
    roundingHigh: "0.00",
    dropshipPricing: "",
    rtsImport: "",
    dropship: "",
    orderTemplate1: "",
    orderTemplate2: "",
    orderTemplate3: "",
    trackingTemplate: "",
    invoiceTemplate: "",
    invoiceFolder: "",
    campaignStart: false,
    campaignDateFrom: "",
    campaignDateTo: "",
    campaignDiscount: "",
    campaignNotes: "",
  });

  const detailsMap = {
    General: "Last updated on May 10, 2025, 14:30 UTC",
    Customer: "John Doe Enterprises",
    Orders: "ORD-2025-00123",
    Invoice: "INV-2025-00123",
    Payment: "Payment system",
    Email: "contact@johndoe.com",
    Pricing: "10% discount for bulk orders",
    Campaign: "Spring Sale 2025",
    Description: "Online sales channel for premium products",
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
    <div className="fixed inset-0 bg-gray-300 bg-opacity-50 flex items-center justify-center z-50 overflow-auto p-4 sm:p-6">
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
          <p>{rowData?.salesChannel || "N/A"}</p>
        </div>
        <div className="flex flex-col sm:flex-row sm:gap-12 pb-3">
          <p className="font-semibold">Sales Channel Name</p>
          <p className="bg-white w-[300px] px-2 shadow-sm">
            {rowData?.salesChannel || "N/A"}
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
                <div className="flex flex-col sm:flex-row sm:gap-11 py-3">
                  <span className="text-black text-sm font-bold">
                    Sales Channel Code
                  </span>
                  <span className="bg-green-400 w-full sm:w-24 py-1 px-2 shadow-sm font-bold">
                    TheCbStore
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:gap-8">
                  <span className="text-black text-sm font-bold">
                    Order Number Prefix
                  </span>
                  <span className="bg-green-400 py-1 w-full sm:w-24 px-2 shadow-sm">
                    CB
                  </span>
                </div>
              </div>
              {/* Appear in Section */}
              <div className="relative border border-gray-400 rounded-md p-4 sm:p-6 mt-4">
                <span className="absolute -top-3 left-2 text-black bg-gray-200 px-1 text-sm font-bold">
                  Appear in
                </span>
                <div>
                  <div className="flex items-center gap-4 sm:gap-8 py-1">
                    <span className="text-black text-sm font-bold w-full sm:w-40">
                      Description
                    </span>
                    <input
                      type="checkbox"
                      className="w-4 h-4 bg-gray-100 border-gray-300 rounded"
                      aria-label="Description checkbox"
                    />
                  </div>
                  <div className="flex items-center gap-4 sm:gap-8 py-1">
                    <span className="text-black text-sm font-bold w-full sm:w-40">
                      Selling Channel
                    </span>
                    <input
                      type="checkbox"
                      className="w-4 h-4 bg-gray-100 border-gray-300 rounded"
                      aria-label="Selling Channel checkbox"
                    />
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
                    name="commission"
                    type="text"
                    value={formData.commission}
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
                        name="dropship"
                        value={formData.dropship}
                        onChange={handleInputChange}
                        className="w-full bg-transparent outline-none"
                        aria-label="Dropship pricing options"
                      >
                        <option value="dropship1">UI dropship1</option>
                        <option value="dropship2">UI dropship2</option>
                        <option value="dropship3">UI dropship3</option>
                        <option value="dropship4">UI dropship4</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:gap-14 py-3">
                  <label
                    htmlFor="dropship-pricing"
                    className="text-black text-sm font-bold"
                  >
                    Auto calculate dropship pricing
                  </label>
                  <input
                    id="dropship-pricing"
                    name="dropshipPricing"
                    type="text"
                    value={formData.dropshipPricing}
                    onChange={handleInputChange}
                    className="border border-gray-600 rounded px-2 w-full sm:w-36 shadow-sm"
                  />
                </div>
              </div>
            </div>
          ) : activeField === "Customer" ? (
            <div className="space-y-4">
              {[
                {
                  id: "customer-type",
                  name: "customerType",
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
                  name: "companyName",
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
                  name: "state",
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
                  name: "postCode",
                  label: "Post Code",
                  type: "text",
                  placeholder: "Post Code",
                  isDouble: true,
                  secondField: {
                    id: "post-code-alt",
                    name: "postCodeAlt",
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
                { id: "ebn", name: "ebn", label: "EBN", type: "text" },
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
                          <option value="dropship1">UI dropship1</option>
                          <option value="dropship2">UI dropship2</option>
                          <option value="dropship3">UI dropship3</option>
                          <option value="dropship4">UI dropship4</option>
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
                      name="trackingTemplate"
                      value={formData.trackingTemplate}
                      onChange={handleInputChange}
                      className="w-full bg-transparent outline-none"
                      aria-label="Tracking file template"
                    >
                      <option value="dropship1">UI dropship1</option>
                      <option value="dropship2">UI dropship2</option>
                      <option value="dropship3">UI dropship3</option>
                      <option value="dropship4">UI dropship4</option>
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
                    name="rtsImport"
                    type="text"
                    value={formData.rtsImport}
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
                      <option value="dropship1">UI dropship1</option>
                      <option value="dropship2">UI dropship2</option>
                      <option value="dropship3">UI dropship3</option>
                      <option value="dropship4">UI dropship4</option>
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
                  <div className="flex items-center w-full sm:w-56 px-2 py-0.5 border rounded-sm bg-white">
                    <select
                      id="invoice-folder"
                      name="invoiceFolder"
                      value={formData.invoiceFolder}
                      onChange={handleInputChange}
                      className="w-full bg-transparent outline-none"
                      aria-label="Invoice folder"
                    >
                      <option value="dropship1">UI dropship1</option>
                      <option value="dropship2">UI dropship2</option>
                      <option value="dropship3">UI dropship3</option>
                      <option value="dropship4">UI dropship4</option>
                    </select>
                  </div>
                </div>
                {[
                  "Upon invoice",
                  "Customer invoice",
                  "Check missing invoice",
                  "Repayment",
                  "Payment system",
                  "Email required",
                ].map((label) => (
                  <div key={label} className="flex gap-2 py-1">
                    <input
                      type="checkbox"
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
                      name="paymentTerm"
                      value={formData.paymentTerm}
                      onChange={handleInputChange}
                      className="w-full bg-transparent outline-none"
                      aria-label="Payment term"
                    >
                      <option value="7 days">7 days</option>
                      <option value="14 days">14 days</option>
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
                    name="bankReference"
                    type="text"
                    value={formData.bankReference}
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
                    name="prepaidCustomer"
                    type="text"
                    value={formData.prepaidCustomer}
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
                        name="quickBooksOrderId"
                        value={formData.quickBooksOrderId}
                        onChange={handleInputChange}
                        className="w-full bg-transparent outline-none"
                        aria-label="QuickBooks order ID"
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
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
                      name="deliveryNotes"
                      type="text"
                      value={formData.deliveryNotes}
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
                  name: "accountingManager",
                  label: "Accounting Manager",
                  type: "number",
                },
                {
                  id: "invoice-po",
                  name: "invoicePO",
                  label: "Invoice/PO",
                  type: "number",
                },
                {
                  id: "tracking",
                  name: "tracking",
                  label: "Tracking",
                  type: "number",
                },
                {
                  id: "cancel-order",
                  name: "cancelOrder",
                  label: "Cancel Order",
                  type: "number",
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
                  name="paymentOrder"
                  value={formData.paymentOrder}
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
                      name="currency"
                      value={formData.currency}
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
                    name: "offSalePrice",
                    label: "Off sale price",
                  },
                  {
                    id: "plus-calculate",
                    name: "plusCalculate",
                    label: "Plus calculate",
                  },
                  {
                    id: "nz-calculate",
                    name: "nzCalculate",
                    label: "NZ Calculate price",
                  },
                  {
                    id: "gst-calculate",
                    name: "gstCalculate",
                    label: "Calculate GST",
                  },
                  {
                    id: "rounding-low",
                    name: "roundingLow",
                    label: "Rounding low",
                  },
                  {
                    id: "rounding-high",
                    name: "roundingHigh",
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
                      className="w-full sm:w-20 px-2 py-0.5 border rounded-sm bg-gray-200"
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
                  name="campaignStart"
                  checked={formData.campaignStart}
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
                  name="campaignDateFrom"
                  value={formData.campaignDateFrom}
                  onChange={handleInputChange}
                  className="border rounded-sm border-gray-600 p-1 w-1/5"
                />
              </div>
              {/* Date To */}
              <div className="flex items-center gap-4">
                <label className="font-semibold text-sm w-1/4">Date To</label>
                <input
                  type="date"
                  name="campaignDateTo"
                  value={formData.campaignDateTo}
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
                  name="campaignDiscount"
                  value={formData.campaignDiscount}
                  onChange={handleInputChange}
                  className="border rounded-sm border-gray-600 p-1 w-1/5"
                />
              </div>
              <div>
                <h1 className="font-semibold text-sm py-2">Campaign Notes</h1>
                <textarea
                  name="campaignNotes"
                  value={formData.campaignNotes}
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