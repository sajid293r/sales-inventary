"use client";
import React, { useState, useRef, useEffect, version } from "react";
import { submitAction } from '@/actions/salesChannel'
import { toast } from 'react-hot-toast';

const TableWithCheckboxes = () => {
  let ref = useRef();
  const [selectedRows, setSelectedRows] = useState([]);
  const [activeVersion, setActiveVersion] = useState('Version 4 & 5');
  const [filters, setFilters] = useState({
    status: [],
    type: [],
    paymentTerm: [],
    region: "Billing Information",
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
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showBillingForm, setShowBillingForm] = useState(false);
  const [billingInfo, setBillingInfo] = useState({
    nzDropshipping: false,
    nzDropshippingAutoCalculate: false,
    nzDropshippingDropdown: '',
    Emailplatformatrackingfile: false,
    ImportFromRTS: '',
    company: '',
    website: '',
    address1: '',
    address2: '',
    firstName: '',
    lastName: '',
    suburbState: '',
    postcode: '',
    email: '',
    phone: '',
    abn: '',
    salesChannelType: '',
    emailPlatforminvoice: false,
    offSellingPricecheckbox: false,
    plusShipping: false,
    paymentrequired: false,
    calculateNZPricecheckbox: false,
    calculateRetailPricecheckbox: false,
    calculateGSTcheckbox: false,
    roundingLowcheckbox: false,
    roundingHighcheckbox: false,
    Version5: false,

  });
  const [pricingData, setPricingData] = useState({
    currency: '',
    pricingRules: '',
    version: 'Version 4 & 5',
    sellingPrice: '',
    nzPrice: '',
    retailPrice: '',
    gst: '',
    roundingLow: '',
    roundingHigh: '',
    excludeGST: false
  });

  const handleButtonClick = (buttonType) => {
    console.log(`${buttonType} clicked:`, pricingData);
  };
  const buttonsRef = useRef(null);
  const filterButtonRef = useRef(null);
  const filterPanelRef = useRef(null);
  const sortButtonRef = useRef(null);
  const sortTooltipRef = useRef(null);
  const searchInputRef = useRef(null);


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
    if (filters.region === "Billing Information") {
      setShowBillingForm(true);
    }
  }, [filters.region]);

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
 useEffect(() => {
    const fetchSalesChannels = async () => {
      try {
        const res = await fetch("/api/sales-channels");
        const data = await res.json();
        // setSalesChannels(data);
        console.log("📦 Channels:", data);
      } catch (error) {
        console.error("❌ Error fetching channels:", error);
      }
    };

    fetchSalesChannels();
  }, []);
  const data = Array.from({ length: 80 }, (_, i) => ({
    id: i + 1,
    salesChannel: `Channel ${i + 1}`,
    type: i % 2 === 0 ? "Online" : "Retail",
    paymentTerm: i % 3 === 0 ? "Net 30" : "Prepaid",
    country: ["USA", "UK", "Germany", "India"][i % 4],
    authorizedDate: `2025-05-${String(i + 1).padStart(2, "0")}`,
    status: i % 2 === 0 ? "Active" : "Inactive",
    region: ["Asia", "North America", "Europe", "Africa"][i % 4],
  }));

  const toggleSelectAll = (e) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPageData = filteredData.slice(startIndex, endIndex);
    setSelectedRows(e.target.checked ? currentPageData.map((d) => d.id) : []);
  };
  const handleRegionFilter = (region) => {
    setFilters((prev) => ({ ...prev, region }));
    setShowBillingForm(region === "Billing Information");
  };


  const handleBillingChange = (e) => {
    const { name, value } = e.target;
    setBillingInfo(prev => ({ ...prev, [name]: value }));
  };
  const handleSave = () => {
    console.log("Billing Info Submitted:", billingInfo);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const result = await submitAction(billingInfo);
      
      if (!result.success) {
        if (result.type === "validation_error") {
          toast.error(result.error);
        } else {
          toast.error("Failed to save sales channel");
        }
        return;
      }

      toast.success("Sales Channel saved successfully");
      ref.current?.reset();
      // Reset form data
      setBillingInfo({
        nzDropshipping: false,
        nzDropshippingAutoCalculate: false,
        nzDropshippingDropdown: '',
        // ... rest of the initial state
      });
    } catch (error) {
      toast.error("An error occurred while saving");
      console.error("Submit error:", error);
    }
  };

  return (
    <div >
      <form ref={ref} onSubmit={handleSubmit}>
        <div className="flex mt-3 ">

          <div className="bg-white rounded-lg p-2 mt-17 shadow-md flex flex-wrap gap-1 mb-2 h-[30%] w-[450px]">
            <div className="flex flex-col items-start gap-1 w-full">
              <div className="flex items-center gap-2 w-full">
                <span className="text-red-600 mt-1">*</span>
                <label className="text-sm font-medium whitespace-nowrap w-32">Sales Channel ID</label>
                <input type="text"
                  name="salesChannelID"
                  value={billingInfo.salesChannelID || ''}
                  onChange={(e) => {
                    const { name, value } = e.target;
                    setBillingInfo((prev) => ({
                      ...prev,
                      [name]: value,
                    }));
                    console.log(`${name} changed:`, value);
                  }}

                  className="flex-1 border border-gray-300 rounded p-1 text-sm h-8 w-full" />
              </div>

              <div className="flex items-center gap-2 w-full">
                <span className="text-red-600 mt-1">*</span>
                <label className="text-sm font-medium whitespace-nowrap w-32">Sales Channel Type</label>
                <select className="flex-1 border border-gray-300 rounded p-1 text-sm h-8 w-full"
                  name="salesChannelType"
                  value={billingInfo.salesChannelType}
                  onChange={(e) => {
                    const { name, value } = e.target;
                    setBillingInfo((prev) => ({
                      ...prev,
                      [name]: value,
                    }));
                    console.log(`${name} selected:`, value);
                  }}>
                  <option value="">--- Please Select ----</option>
                  <option value="Dropshiper">Dropshiper</option>
                  <option value="DropshiperNZ">DropshiperNZ</option>
                  <option value="Plateform">Plateform</option>
                  <option value="Price List">Price List</option>
                  <option value="Others">Others</option>
                </select>
              </div>

              <div className="flex items-center gap-2 w-full">
                <span className="text-red-600 mt-1">*</span>
                <label className="text-sm font-medium whitespace-nowrap w-32">Sales Channel Name</label>
                <input 
                  type="text"
                  name="salesChannelName"
                  value={billingInfo.salesChannelName || ''}
                  onChange={(e) => {
                    const { name, value } = e.target;
                    setBillingInfo((prev) => ({
                      ...prev,
                      [name]: value,
                    }));
                  }}
                  className="flex-1 border border-gray-300 rounded p-1 text-sm h-8 w-full"
                  required
                />
              </div>
            </div>
          </div>




          <div
            className={`p-2 sm:p-4 mx-auto w-full max-w-full sm:max-w-[600px] md:max-w-[1000px] lg:max-w-screen-lg ${dropdown.filterPanel ? "overflow-visible" : "overflow-x-hidden"
              }`}
          >
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-3">
              <h1 className="text-base sm:text-lg text-black font-semibold">
                Add Sales Channel Details Dropshipper

              </h1>
              <div>
                <button
                  // onClick={handleSave}
                  className="bg-[#52ce66] text-white py-2 px-4 rounded-md text-sm hover:bg-[#48b55a] transition"
                >
                  Save
                </button>

              </div>
            </div>

            <div className="rounded-xl border w-[300px] lg:w-full md:w-full bg-white border-gray-300 shadow-lg overflow-x-hidden">
              <div className="flex flex-wrap gap-2 p-4 border-b border-gray-200">
                {[
                  "Billing Information",
                  "Email",
                  "Campaign",
                  "General",
                  "Order",
                  "Invoices",
                  "Payment",
                  "Pricing Rules"
                ].map((region) => (
                  <button
                    key={region}
                    className={`py-1.5 px-3 rounded-md text-sm transition ${filters.region === region
                      ? 'bg-[#449ae6] text-white'
                      : 'text-gray-700 hover:bg-[#449ae6] hover:text-white'
                      }`}
                    onClick={() => handleRegionFilter(region)}
                  >
                    {region}
                  </button>
                ))}
              </div>


              {showBillingForm && (
                <div className="p-4 bg-gray-50 border-b border-gray-200">
                  <div className="space-y-4">

                    <div className="flex items-center gap-4">
                      <label className="w-1/4 text-sm font-medium">Company Pty Ltd</label>
                      <input
                        type="text"
                        name="company"
                        value={billingInfo.company || ''}
                        onChange={handleBillingChange}
                        className="flex-1 border border-gray-300 rounded p-2 text-sm"
                      />
                    </div>

                    <div className="flex items-center gap-4">
                      <label className="w-1/4 text-sm font-medium">Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={billingInfo.firstName || ''}
                        onChange={handleBillingChange}
                        className="flex-1 border border-gray-300 rounded p-2 text-sm"
                      />
                      <input
                        type="text"
                        name="lastName"
                        value={billingInfo.lastName || ''}
                        onChange={handleBillingChange}
                        className="flex-1 border border-gray-300 rounded p-2 text-sm"
                      />
                    </div>

                    {[
                      { label: 'Website', name: 'website', type: 'url' },
                      { label: 'Address 1', name: 'address1', type: 'text' },
                      { label: 'Address 2', name: 'address2', type: 'text' },
                      { label: 'Suburb/State', name: 'suburbState', type: 'text' },
                      { label: 'Postcode', name: 'postcode', type: 'text' },
                      { label: 'Email', name: 'email', type: 'email' },
                      { label: 'Phone', name: 'phone', type: 'tel' },
                      { label: 'ABN', name: 'abn', type: 'text' },
                    ].map(field => (
                      <div key={field.name} className="flex items-center gap-4">
                        <label className="w-1/4 text-sm font-medium id={opt.name}
                      name={opt.name}
                      checked={billingInfo[opt.name] || false}
                      // onChange={handleCheckboxChange}">{field.label}</label>
                        <input
                          type={field.type}
                          name={field.name}
                          value={billingInfo[field.name] || ''}
                          onChange={handleBillingChange}
                          className="flex-1 border border-gray-300 rounded p-2 text-sm"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {filters.region === "Email" && (
                <div className="p-4 bg-gray-50 border-b border-gray-200">

                  <div className="space-y-4">
                    {[
                      { label: 'Account Managar ', name: 'accountmanagar', type: 'text' },
                      { label: 'Invoic/PO ', name: 'invoice', type: 'text' },
                      { label: 'Tracking ', name: 'tracking', type: 'text' },
                      { label: 'Cancle Order ', name: 'cancleorder', type: 'text' },

                    ].map(field => (
                      <div key={field.name} className="flex items-center gap-4">
                        <label className="w-1/4 text-sm font-medium">{field.label}</label>
                        <input
                          type={field.type}
                          name={field.name}
                          value={billingInfo[field.name] || ''}
                          onChange={handleBillingChange}
                          className="flex-1 border border-gray-300 rounded p-2 text-sm"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {filters.region === "Campaign" && (
                <div className="p-4 bg-gray-50 border-b border-gray-200">
                  <div className="space-y-4">

                    <div className="flex items-center justify-center gap-2">
                      <input
                        type="checkbox"
                        id="startOnCampaign"
                        name="startOnCampaign"
                        checked={billingInfo.startOnCampaign || false}
                        onChange={e =>
                          setBillingInfo(prev => ({
                            ...prev,
                            startOnCampaign: e.target.checked
                          }))
                        }
                        className="border-gray-300 rounded"
                      />
                      <label htmlFor="startOnCampaign" className="text-sm font-medium">
                        Start on a campaign
                      </label>
                    </div>

                    {[
                      { label: 'Date From', name: 'dateFrom', type: 'date' },
                      { label: 'Date To', name: 'dateTo', type: 'date' },
                      { label: 'Discount Percentage %', name: 'discountPercentage', type: 'number' },
                    ].map(field => (
                      <div key={field.name} className="flex items-center gap-4">

                        <label className="w-1/4 text-sm font-medium">{field.label}</label>
                        <input
                          type={field.type}
                          name={field.name}
                          value={billingInfo[field.name] || ''}
                          onChange={handleBillingChange}
                          className="flex-1 border border-gray-300 rounded p-2 text-sm"
                        />
                      </div>
                    ))}

                    <div className="flex items-start gap-4">
                      <label className="w-1/4 text-sm font-medium">Campaign Note</label>
                      <textarea
                        type="textarea"
                        name="campaignNote"
                        value={billingInfo.campaignNote || ''}
                        onChange={handleBillingChange}
                        rows={4}
                        className="flex-1 border border-gray-300 rounded p-2 text-sm resize-none"
                        placeholder="Enter any notes for this campaign..."
                      />
                    </div>
                  </div>
                </div>
              )}

              {filters.region === "General" && (
                <div className="p-4 bg-gray-50 border-b border-gray-200">
                  <h2 className="text-black font-extrabold">General Setting</h2>
                  <hr className="my-2 border-gray-300" />


                  <div className="space-y-4">
                    {[
                      { label: 'Sales Channel Code', name: 'salesChannelCode', type: 'text' },
                      { label: 'Order Number Prefix', name: 'orderNumberPrefix', type: 'text' },
                    ].map(field => (
                      <div key={field.name} className="flex items-center gap-4">
                        <label className="w-1/4 text-sm font-medium">{field.label}</label>
                        <input
                          type={field.type}
                          name={field.name}
                          value={billingInfo[field.name] || ''}
                          onChange={handleBillingChange}
                          className="border border-gray-300 rounded p-2 text-sm"
                        />
                      </div>
                    ))}

                    <h2 className="text-black font-extrabold">Appears in</h2>
                    <hr className="my-2 border-gray-300" />
                    <div className="space-y-2">
                      {[
                        { label: 'Description channel', name: 'descriptionChannel' },
                        { label: 'Selling Channel channel', name: 'sellingChannel' },
                      ].map(opt => (
                        <div key={opt.name} className="flex items-center gap-4">
                          <label className="w-1/4 text-sm font-medium"></label>
                          <input
                            type="checkbox"
                            id={opt.name}
                            name={opt.name}
                            checked={billingInfo[opt.name] || false}
                            onChange={e =>
                              setBillingInfo(prev => ({
                                ...prev,
                                [opt.name]: e.target.checked
                              }))
                            }
                            className="border-gray-300 rounded"
                          />
                          <label className="w-1/4 text-sm font-medium">{opt.label}</label>

                        </div>
                      ))}
                    </div>

                    <h2 className="text-black font-extrabold">Commission</h2>
                    <hr className="my-2 border-gray-300" />
                    <div className="flex items-center gap-4">
                      <label className="w-1/4 text-sm font-medium">Commission</label>
                      <input
                        type="text"
                        name="commissionPercentage"
                        value={billingInfo.commissionPercentage || ''}
                        onChange={handleBillingChange}
                        className="border border-gray-300 rounded p-2 text-sm"
                      />%
                    </div>


                    <h2 className="text-black font-extrabold">Dropshipping</h2>
                    <hr className="my-2 border-gray-300" />

                    {[
                      { label: 'NZ dropshipping pricing', name: 'nzDropshipping' },
                    ].map(opt => (
                      <div key={opt.name}>
                        {/* Auto Calculate Checkbox */}
                        <div className="flex items-center gap-4">
                          <input
                            type="checkbox"
                            id={`${opt.name}AutoCalculate`}
                            name={`${opt.name}AutoCalculate`}
                            checked={billingInfo[`${opt.name}AutoCalculate`] || false}
                            onChange={e =>
                              setBillingInfo(prev => ({
                                ...prev,
                                [`${opt.name}AutoCalculate`]: e.target.checked
                              }))
                            }
                            className="border-gray-300 rounded"
                          />
                          <label className="text-sm font-medium">Auto calculate dropshipping pricing</label>
                        </div>

                        {/* NZ Dropshipping Pricing Checkbox and Dropdown */}
                        <div className="flex items-center gap-4">
                          <label className="w-1/2 text-sm font-medium"></label>

                          <input
                            type="checkbox"
                            id={opt.name}
                            name={opt.name}
                            checked={billingInfo[opt.name] || false}
                            onChange={e =>
                              setBillingInfo(prev => ({
                                ...prev,
                                [opt.name]: e.target.checked
                              }))
                            }
                            className="border-gray-300 rounded"
                          />

                          <label htmlFor={opt.name} className="text-sm font-medium w-1/2">
                            {opt.label}
                          </label>

                          <select
                            name={`${opt.name}Dropdown`}
                            value={billingInfo[`${opt.name}Dropdown`] || ''}
                            onChange={handleBillingChange}
                            className="flex-1 border border-gray-300 rounded p-2 text-sm"
                          >
                            <option value="">--- Please Select ----</option>
                            <option value="AlphaCateringEqipment">AlphaCateringEqipment</option>
                            <option value="Amazon">Amazon</option>
                            <option value="AUDropship">AUDropship</option>
                            <option value="AUDropship20223">AUDropship20223</option>
                            <option value="BarbequestGalore">BarbequestGalore</option>
                          </select>
                        </div>
                      </div>
                    ))}


                    <div className="flex items-center gap-4">
                      <div className="w-1/2 text-sm font-medium"></div>
                      <label className="w-1/2 text-sm font-medium">Additional Dropshipping Value</label>
                      <input
                        type="text"
                        name="dropshippingValue"
                        value={billingInfo.dropshippingValue || ''}
                        onChange={handleBillingChange}
                        className="min-w-[300px]  border border-gray-300 rounded p-2 text-sm"
                      />
                    </div>
                    <hr className="my-2 border-gray-300" />

                    <div className="flex items-center gap-4">
                      <label className="w-1/4 text-sm font-medium">Image Output Path</label>
                      <input
                        type="text"
                        name="imageOutputPath"
                        value={billingInfo.imageOutputPath || ''}
                        onChange={handleBillingChange}
                        className="flex-1 max-w-md border border-gray-300 rounded p-2 text-sm" />
                    </div>
                  </div>

                </div>
              )}

              {filters.region === "Order" && (
                <div className="p-4 bg-gray-50 border-b border-gray-200">
                  <h2 className="text-black font-extrabold">Order Template</h2>
                  <hr className="my-2 border-gray-300" />

                  <div className="space-y-4">
                    {/* Dropdowns with 1, 2, 3 Labels */}
                    <div className="flex flex-col items-center space-y-4 my-4">
                      {Array(3).fill().map((_, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <label className="text-sm font-medium">{index + 1}</label>
                          <select
                            name={`orderTemplate${index + 1}`}
                            value={billingInfo[`orderTemplate${index + 1}`] || ''}
                            onChange={(e) => {
                              const { name, value } = e.target;
                              setBillingInfo((prev) => ({
                                ...prev,
                                [name]: value,
                              }));
                              console.log(`${name} selected:`, value);  // Logging separately
                            }}
                            className="w-80 border border-gray-300 rounded p-2 text-sm"
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
                      ))}
                    </div>

                    <h2 className="text-black font-extrabold">Order Template</h2>
                    <hr className="my-2 border-gray-300" />

                    {[
                      { label: 'Email platform a tracking file', name: 'Emailplatformatrackingfile' },
                    ].map(opt => (
                      <div key={opt.name}>
                        <div className="flex items-center justify-center gap-4">
                          <input
                            type="checkbox"
                            id={opt.name}
                            name={opt.name}
                            checked={billingInfo[opt.name] || false}
                            onChange={(e) => {
                              const { name, checked } = e.target;
                              setBillingInfo((prev) => ({
                                ...prev,
                                [name]: checked,
                              }));
                              console.log(`${name} checked:`, checked);  // Logging separately
                            }}
                            className="border-gray-300 rounded"
                          />
                          <label htmlFor={opt.name} className="text-sm font-medium">
                            {opt.label}
                          </label>
                        </div>
                      </div>
                    ))}

                    <div className="flex items-center gap-4">
                      <div className="w-1/6 text-sm font-medium"></div>
                      <label className="w-1/4 text-sm font-medium">Tracking File Template</label>

                      <select
                        name="trackingFileTemplate"
                        value={billingInfo.trackingFileTemplate || ''}
                        onChange={(e) => {
                          const { name, value } = e.target;
                          setBillingInfo((prev) => ({
                            ...prev,
                            [name]: value,
                          }));
                          console.log(`${name} selected:`, value);  // Logging separately
                        }}
                        className="flex-1 border border-gray-300 rounded p-2 text-sm"
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

                    <h2 className="text-black font-extrabold">ReadyToShops</h2>
                    <hr className="my-2 border-gray-300" />

                    <div className="flex items-center gap-4">
                      <label className="w-1/4 text-sm font-medium">ImportFromRTS</label>
                      <input
                        type="text"
                        name="ImportFromRTS"
                        value={billingInfo.ImportFromRTS || ''}
                        onChange={(e) => {
                          const { name, value } = e.target;
                          setBillingInfo((prev) => ({
                            ...prev,
                            [name]: value,
                          }));
                          console.log(`${name} changed:`, value);  // Logging separately
                        }}
                        className="flex-1 border border-gray-300 rounded p-2 text-sm"
                      />
                    </div>
                  </div>
                </div>
              )}

              {filters.region === "Invoices" && (
                <div className="p-4 bg-gray-50 border-b border-gray-200">
                  <h2 className="text-black font-extrabold">Invoice Template</h2>
                  <hr className="my-2 border-gray-300" />

                  <div className="space-y-4">

                    {/* Email Platform Checkbox */}
                    <div>
                      <div className="flex items-center justify-center gap-4">
                        <input
                          type="checkbox"
                          id="emailPlatforminvoice"
                          name="emailPlatforminvoice"
                          // checked={billingInfo.emailPlatforminvoice || false}
                          checked={!!billingInfo.emailPlatforminvoice}

                          onChange={(e) => {
                            const { name, checked } = e.target;
                            setBillingInfo((prev) => ({
                              ...prev,
                              [name]: checked,
                            }));
                            console.log(`${name} checked:`, checked);
                          }}
                          className="border-gray-300 rounded"
                        />
                        <label className="text-sm font-medium">Email platform an invoice</label>
                      </div>
                    </div>

                    {/* Invoice Template Dropdown */}
                    <div className="flex items-center gap-2">
                      <label className="w-1/5 text-sm font-medium pl-12">Invoice Template</label>
                      <select
                        name="invoiceTemplate"
                        value={billingInfo.invoiceTemplate || ''}
                        onChange={(e) => {
                          const { name, value } = e.target;
                          setBillingInfo((prev) => ({
                            ...prev,
                            [name]: value,
                          }));
                          console.log(`${name} selected:`, value);
                        }}
                        className="flex border border-gray-300 rounded p-2 text-sm w-3/4"
                      >
                        <option value="">--- Please Select ----</option>
                        <option value="SalesInvoiceV4_robot.html">SalesInvoiceV4_robot.html</option>
                        <option value="SalesInvoiceV4nz_robot.html">SalesInvoiceV4nz_robot.html</option>
                        <option value="SalesInvoiceV4.coles.html">SalesInvoiceV4.coles.html</option>
                        <option value="SalesInvoiceV3_robot.html">SalesInvoiceV3_robot.html</option>
                        <option value="SalesInvoiceV4coles_robot.html">SalesInvoiceV4coles_robot.html</option>
                      </select>
                    </div>

                    {/* Invoice General */}
                    <h2 className="text-black font-extrabold">Invoice General</h2>
                    <hr className="my-2 border-gray-300" />

                    {/* Invoice or PO Input */}
                    <div className="flex items-center">
                      <label className="w-1/4 text-sm font-medium">Invoice or PO</label>
                      <input
                        type="text"
                        name="invoiceOrPO"
                        value={billingInfo.invoiceOrPO || ''}
                        onChange={(e) => {
                          const { name, value } = e.target;
                          setBillingInfo((prev) => ({
                            ...prev,
                            [name]: value,
                          }));
                          console.log(`${name} changed:`, value);
                        }}
                        className="flex-1 border border-gray-300 rounded p-2 text-sm"
                      />
                    </div>

                    {/* Invoice Folder Input */}
                    <div className="flex items-center">
                      <label className="w-1/4 text-sm font-medium">Invoice Folder</label>
                      <input
                        type="text"
                        name="invoiceFolder"
                        value={billingInfo.invoiceFolder || ''}
                        onChange={(e) => {
                          const { name, value } = e.target;
                          setBillingInfo((prev) => ({
                            ...prev,
                            [name]: value,
                          }));
                          console.log(`${name} changed:`, value);
                        }}
                        className="flex-1 border border-gray-300 rounded p-2 text-sm"
                      />
                    </div>

                    {[
                      { label: '1POINV', name: '1POINV' },
                      { label: 'Customer invoice lnc GST', name: 'CustomerinvoicelncGST' },
                      { label: 'Check missing invoice', name: 'missinginvoice' },
                      { label: 'Email invoice required', name: 'Emailinvoicerequired' },
                    ].map(opt => (
                      <div key={opt.name} className="flex justify-center">
                        <div className="flex items-center w-full max-w-md gap-3">
                          <input
                            type="checkbox"
                            id={opt.name}
                            name={opt.name}
                            checked={billingInfo[opt.name] || false}
                            onChange={(e) => {
                              const { name, checked } = e.target;
                              setBillingInfo((prev) => ({
                                ...prev,
                                [name]: checked,
                              }));
                              console.log(`${name} checked:`, checked);
                            }}
                            className="border-gray-300 rounded"
                          />
                          <label htmlFor={opt.name} className="text-sm font-medium whitespace-nowrap">
                            {opt.label}
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {filters.region === "Payment" && (
                <div className="p-4 bg-gray-50 border-b border-gray-200">
                  <h2 className="text-black font-extrabold">Payement</h2>
                  <hr className="my-2 border-gray-300" />

                  <div className="space-y-4">

                    {/* Email Platform Checkbox */}
                    <div>
                      <div className="flex items-center justify-center gap-4">
                        <input
                          type="checkbox"
                          id="paymentrequired"
                          name="paymentrequired"
                          // checked={billingInfo.paymentrequired || false}
                          checked={!!billingInfo.paymentrequired}

                          onChange={(e) => {
                            const { name, checked } = e.target;
                            setBillingInfo((prev) => ({
                              ...prev,
                              [name]: checked,
                            }));
                            console.log(`${name} checked:`, checked);
                          }}
                          className="border-gray-300 rounded"
                        />
                        <label className="text-sm font-medium">Payment required</label>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <label className="w-1/4 text-sm font-medium">Payement Terms</label>
                      <input
                        type="text"
                        name="payementterm"
                        value={billingInfo.payementterm || ''}
                        onChange={(e) => {
                          const { name, value } = e.target;
                          setBillingInfo((prev) => ({
                            ...prev,
                            [name]: value,
                          }));
                          console.log(`${name} changed:`, value);
                        }}
                        className="w-40 border border-gray-300 rounded p-2 text-sm"
                      />
                      <span className="ml-2">Days</span>
                    </div>

                    {/* Invoice Folder Input */}
                    <div className="flex items-center">
                      <label className="w-1/4 text-sm font-medium">Bank Reference Name</label>
                      <input
                        type="text"
                        name="bankReferenceName"
                        value={billingInfo.bankReferenceName || ''}
                        onChange={(e) => {
                          const { name, value } = e.target;
                          setBillingInfo((prev) => ({
                            ...prev,
                            [name]: value,
                          }));
                          console.log(`${name} changed:`, value);
                        }}
                        className="flex-1 border border-gray-300 rounded p-2 text-sm"
                      />
                    </div>

                    <h2 className="text-black font-extrabold">QuickBooks</h2>
                    <hr className="my-2 border-gray-300" />
                    {/* Invoice Template Dropdown */}
                    <div className="flex items-center gap-2">
                      <label className="w-1/4 text-sm font-medium pl-12">QuickBooks OrderID Field</label>
                      <select
                        name="QuickBooksOrderID"
                        value={billingInfo.QuickBooksOrderID || ''}
                        onChange={(e) => {
                          const { name, value } = e.target;
                          setBillingInfo((prev) => ({
                            ...prev,
                            [name]: value,
                          }));
                          console.log(`${name} selected:`, value);
                        }}
                        className="flex border border-gray-300 rounded p-2 text-sm w-3/4"
                      >
                        <option value="">--- Please Select ----</option>
                        <option value="Order Doc Num1">Order Doc Num1</option>
                        <option value="Order Doc Num2">Order Doc Num2</option>
                        <option value="nvoice Doc Num">Invoice Doc Num</option>
                        <option value="Delivery Notes">Delivery Notes</option>
                        <option value="Delivery Notes2">Delivery Notes2</option>
                      </select>
                    </div>
                    <div className="flex items-center">
                      <label className="w-1/4 text-sm font-medium">Text to be removed from Delivery</label>
                      <input
                        type="text"
                        name="removedtext"
                        value={billingInfo.removedtext || ''}
                        onChange={(e) => {
                          const { name, value } = e.target;
                          setBillingInfo((prev) => ({
                            ...prev,
                            [name]: value,
                          }));
                          console.log(`${name} changed:`, value);
                        }}
                        className="flex-1 border border-gray-300 rounded p-2 text-sm"
                      />
                    </div>
                    {/* Invoice General */}
                    <h2 className="text-black font-extrabold">Payement Notes</h2>
                    <hr className="my-2 border-gray-300" />

                    {/* Invoice or PO Input */}


                    <textarea
                      name="paymentNote"
                      value={billingInfo.paymentNote || ''}
                      onChange={handleBillingChange}
                      rows={4}
                      className="w-full border border-gray-300 rounded p-2 text-sm resize-none"
                    />

                  </div>
                </div>
              )}

              {filters.region === "Pricing Rules" && (
                <div className="p-4 bg-gray-50 border-b border-gray-200">
                  <h2 className="text-black font-extrabold">Order Template</h2>
                  <hr className="my-2 border-gray-300" />

                  <div className="space-y-4">
                    <div className="flex flex-col items-center space-y-4 my-4">
                      <div className="flex flex-col gap-6 w-full max-w-[400px]">
                        <div className="flex items-center gap-3">
                          <label className="w-36 text-sm font-medium">Currency</label>
                          <select
                            name="Currency"
                            value={billingInfo.Currency || ''}
                            onChange={(e) => {
                              const { name, value } = e.target;
                              setBillingInfo((prev) => ({
                                ...prev,
                                [name]: value,
                              }));
                              console.log(`${name} selected:`, value);
                            }}
                            className="flex-1 border border-gray-300 rounded p-2 text-sm"
                          >
                            <option value="">--- Please Select ----</option>
                            <option value="AUD">AUD</option>
                            <option value="NZD">NZD</option>
                            <option value="USD">USD</option>
                            <option value="CAD">CAD</option>
                          </select>
                        </div>

                        <div className="flex items-center gap-3">
                          <label className="w-36 text-sm font-medium">Pricing Rules</label>
                          <input
                            type="text"
                            name="pricingRules"
                            value={billingInfo.pricingRules || ''}
                            onChange={(e) => {
                              const { name, value } = e.target;
                              setBillingInfo((prev) => ({
                                ...prev,
                                [name]: value,
                              }));
                              console.log(`${name} changed:`, value);
                            }}
                            className="flex-1 border border-gray-300 rounded p-2 text-sm"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-6 mb-4 cursor-pointer">
                      {['Version 4 & 5', 'Version 3', 'Version 2'].map((tab) => (
                        <button
                          key={tab}
                          onClick={() => setActiveVersion(tab)}
                          className={`text-sm cursor-pointer font-semibold pb-2 border-b-2 ${activeVersion === tab ? 'border-black text-black' : 'border-transparent text-gray-500'
                            }`}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>

                    {activeVersion === 'Version 4 & 5' && (

                      <div className="space-y-4">

                        <div className="text-xs text-gray-500">
                          Channel; Selling PriceOrSupplyPrice; Discount; Commission; RoundingLow; Rounding High; NZPrice
                          Version 3; Product Price; MULTIPLY; 85%; PLUS; Shipping; MULTIPLY; 110%; DIVIDE; 88%, MULTIPLY, 100%; 0.50; 0.90
                        </div>

                        <div className="flex items-center gap-3">
                          <input type="checkbox"
                            id="offSellingPricecheckbox"
                            name="offSellingPricecheckbox"
                            // checked={billingInfo.offSellingPricecheckbox || false}
                            checked={!!billingInfo.offSellingPricecheckbox}
                            onChange={e =>
                              setBillingInfo(prev => ({
                                ...prev,
                                offSellingPricecheckbox: e.target.checked
                              }))
                            } />
                          <label className="w-48 text-sm">% off Selling Price</label>
                          <div className="relative">
                            <input
                              type="number"
                              name="offSellingPrice"
                              value={billingInfo.offSellingPrice || ''}
                              onChange={(e) => {
                                const { name, value } = e.target;
                                setBillingInfo((prev) => ({
                                  ...prev,
                                  [name]: value,
                                }));
                                console.log(`${name} changed:`, value);
                              }}
                              className="w-40 border border-gray-300 rounded px-2 py-1 text-sm pr-6"
                              placeholder="15"
                            />
                            <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">%</span>
                          </div>

                        </div>

                        <div className="flex items-center gap-3">
                          <input type="checkbox"
                            id="plusShipping"
                            name="plusShipping"
                            // checked={billingInfo.plusShipping || false}
                            checked={!!billingInfo.plusShipping}

                            onChange={e =>
                              setBillingInfo(prev => ({
                                ...prev,
                                plusShipping: e.target.checked
                              }))
                            }
                          />
                          <label className="w-48 text-sm">Plus Shipping</label>
                        </div>

                        <div className="flex items-center gap-3">
                          <input type="checkbox"
                            id="calculateNZPricecheckbox"
                            name="calculateNZPricecheckbox"
                            // checked={billingInfo.calculateNZPricecheckbox || false}
                            checked={!!billingInfo.calculateNZPricecheckbox}

                            onChange={e =>
                              setBillingInfo(prev => ({
                                ...prev,
                                calculateNZPricecheckbox: e.target.checked
                              }))
                            }
                          />
                          <label className="w-48 text-sm">Calculate NZ Price</label>

                          <div className="relative">
                            <input
                              type="number"
                              name="calculateNZPrice"
                              value={billingInfo.calculateNZPrice || ''}
                              onChange={(e) => {
                                const { name, value } = e.target;
                                setBillingInfo((prev) => ({
                                  ...prev,
                                  [name]: value,
                                }));
                                console.log(`${name} changed:`, value);
                              }}
                              className="w-40 border border-gray-300 rounded px-2 py-1 text-sm pr-6"
                              placeholder="1.1"

                            />
                          </div>  </div>

                        <div className="flex items-center gap-3">
                          <input type="checkbox"
                            id="calculateRetailPricecheckbox"
                            name="calculateRetailPricecheckbox"
                            // checked={billingInfo.calculateRetailPricecheckbox || false}
                            checked={!!billingInfo.calculateRetailPricecheckbox}

                            onChange={e =>
                              setBillingInfo(prev => ({
                                ...prev,
                                calculateRetailPricecheckbox: e.target.checked
                              }))
                            }
                          />
                          <label className="w-48 text-sm">Calculate Retail Price</label>
                          <div className="relative">
                            <input
                              type="number"
                              name="calculateRetailPrice"
                              value={billingInfo.calculateRetailPrice || ''}
                              onChange={(e) => {
                                const { name, value } = e.target;
                                setBillingInfo((prev) => ({
                                  ...prev,
                                  [name]: value,
                                }));
                                console.log(`${name} changed:`, value);
                              }}
                              className="w-40 border border-gray-300 rounded px-2 py-1 text-sm pr-6"
                              placeholder="12"

                            />
                            <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">%</span>
                          </div>

                        </div>

                        <div className="flex items-center gap-3">
                          <input type="checkbox"
                            id="calculateGSTcheckbox"
                            name="calculateGSTcheckbox"
                            // checked={billingInfo.calculateGSTcheckbox || false}
                            checked={!!billingInfo.calculateGSTcheckbox}

                            onChange={e =>
                              setBillingInfo(prev => ({
                                ...prev,
                                calculateGSTcheckbox: e.target.checked
                              }))
                            } />
                          <label className="w-48 text-sm">Calculate GST</label>
                          <div className="relative">
                            <input
                              type="number"
                              name="calculateGST"
                              value={billingInfo.calculateGST || ''}
                              onChange={(e) => {
                                const { name, value } = e.target;
                                setBillingInfo((prev) => ({
                                  ...prev,
                                  [name]: value,
                                }));
                                console.log(`${name} changed:`, value);
                              }}
                              className="w-40 border border-gray-300 rounded px-2 py-1 text-sm pr-6"
                              placeholder="15"

                            />
                            <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">%</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <input type="checkbox"
                            id="roundingLowcheckbox"
                            name="roundingLowcheckbox"
                            // checked={billingInfo.roundingLowcheckbox || false}
                            checked={!!billingInfo.roundingLowcheckbox}

                            onChange={e =>
                              setBillingInfo(prev => ({
                                ...prev,
                                roundingLowcheckbox: e.target.checked
                              }))
                            }
                          />
                          <label className="w-48 text-sm">Rounding Low</label>
                          <div className="relative">
                            <input
                              type="number"
                              name="roundingLow"
                              value={billingInfo.roundingLow || ''}
                              onChange={(e) => {
                                const { name, value } = e.target;
                                setBillingInfo((prev) => ({
                                  ...prev,
                                  [name]: value,
                                }));
                                console.log(`${name} changed:`, value);
                              }}
                              className="w-40 border border-gray-300 rounded px-2 py-1 text-sm pr-6"
                              placeholder="0.5"

                            />
                          </div>  </div>

                        <div className="flex items-center gap-3">
                          <input type="checkbox"
                            id="roundingHighcheckbox"
                            name="roundingHighcheckbox"
                            // checked={billingInfo.roundingHighcheckbox || false}
                            checked={!!billingInfo.roundingHighcheckbox}

                            onChange={e =>
                              setBillingInfo(prev => ({
                                ...prev,
                                roundingHighcheckbox: e.target.checked
                              }))
                            }
                          />
                          <label className="w-48 text-sm">Rounding High</label>
                          <div className="relative">
                            <input
                              type="number"
                              name="roundingHigh"
                              value={billingInfo.roundingHigh || ''}
                              onChange={(e) => {
                                const { name, value } = e.target;
                                setBillingInfo((prev) => ({
                                  ...prev,
                                  [name]: value,
                                }));
                                console.log(`${name} changed:`, value);
                              }}
                              className="w-40 border border-gray-300 rounded px-2 py-1 text-sm pr-6"
                              placeholder="0.9"

                            />
                          </div>  </div>

                        <hr className="my-2 border-gray-300" />

                        <div className="flex items-start gap-3 pt-2">
                          <input type="checkbox"
                            id="Version5"
                            name="Version5"
                            // checked={billingInfo.Version5 || false}
                            checked={!!billingInfo.Version5}

                            onChange={e =>
                              setBillingInfo(prev => ({
                                ...prev,
                                roundingHighcheckbox: e.target.checked
                              }))
                            }
                          />
                          <label className=" text-sm">
                            Exclude GST Price (Version 5: GST has to be excluded after all round ups)
                          </label>
                        </div>
                      </div>

                    )}



                    {activeVersion === 'Version 3' && (
                      <div className="space-y-4">
                        <div className="text-xs text-gray-500">
                          Channel; Selling PriceOrSupplyPrice; Discount; Commission; RoundingLow; Rounding High; NZPrice
                          Version 3; Product Price; MULTIPLY; 85%; PLUS; Shipping; MULTIPLY; 110%; DIVIDE; 88%, MULTIPLY, 100%; 0.50; 0.90
                        </div>

                        <div className="flex items-center gap-3">
                          <input type="checkbox" />
                          <label className="w-48 text-sm">% off Selling Price</label>
                          <div className="relative">
                            <input
                              type="number"
                              className="w-40 border border-gray-300 rounded px-2 py-1 text-sm pr-6"
                              placeholder="15"
                            />
                            <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">%</span>
                          </div>

                        </div>

                        <div className="flex items-center gap-3">
                          <input type="checkbox" />
                          <label className="w-48 text-sm">Plus Shipping</label>
                        </div>

                        <div className="flex items-center gap-3">
                          <input type="checkbox" />
                          <label className="w-48 text-sm">Calculate NZ Price</label>

                          <div className="relative">
                            <input
                              type="number"
                              className="w-40 border border-gray-300 rounded px-2 py-1 text-sm pr-6"
                              placeholder="1.1"

                            />
                          </div>  </div>

                        <div className="flex items-center gap-3">
                          <input type="checkbox" />
                          <label className="w-48 text-sm">Calculate Retail Price</label>
                          <div className="relative">
                            <input
                              type="number"
                              className="w-40 border border-gray-300 rounded px-2 py-1 text-sm pr-6"
                              placeholder="12"

                            />
                            <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">%</span>
                          </div>

                        </div>

                        <div className="flex items-center gap-3">
                          <input type="checkbox" />
                          <label className="w-48 text-sm">Calculate GST</label>
                          <div className="relative">
                            <input
                              type="number"
                              className="w-40 border border-gray-300 rounded px-2 py-1 text-sm pr-6"
                              placeholder="15"

                            />
                            <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">%</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <input type="checkbox" />
                          <label className="w-48 text-sm">Rounding Low</label>
                          <div className="relative">
                            <input
                              type="number"
                              className="w-40 border border-gray-300 rounded px-2 py-1 text-sm pr-6"
                              placeholder="0.5"

                            />
                          </div>  </div>

                        <div className="flex items-center gap-3">
                          <input type="checkbox" />
                          <label className="w-48 text-sm">Rounding High</label>
                          <div className="relative">
                            <input
                              type="number"
                              className="w-40 border border-gray-300 rounded px-2 py-1 text-sm pr-6"
                              placeholder="0.9"

                            />
                          </div>  </div>


                      </div>
                    )}
                    {activeVersion === 'Version 2' && (
                      <div className="space-y-4">
                        <div className="text-xs text-gray-500">
                          Channel;Selling PriceOrSupplyPrice; Discount;Commission; RoundingLow; Rounding High; NZPrice
                          Version2;Supply Price; Product;0.15;0.4,0.1,0.50;0.90;false
                        </div>
                        <div className="flex items-center gap-3">
                          <label className="w-56 text-sm font-medium">SellingPrice or SupplyPrice</label>
                          <div className="relative">
                            <input
                              type="number"
                              className="flex-1 border border-gray-300 rounded p-2 text-sm"
                            />
                          </div>

                        </div>
                        <div className="text-xs text-gray-500">
                          Selling Price is the price before commission deducted<br />
                          Supply Price is the net and no commission will be deducted
                        </div>

                        <div className="flex items-center gap-3">
                          <label className="w-56 text-sm font-medium">% Off Selling Price</label>
                          <div className="relative">
                            <input
                              type="number"
                              className="flex-1 border border-gray-300 rounded p-2 text-sm"
                            />
                            <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">10%</span>
                          </div>
                        </div>
                        <div className="text-xs text-gray-500">
                          10% inc shipping, 15% if platform pays for shipping
                        </div>
                        <div className="flex items-center gap-3">
                          <label className="w-56 text-sm font-medium">Commission</label>
                          <div className="relative">
                            <input
                              type="number"
                              className="flex-1 border border-gray-300 rounded p-2 text-sm"
                            />
                          </div>                            </div>
                        <div className="flex items-center gap-3">
                          <label className="w-56 text-sm font-medium">Rounding Low</label>
                          <div className="relative">
                            <input
                              type="number"
                              className="flex-1 border border-gray-300 rounded p-2 text-sm"
                            />
                          </div>                               </div>
                        <div className="flex items-center gap-3">
                          <label className="w-56 text-sm font-medium">Rounding High</label>
                          <div className="relative">
                            <input
                              type="number"
                              className="flex-1 border border-gray-300 rounded p-2 text-sm"
                            />
                          </div>                               </div>
                        <div className="flex items-center gap-3">
                          <label className="w-56 text-sm font-medium">NZPrice</label>
                          <input type="checkbox" className="flex-none" />
                        </div>
                        <div className="text-xs text-gray-500">
                          NZ Dropshipping price must use "SupplyPrice"
                        </div>
                      </div>

                    )}

                    <div className="flex gap-4 pt-4">
                      <button className="bg-green-600 text-white px-4 py-2 rounded">Set Pricing Rules</button>
                      <button className="bg-green-600 text-white px-4 py-2 rounded">Apply to All Products</button>
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
       
      </form>

    </div>
  );
};

export default TableWithCheckboxes;


