import React from 'react';
import './Tabs.css';

function Tabs(props) {
  // Tabs组件，activeIndex是当前选中的tabs索引
  // panes属性的数据结构 => [key1, key2, ...] 其中每一项的key值用于查询API
  // onTabChangeHandler(index) 是tabs切换后的回调函数，返回新的索引index（对应panes的索引）
  const { activeIndex, panes, onTabChange } = props;

  const tabsItem = panes.map((tabKey, index) => (
    <div className='tab col-sm' key={index}>
      tab {tabKey}
    </div>
  ));

  // return <div className='tabsContainer'>{tabsItem}</div>;
  return (
    <div className='tabsContainer'>
      <div className='row'>{tabsItem}</div>
    </div>
  );
}

export default Tabs;
