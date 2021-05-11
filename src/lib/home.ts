import { Item } from "../types/item";
import { client } from "./client";

export const loadHomePageItems = (
  page: number = 1
): Promise<{ results: Item[] }> => {
  return client
    .get("/trending/all/day", {
      params: {
        api_key: process.env.REACT_APP_API_KEY,
        page,
      },
    })
    .then((response) => response.data);
};
