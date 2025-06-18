"use client";
import React, { useState, useEffect, Suspense } from "react";
import { submitAction } from '@/actions/salesChannel';
import { toast } from 'react-hot-toast';
import { X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

const HeaderAddSaleContent = ({ onClose }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [billingInfo, setBillingInfo] = useState({
    salesChannelName: '',
    salesChannelType: '',
    suburbState: '',
    company: '',
    website: '',
    email: '',
    accountmanagar: '',
    invoice: '',
    tracking: '',
    cancleorder: '',
    startOnCampaign: false,
    dateFrom: '',
    dateTo: '',
    discountPercentage: '',
    campaignNote: '',
    salesChannelCode: '',
    orderNumberPrefix: '',
    descriptionChannel: false,
    sellingChannel: false,
    commissionPercentage: '',
    plusShipping: false,
    calculateNZPricecheckbox: false,
    calculateNZPrice: '',
    calculateRetailPricecheckbox: false,
    calculateRetailPrice: '',
    calculateGSTcheckbox: false,
    calculateGST: '',
    roundingLowcheckbox: false,
    roundingLow: '',
    roundingHighcheckbox: false,
    roundingHigh: '',
    imageOutputPath: '',
    invoiceTemplate: '',
    invoiceOrPO: '',
    invoiceFolder: '',
    '1POINV': false,
    CustomerinvoicelncGST: false,
    missinginvoice: false,
    Emailinvoicerequired: false,
    paymentrequired: false,
    bankReferenceName: '',
    QuickBooksOrderID: '',
    removedtext: '',
    paymentNote: '',
    Currency: '',
    offSellingPrice: '',
  });

  const [isUpdateMode, setIsUpdateMode] = useState(false);

  useEffect(() => {
    const action = searchParams.get('action');
    const data = searchParams.get('data');
    
    if (action === 'update' && data) {
      setIsUpdateMode(true);
      try {
        const decodedData = JSON.parse(decodeURIComponent(data));
        setBillingInfo(prev => ({
          ...prev,
          ...decodedData
        }));
      } catch (error) {
        console.error('Error parsing data:', error);
        toast.error('Error loading data');
      }
    }
  }, [searchParams]);

  const [filters, setFilters] = useState({
    region: "Billing Information",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [activeVersion, setActiveVersion] = useState('Version 4 & 5');

  const handleBillingChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBillingInfo(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleRegionFilter = (region) => {
    setFilters(prev => ({ ...prev, region }));
  };
  const handleclose= () => {
    router.push('/SaleChannel');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Show loading toast
    const loadingToast = toast.loading(
      <div className="flex items-center gap-3">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
        <div className="flex flex-col">
          <p className="font-semibold">Saving Sales Channel</p>
          <p className="text-sm opacity-90">Please wait...</p>
        </div>
      </div>
    );

    try {
      const result = await submitAction({
        ...billingInfo,
      });
      
      // Dismiss loading toast
      toast.dismiss(loadingToast);
      
      if (result.success) {
        toast.success(
          <div className="flex items-center gap-2">
            <span className="text-lg">✨</span>
            <div>
              <p className="font-semibold">Sales Channel Saved</p>
              <p className="text-sm opacity-90">Successfully saved the changes</p>
            </div>
          </div>
        );
        router.push('/SaleChannel');
      } else {
        toast.error(
          <div className="flex items-center gap-2">
            <span className="text-lg">❌</span>
            <div>
              <p className="font-semibold">Save Failed</p>
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
            <p className="text-sm opacity-90">{error.message || 'An unexpected error occurred'}</p>
          </div>
        </div>
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
    className="fixed inset-0    flex justify-center items-center mt-15 overflow-y-auto"
    >
      <div className="bg-white  rounded-lg p-6 max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add Sales Channel</h2>
          <button onClick={handleclose} 
            className="hover:text-red-400 cursor-pointer"
          >
          <X size={20} className=" rounded-lg" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex gap-4">
          <div className="bg-white h-20 rounded-lg p-2 shadow-md flex flex-wrap gap-1 mb-2">
            <div className="flex flex-col items-start gap-1 w-full">
              <div className="flex items-center gap-2 w-full">
                <span className="text-red-600 mt-1">*</span>
                <label className="text-sm font-medium whitespace-nowrap w-32">Sales Channel Name</label>
                <input 
                  type="text"
                  name="salesChannelName"
                  value={billingInfo.salesChannelName || ''}
                  onChange={handleBillingChange}
                  className="flex-1 border border-gray-300 rounded p-1 text-sm h-8 w-full"
                  required
                />
              </div>

              <div className="flex items-center gap-2 w-full">
                <span className="text-red-600 mt-1">*</span>
                <label className="text-sm font-medium whitespace-nowrap w-32">Sales Channel Type</label>
                <select 
                  name="salesChannelType"
                  value={billingInfo.salesChannelType || ''}
                  onChange={handleBillingChange}
                  className="flex-1 border border-gray-300 rounded p-1 text-sm h-8 w-full"
                >
                  <option value="">--- Please Select ----</option>
                  <option value="Dropshiper">Dropshiper</option>
                  <option value="DropshiperNZ">DropshiperNZ</option>
                  <option value="Plateform">Plateform</option>
                  <option value="Price List">Price List</option>
                  <option value="Others">Others</option>
                </select>
              </div>
            </div>
          </div>
<div>
          <div className="rounded-xl border w-full bg-white border-gray-300 shadow-lg">
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
                  type="button"
                  className={`py-1.5 px-3 rounded-md text-sm transition ${
                    filters.region === region
                      ? 'bg-[#449ae6] text-white'
                      : 'text-gray-700 hover:bg-[#449ae6] hover:text-white'
                  }`}
                  onClick={() => handleRegionFilter(region)}
                >
                  {region}
                </button>
              ))}
            </div>

            {filters.region === "Billing Information" && (
              <div className="p-4 bg-gray-50">
                <div className="space-y-4">
                  {[
                    { label: 'Company Name', name: 'company', type: 'text' },
                    { label: 'Website', name: 'website', type: 'text' },
                    { label: 'Address 1', name: 'address1', type: 'text' },
                    { label: 'Address 2', name: 'address2', type: 'text' },
                    { label: 'First Name', name: 'firstName', type: 'text' },
                    { label: 'Last Name', name: 'lastName', type: 'text' },
                    { label: 'State', name: 'suburbState', type: 'text' },
                    { label: 'Postcode', name: 'postcode', type: 'text' },
                    { label: 'Email', name: 'email', type: 'email' },
                    { label: 'Phone', name: 'phone', type: 'tel' },
                    { label: 'ABN', name: 'abn', type: 'text' },
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

            {filters.region === "Email" && (
              <div className="p-4 bg-gray-50">
                <div className="space-y-4">
                  {[
                    { label: 'Account Manager', name: 'accountmanagar', type: 'text' },
                    { label: 'Invoice/PO', name: 'invoice', type: 'text' },
                    { label: 'Tracking', name: 'tracking', type: 'text' },
                    { label: 'Cancel Order', name: 'cancleorder', type: 'text' },
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
                    <select
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
                        className="flex border border-gray-300 rounded p-2 text-sm w-3/4"
                      >
                        <option value="">--- Please Select ----</option>
                        <option value="7 Day">7 Day</option>
                        <option value="14 Days">14 Days</option>
                        <option value="30 Days">30 Days</option>
                        <option value="60 Days">60 Days</option>
                        <option value="90 Days">90 Days</option>
                        <option value="120 Days">120 Days</option>


                      </select>
                    </div>
                    {/* <div className="flex items-center">
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
                    </div> */}

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
                      {['Version 4 & 5',].map((tab) => (
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
                            id="versioncheckbox"
                            name="versioncheckbox"
                            // checked={billingInfo.roundingHighcheckbox || false}
                            checked={!!billingInfo.versioncheckbox}

                            onChange={e =>
                              setBillingInfo(prev => ({
                                ...prev,
                                versioncheckbox: e.target.checked
                              }))
                            }
                          />
                          <label className=" text-sm">
                            Exclude GST Price (Version 5: GST has to be excluded after all round ups)
                          </label>
                        </div>
                      </div>

                    )}


{/* 
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
                          NZ Dropshipping price must use &quot;SupplyPrice&quot;
                        </div>
                      </div>

                    )} */}

                    <div className="flex gap-4 pt-4">
                      <button className="bg-green-600 text-white px-4 py-2 rounded">Set Pricing Rules</button>
                      <button className="bg-green-600 text-white px-4 py-2 rounded">Apply to All Products</button>
                    </div>
                  </div>
                </div>
              )}
            {/* Add other sections here */}
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 text-sm text-white bg-[#449ae6] rounded-md hover:bg-[#3d8ad1] disabled:opacity-50"
            >
              {isLoading ? (isUpdateMode ? 'Updating...' : 'Saving...') : (isUpdateMode ? 'Update' : 'Save')}
            </button>
          </div>
          </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const HeaderAddSale = ({ onClose }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeaderAddSaleContent onClose={onClose} />
    </Suspense>
  );
};

export default HeaderAddSale;


