import React, { useState } from 'react';

function Avatar(props) {
  const { fName, lName } = props;
  return (
    <div className="relative z-20 flex flex-col justify-end h-full px-3 md:w-full">
      <div className="relative p-1 flex items-center w-full space-x-4 justify-end">
        <a href="#" className="block relative">
          <img alt="profile" src={require('../images/person.png')} className="mx-auto object-cover rounded-full h-10 w-10 " />
        </a>
        <button className="flex items-center text-gray-500 dark:text-white text-md">
          {fName + ' ' + lName[0] + '.'}
          <svg width="20" height="20" className="ml-2 text-gray-400" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
            <path d="M1408 704q0 26-19 45l-448 448q-19 19-45 19t-45-19l-448-448q-19-19-19-45t19-45 45-19h896q26 0 45 19t19 45z">
            </path>
          </svg>
        </button>
      </div>
    </div>
  )
}

export default Avatar;