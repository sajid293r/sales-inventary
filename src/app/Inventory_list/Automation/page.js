"use client";
import React, { useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { FaTrash, FaArrowLeft } from "react-icons/fa";
import Link from "next/link";

function ServiceOpener() {
  const [input, setInput] = useState("");
  const [conditions, setConditions] = useState([
    { id: Date.now(), status: "Address", condition: "Condition 1", value: "Value 1" },
  ]);
  const [careerServices, setCareerServices] = useState([
    { id: Date.now() + 1, condition: "Address", carrier: "Carrier 1", price: "Price 1" },
  ]);
  const [pyDoraConditions, setPyDoraConditions] = useState([
    { id: Date.now() + 2, condition: "Width", carrier: "Lesser", price: "kg" },
  ]);
  const [pyDoraCareerServices, setPyDoraCareerServices] = useState([
    { id: Date.now() + 3, condition: "Address", carrier: "Carrier 1", price: "Price 1" },
  ]);

  const handleInputChange = (e) => setInput(e.target.value.toLowerCase());

  const handleAddItem = (setter, defaultItem) =>
    setter((prev) => [...prev, { ...defaultItem, id: Date.now() }]);

  const handleDeleteItem = (setter, list, id) =>
    setter(list.length > 1 ? list.filter((item) => item.id !== id) : list);

  const handleUpdateItem = (setter, list, id, field, value) =>
    setter(list.map((item) => (item.id === id ? { ...item, [field]: value } : item)));

  return (
    <div className="p-2 sm:p-4 mx-auto w-full  min-w-[640px] md:min-w-[800px] lg:min-w-[1000px] xl:min-w-[1300px] 2xl:min-w-[1300px] 3xl:min-w-[1400px] 4xl:min-w-[1600px]">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-3">
        <div className="flex items-center gap-2">
          <div className="border rounded-md p-1">
            <Link href="/Inventory_list/Inventorylist">
              <FaArrowLeft size={16} />
            </Link>
          </div>
          <h1 className="text-xl font-semibold">Automation</h1>
        </div>
        <button className="bg-[#52ce66] text-white py-2 px-4 rounded-md text-sm hover:bg-[#48b55a] transition">
          Save
        </button>
      </div>

      <div>
        <h1 className="text-sm font-semibold mb-2">Automation Name</h1>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Enter Automation Name"
          className="w-full p-2 border rounded-lg bg-white  focus:outline-none focus:ring-2 focus:ring-[#52ce66]"
        />

        <div className="border rounded-md bg-white p-4 mt-4">
          <h2 className="text-md font-semibold mb-2">Meet of following condition</h2>
          {conditions.map((item) => (
            <div key={item.id} className="flex items-end gap-2 justify-between mb-2">
              {["status", "condition", "value"].map((field) => (
                <label key={field} className="flex flex-col flex-1">
                  <span className="text-sm font-semibold mb-1 capitalize">{field}</span>
                  <select
                    value={item[field]}
                    onChange={(e) => handleUpdateItem(setConditions, conditions, item.id, field, e.target.value)}
                    className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-[#52ce66]"
                  >
                    <option value={`${field} 1`}>{`${field} 1`}</option>
                    <option value={`${field} 2`}>{`${field} 2`}</option>
                  </select>
                </label>
              ))}
              <div className="flex items-center gap-2">
                <button onClick={() => handleAddItem(setConditions, { status: "Address", condition: "Condition 1", value: "Value 1" })}>
                  <AiOutlinePlusCircle size={20} className="text-gray-600 hover:text-[#52ce66]" />
                </button>
                {conditions.length > 1 && (
                  <button onClick={() => handleDeleteItem(setConditions, conditions, item.id)}>
                    <FaTrash className="text-red-500 hover:text-red-600" size={15} />
                  </button>
                )}
              </div>
            </div>
          ))}

          <h2 className="text-md font-semibold mb-2 mt-4">The Career Service</h2>
          {careerServices.map((item) => (
            <div key={item.id} className="flex items-end gap-2 justify-between mb-2">
              {["condition", "carrier", "price"].map((field) => (
                <label key={field} className="flex flex-col flex-1">
                  <span className="text-sm font-semibold mb-1 capitalize">{field}</span>
                  <select
                    value={item[field]}
                    onChange={(e) => handleUpdateItem(setCareerServices, careerServices, item.id, field, e.target.value)}
                    className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-[#52ce66]"
                  >
                    <option value={`${field} 1`}>{`${field} 1`}</option>
                    <option value={`${field} 2`}>{`${field} 2`}</option>
                  </select>
                </label>
              ))}
              <div className="flex items-center gap-2">
                <button onClick={() => handleAddItem(setCareerServices, { condition: "Address", carrier: "Carrier 1", price: "Price 1" })}>
                  <AiOutlinePlusCircle size={20} className="text-gray-600 hover:text-[#52ce66]" />
                </button>
                {careerServices.length > 1 && (
                  <button onClick={() => handleDeleteItem(setCareerServices, careerServices, item.id)}>
                    <FaTrash className="text-red-500 hover:text-red-600" size={15} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Conditional Sections */}
        {input === "service" && (
          <div className="border rounded-md bg-white p-4 mt-4">
            <h2 className="text-md font-semibold mb-2">Meeting of following Conditions</h2>
            {pyDoraConditions.map((item) => (
              <div key={item.id} className="flex items-end gap-2 justify-between mb-2">
                <label className="flex flex-col flex-1">
                  <span className="text-sm font-semibold mb-1">Status</span>
                  <select
                    value={item.condition}
                    onChange={(e) => handleUpdateItem(setPyDoraConditions, pyDoraConditions, item.id, "condition", e.target.value)}
                    className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-[#52ce66]"
                  >
                    <option value="Width">Width</option>
                    <option value="Height">Height</option>
                    <option value="Length">Length</option>
                  </select>
                </label>
                <label className="flex flex-col flex-1">
                  <span className="text-sm font-semibold mb-1">Condition</span>
                  <select
                    value={item.carrier}
                    onChange={(e) => handleUpdateItem(setPyDoraConditions, pyDoraConditions, item.id, "carrier", e.target.value)}
                    className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-[#52ce66]"
                  >
                    <option value="Lesser">Lesser</option>
                    <option value="Greater">Greater</option>
                  </select>
                </label>
                <label className="flex flex-col flex-1">
                  <span className="text-sm font-semibold mb-1">Value</span>
                  <div className="flex gap-1">
                    <input
                      type="text"
                      className="border border-gray-300 rounded-md p-2 w-[60px] focus:outline-none focus:ring-2 focus:ring-[#52ce66]"
                      placeholder="0.0"
                    />
                    <select
                      value={item.price}
                      onChange={(e) => handleUpdateItem(setPyDoraConditions, pyDoraConditions, item.id, "price", e.target.value)}
                      className="border border-gray-300 rounded-md p-2 w-[60px] focus:outline-none focus:ring-2 focus:ring-[#52ce66]"
                    >
                      <option value="kg">kg</option>
                      <option value="cm">cm</option>
                    </select>
                  </div>
                </label>
                <div className="flex items-center gap-2">
                  <button onClick={() => handleAddItem(setPyDoraConditions, { condition: "Width", carrier: "Lesser", price: "kg" })}>
                    <AiOutlinePlusCircle size={20} className="text-gray-600 hover:text-[#52ce66]" />
                  </button>
                  {pyDoraConditions.length > 1 && (
                    <button onClick={() => handleDeleteItem(setPyDoraConditions, pyDoraConditions, item.id)}>
                      <FaTrash className="text-red-500 hover:text-red-600" size={15} />
                    </button>
                  )}
                </div>
              </div>
            ))}

            <h2 className="text-md font-semibold mb-2 mt-4">The Career Service1</h2>
            {pyDoraCareerServices.map((item) => (
              <div key={item.id} className="flex items-end gap-2 justify-between mb-2">
                {["condition", "carrier", "price"].map((field) => (
                  <label key={field} className="flex flex-col flex-1">
                    <span className="text-sm font-semibold mb-1 capitalize">{field}</span>
                    <select
                      value={item[field]}
                      onChange={(e) => handleUpdateItem(setPyDoraCareerServices, pyDoraCareerServices, item.id, field, e.target.value)}
                      className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-[#52ce66]"
                    >
                      <option value={`${field} 1`}>{`${field} 1`}</option>
                      <option value={`${field} 2`}>{`${field} 2`}</option>
                    </select>
                  </label>
                ))}
                <div className="flex items-center gap-2">
                  <button onClick={() => handleAddItem(setPyDoraCareerServices, { condition: "Address", carrier: "Carrier 1", price: "Price 1" })}>
                    <AiOutlinePlusCircle size={20} className="text-gray-600 hover:text-[#52ce66]" />
                  </button>
                  {pyDoraCareerServices.length > 1 && (
                    <button onClick={() => handleDeleteItem(setPyDoraCareerServices, pyDoraCareerServices, item.id)}>
                      <FaTrash className="text-red-500 hover:text-red-600" size={15} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {input && !["service"].includes(input) && (
<p className="text-red-500 mt-4 text-sm">Please type &apos;service&apos;</p>
        )}
      </div>
    </div>
  );
}

export default ServiceOpener;