import { Alert, List, Spin } from "antd";
import React from "react";
import ItemCard from "../components/ItemCard";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { loadTrendingItem, selectHome } from "../redux/reducers/home";
import styles from "./styles/page.module.css";
import InfiniteScroll from "react-infinite-scroll-component";

const Home: React.FC = () => {
  const { dataLoaded, loading, error, items } = useAppSelector(selectHome);
  const dispatch = useAppDispatch();

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
        {/* <Row gutter={[16, 32]} className={styles.row}>
          {items.map((item) => (
            <ItemCard key={item.id} {...item} />
          ))}
        </Row> */}
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
                <ItemCard {...item} />
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </div>
    </>
  );
};

export default Home;
