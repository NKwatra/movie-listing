import { Alert, Col, Row, Spin, Typography } from "antd";
import React from "react";
import {
  loadAllMovies,
  movieCategories,
  selectMovies,
} from "../redux/reducers/movie";
import { capitalize } from "../lib/utils";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { MovieListState } from "../types/reducers/movie";
import ItemCard from "../components/ItemCard";
import styles from "./styles/page.module.css";

const { Title } = Typography;

const Movies: React.FC = () => {
  const { error, loading, dataLoaded, ...movies } = useAppSelector(
    selectMovies
  );
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (!dataLoaded && movies.now_playing.length === 0) {
      dispatch(loadAllMovies());
    }
  }, [dataLoaded, movies.now_playing, dispatch]);

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
        {movieCategories.map((category) => (
          <Row key={category} gutter={[16, 32]} className={styles.row}>
            <Col span={24}>
              <Title level={2}>{capitalize(category)}</Title>
            </Col>
            {movies[
              category as keyof Omit<
                MovieListState,
                "dataLoaded" | "error" | "loading"
              >
            ].map((movie) => (
              <ItemCard key={movie.id} {...movie} />
            ))}
          </Row>
        ))}
      </div>
    </>
  );
};

export default Movies;
