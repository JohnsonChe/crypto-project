import React, { useState, useEffect } from 'react';
// import { useEffect } from 'react/cjs/react.development';

function CryptoModal(props, ref) {
  const [cryptoData, setCryptoData] = useState();

  const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 4,
    minimumFractionDigits: 2,
  });

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
        <div className="modal rounded-lg" ref={ref}>
          <main className="bg-gray-200 h-min overflow-hidden relative rounded-lg">
            <div className="flex items-start justify-between">
              <div className="flex flex-col w-full md:space-y-4">
                <div className="overflow-auto h-min pb-24 px-4 md:px-6">
                  {/* Crypto Coin Title and Price Card */}
                  <div className="flex my-6 items-center w-full space-y-4 md:space-x-4 md:space-y-0 flex-col md:flex-row">
                    <div className="w-full md:w-1/2">
                      <div className="shadow-lg w-full bg-white relative overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-6 space-x-4">
                          <div className="flex items-center">
                            <span className="rounded-full relative p-5 bg-white-100">
                              <img
                                src={cryptoData.image.large}
                                className="text-yellow-500 h-11 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                                alt=""
                              />
                            </span>
                            <p className="text-2xl text-gray-700 ml-2 font-semibold">
                              {cryptoData.name}
                            </p>
                            <p className="text-sm text-gray-700 ml-2 font-semibold">
                              {cryptoData.symbol}
                            </p>
                          </div>
                          <div className="flex flex-col items-center">
                            <div className="mt-6 md:mt-0 text-black font-bold text-xl">
                              Current Price
                            </div>
                            <div className="mt-6 md:mt-0 text-black font-bold text-xl">
                              {currencyFormatter.format(
                                cryptoData.market_data.current_price.usd
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Market Cap Card */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 my-4">
                    <div className="w-full">
                      <div className="shadow-lg px-4 py-6 w-full bg-white relative">
                        {/* Market Cap Text and Rank Wrapper */}
                        <div className="flex justify-between">
                          <p className="text-md w-max text-gray-700 font-semibold">
                            Market Cap
                          </p>
                          <p className="text-md w-max text-gray-700 font-semibold">
                            Rank #{cryptoData.market_cap_rank}
                          </p>
                        </div>

                        <div className="flex items-end space-x-2 my-6">
                          <p className="text-4xl text-black font-bold">
                            {currencyFormatter.format(
                              cryptoData.market_data.market_cap.usd
                            )}
                          </p>
                        </div>
                        {/* Row Wrapper Div */}
                        <div>
                          {/* 24 Hour Low Row */}
                          <div className="flex items-center pb-2 mb-2 text-sm sm:space-x-12  justify-between border-b border-gray-200">
                            <p>24 Hour Low</p>
                            <div className="flex items-end text-s">
                              {cryptoData.market_data.low_24h.usd}
                            </div>
                          </div>
                          {/* 24 Hour High Row */}
                          <div className="flex items-center mb-2 pb-2 text-sm space-x-12 md:space-x-24 justify-between border-b border-gray-200">
                            <p>24 Hour High</p>
                            <div className="flex items-end text-s">
                              {cryptoData.market_data.high_24h.usd}
                            </div>
                          </div>
                          {/* All Time Low Row */}
                          <div className="flex items-center mb-2 pb-2 text-sm space-x-12 md:space-x-24 justify-between border-b">
                            <p>All Time Low</p>
                            <div className="flex items-end text-s">
                              {cryptoData.market_data.atl.usd}
                            </div>
                          </div>
                          {/* All Time High Row */}
                          <div className="flex items-center text-sm space-x-12 md:space-x-24 justify-between">
                            <p>All Time High</p>
                            <div className="flex items-end text-s">
                              {cryptoData.market_data.ath.usd}
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
