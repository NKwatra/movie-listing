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
import { useHistory } from "react-router";

const { Title } = Typography;

const Movies: React.FC = () => {
  const { error, loading, dataLoaded, ...movies } =
    useAppSelector(selectMovies);
  const dispatch = useAppDispatch();
  const history = useHistory();

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
              {movies[
                category as keyof Omit<
                  MovieListState,
                  "dataLoaded" | "error" | "loading"
                >
              ].map((movie) => (
                <Col span={7} key={movie.id}>
                  <ItemCard
                    {...movie}
                    onClick={() => history.push(`/movie/${movie.id}`)}
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

export default Movies;
