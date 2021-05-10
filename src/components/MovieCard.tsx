import { Card, Col, Space } from "antd";
import React from "react";
import { MovieCardProps } from "../types/components/MovieCard";
import styles from "./styles/moviecard.module.css";
import { AiFillStar } from "react-icons/ai";

const MovieCard: React.FC<MovieCardProps> = ({
  overview,
  imdb_id,
  poster_path,
  release_date,
  vote_average,
}) => {
  return (
    <Col span={4}>
      <Card
        hoverable
        bordered={false}
        cover={
          <img
            src={`${process.env.REACT_APP_IMAGE_BASE_URL}${poster_path}`}
            alt="poster"
          />
        }
      >
        <Card.Meta
          description={
            <Space direction="vertical">
              <div className={styles.description}>{overview}</div>
              <Space>
                <span className={styles.ratingContainer}>
                  {vote_average}&nbsp;
                  <AiFillStar />
                </span>
                <span>•</span>
                <span>{release_date.substring(0, 4)}</span>
              </Space>
            </Space>
          }
        />
      </Card>
    </Col>
  );
};

export default MovieCard;
