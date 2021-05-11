import { Alert, List, Spin } from "antd";
import React from "react";
import ItemCard from "../components/ItemCard";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { loadTrendingItem, selectHome } from "../redux/reducers/home";
import styles from "./styles/page.module.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { useHistory } from "react-router";

const Home: React.FC = () => {
  const { dataLoaded, loading, error, items } = useAppSelector(selectHome);
  const dispatch = useAppDispatch();
  const history = useHistory();

  React.useEffect(() => {
    if (!dataLoaded && items.length === 0) {
      dispatch(loadTrendingItem(1));
    }
  }, [dataLoaded, items, dispatch]);

  function loadItemsOnPage() {
    dispatch(loadTrendingItem(items.length / 20 + 1));
  }

  if (loading && items.length === 0) {
    return (
      <div className={styles.loadingContainer}>
        <Spin />
      </div>
    );
  }

  return (
    <>
      {error ? (
        <Alert
          banner
          type="error"
          closable
          showIcon
          message="Error in loading data"
        />
      ) : null}
      <div className={styles.container}>
        <InfiniteScroll
          next={loadItemsOnPage}
          hasMore
          dataLength={items.length}
          loader={<Spin />}
        >
          <List
            dataSource={items}
            grid={{ gutter: 16, column: 6 }}
            renderItem={(item) => (
              <List.Item key={item.id}>
                <ItemCard
                  {...item}
                  onClick={() => history.push(`/${item.media_type}/${item.id}`)}
                />
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </div>
    </>
  );
};

export default Home;
