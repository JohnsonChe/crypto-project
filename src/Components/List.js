import React, { useState, useEffect } from 'react';
import ListItem from './ListItem';
import Pagination from './Pagination';

function List(props) {
  const [page, setPage] = useState(1);
  const [maxPages, setMaxPages] = useState(1);
  const [listItems, setListItems] = useState([]);
  const pageItems = 10;

  useEffect(() => {
    try {
      const { cryptoList } = props
      const listItemArr = [];
      let counter = Math.floor(page * 10 - 10);
      for (let i = 0; i < pageItems; i++) {
        listItemArr.push(<ListItem key={i} crypto={cryptoList[counter]} />);
        counter++;
      }
      setListItems(listItemArr);
      setMaxPages(Math.floor(cryptoList.length / pageItems));
    } catch (error) {
      console.log(`${error} Cannot Render Crypto List`)
    }
  }, [page, props])

  const handlePageClick = (value) => {
    if (value <= 0)
      setPage(1);
    else if (value >= maxPages)
      setPage(maxPages);
    else
      setPage(value);
  }


  return (

    <div className="container mx-auto px-4 sm:px-8 max-w-full">
      <div className="py-4">
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block shadow rounded-lg overflow-hidden w-full">
            <table className="leading-normal w-full">
              <thead>
                <tr>
                  <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-bold">
                    Coin
                  </th>
                  <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-bold">
                    Price
                  </th>
                  <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-bold">
                    Market Cap
                  </th>
                  <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-bold">
                    Circulating Supply
                  </th>
                  <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-bold">
                    All Time High
                  </th>
                  <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-bold">
                    24hr Low
                  </th>
                  <th scope="col" className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-bold">

                  </th>
                </tr>
              </thead>
              <tbody>
                {listItems}
              </tbody>
            </table>
            <Pagination page={page} clickFn={handlePageClick} />
          </div>
        </div>
      </div>
    </div>

  )
}

export default List;