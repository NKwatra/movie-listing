import { Alert, Col, Row, Spin, Typography } from "antd";
import React from "react";
import { capitalize } from "../lib/utils";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import ItemCard from "../components/ItemCard";
import styles from "./styles/page.module.css";
import { useHistory } from "react-router";
import {
  loadAllShows,
  selectShows,
  showCategories,
} from "../redux/reducers/shows";
import { TVShowsListState } from "../types/reducers/shows";

const { Title } = Typography;

const Shows: React.FC = () => {
  const { error, loading, dataLoaded, ...shows } = useAppSelector(selectShows);
  const dispatch = useAppDispatch();
  const history = useHistory();

  React.useEffect(() => {
    if (!dataLoaded && shows.top_rated.length === 0) {
      dispatch(loadAllShows());
    }
  }, [dataLoaded, shows.top_rated, dispatch]);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <Spin />
      </div>
    );
  }

  return (
    <>
      {error && (
        <Alert
          banner
          message="Error in loading data"
          type="error"
          showIcon
          closable
        />
      )}
      <div className={styles.container}>
        {showCategories.map((category) => (
          <React.Fragment key={category}>
            <Title level={2} className={styles.movieCategoryLabel}>
              {capitalize(category)}
            </Title>
            <Row
              key={category}
              gutter={[16, 32]}
              className={styles.row}
              wrap={false}
            >
              {shows[
                category as keyof Omit<
                  TVShowsListState,
                  "dataLoaded" | "error" | "loading"
                >
              ].map((show) => (
                <Col span={7} key={show.id}>
                  <ItemCard
                    {...show}
                    onClick={() => history.push(`/tv/${show.id}`)}
                  />
                </Col>
              ))}
            </Row>
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

export default Shows;
