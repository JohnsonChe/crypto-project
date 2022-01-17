import React, { useState, useEffect } from 'react';
// import { useEffect } from 'react/cjs/react.development';

function CryptoModal(props, ref) {
  const [cryptoData, setCryptoData] = useState();

  useEffect(() => {
    fetchCrypto();
    function close(e) {
      if (e.key === 'Escape') {
        props.onCloseButtonClick();
      }
    }

    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);

  async function fetchCrypto() {
    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/${props.cryptoID}`
      );
      const data = await res.json();
      console.log('data', data);
      await setCryptoData(data);
    } catch (error) {
      console.log(error, 'Cannot fetch other cryptos');
    }
  }

  return (
    <div className="modal-overlay">
      {cryptoData && (
        <div className="modal" ref={ref}>
          
    <main class="bg-gray-100 dark:bg-gray-800 h-screen overflow-hidden relative">
    <div class="flex items-start justify-between">
        <div class="flex flex-col w-full md:space-y-4">
            <div class="overflow-auto h-screen pb-24 px-4 md:px-6">
                <div class="flex my-6 items-center w-full space-y-4 md:space-x-4 md:space-y-0 flex-col md:flex-row">
                    <div class="w-full md:w-6/12">
                        <div class="shadow-lg w-full bg-white dark:bg-gray-700 relative overflow-hidden">
                                <div class="flex items-center justify-between px-4 py-6 space-x-4">
                                    <div class="flex items-center">
                                        <span class="rounded-full relative p-5 bg-white-100">
                                            <img src={cryptoData.image.large} className="text-yellow-500 h-11 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"/>
                                        </span>
                                        <p class="text-2xl text-gray-700 dark:text-white ml-2 font-semibold">
                                            {cryptoData.name}
                                        </p>
                                        <p class="text-sm text-gray-700 dark:text-white ml-2 font-semibold">
                                            {cryptoData.symbol}
                                        </p>
                                    </div>
                                    <div className="flex flex-col items-center">
                                      <div class="mt-6 md:mt-0 text-black dark:text-white font-bold text-xl">
                                          Current Price
                                      </div>
                                      <div class="mt-6 md:mt-0 text-black dark:text-white font-bold text-xl">
                                          ${cryptoData.market_data.current_price.usd}
                                      </div>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
                    <div class="w-full">
                        <div class="shadow-lg px-4 py-6 w-full bg-white dark:bg-gray-700 relative">
                            <p class="text-md w-max text-gray-700 dark:text-white font-semibold">
                                Market Cap
                            </p>
                            <div class="flex items-end space-x-2 my-6">
                                <p class="text-5xl text-black dark:text-white font-bold">
                                    ${cryptoData.market_data.market_cap.usd}
                                </p>
                            </div>
                            <div class="dark:text-white">
                                <div class="flex items-center pb-2 mb-2 text-sm sm:space-x-12  justify-between border-b border-gray-200">
                                    <p>
                                        Unique URL
                                    </p>
                                    <div class="flex items-end text-xs">
                                        34
                                        <span class="flex items-center">
                                            <svg width="20" fill="currentColor" height="20" class="h-3 text-green-500" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1675 971q0 51-37 90l-75 75q-38 38-91 38-54 0-90-38l-294-293v704q0 52-37.5 84.5t-90.5 32.5h-128q-53 0-90.5-32.5t-37.5-84.5v-704l-294 293q-36 38-90 38t-90-38l-75-75q-38-38-38-90 0-53 38-91l651-651q35-37 90-37 54 0 91 37l651 651q37 39 37 91z">
                                                </path>
                                            </svg>
                                            22%
                                        </span>
                                    </div>
                                </div>
                                <div class="flex items-center mb-2 pb-2 text-sm space-x-12 md:space-x-24 justify-between border-b border-gray-200">
                                    <p>
                                        Embedded form
                                    </p>
                                    <div class="flex items-end text-xs">
                                        13
                                        <span class="flex items-center">
                                            <svg width="20" fill="currentColor" height="20" class="h-3 text-green-500" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1675 971q0 51-37 90l-75 75q-38 38-91 38-54 0-90-38l-294-293v704q0 52-37.5 84.5t-90.5 32.5h-128q-53 0-90.5-32.5t-37.5-84.5v-704l-294 293q-36 38-90 38t-90-38l-75-75q-38-38-38-90 0-53 38-91l651-651q35-37 90-37 54 0 91 37l651 651q37 39 37 91z">
                                                </path>
                                            </svg>
                                            12%
                                        </span>
                                    </div>
                                </div>
                                <div class="flex items-center text-sm space-x-12 md:space-x-24 justify-between">
                                    <p>
                                        New visitor
                                    </p>
                                    <div class="flex items-end text-xs">
                                        45
                                        <span class="flex items-center">
                                            <svg width="20" fill="currentColor" height="20" class="h-3 text-green-500" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1675 971q0 51-37 90l-75 75q-38 38-91 38-54 0-90-38l-294-293v704q0 52-37.5 84.5t-90.5 32.5h-128q-53 0-90.5-32.5t-37.5-84.5v-704l-294 293q-36 38-90 38t-90-38l-75-75q-38-38-38-90 0-53 38-91l651-651q35-37 90-37 54 0 91 37l651 651q37 39 37 91z">
                                                </path>
                                            </svg>
                                            41%
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>

          <button
            onClick={() => {
              props.onCloseButtonClick();
            }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}

const forwardedModal = React.forwardRef(CryptoModal);

export default forwardedModal;
