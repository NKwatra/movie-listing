import { Alert, Col, Row, Space, Spin, Typography } from "antd";
import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import { useParams } from "react-router";
import { useItemDetail } from "../lib/hooks";
import { formatRuntime } from "../lib/utils";
import { DetailRouteParams } from "../types/components/DetailRoute";
import styles from "./styles/page.module.css";
import "react-circular-progressbar/dist/styles.css";
import CastCard from "../components/CastCard";

const { Title, Text, Paragraph } = Typography;

const Detail: React.FC = () => {
  const { media_type, id } = useParams<DetailRouteParams>();
  const { loading, error, data } = useItemDetail(media_type, id);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <Spin />
      </div>
    );
  }

  const genreText = data?.genres
    ?.slice(0, 3)
    .map(({ name }, index) =>
      index === 2 || index === data!.genres.length - 1 ? name : `${name},`
    )
    .join(" ");

  return (
    <div className={styles.container}>
      {error && (
        <Alert
          message="Error in loading details"
          banner
          showIcon
          closable
          type="error"
        />
      )}
      <Row>
        <Col span={6}>
          {data?.poster_path && (
            <img
              src={process.env.REACT_APP_IMAGE_BASE_URL + data.poster_path}
              alt="poster"
              className={styles.responsiveImage}
            />
          )}
        </Col>
        <Col span={16} offset={2}>
          <Space direction="vertical" size="large">
            <div>
              <Title>
                {data?.title || data?.name}
                <span className={styles.detailPageReleaseYear}>
                  &nbsp;(
                  {data?.first_air_date?.substring(0, 4) ||
                    data?.release_date?.substring(0, 4)}
                  )
                </span>
              </Title>
              <Space className={styles.detailGenres}>
                <Text strong>{genreText}</Text>
                <Text strong>•</Text>
                <Text strong>
                  {data?.runtime || data?.episode_run_time?.length
                    ? formatRuntime(data?.runtime || data?.episode_run_time[0])
                    : "0m"}
                </Text>
              </Space>
            </div>
            <div className={styles.ratingContainer}>
              {data?.vote_average !== undefined && (
                <CircularProgressbar
                  maxValue={10}
                  value={data.vote_average}
                  text={`${data.vote_average * 10}%`}
                />
              )}
            </div>
            <Title
              level={4}
              type="secondary"
              className={styles.tagline}
              ellipsis={{ rows: 1, expandable: true }}
            >
              {data?.tagline || "Not Available"}
            </Title>
            <div>
              <Title level={5}>Overview</Title>
              <Paragraph
                type="secondary"
                ellipsis={{ rows: 3, expandable: true }}
              >
                {data?.overview || "Not Available"}
              </Paragraph>
            </div>
          </Space>
        </Col>
      </Row>
      <Title level={2} className={styles.movieCategoryLabel}>
        Cast
      </Title>
      <Row gutter={[16, 32]} className={styles.row} wrap={false}>
        {data?.cast
          .filter((member) => member.profile_path)
          .map((member) => (
            <Col span={4} key={member.id}>
              <CastCard {...member} />
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default Detail;
