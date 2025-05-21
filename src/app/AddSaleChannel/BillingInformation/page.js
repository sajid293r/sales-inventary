'use client'
import React from 'react'
import { useState } from 'react';
const Page = () => {
    
  const [showSection, setShowSection] = useState(false);

  const handleClick = () => {
    setShowSection(!showSection); // toggle show/hide
  };
  return (
    <div className="p-4">
      <button
        onClick={handleClick}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {showSection ? 'Hide Section' : 'Show Section'}
      </button>

      {showSection && (
        <div className="mt-4 p-4 bg-gray-100 rounded shadow">
          <h2 className="text-lg font-bold mb-2">Hidden Section</h2>
          <p>This section is visible only after clicking the button.</p>
        </div>
      )}
    </div>
  )
}

export default Page