'use client';
import React, { useState, useEffect, useRef } from 'react';
import { FiMoreVertical } from 'react-icons/fi';

const automations = [
  { id: 1, name: 'Fastway/Amarex service Automation', active: true },
  { id: 2, name: 'Courier Please service Automation', active: false },
  { id: 3, name: 'AU Post service Automation', active: true },
];

const AutomationItem = ({ name, active }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isActive, setIsActive] = useState(active);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex justify-between items-center bg-white rounded-md p-2 border mb-3 shadow-sm">
      <div className="font-semibold">
        <span className="text-gray-500">Automation Name:</span> {name}
      </div>

      <div className="flex items-center gap-3 relative" ref={menuRef}>
        {/* Toggle Switch */}
        <label className="inline-flex relative items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={isActive}
            onChange={() => setIsActive(!isActive)}
          />
          <div className="w-10 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-500 transition-colors"></div>
          <div className="absolute left-0.5 top-0.5 bg-white w-5 h-5 rounded-full shadow-md transform peer-checked:translate-x-full transition-transform"></div>
        </label>

        {/* Menu Button & Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowMenu((prev) => !prev)}
            className="text-gray-600 hover:bg-gray-100 p-2 rounded-full"
          >
            <FiMoreVertical size={20} />
          </button>
          {showMenu && (
            <div className="absolute right-0 top-9 w-52 bg-white border rounded shadow z-10">
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                Edit Automation
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                Duplicate Automation
              </button>
              <button className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100">
                Delete Automation
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const CarrierServiceAutomations = () => {
  return (
    <div className="bg-gray-100 min-h-screen ">
      <div className="w-full min-w-[640px] md:min-w-[800px] lg:min-w-[1000px] xl:min-w-[1300px] 2xl:min-w-[1300px] 3xl:min-w-[1400px] 4xl:min-w-[1600px] mx-auto ">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 ">
          <h1 className="text-xl font-bold">Carrier Service Automations</h1>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
            Add Automations
          </button>
        </div>

        {/* Search & Sort */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
          <div className="text-gray-600 font-medium">3 Active automations</div>
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Search"
              className="border rounded px-3 py-1 text-sm"
            />
            <select className="border rounded px-3 py-1 text-sm">
              <option>Highest to Lowest</option>
              <option>Lowest to Highest</option>
            </select>
          </div>
        </div>

        {/* Automation List */}
        {automations.map((automation) => (
          <AutomationItem key={automation.id} name={automation.name} active={automation.active} />
        ))}
      </div>
    </div>
  );
};

export default CarrierServiceAutomations;
