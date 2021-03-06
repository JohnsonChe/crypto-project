import React, { useEffect, useState } from 'react';

function Pagination(props) {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    const { page, clickFn } = props;
    const pageArr = [];
    for (let i = 0; i < 4; i++) {
      pageArr.push(<Page key={page + i} pageNum={page + i} clickFn={clickFn} />)
    }
    setPages(pageArr)
  }, [props]);

  return (
    <div className="px-5 bg-white py-5 flex flex-col xs:flex-row items-center xs:justify-between">
      <div className="flex items-center">
        <button type="button" className="w-full p-4 border-t border-b border-l border-r text-base rounded-l-xl text-gray-600 bg-white hover:bg-gray-100" onClick={() => { props.clickFn(Number.parseInt(props.page, 10) - 1) }}>
          <svg width="9" fill="currentColor" height="8" className="" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
            <path d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z">
            </path>
          </svg>
        </button>
        {pages}
        <button type="button" className="w-full p-4 border-t border-b border-r text-base  rounded-r-xl text-gray-600 bg-white hover:bg-gray-100" onClick={() => { props.clickFn(Number.parseInt(props.page, 10) + 1) }}>
          <svg width="9" fill="currentColor" height="8" className="" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
            <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z">
            </path>
          </svg>
        </button>
      </div>
    </div>
  )
}

function Page(props) {
  return (
    <button type="button" className="w-full px-4 py-2 border-t border-b border-r text-base text-gray-600 bg-white hover:bg-gray-100 " onClick={() => { props.clickFn(props.pageNum) }}>
      {props.pageNum}
    </button>
  )
}

export default Pagination;