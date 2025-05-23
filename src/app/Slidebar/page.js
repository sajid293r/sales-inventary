'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { Home, Globe, Settings } from 'lucide-react';
import { FaShoppingCart, FaBars } from 'react-icons/fa';
import { GiDatabase } from 'react-icons/gi';
import { BiLayer } from "react-icons/bi";
const Sidebar = () => {
  const [expanded, setExpanded] = useState(false);

  const toggleSidebar = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <>
      {/* Toggle Button for Mobile */}
      <div className="md:hidden p-4 fixed z-50">
        <button onClick={toggleSidebar}>
          <FaBars size={24} />
        </button>
      </div>

      {/* Sidebar */}
      <div
        // className={`fixed top-0 left-0 md:mt-12 lg:mt-12 py-20 h-screen bg-white text-black shadow-lg  transform transition-transform duration-300 overflow-y-auto
        // ${expanded ? 'w-56' : 'w-20'} 
        // ${expanded ? 'translate-x-0' : '-translate-x-full'} 
        // md:translate-x-0 md:${expanded ? 'w-56' : 'w-20'}
        // flex flex-col justify-between py-4 px-2`}
        className={`fixed top-0 left-0 py-20 h-screen bg-white text-black shadow-lg transform transition-transform duration-300 overflow-y-auto
  ${expanded ? 'w-46' : 'w-20'} 
  ${expanded ? 'translate-x-0' : '-translate-x-full'} 
  md:translate-x-0 md:${expanded ? 'w-46' : 'w-20'}
  flex flex-col justify-between py-4 px-2`}

        onClick={toggleSidebar}>
        {/* Top Section */}
        <div className="flex flex-col gap-2 mt-8">
        <Link href="/SaleChannel"> <IconWrapper icon={<BiLayer size={24} />} label="Sales Channel" expanded={expanded} /></Link>
        <Link href="/">  <IconWrapper icon={<Globe size={24} />} label="List View" expanded={expanded} /></Link>
          {/* <Link href="/AddSaleChannel/HeaderAddSale"> <IconWrapper icon={<FaShoppingCart size={24} />} label="Cart" expanded={expanded} /></Link> */}
          <Link href="/"> <IconWrapper icon={<FaShoppingCart size={24} />} label="Cart" expanded={expanded} /></Link>

          <IconWrapper icon={<FaBars size={24} />} label="Menu" expanded={expanded} />
          <IconWrapper icon={<GiDatabase size={24} />} label="Database" expanded={expanded} />
        </div>

        {/* Bottom Section */}
        <div className="mt-auto">
          <IconWrapper icon={<Settings size={24} />} label="Settings" expanded={expanded} />
        </div>
      </div>
    </>
  );
};

const IconWrapper = ({ icon, label, expanded }) => (
  <div className="group flex items-center gap-4 px-2 py-4 hover:bg-gray-100 rounded cursor-pointer w-full">
    <div className="text-black group-hover:text-gray-700">{icon}</div>
    {expanded && (
      <span className="text-sm text-black group-hover:text-gray-700 whitespace-nowrap">
        {label}
      </span>
    )}
  </div>
);

export default Sidebar;
