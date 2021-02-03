import React, { useState, useEffect, useCallback } from 'react';
import './Feeds.css';

function Feeds(props) {
  const { size, page, data, empty, loading } = props;
  const [currentFeeds, setCurrentFeeds] = useState([]); // 当前tab已加载的数据

  useEffect(() => {
    let feedsItems =
      data &&
      data.map((feed, index) => (
        <div
          className='item'
          key={`${size * page + index}`}
          style={{
            backgroundColor: `rgb(
        ${Math.random() * 255}, 
        ${Math.random() * 255}, ${Math.random() * 255})`,
            height: `${Math.random() * 800}px`,
            minHeight: '200px',
          }}
        >
          {size * page + index + 1}
        </div>
      ));
    if (!empty) {
      setCurrentFeeds([...currentFeeds, ...feedsItems]);
    } else {
      setCurrentFeeds([]);
    }
  }, [page, empty]);

  const styleWhenFeedsEmpty = <div>No feedsData</div>;
  const styleWhenFeedsLoading = <div>loading...</div>;

  const getClient = function () {
    return {
      width:
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth,
      height:
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight,
    };
  };

  const waterFall = useCallback(function () {
    if (empty) {
      return;
    }
    let gap = 10;
    let items = document.getElementsByClassName('item');
    let pageWidth = getClient().width;
    let itemWidth = items[0].offsetWidth;
    let columns = parseInt(pageWidth / (itemWidth + gap));
    let remainSpace = parseInt((pageWidth - columns * (itemWidth + gap)) / 2);
    let arr = [];
    for (let i = 0; i < items.length; i++) {
      if (i < columns) {
        items[i].style.top = 0;
        items[i].style.left = (itemWidth + gap) * i + remainSpace + 'px';
        arr.push(items[i].offsetHeight);
      } else {
        let minHeight = arr[0];
        let index = 0;
        for (let j = 0; j < arr.length; j++) {
          if (minHeight > arr[j]) {
            minHeight = arr[j];
            index = j;
          }
        }
        //设置下一行的第一个盒子的位置
        //top值就是最小列的高度+gap
        items[i].style.top = arr[index] + gap + 'px';
        items[i].style.left = items[index].offsetLeft + 'px';

        //修改最小列的高度
        //最小列的高度 = 当前自己的高度 + 拼接过来的高度 + 间隙的高度
        arr[index] = arr[index] + items[i].offsetHeight + gap;
      }
    }
  });

  useEffect(() => {
    window.onresize = function () {
      if (!loading && currentFeeds.length > 0) {
        waterFall();
      }
    };
    return () => {
      window.onresize = null;
    };
  });

  useEffect(() => {
    const feedsPart = document.getElementById('feedsPart');
    function callback() {
      const top = feedsPart.getBoundingClientRect().top;
      const windowHeight = window.screen.height;
      if (top && top < windowHeight) {
        props.onLoadMore();
      }
    }
    let timeoutId;
    feedsPart.onscroll = function () {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(callback, 500);
    };
    return () => {
      feedsPart.onscroll = null;
    };
  });

  useEffect(() => {
    if (!loading && currentFeeds.length > 0) {
      waterFall();
    }
  }, [currentFeeds, loading, waterFall]);

  return (
    <div
      id='feedsPart'
      className='feedsContainer'
      style={{ height: `${getClient().height}px` }}
    >
      {loading
        ? styleWhenFeedsLoading
        : empty
        ? styleWhenFeedsEmpty
        : currentFeeds}
    </div>
  );
}

export default Feeds;
