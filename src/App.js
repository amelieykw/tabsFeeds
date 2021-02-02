import './App.css';
import Tabs from './components/Tabs/index';
import Feeds from './components/Feeds/index';

function App() {
  let activeIndex = 0;
  let panes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const onTabChangeHandler = function (index) {
    // onTabChangeHandler(index) 是tabs切换后的回调函数，返回新的索引index（对应panes的索引）
    activeIndex = index;
  };
  let feedsData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const onLoadMoreHandler = function () {
    // onLoadMoreHandler用来监听是否触底，从而触发加载下一页的逻辑
  };
  return (
    <div className='App'>
      <Tabs
        activeIndex={activeIndex}
        panes={panes}
        onTabChange={onTabChangeHandler}
      />
      <Feeds
        data={feedsData}
        empty={false}
        loading={false}
        onLoadMore={onLoadMoreHandler}
      />
    </div>
  );
}

export default App;
