import React, { useEffect, useState } from 'react';
import './App.css';
import Tabs from './components/Tabs/index';
import Feeds from './components/Feeds/index';

function App() {
  const SIZE = 20;
  const [page, setPage] = useState(0); //当前的页码
  const [empty, setEmpty] = useState(false); //是否存在下一页
  const [loading, setLoading] = useState(false); // 是否正在加载
  const [activeIndex, setActiveIndex] = useState(0); // 当前被激活的tab选项
  const [panes] = useState([...Array(10).keys()]);
  const [feedsData] = useState(
    new Array(panes.length).fill([...Array(100).keys()])
  ); //数据源
  const [dataToSend, setDataToSend] = useState(feedsData[0].slice(0, SIZE));

  const feedsLoader = function (key, pageNo, pageSize = 20) {
    return new Promise((resolve) => {
      resolve(feedsData[key].slice(pageSize * pageNo, pageSize * (pageNo + 1)));
    });
  };

  const onTabChangeHandler = function (index, event) {
    setActiveIndex(index);
    setLoading(true);
    setEmpty(true);
    setTimeout(() => {
      feedsLoader(index, 0, SIZE).then((res) => {
        setPage(0);
        setEmpty(false);
        setDataToSend(res);
        setLoading(false);
      });
    }, 1000);
  };

  const onLoadMoreHandler = function () {
    if (page > parseInt(feedsData[activeIndex].length / SIZE) - 2) return false;
    setPage((page) => page + 1);
    setDataToSend(feedsData[activeIndex].slice(SIZE * page, SIZE * (page + 1)));
    return true;
  };

  useEffect(() => {
    window.onload = function () {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    };
    return () => {
      window.onload = null;
    };
  });

  return (
    <div className='App'>
      <Tabs
        activeIndex={activeIndex}
        panes={panes}
        onTabChange={onTabChangeHandler}
      />
      <Feeds
        size={SIZE}
        page={page}
        data={dataToSend}
        empty={empty}
        loading={loading}
        onLoadMore={onLoadMoreHandler}
      />
    </div>
  );
}

export default App;
