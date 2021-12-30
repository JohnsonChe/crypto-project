import React, { useState, useEffect } from 'react';
import ListItem from './ListItem';
import Pagination from './Pagination';

function WatchList(props) {
  const [page, setPage] = useState(1);
  const [maxPages, setMaxPages] = useState(1);
  const [watchListData, setWatchListData] = useState();
  const [listItems, setListItems] = useState([]);
  let pageItems = 5;

  useEffect(() => {
    const { watchList } = props;
    fetchWatchList(watchList)
    // .then(data => setWatchListData(data))
    // console.log(data);
    // setWatchListData(data)
  }, [])

  useEffect(() => {
    try {
      if (watchListData) {
        console.log('watchListData useEffect #2', watchListData);
        const listItemArr = [];
        let counter = Math.floor(page * 10 - 10);
        for (let i = 0; i < Math.min(pageItems, watchListData.length); i++) {
          listItemArr.push(<ListItem key={i} crypto={watchListData[counter]} fav={true} buttonClick={handleButton} />);
          counter++;
        }
        setListItems(listItemArr);
        console.log(listItems);
        setMaxPages(Math.floor(watchListData.length / pageItems));
      }

    } catch (error) {
      console.log(`${error} Cannot Render Crypto List`)
    }
  }, [page, watchListData])

  async function fetchWatchList(watchList) {

    const data = await Promise.all(watchList.map(element => _fetch(element)));
    setWatchListData(data);
    setTimeout(fetchWatchList, 10000, watchList)
    // return await Promise.all(watchList.map(element => _fetch(element)));

    async function _fetch(id) {
      try {
        const data = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
        return await data.json();
      } catch (error) {
        console.log(error, 'Error Fetching Watchlist item: ' + id)
      }
    }
  }


  //PAGE Click
  const handlePageClick = (value) => {
    if (value <= 0)
      setPage(1);
    else if (value >= maxPages)
      setPage(maxPages);
    else
      setPage(value);
  }

  //HANDLE LIST ITEM CLICK
  const handleButton = (value, data) => {
    if (value === '+') {
      setWatchListData([...watchListData, data]);
    } else if (value === '-') {
      let updatedWatchList = [...watchListData];
      updatedWatchList = updatedWatchList.filter(element => element !== data.id)
      setWatchListData(updatedWatchList);
    }
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

export default WatchList;