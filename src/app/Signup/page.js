"use client"
import React from 'react'

const Page = () => {
  return (
   
    <div class="w-64">
  <label for="dropdown" class="block text-sm font-medium text-gray-700 mb-2">Choose an option</label>
  <select id="dropdown" name="dropdown"
          class="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700">
    <option value="">Select an option</option>
    <option value="option1">Option One</option>
    <option value="option2">Option Two</option>
    <option value="option3">Option Three</option>
  </select>
</div>
  )
}

export default Page
