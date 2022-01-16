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
          <h1>{cryptoData.name}</h1>
          <img src={cryptoData.image.large} alt={cryptoData.id} />
          <p>{console.log(cryptoData)}</p>
          <p>Rank: {cryptoData.market_cap_rank}</p>
          <p>Market Data: {cryptoData.market_data.ath.usd}</p>
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
