import { Alert, Row, Spin } from "antd";
import React from "react";
import ItemCard from "../components/ItemCard";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { loadTrendingItem, selectHome } from "../redux/reducers/home";
import styles from "./styles/page.module.css";

const Home: React.FC = () => {
  const { dataLoaded, loading, error, items } = useAppSelector(selectHome);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (!dataLoaded && items.length === 0) {
      dispatch(loadTrendingItem());
    }
  }, [dataLoaded, items, dispatch]);

  if (loading) {
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
        <Row gutter={[16, 32]} className={styles.row}>
          {items.map((item) => (
            <ItemCard key={item.id} {...item} />
          ))}
        </Row>
      </div>
    </>
  );
};

export default Home;
