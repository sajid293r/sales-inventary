"use client";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { Settings } from "lucide-react";
import { FaBars } from "react-icons/fa";
import { GiDatabase } from "react-icons/gi";
import Image from "next/image";

import Home2 from "../image/Icons/1.png";
import Box from "../image/Icons/2.png";
import Message3 from "../image/Icons/3.png";
import Message4 from "../image/Icons/4.png";
import Lig5 from "../image/Icons/5.png";
import Lig6 from "../image/Icons/6.png";
import Lig7 from "../image/Icons/7.png";
import Lig8 from "../image/Icons/Rectangle 230.png";
import Lig9 from "../image/Icons/9.png";
import Lig10 from "../image/Icons/10.png";
import Lig11 from "../image/Icons/11.png";
import Lig12 from "../image/Icons/28.png";

const Sidebar = () => {
  const [expanded, setExpanded] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);
  const timeoutRef = useRef(null);
  const sidebarRef = useRef(null);
  const tooltipRef = useRef(null);

  const toggleSidebar = () => setExpanded((prev) => !prev);

  // Handle mouse enter to show tooltip for 20 seconds
  const handleMouseEnter = (id) => {
    clearTimeout(timeoutRef.current); // Clear any existing timeout
    setHoveredId(id);
    timeoutRef.current = setTimeout(() => {
      setHoveredId(null); // Close tooltip after 20 seconds
    }, 20000); // 20 seconds
  };

  // Handle mouse leave to clear timeout
  const handleMouseLeave = () => {
    clearTimeout(timeoutRef.current); // Clear timeout on leave
  };

  // Handle outside click to close tooltip
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        sidebarRef.current &&
        tooltipRef.current &&
        !sidebarRef.current.contains(event.target) &&
        !tooltipRef.current.contains(event.target)
      ) {
        setHoveredId(null); // Close tooltip
        clearTimeout(timeoutRef.current); // Clear timeout
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
      clearTimeout(timeoutRef.current); // Cleanup timeout on unmount
    };
  }, []);

  const icons = [
    {
      id: "home",
      icon: Home2,
      tooltip: (
        <div className="flex flex-col gap-1">
          <div><Link href="/SaleChannel">Sales Channel list</Link></div>
          
          {/* <div><Link href="/Inventory_list/Inventorylist2">Inventory list 2</Link></div>
          <div><Link href="/BulkEditor">Inventory list 3</Link></div> */}
        </div>
      ),
    },
    {
      id: "box",
      icon: Box,
      // tooltip: <Link href="/BulkEditor">BulkEditor</Link>,
       tooltip: (
        <div className="flex flex-col gap-1">
          <div><Link href="/Inventory_list/Inventorylist">Inventory list 1</Link></div>
          
          <div><Link href="/Inventory_list/Inventorylist2">Inventory list 2</Link></div>
          <div><Link href="/BulkEditor">Inventory list 3</Link></div>
        </div>
      ),
    },
    {
      id: "msg3",
      icon: Message3,
      tooltip: <Link href="/Inventory_list/TemplateName">TemplateName</Link>,
    },
    {
      id: "msg4",
      icon: Message4,
      tooltip: <Link href="/Inventory_list/TemplateName3">TemplateName3</Link>,
    },
    {
      id: "lig10",
      icon: Lig10,
      tooltip: <Link href="/Inventory_list/Pricing">Pricing</Link>,
    },
    {
      id: "lig5",
      icon: Lig5,
      tooltip: <Link href="/Inventory_list/Shipping">Shipping</Link>,
    },
    {
      id: "lig6",
      icon: Lig6,
      tooltip: <Link href="/Inventory_list/Automation">Automation</Link>,
    },
    {
      id: "lig7",
      icon: Lig7,
      tooltip: <Link href="/Inventory_list/Shipping">Shipping</Link>,
    },
    {
      id: "lig8",
      icon: Lig8,
      tooltip: (
        <Link href="/Inventory_list/OrderProcessAutomation">
          ProcessAutomation
        </Link>
      ),
    },
    {
      id: "lig9",
      icon: Lig9,
      tooltip: (
        <Link href="/Inventory_list/Inventorylist2">Inventorylist2</Link>
      ),
    },
    {
      id: "lig11",
      icon: Lig11,
      tooltip: <Link href="/Inventory_list/TemplateName2">TemplateName2</Link>,
    },
    {
      id: "lig12",
      icon: Lig12,
      tooltip: (
        <div className="flex flex-col gap-1">
          <Link href="/Inventory_list/Bundlingkit">Add Inventory</Link>
          <Link href="/Inventory_list/Bundlingkit">Update Inventory</Link>
          <Link href="/Inventory_list/Bundlingkit">View Inventory</Link>
        </div>
      ),
    },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="md:hidden p-4 fixed top-0 left-0 z-[1000] mt-8">
        <button onClick={toggleSidebar} aria-label="Toggle Sidebar">
          <FaBars size={24} />
        </button>
      </div>

      {/* Sidebar with Tooltip Panel */}
      <div className="flex flex-row h-screen fixed top-0 left-0 z-[900]">
        {/* Sidebar */}
        <div
          ref={sidebarRef}
          className={`bg-white text-black shadow-md transition-all duration-300 overflow-y-auto
            ${
              expanded ? "w-56" : "w-20"
            } flex flex-col justify-between py-2 px-1 mt-12`}
        >
          {/* Top Icons */}
          <div className="flex flex-col gap-2">
            {icons.map((item) => (
              <div
                key={item.id}
                className="py-2 flex justify-center relative group"
                onMouseEnter={() => handleMouseEnter(item.id)}
                onMouseLeave={handleMouseLeave}
              >
                <Image
                  src={item.icon}
                  alt={`${item.id} icon`}
                  width={24}
                  height={24}
                  className="cursor-pointer"
                />
              </div>
            ))}
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col gap-1 mt-auto px-2">
            <Link href="/Inventory_list/TemplateName3">
              <div className="flex items-center gap-2 py-3 hover:bg-gray-100 rounded">
                <GiDatabase size={24} />
                {expanded && <span>TemplateName3</span>}
              </div>
            </Link>
            <Link href="/SaleChannel">
              <div className="flex items-center gap-2 py-3 hover:bg-gray-100 rounded">
                <GiDatabase size={24} />
                {expanded && <span>Sale Channel</span>}
              </div>
            </Link>
            <Link href="/Inventory_list/CreateMasterlist">
              <div className="flex items-center gap-2 py-3 hover:bg-gray-100 rounded">
                <GiDatabase size={24} />
                {expanded && <span>Create Master</span>}
              </div>
            </Link>
            <div className="flex items-center gap-2 py-3 cursor-pointer hover:bg-gray-100 rounded">
              <Settings size={24} />
              {expanded && <span>Settings</span>}
            </div>
          </div>
        </div>

        {/* Tooltip Display Area */}
     {!expanded && hoveredId && (
  <div
    ref={tooltipRef}
    className="w-40 h-screen bg-[#DFE7F7] p-2 text-xs overflow-y-auto shadow-xl z-[1000] transition-opacity duration-200 mt-12 rounded-md border border-[#1f51b4]"
    onMouseEnter={() => {
      clearTimeout(timeoutRef.current); // Cancel timeout if hovered
    }}
    onMouseLeave={() => {
      setHoveredId(null); // Close on mouse leave
    }}
  >
    <div className="mb-4 font-bold bg-[#CCCCCC] p-2 rounded-md"> Sale Channel</div>

    <div className="text-black space-y-8 hover:bg-[#8AA9D6] p-2 rounded-md font-bold">
      {icons.find((item) => item.id === hoveredId)?.tooltip}
    </div>
  </div>
)}

      </div>
    </>
  );
};

export default Sidebar;
