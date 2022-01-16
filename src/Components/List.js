import React, { useState, useEffect } from "react";
import ListItem from "./ListItem";
import Pagination from "./Pagination";
import { useRecoilState } from "recoil";
import { watchState } from "../atoms/watchAtom";
import { watchListState } from "../atoms/watchUserWatchList";

function List(props) {
  const [page, setPage] = useState(1);
  const [maxPages, setMaxPages] = useState(1);
  const [listItems, setListItems] = useState([]);
  const pageItems = 10;

  const [watch, setWatch] = useRecoilState(watchState);
  const [watchList, setWatchList] = useRecoilState(watchListState);

  useEffect(() => {
    try {
      const { cryptoList } = props;
      if (cryptoList) {
        const filteredCryptoList = filterData(cryptoList); //Filter the crypto array
        const listItemArr = [];
        let counter = Math.floor(page * 10 - 10);
        for (let i = 0; i < pageItems; i++) {
          listItemArr.push(
            <ListItem
              key={i}
              crypto={filteredCryptoList[counter]}
              fav={false}
              buttonClick={handleAddButton}
              openModal={props.openModal}
              setCryptoID={props.setCryptoID}
            />
          );
          counter++;
        }
        setListItems(listItemArr);
        setMaxPages(Math.floor(filteredCryptoList.length / pageItems));
      }
    } catch (error) {
      console.log(`${error} Cannot Render Crypto List`);
    }
  }, [page, props]);

  const filterData = (cryptoList) => {
    const data = [];
    cryptoList.forEach((crypto) => {
      data.push({
        id: crypto.id,
        image: crypto.image,
        name: crypto.name,
        current_price: crypto.current_price,
        marketCap: crypto.market_cap,
        circulating_supply: crypto.circulating_supply,
        ath: crypto.ath,
        low_24hr: crypto.low_24h,
      });
    });
    return data;
  };

  const handlePageClick = (value) => {
    if (value <= 0) setPage(1);
    else if (value >= maxPages) setPage(maxPages);
    else setPage(value);
  };

  const handleAddButton = async (data) => {
    const updatedWatch = [...watch, data]; //Add additional data
    setWatch(updatedWatch); //Set watch state within recoil
    await dbAddWatch(data.id);
    const updatedWatchList = [...watchList, data.id];
    setWatchList(updatedWatchList);
    console.log("props.email", props.email);
  };

  const dbAddWatch = (id) => {
    try {
      fetch("http://localhost:5000/addwatch", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: id, email: props.email }),
      }).then((res) => res.json());
    } catch (error) {
      throw new Error("Unable to update user watchlist in DB");
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

export default List;
