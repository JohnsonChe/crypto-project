import React, { useState } from 'react';

function ListItem(props) {

  const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return (
    <tr>
      <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <a href="#" className="block relative">
              <img alt="profil" src={props.crypto.image} className="mx-auto object-cover rounded-full h-10 w-10 " />
            </a>
          </div>
          <div className="px-5 py-2 bg-white text-md">
            <p className="text-gray-900 whitespace-no-wrap">
              {props.crypto.name}
            </p>
          </div>
        </div>
      </td>
      <td className="px-5 py-2 border-b border-gray-200 bg-white text-md">
        <p className="text-gray-900 whitespace-no-wrap">
          {currencyFormatter.format(props.crypto.current_price)}
        </p>
      </td>
      <td className="px-5 py-2 border-b border-gray-200 bg-white text-md">
        <p className="text-gray-900 whitespace-no-wrap">
          {currencyFormatter.format(props.crypto.market_cap)}
        </p>
      </td>
      <td className="px-5 py-2 border-b border-gray-200 bg-white text-md">
        <p className="text-gray-900 whitespace-no-wrap">
          {props.crypto.circulating_supply}
        </p>
      </td>
      <td className="px-5 py-2 border-b border-gray-200 bg-white text-md">
        <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
          <span aria-hidden="true" className="absolute inset-0 bg-green-200 opacity-50 rounded-full">
          </span>
          <span className="relative">
            {currencyFormatter.format(props.crypto.ath)}
          </span>
        </span>
      </td>
      <td className="px-5 py-2 border-b border-gray-200 bg-white text-md">
        <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
          <span aria-hidden="true" className="absolute inset-0 bg-green-200 opacity-50 rounded-full">
          </span>
          <span className="relative">
            {currencyFormatter.format(props.crypto.low_24h)}
          </span>
        </span>
      </td>
      <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
        <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
          <span aria-hidden="true" className="absolute inset-0 bg-green-200 opacity-50 rounded-full">
          </span>
          <span className="relative">
            <button>+</button>
          </span>
        </span>
      </td>
    </tr>
  )
}

export default ListItem;