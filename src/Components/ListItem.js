import React from 'react';
import { Link } from 'react-router-dom';

function ListItem(props) {
  const itemID = props.crypto.id;
  const imgSrc = props.crypto.image;
  const currentPrice = props.crypto.current_price;
  const marketCap = props.crypto.marketCap;
  const cirSupply = props.crypto.circulating_supply;
  const ath = props.crypto.ath;
  const low_24hr = props.crypto.low_24hr;
  const buttonSymbol = props.fav ? '-' : '+';
  const buttonColor = props.fav ? 'bg-red-200' : 'bg-green-200';

  const itemData =
  {
    image: imgSrc,
    name: props.crypto.name,
    current_price: currentPrice,
    marketCap: marketCap,
    circulating_supply: cirSupply,
    ath: ath,
    low_24hr: low_24hr,
    id: itemID
  };

  const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 4,
    minimumFractionDigits: 2
  });

  return (
    <tr>
      <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
        <div className="flex items-center">
          <Link to='/crypto/:name' className='flex'>
            <div className="flex-shrink-0">
              <img alt="crypto-img" src={imgSrc} className="mx-auto object-cover rounded-full h-10 w-10 " />
            </div>
            <div className="px-5 py-2 bg-white text-md">
              <p className="text-gray-900 whitespace-no-wrap">
                {props.crypto.name}
              </p>
            </div>
          </Link>
        </div>
      </td>
      <td className="px-5 py-2 border-b border-gray-200 bg-white text-md">
        <p className="text-gray-900 whitespace-no-wrap">
          {currencyFormatter.format(currentPrice)}
        </p>
      </td>
      <td className="px-5 py-2 border-b border-gray-200 bg-white text-md">
        <p className="text-gray-900 whitespace-no-wrap">
          {currencyFormatter.format(marketCap)}
        </p>
      </td>
      <td className="px-5 py-2 border-b border-gray-200 bg-white text-md">
        <p className="text-gray-900 whitespace-no-wrap">
          {cirSupply.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
        </p>
      </td>
      <td className="px-5 py-2 border-b border-gray-200 bg-white text-md">
        <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
          <span aria-hidden="true" className="absolute inset-0 opacity-50 rounded-full">
          </span>
          <span className="relative">
            {currencyFormatter.format(ath)}
          </span>
        </span>
      </td>
      <td className="px-5 py-2 border-b border-gray-200 bg-white text-md">
        <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
          <span aria-hidden="true" className="absolute inset-0 opacity-50 rounded-full">
          </span>
          <span className="relative">
            {currencyFormatter.format(low_24hr)}
          </span>
        </span>
      </td>
      <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
        <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
          <span aria-hidden="true" className={buttonColor + " absolute inset-0 opacity-50 rounded-full"}>
          </span>
          <span className="relative">
            <button onClick={() => { props.buttonClick(itemData) }}>{buttonSymbol}</button>
          </span>
        </span>
      </td>
    </tr>
  )
}

export default ListItem;