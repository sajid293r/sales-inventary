'use client'
import React, { useState } from 'react';

const Page = () => {
  const [Email, setEmail] = useState(false);
  const [formData, setFormData] = useState({
    accountManager: '',
    invoicePO: '',
    tracking: '',
    cancelOrder: '',
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleClick = () => {
    setEmail(!Email);
  };

  return (
    <>
     <div className='flex lg:flex-row md:flex-row sm:flex-col lg:gap-6 md:gap-6 sm:gap-2'>
      <div className='p-8 rounded-md bg-white lg:h-52 md:h-52 sm:h-auto'>
 <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1">
                <label className="w-1/2 sm:w-40 text-sm font-medium text-gray-700">Sales Channel ID</label>
                <input
                  name="accountManager"
                  type="text"
                  value={formData.accountManager}
                  onChange={handleChange}
                  className="w-1/2 p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
               
                />
              </div>
<div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 py-3">
                <label className="w-1/2 sm:w-40 text-sm font-medium text-gray-700">Sales Channel Type</label>
                <select id="currency" name="currency" className='w-1/2 p-2 border rounded-lg shadow-sm'>
  <option value="usd" >----Please select----</option>
  <option value="eur">EUR - Euro</option>
  <option value="gbp">GBP - British Pound</option>
  <option value="inr">INR - Indian Rupee</option>
  <option value="jpy">JPY - Japanese Yen</option>
</select>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1">
                <label className="w-1/2 sm:w-40 text-sm font-medium text-gray-700">Sales Channel Name</label>
                <input
                  name="accountManager"
                  type="text"
                  value={formData.accountManager}
                  onChange={handleChange}
                  className="w-1/2 p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
               
                />
              </div>
      </div>
      <div className="px-4  w-full md:w-[1000px] lg:w-[1000px] mx-auto">
        <button
          onClick={handleClick}
          className={`w-full sm:w-auto px-4 py-2 rounded transition-colors ease-in-out font-bold duration-300 ${
            Email ? 'bg-white text-black' : 'bg-[#cbcccf]'
          }`}
        >
          Email
        </button>
        
        <div >
          {Email && (
            <div className=" bg-white rounded-md shadow-md p-4 sm:p-6">
            <div className="flex flex-col gap-4 py-3 w-full">
              {/* Account Manager */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                <label className="w-full sm:w-40 text-sm font-medium text-gray-700">Account Manager</label>
                <input
                  name="accountManager"
                  type="text"
                  value={formData.accountManager}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter Account Manager"
                />
              </div>

              {/* Invoice/PO */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                <label className="w-full sm:w-40 text-sm font-medium text-gray-700">Invoice/PO</label>
                <input
                  name="invoicePO"
                  type="text"
                  value={formData.invoicePO}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter Invoice or PO"
                />
              </div>

              {/* Tracking */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                <label className="w-full sm:w-40 text-sm font-medium text-gray-700">Tracking</label>
                <input
                  name="tracking"
                  type="text"
                  value={formData.tracking}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter Tracking Info"
                />
              </div>

              {/* Cancel Order */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                <label className="w-full sm:w-40 text-sm font-medium text-gray-700">Cancel Order</label>
                <input
                  name="cancelOrder"
                  type="text"
                  value={formData.cancelOrder}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter Cancellation Reason"
                />
              </div>
            </div>
            </div>

          )}
        </div>
      </div>
      </div>
    </>
  );
};

export default Page;