import React from 'react';

const SecondaryCoverLetter = () => {
  return (
    <div className="w-full h-full px-5 py-5 bg-gray-700 rounded-sm ">
      {/* header  */}
      <div>
        <h1 className="text-white text-xl md:text-2xl font-bold text-center">Secondary Cover Letter</h1>
      </div>
      {/* content */}
      <div className="mt-4 mx-auto">
        <div className="flex justify-center items-center">
          <ul className="flex gap-x-3 text-white font-semibold  text-md md:text-lg">
            <li>
              <button
                className="border-green-500 px-2 py-1 rounded-lg bg-green-500 hover:text-black hover:bg-green-900 hover:cursor-pointer duration-700.0 shadow-md shadow-green-500"
              >
                Add
              </button>
            </li>
            <li>
              <button
                className="border-amber-500 px-2 py-1 rounded-lg bg-amber-500 hover:text-black hover:bg-amber-900 hover:cursor-pointer duration-700 shadow-md shadow-amber-500"
              >
                Update
              </button>
            </li>
            <li>
              <button
                className="border-red-500 px-2 py-1 rounded-lg bg-red-500 hover:text-black
           hover:bg-red-900 hover:cursor-pointer duration-700 shadow-md shadow-red-500"
              >
                Delete
              </button>
            </li>
            <li>
              <button className="mt-1">
                <a
                  href={''}
                  download
                  className="border-blue-500 px-2 py-1 rounded-lg bg-blue-500 hover:text-black
             hover:bg-blue-900 hover:cursor-pointer duration-700 shadow-md shadow-blue-500"
                >
                  Download
                </a>
              </button>
            </li>
            <li>
              <button
                className="border-purple-500 px-2 py-1 rounded-lg bg-purple-500 hover:text-black
           hover:bg-purple-900 hover:cursor-pointer duration-700 shadow-md shadow-purple-500"
              >
                View
              </button>
            </li>
            <li>
              <button
                className="border-gray-500 px-2 py-1 rounded-lg bg-gray-500 hover:text-black
           hover:bg-700-900 hover:cursor-pointer duration-700 shadow-md shadow-gray-500"
              >
                Get Suggestions
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SecondaryCoverLetter;
