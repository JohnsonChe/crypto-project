import React, { useState, useEffect } from 'react';
import Card from './Card';
import Greeting from '../Components/Greeting';
import Menu from '../Components/Menu';
import Avatar from '../Components/Avatar';
import Search from '../Components/Search';
import List from '../Components/List';

function Dashboard({ authorized }) {
  const [otherCrypto, setOtherCrypto] = useState();

  useEffect(() => {
    try {
      fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc')
        .then(res => res.json())
        .then(data => setOtherCrypto(data))
    } catch (error) {
      console.log(`${error} Cannot Fetch Trending`)
    }
  }, [])



  return (
    <main className="bg-gray-100 dark:bg-gray-800 h-screen overflow-hidden relative">
      <div className="flex items-start justify-between">
        <div className="flex flex-col w-full md:space-y-4">
          <header className="w-full h-16 z-40 flex items-center justify-between">
            <Menu />
            <Avatar />
          </header>
          <div className="overflow-auto h-screen pb-24 px-4 md:px-6">
            <div className="flex mb-10">
              <Greeting />
              <Search />
            </div>

            <h3 className="text-xl dark:text-white">Your Watchlist</h3>
            <List />

            <h3 className="text-xl dark:text-white">Explore Others</h3>
            <List cryptoList={otherCrypto} />
          </div>
        </div>
      </div>
    </main>
  )
}

export default Dashboard;