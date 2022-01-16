import React, { useState } from 'react';

function Search(props) {
  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      props.openModal();
      props.setCryptoID(e.target.value);
      e.target.value = '';
    }
  }
  return (
    <div className="container relative left-0 z-50 flex w-64 h-auto h-full mr-8">
      <div className="relative flex items-center w-full lg:w-64 h-full group">
        <div className="absolute z-50 flex items-center justify-center block w-auto h-10 p-3 pr-2 text-sm text-gray-500 uppercase cursor-pointer sm:hidden">
          <svg
            fill="none"
            className="relative w-5 h-5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <svg
          className="absolute left-0 z-20 hidden w-4 h-4 ml-4 text-gray-500 pointer-events-none fill-current group-hover:text-gray-400 sm:block"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"></path>
        </svg>
        <input
          type="text"
          className="block w-full py-1.5 pl-10 pr-4 leading-normal rounded focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 ring-opacity-90 bg-gray-100 dark:bg-gray-800 text-gray-400 aa-input ring-2 ring-white"
          placeholder="Search"
          onKeyDown={(e) => handleKeyDown(e)}
        />
      </div>
    </div>
  );
}

export default Search;
