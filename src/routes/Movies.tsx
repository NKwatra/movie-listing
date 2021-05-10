import { Col, Row, Typography } from "antd";
import React from "react";
import { movieCategories, selectMovies } from "../redux/reducers/movie";
import { capitalize } from "../lib/utils";
import { useAppSelector } from "../redux/hooks";
import { MovieListState } from "../types/reducers/movie";
import MovieCard from "../components/MovieCard";
import styles from "./styles/movies.module.css";

const { Title } = Typography;

const Movies: React.FC = () => {
  const movies = useAppSelector(selectMovies);
  return (
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
            <MovieCard key={movie.imdb_id} {...movie} />
          ))}
        </Row>
      ))}
    </div>
  );
};

export default Movies;
