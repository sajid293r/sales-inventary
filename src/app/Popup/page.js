import { ChevronDown, X } from 'lucide-react';
import { FaSearch } from 'react-icons/fa';

export default function SaleChannelPopup({ onClose }) {
  const channels = ["HarvaNorman", "HarvaNorman", "HarvaNorman", "HarvaNorman", "HarvaNorman"];
  const channels1 = ["HarvaNorman", "HarvaNorman", "HarvaNorman", "HarvaNorman", "HarvaNorman", "Amazon", "HarvaNroman"];

  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-white border border-black rounded-lg shadow-lg w-auto h-auto z-50">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-gray-300 pb-2 mb-4 p-2">
        <h1 className="text-lg font-semibold">Sale Channel</h1>
        <button onClick={onClose} className="px-4 py-1 text-sm">
          <X size={20} className="text-black border text-sm border-gray-600 rounded-lg" />
        </button>
      </div>

      {/* First Channel List */}
      <div className="flex flex-row gap-2 mb-4 px-4">
        {channels.map((channel, index) => (
          <label key={index} className="flex items-center gap-2">
            <input type="checkbox" />
            <span>{channel}</span>
          </label>
        ))}
      </div>

      {/* Search Bar */}
      <div className="flex gap-2 border-b border-gray-300 p-2">
        <div className="relative flex-1">
          <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full py-1 pl-8 pr-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>
        <button className="px-4 py-1 text-black rounded-md border border-gray-300">
          Filter
        </button>
      </div>

      {/* Second Channel List */}
      <div className="grid grid-cols-4 gap-2 mb-4 mt-2 border-b border-gray-300 px-4">
        {channels1.map((channel, index) => (
          <label key={index} className="flex items-center gap-2 mb-2">
            <input type="checkbox" />
            <span>{channel}</span>
          </label>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between border-b border-gray-300 py-2 p-1 mx-2">
        <div><h1 className="text-black text-sm">Showing 1 to 10 of 80 entries</h1></div>
        <div className="text-center flex gap-4">
          <span className="border border-gray-400 px-2 rounded-md">&lt;</span>
          <span className="border border-gray-400 px-2 rounded-md">&gt;</span>
        </div>
        <div className="border border-gray-400 px-2 rounded-md flex">10 <ChevronDown size={15} className="mt-1" /></div>
      </div>

      {/* Footer Actions */}
      <div className="flex items-center justify-between py-2 p-1 mx-2">
        <button className="px-4 py-1 border rounded-md border-gray-300">0 items selected</button>
        <div className="flex gap-2">
          <button onClick={onClose} className="px-4 py-1 border rounded-md border-gray-300">Cancel</button>
          <button className="px-4 py-1 border rounded-md border-gray-300 bg-green-400 text-white">Save</button>
        </div>
      </div>
    </div>
  );
}
