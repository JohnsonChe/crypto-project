import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Greeting from '../Components/Greeting';
import Menu from '../Components/Menu';
import Avatar from '../Components/Avatar';
import Search from '../Components/Search';
import List from '../Components/List';
import WatchList from '../Components/WatchList';
import CryptoModal from '../Components/CryptoModal';
import { useRecoilState } from 'recoil';
import { CSSTransition } from 'react-transition-group';

import { watchListState } from '../atoms/watchUserWatchList';

function Dashboard() {
  const [showCrytpoModal, setShowCryptoModal] = useState(false);
  const [cryptoModalID, setCryptoModalID] = useState();
  const [otherCrypto, setOtherCrypto] = useState();
  const [firstLoad, setFirstLoad] = useState(true);
  const { state } = useLocation();
  const modalRef = useRef();

  const [watchList, setWatchList] = useRecoilState(watchListState);

  useEffect(() => {
    if (firstLoad) {
      setWatchList(state.watchList);
      setFirstLoad(false);
    } else {
      fetchUpdatedWatchList(state.email).then((data) => setWatchList(data));
    }

    fetchCrypto();
  }, []);

  useEffect(() => {
    if (showCrytpoModal) {
      document.addEventListener('click', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [showCrytpoModal]);

  function handleOutsideClick(e) {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setShowCryptoModal(false);
    }
  }

  async function fetchCrypto() {
    try {
      const res = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250'
      );
      setOtherCrypto(await res.json());
      setTimeout(fetchCrypto, 10000);
    } catch (error) {
      console.log(error, 'Cannot fetch other cryptos');
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

  return (
    <main className="bg-gray-100 dark:bg-gray-800 h-screen overflow-hidden relative">
      <div className="flex items-start justify-between">
        <div className="flex flex-col w-full md:space-y-4">
          <header className="w-full h-16 z-40 flex items-center justify-between">
            {/* <Menu /> */}
            <Avatar fName={state.firstName} lName={state.lastName} />
          </header>
          <div className="overflow-auto h-screen pb-24 px-4 md:px-6">
            <div className="flex mb-10">
              <Greeting fName={state.firstName} />
            </div>

            <h3 className="text-xl dark:text-white">Your Watchlist</h3>
            <WatchList
              /**watchList={state.watchList}*/
              email={state.email}
              openModal={() => setShowCryptoModal(true)}
              setCryptoID={setCryptoModalID}
            />

            <div className="flex justify-between">
              <h3 className="text-xl dark:text-white">Explore Others</h3>
              <Search
                openModal={() => setShowCryptoModal(true)}
                setCryptoID={setCryptoModalID}
              />
            </div>
            <List
              cryptoList={otherCrypto}
              email={state.email}
              openModal={() => setShowCryptoModal(true)}
              setCryptoID={setCryptoModalID}
            />
            {showCrytpoModal && (
              <CryptoModal
                ref={modalRef}
                onCloseButtonClick={() => setShowCryptoModal(false)}
                cryptoID={cryptoModalID}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
