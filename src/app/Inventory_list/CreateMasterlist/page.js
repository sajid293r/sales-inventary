'use client'
import React , { useState } from 'react'
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
const Page = () => {
   const [message, setMessage] = useState('');
   const [message1, setMessage1] = useState('');
  return (
       <div
        className={`p-2 sm:p-4 mx-auto w-full  min-w-[640px] md:min-w-[800px] lg:min-w-[1000px] xl:min-w-[1300px] 2xl:min-w-[1300px] 3xl:min-w-[1400px] 4xl:min-w-[1600px] `}
      >
          <div className="flex flex-col sm:flex-row justify-between mb-4 gap-3">
        <div className="flex items-center gap-2">
          <div className='border rounded-md p-1'>
          <Link href="/Inventory_list/Inventorylist">
            <FaArrowLeft size={16}  className='text-sm'/>
          </Link>
          </div>
          <h1 className="text-base sm:text-lg md:text-xl text-black font-semibold">
            Create Masterlist
          </h1>
        </div>
        <div className="flex gap-2 sm:gap-4 justify-end items-center">
          
          <button className="bg-[#52ce66] text-white py-1 sm:py-2 px-3 sm:px-4 rounded-md text-sm hover:bg-[#48b55a] transition">
            Save
          </button>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
        {/* Left Section */}
        <div className="border rounded-md w-full lg:w-3/4 bg-white p-4 sm:p-6">
         

          <label className="flex flex-col mt-4">
            <span className="mb-2 text-gray-900 text-sm sm:text-base">Product Title</span>
            <input
              type="text"
              className="border border-gray-400 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
          </label>
          
          <label className="flex flex-col mt-4">
            <span className="mb-2 text-gray-900 text-sm sm:text-base">Long Title</span>
            <input
              type="text"
              className="border border-gray-400 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
          </label>

          <label className="flex flex-col mt-4">
            <span className="mb-2 text-gray-900 text-sm sm:text-base">Short Title</span>
            <input
              type="text"
              className="border border-gray-400 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
          </label>

          <label className="flex flex-col mt-4">
            <span className="mb-2 text-gray-900 text-sm sm:text-base">Description</span>
              <textarea
        id="message"
        name="message"
        rows="5"
        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Type your message here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
          </label>

    
        </div>

        {/* Right Section */}
        <div className="flex flex-col gap-4 w-full lg:w-1/4">
          {/* Status Section */}
          <div className="border rounded-md bg-white p-4">
            <label className="flex flex-col">
              <span className="text-black text-sm font-semibold mb-2">Status</span>
              <select className="text-sm border w-full p-1 rounded-md">
                <option value="">Status</option>
                <option value="Active">Active</option>
                <option value="Unactive">Inactive</option>
              </select>
            </label>
          </div>

          {/* Pricing Section */}
          <div className="border rounded-md bg-white p-4">
            <h1 className=' text-black text-sm font-semibold  '>Product Category</h1>
            
           
                    <textarea
        id="message"
        name="message"
        rows="5"
        className="w-full p-3 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
       
        value={message1}
        onChange={(e) => setMessage1(e.target.value)}
      />
            
       <div>
        <label className="flex flex-col mt-2">
            <span className="mb-2 text-gray-900 text-sm sm:text-base">Product Type</span>
            <input
              type="text"
              className="border border-gray-400 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
          </label>
          <label className="flex flex-col mt-2">
            <span className="mb-2 text-gray-900 text-sm sm:text-base">Collection</span>
            <input
              type="text"
              className="border border-gray-400 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
          </label>
          <label className="flex flex-col mt-2">
            <span className="mb-2 text-gray-900 text-sm sm:text-base">tags</span>
            <input
              type="text"
              className="border border-gray-400 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
          </label>
        </div>      
            
          </div>
        </div>
      </div>
      </div>
  )
}

export default Page