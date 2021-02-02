import React from 'react';
import './Feeds.css';

function Feeds(props) {
  // data：数据结构等同feedsData，让Feeds组件可以渲染数据
  // empty：可以让Feeds展示数据为空时的样式
  // loading：可以让Feeds还没有数据时，展示loading的一个样式
  // onLoadMoreHandler：用来监听是否触底，从而触发加载下一页的逻辑
  const { data, empty, loading } = props;

  const feedsItems = data.map((feed, index) => (
    <div className='item item-1' key={index}>
      {feed}
    </div>
  ));

  const styleWhenFeedsEmpty = <div>empty</div>;

  const styleWhenFeedsLoading = <div>loading</div>;

  return (
    <div className='feedsContainer'>
      {loading
        ? styleWhenFeedsLoading
        : empty
        ? styleWhenFeedsEmpty
        : feedsItems}
    </div>
  );
}

export default Feeds;
