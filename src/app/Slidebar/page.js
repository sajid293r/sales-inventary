"use client";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Home, Globe, Settings } from "lucide-react";
import { FaShoppingCart, FaBars } from "react-icons/fa";
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

const TooltipAutoClose = ({ children, tooltip }) => {
  const [isVisible, setIsVisible] = useState(false);
  const triggerRef = useRef(null);
  const tooltipRef = useRef(null);

  // Calculate tooltip position
  const getTooltipPosition = () => {
    if (!triggerRef.current) return { top: 0, left: 0 };
    const rect = triggerRef.current.getBoundingClientRect();
    return {
      top: rect.bottom + window.scrollY + 8, // 8px offset below the button
      left: rect.left + window.scrollX,
    };
  };

  const { top, left } = getTooltipPosition();

  // Handle click outside to close tooltip
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isVisible &&
        triggerRef.current &&
        tooltipRef.current &&
        !triggerRef.current.contains(event.target) &&
        !tooltipRef.current.contains(event.target)
      ) {
        setIsVisible(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isVisible]);

  // Toggle tooltip visibility on click
  const handleClick = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <>
      <div
        className="relative"
        ref={triggerRef}
        onClick={handleClick}
        style={{ pointerEvents: "auto" }}
      >
        {children}
      </div>
      {isVisible &&
        createPortal(
          <div
            ref={tooltipRef}
            className="fixed bg-white text-black  text-sm px-3 ml-20 py-1.5 -mt-8 rounded-lg shadow-xl z-[2000] flex items-center"
            style={{
              top: top + "px",
              left: left + "px",
              display: "flex", // Flex display for alignment
            }}
          >
            {tooltip}
          </div>,
          document.body
        )}
    </>
  );
};

const Sidebar = () => {
  const [expanded, setExpanded] = useState(false);

  const toggleSidebar = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <>
      {/* Toggle Button for Mobile */}
      <div className="md:hidden p-4 fixed z-[1000]">
        <button onClick={toggleSidebar}>
          <FaBars size={24} />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 md:mt-12 lg:mt-12  h-screen bg-white text-black shadow-gray-600 shadow-sm transform transition-transform duration-300 overflow-y-auto
        ${expanded ? "w-56" : "w-20"} 
        ${expanded ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:${expanded ? "w-56" : "w-20"}
        flex flex-col justify-between py-1 px-2 z-[900]`}
      >
        {/* Top Section */}
        <div className="flex flex-col gap-2">
          {/* home  */}
          <div className="inline-block relative z-[950] py-2">
            <TooltipAutoClose
              tooltip={
                <div className="">
                  <div className="mb-2 hover:bg-[#e6ebec] py-2 px-1 rounded-md">
                    <span className="">
                      <Link href="/Inventory_list/Inventorylist">
                        Inventory list 1
                      </Link>
                    </span>
                  </div>
                  <div className="mb-2 hover:bg-[#e6ebec] py-2 px-1 rounded-md">
                    <span className="">
                      <Link href="/Inventory_list/Inventorylist">
                        Inventory list 2
                      </Link>
                    </span>
                  </div>
                  <div className="mb-2 hover:bg-[#e6ebec] py-2 px-1 rounded-md">
                    <span className="">
                      <Link href="/BulkEditor">Inventory list 3</Link>
                    </span>
                  </div>
                </div>
              }
            >
              <Image
                src={Home2}
                alt="Logo"
                width={24}
                height={24}
                className="mx-auto cursor-pointer"
              />
            </TooltipAutoClose>
          </div>
          {/*  */}
          <div className="inline-block relative z-[950] py-2">
            <TooltipAutoClose
              tooltip={
                <span className=" hover:underline">
                  <Link href="/BulkEditor">BulkEditor</Link>
                </span>
              }
            >
              <Image
                src={Box}
                alt="Logo"
                width={24}
                height={24}
                className="mx-auto cursor-pointer"
              />
            </TooltipAutoClose>
          </div>
          {/* templeteName */}
          <div className="inline-block relative z-[950] py-2">
            <TooltipAutoClose
              tooltip={
                <span className="">
                  <Link href="/Inventory_list/TemplateName">BulkEditor</Link>
                </span>
              }
            >
              <Image
                src={Message3}
                alt="Logo"
                width={24}
                height={24}
                className="mx-auto cursor-pointer "
              />
            </TooltipAutoClose>
          </div>
          {/* Bundlingkit */}
          <div className="inline-block relative z-[950] py-2">
            <TooltipAutoClose
              tooltip={
                <div>
                  <span className=" ">
                    <Link href="/Inventory_list/TemplateName3">
                      TemplateName3
                    </Link>
                  </span>
                </div>
              }
            >
              <Image
                src={Message4}
                alt="Logo"
                width={24}
                height={24}
                className="mx-auto cursor-pointer"
              />
            </TooltipAutoClose>
          </div>
          {/* Pricing */}
          <div className="inline-block relative z-[950] py-2">
            <TooltipAutoClose
              tooltip={
                <span className=" ">
                  <Link href="/Inventory_list/Pricing">Pricing</Link>
                </span>
              }
            >
              <Image
                src={Lig10}
                alt="Logo"
                width={24}
                height={24}
                className="mx-auto cursor-pointer"
              />
            </TooltipAutoClose>
          </div>
          {/* Automation */}
          <div className="inline-block relative z-[950] py-2">
            <TooltipAutoClose
              tooltip={
                <span className=" ">
                  <Link href="/Inventory_list/Shipping">Shipping</Link>
                </span>
              }
            >
              <Image
                src={Lig5}
                alt="Logo"
                width={24}
                height={24}
                className="mx-auto cursor-pointer"
              />
            </TooltipAutoClose>
          </div>
          <div className="inline-block relative z-[950] py-2">
            <TooltipAutoClose
              tooltip={
                <span className=" ">
                  <Link href="/Inventory_list/Automation">Automation</Link>
                </span>
              }
            >
              <Image
                src={Lig6}
                alt="Logo"
                width={24}
                height={24}
                className="mx-auto cursor-pointer"
              />
            </TooltipAutoClose>
          </div>
          <div className="inline-block relative z-[950] py-2">
            <TooltipAutoClose
              tooltip={
                <span className=" ">
                  <Link href="/Inventory_list/Shipping">Shipping</Link>
                </span>
              }
            >
              <Image
                src={Lig7}
                alt="Logo"
                width={24}
                height={24}
                className="mx-auto cursor-pointer"
              />
            </TooltipAutoClose>
          </div>
          <div className="inline-block relative z-[950] py-2">
            <TooltipAutoClose
              tooltip={
                <span className=" ">
                  <Link href="/Inventory_list/OrderProcessAutomation">
                    ProcessAutomation
                  </Link>
                </span>
              }
            >
              <Image
                src={Lig8}
                alt="Logo"
                width={24}
                height={24}
                className="mx-auto cursor-pointer"
              />
            </TooltipAutoClose>
          </div>
          <div className="inline-block relative z-[950] py-2">
            <TooltipAutoClose
              tooltip={
                <span className=" ">
                  <Link href="/Inventory_list/Inventorylist2">
                    Inventorylist2
                  </Link>
                </span>
              }
            >
              <Image
                src={Lig9}
                alt="Logo"
                width={24}
                height={24}
                className="mx-auto cursor-pointer"
              />
            </TooltipAutoClose>
          </div>
          <div className="inline-block relative z-[950] py-2">
            <TooltipAutoClose
              tooltip={
                <span className=" ">
                  <Link href="/Inventory_list/TemplateName2">
                    TemplateName2
                  </Link>
                </span>
              }
            >
              <Image
                src={Lig11}
                alt="Logo"
                width={24}
                height={24}
                className="mx-auto cursor-pointer"
              />
            </TooltipAutoClose>
          </div>
        </div>
        {/* <div className="inline-block relative z-[950] py-2">
          <TooltipAutoClose tooltip={<span className=" "></span>}>
            <Image
              src={Lig11}
              alt="Logo"
              width={24}
              height={24}
              className="mx-auto cursor-pointer"
            />
          </TooltipAutoClose>
        </div> */}
        <div className="inline-block relative z-[950] py-2">
          <TooltipAutoClose
            tooltip={
              <>
                <div className="flex flex-col">
                  <div className="mb-2 hover:bg-[#e6ebec] py-1 px-1 rounded-md">
                    <span>
                      <Link href="/Inventory_list/Bundlingkit">
                        Add Inventory
                      </Link>
                    </span>
                  </div>
                  <div className="mb-2 hover:bg-[#e6ebec] py-1 px-1 rounded-md">
                    <span>
                      <Link href="/">
                        Update Inventory
                      </Link>
                    </span>
                  </div>
                  <div className="mb-2 hover:bg-[#e6ebec] py-1 px-1 rounded-md">
                    <span>
                      <Link href="/">
                        View Inventory
                      </Link>
                    </span>
                  </div>
                </div>
              </>
            }
          >
            <Image
              src={Lig12}
              alt="Logo"
              width={24}
              height={24}
              className="mx-auto cursor-pointer"
            />
          </TooltipAutoClose>
        </div>

        {/* <Link href="/Inventory_list/TemplateName">
            <IconWrapper icon={<FaShoppingCart size={24} />} label="Cart" expanded={expanded} />
          </Link> */}
        {/* <Link href="/Inventory_list/Inventorylist">
            <IconWrapper icon={<FaBars size={24} />} label="Menu" expanded={expanded} />
          </Link> */}
        {/* <Link href="/Inventory_list/Bundlingkit">
            <IconWrapper icon={<GiDatabase size={24} />} label="Database" expanded={expanded} />
          </Link> */}
        {/* <Link href="/Inventory_list/Pricing">
            <IconWrapper icon={<GiDatabase size={24} />} label="Prices" expanded={expanded} />
          </Link> */}
        {/* <Link href="/Inventory_list/Automation">
            <IconWrapper icon={<GiDatabase size={24} />} label="Automation" expanded={expanded} />
          </Link> */}
        {/* <Link href="/Inventory_list/Shipping">
            <IconWrapper icon={<GiDatabase size={24} />} label="Shipping" expanded={expanded} />
          </Link> */}
        {/* <Link href="/Inventory_list/OrderProcessAutomation">
            <IconWrapper icon={<GiDatabase size={24} />} label="OrderProcessAutomation" expanded={expanded} />
          </Link> */}
        {/* <Link href="/Inventory_list/Inventorylist2">
            <IconWrapper icon={<GiDatabase size={24} />} label="Inventorylist2" expanded={expanded} />
          </Link> */}
        {/* <Link href="/Inventory_list/TemplateName2">
            <IconWrapper icon={<GiDatabase size={24} />} label="TemplateName2" expanded={expanded} />
          </Link> */}
        <Link href="/Inventory_list/TemplateName3">
          <IconWrapper
            icon={<GiDatabase size={24} />}
            label="TemplateName3"
            expanded={expanded}
          />
        </Link>
          <Link href="/SaleChannel">
          <IconWrapper
            icon={<GiDatabase size={24} />}
            label="sale channel"
            expanded={expanded}
          />
        </Link>
        <Link href="/Inventory_list/CreateMasterlist">
          <IconWrapper
            icon={<GiDatabase size={24} />}
            label="CreateMaster"
            expanded={expanded}
          />
        </Link>
      </div>

      {/* Bottom Section */}
      <div className="mt-auto">
        <IconWrapper
          icon={<Settings size={24} />}
          label="Settings"
          expanded={expanded}
        />
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