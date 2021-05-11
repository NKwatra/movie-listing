import React from "react";
import { ItemDetail } from "../types/itemDetail";
import { client } from "./client";

export const useItemDetail = (media_type: string, id: string) => {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState<null | ItemDetail>(null);
  const [error, setError] = React.useState<null | Error>(null);

  React.useEffect(() => {
    async function loadDetails() {
      try {
        const response = await client.get(`/${media_type}/${id}`, {
          params: {
            api_key: process.env.REACT_APP_API_KEY,
          },
        });
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    loadDetails();
  }, [id, media_type]);

  return { loading, data, error };
};
