import React, { useState, useEffect } from 'react';
import ListItem from './ListItem';
import Pagination from './Pagination';
import { useRecoilState } from 'recoil';
import { watchState } from '../atoms/watchAtom';
import { watchListState } from '../atoms/watchUserWatchList';

function WatchList(props) {
  const [page, setPage] = useState(1);
  const [maxPages, setMaxPages] = useState(1);
  // const [watchList, setWatchList] = useState(props.watchList);
  const [listItems, setListItems] = useState([]);
  let pageItems = 5;
  const [firstLoad, setFirstLoad] = useState(true);
  const [watch, setWatch] = useRecoilState(watchState);
  const [watchList, setWatchList] = useRecoilState(watchListState);

  useEffect(() => {
    if (watchList) {
      fetchWatchList(watchList); // Fetch the WatchList passsed down from Login ['btc, 'eth']
    }
  }, []);

  useEffect(() => {
    if (watchList) {
      fetchWatchList(watchList);
    }
    // fetchWatchList(watchList)
  }, [watchList]);

  useEffect(() => {
    try {
      if (watch) {
        const listItemArr = [];
        let counter = Math.floor(page * pageItems - pageItems);
        for (let i = 0; i < Math.min(pageItems, watch.length); i++) {
          listItemArr.push(
            <ListItem
              key={i}
              crypto={watch[counter]}
              fav={true}
              buttonClick={handleRemoveButton}
              openModal={props.openModal}
              setCryptoID={props.setCryptoID}
            />
          );
          counter++;
        }
        setListItems(listItemArr);
        setMaxPages(Math.floor(watch.length / pageItems));
      }
    } catch (error) {
      console.log(`${error} Cannot Render Crypto List`);
    }
  }, [page, watch]);

  async function fetchWatchList(watchListing) {
    //fetch every coin in array
    const data = await Promise.all(
      watchListing.map((element) => _fetch(element))
    );

    //filter the api data to only fields we want
    const filteredData = filterData(data);
    //set the watch in recoil which is an array of [{coin data}, {coin data}]
    setWatch(filteredData);
    //FIRST RENDER NO SETTIMEOUT, SETTIMEOUT AFTER EACH ADD
    // if(!firstLoad)
    //   setTimeout(fetchWatchList, 10000, watchListing)
    // return await Promise.all(watchList.map(element => _fetch(element)));

    async function _fetch(id) {
      try {
        const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
        const data = await res.json();
        return data;
      } catch (error) {
        console.log(error, 'Error Fetching Watchlist item: ' + id);
      }
    }
  }

  async function fetchUpdatedWatchList(email) {
    return fetch('http://localhost:5000/getwatch', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email }),
    })
      .then((data) => data.json())
      .then((account) => account.watchList);
  }

  const filterData = (cryptoList) => {
    const data = [];
    cryptoList.forEach((crypto) => {
      data.push({
        id: crypto.id,
        image: crypto.image.large,
        name: crypto.name,
        current_price: crypto.market_data.current_price.usd,
        marketCap: crypto.market_data.market_cap.usd,
        circulating_supply: crypto.market_data.circulating_supply,
        ath: crypto.market_data.ath.usd,
        low_24hr: crypto.market_data.low_24h.usd,
      });
    });
    return data;
  };

  //PAGE Click
  const handlePageClick = (value) => {
    if (value <= 0) setPage(1);
    else if (value >= maxPages) setPage(maxPages);
    else setPage(value);
  };

  //HANDLE LIST ITEM CLICK
  const handleRemoveButton = async (data) => {
    let updatedWatchListData = [...watch];
    updatedWatchListData = updatedWatchListData.filter(
      (element) => element.id !== data.id
    );
    setWatch(updatedWatchListData);
    let updatedWatchList = [...watchList];
    console.log('updatedWatchList before', updatedWatchList);
    console.log('data.id', data.id);
    updatedWatchList = updatedWatchList.filter((element) => {
      console.log('element in map', element);
      return element !== data.id;
    });
    console.log('updatedWatchList after', updatedWatchList);
    await dbRemoveWatch(updatedWatchList);
    setWatchList(updatedWatchList);
  };

  const dbRemoveWatch = (newWatchList) => {
    try {
      fetch('http://localhost:5000/removewatch', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: props.email, watchList: newWatchList }),
      }).then((res) => res.json());
    } catch (error) {
      throw new Error('Unable to update user watchlist in DB');
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-8 max-w-full">
      <div className="py-4">
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block shadow rounded-lg overflow-hidden w-full">
            <table className="leading-normal w-full">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-bold"
                  >
                    Coin
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-bold"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-bold"
                  >
                    Market Cap
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-bold"
                  >
                    Circulating Supply
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-bold"
                  >
                    All Time High
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-bold"
                  >
                    24hr Low
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-bold"
                  ></th>
                </tr>
              </thead>
              <tbody>{listItems}</tbody>
            </table>
            <Pagination page={page} clickFn={handlePageClick} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default WatchList;
