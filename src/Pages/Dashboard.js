import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Greeting from '../Components/Greeting';
import Menu from '../Components/Menu';
import Avatar from '../Components/Avatar';
import Search from '../Components/Search';
import List from '../Components/List';
import WatchList from '../Components/WatchList';

function Dashboard() {
  const [otherCrypto, setOtherCrypto] = useState();
  const { state } = useLocation();

  useEffect(() => {
    fetchCrypto();
  }, [])

  async function fetchCrypto() {
    try {
      const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250')
      setOtherCrypto(await res.json())
      setTimeout(fetchCrypto, 10000)
    } catch (error) {
      console.log(error, 'Cannot fetch other cryptos');
    }
  }


  return (
    <main className="bg-gray-100 dark:bg-gray-800 h-screen overflow-hidden relative">
      <div className="flex items-start justify-between">
        <div className="flex flex-col w-full md:space-y-4">
          <header className="w-full h-16 z-40 flex items-center justify-between">
            <Menu />
            <Avatar fName={state.firstName} lName={state.lastName} />
          </header>
          <div className="overflow-auto h-screen pb-24 px-4 md:px-6">
            <div className="flex mb-10">
              <Greeting fName={state.firstName} />
              <Search />
            </div>

            <h3 className="text-xl dark:text-white">Your Watchlist</h3>
            <WatchList watchList={state.watchList} />

            <h3 className="text-xl dark:text-white">Explore Others</h3>
            <List cryptoList={otherCrypto} />
          </div>
        </div>
      </div>
    </main>
  )
}

export default Dashboard;