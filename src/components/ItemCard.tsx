import { Card, Space } from "antd";
import React from "react";
import { ItemCardProps } from "../types/components/ItemCard";
import styles from "./styles/moviecard.module.css";
import { AiFillStar } from "react-icons/ai";

const ItemCard: React.FC<ItemCardProps> = ({
  overview,
  id,
  poster_path,
  release_date,
  vote_average,
  first_air_date,
}) => {
  return (
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
            <div className={styles.description}>
              {overview.substring(0, 40) + "..."}
            </div>
            <Space>
              <span className={styles.ratingContainer}>
                {vote_average}&nbsp;
                <AiFillStar />
              </span>
              <span>•</span>
              <span>
                {release_date?.substring(0, 4) ||
                  first_air_date?.substring(0, 4)}
              </span>
            </Space>
          </Space>
        }
      />
    </Card>
  );
};

export default ItemCard;
