import { Card, Space, Typography } from "antd";
import React from "react";
import { Cast } from "../types/itemDetail";

const { Text } = Typography;

const CastCard: React.FC<Cast> = ({ profile_path, name, character }) => {
  return (
    <Card
      bordered={false}
      cover={
        <img
          src={`${process.env.REACT_APP_IMAGE_BASE_URL}${profile_path}`}
          alt="profile"
        />
      }
    >
      <Card.Meta
        description={
          <Space direction="vertical">
            <Text strong ellipsis>
              {name}
            </Text>
            <Text ellipsis>{character}</Text>
          </Space>
        }
      />
    </Card>
  );
};

export default CastCard;
