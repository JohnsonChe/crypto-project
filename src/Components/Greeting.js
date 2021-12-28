import React, { useState } from 'react';

function Greeting() {
  return (
    <div className="flex flex-col w-full">
      <h1 className="text-4xl font-semibold text-gray-800 dark:text-white">
        Good afternoon, Charlie
      </h1>
      <h2 className="text-md text-gray-400">
        Here&#x27;s what&#x27;s happening with the crypto markets today.
      </h2>
    </div>
  )
}

export default Greeting;