import { Item } from "../types/item";
import { client } from "./client";

export const loadHomePageItems = (): Promise<{ results: Item[] }> => {
  return client
    .get("/trending/all/day", {
      params: {
        api_key: process.env.REACT_APP_API_KEY,
      },
    })
    .then((response) => response.data);
};
