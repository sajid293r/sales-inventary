"use client";
import React from "react";

const Page = () => {
  const data = [
    { fileName: "data1.csv", source: "API", fieldName: "Username" },
    { fileName: "data2.csv", source: "Database", fieldName: "Email" },
    { fileName: "data3.csv", source: "CSV Upload", fieldName: "Phone Number" },
  ];

  const selectOptions = {
    fileName: ["data1.csv", "data2.csv", "data3.csv", "newfile.csv"],
    source: ["API", "Database", "CSV Upload", "Manual Input"],
    fieldName: ["Username", "Email", "Phone Number", "Address"],
    Title: ["title1", "title2", "title3"],
  };

  return (
    <div
      className={`p-2 sm:p-4 mx-auto  w-full   min-w-[640px] xl:min-w-[1300px] 2xl:min-w-[1700px] 3xl:min-w-[1800px] 4xl:min-w-[1900px]  table-auto justify-center items-center  `}
    >
      {/* Input Section */}
      <div className="bg-white p-4 border rounded-md shadow-sm mb-6">
        <label className="block text-lg font-medium mb-2">Temple Name</label>
        <input
          type="text"
          className="w-full rounded-md border border-gray-300 px-3 py-1 focus:outline-none focus:ring focus:ring-blue-200"
          placeholder="Enter temple name"
        />
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto rounded-md bg-white shadow-sm border">
        <table className="min-w-[600px] w-full table-auto">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 border-b border-gray-300">No</th>
              <th className="px-4 py-2 border-b border-gray-300">File Name</th>
              <th className="px-4 py-2 border-b border-gray-300">Source</th>
              <th className="px-4 py-2 border-b border-gray-300">Field Name</th>
              <th className="px-4 py-2 border-b border-gray-300">Title</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="even:bg-gray-50">
                <td className="px-4 py-2 border-t border-gray-200">
                  {index + 1}
                </td>
                <td className="px-4 py-2 border-t border-gray-200">
                  {item.fileName}
                </td>
                <td className="px-4 py-2 border-t border-gray-200">
                  <select
                    defaultValue={item.source}
                    className="w-full border rounded-md px-2 py-1"
                  >
                    {selectOptions.source.map((option, idx) => (
                      <option key={idx} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-2 border-t border-gray-200">
                  <select
                    defaultValue={item.fieldName}
                    className="w-full border rounded-md px-2 py-1"
                  >
                    {selectOptions.fieldName.map((option, idx) => (
                      <option key={idx} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-2 border-t border-gray-200">
                  <select
                    defaultValue=""
                    className="w-full border rounded-md px-2 py-1"
                  >
                    <option disabled value="">
                      Select title
                    </option>
                    {selectOptions.Title.map((option, idx) => (
                      <option key={idx} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bottom Actions */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <label className="inline-flex items-center gap-2">
            <input type="checkbox" className="accent-green-500" />
            <span className="text-sm">Auto Publish List</span>
          </label>
          <label className="inline-flex items-center gap-2">
            <input type="checkbox" className="accent-green-500" />
            <span className="text-sm">Save as Source Template</span>
          </label>
        </div>
        <button className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-md text-sm">
          Save
        </button>
      </div>
    </div>
  );
};

export default Page;
