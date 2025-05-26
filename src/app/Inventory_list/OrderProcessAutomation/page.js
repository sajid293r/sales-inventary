'use client'
import React from 'react'
import { AiOutlinePlusCircle } from "react-icons/ai";
import { FaTrash, FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
const page = () => {
  return (
    <div
        className={`p-2 sm:p-4 mx-auto w-full min-w-[320px] md:w-[1000px] max-w-screen-lg `}
        
      >
         <div className="flex flex-col sm:flex-row justify-between mb-4 gap-3">
        <div className="flex items-center gap-2">
          <div className="border rounded-md p-1">
            <Link href="/Inventory_list/Inventorylist">
              <FaArrowLeft size={16} />
            </Link>
          </div>
          <h1 className="text-xl font-semibold">Automation</h1>
        </div>
        <button className="bg-[#52ce66] text-white py-2 px-4 rounded-md text-sm hover:bg-[#48b55a]">
          Save
        </button>
      </div>

     <div className='border  w-full h-auto bg-white p-4 rounded-md'>
      <div className='flex gap-12'>
        <label className='flex flex-col'>
          <span>conditions</span>
          <select className='w-[200px] border rounded-md mt-3 px-1'>
            <option>option1</option>
            <option>option2</option>
            <option>option3</option>
            <option>option4</option>
          </select>

        </label>
        <label className='flex flex-col'>
          <span className=''>Rule</span>
          <div className=' flex gap-2'>
            <h1 className='mt-3'>Every</h1>
            <input type='text' className='w-[100px] border rounded-md mt-3 px-1' />
            <h1 className='mt-3'>Days</h1>
          </div>

        </label>
        
<label className='flex flex-col'>
          <span>Set-up time</span>
          <select className='w-[200px] border rounded-md mt-3 px-1'>
            <option>hours1</option>
            <option>hours2</option>
            <option>hours3</option>
            <option>hours4</option>
          </select>

        </label>

        <div className='flex gap-2'>
          <input type='checkbox'  className='mt-10 h-4 w-4'/>
          <label className='mt-9'>All Days</label>

        </div>
      </div>
      
      </div> 
      </div>
    
  )
}

export default page