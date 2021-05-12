import { Item } from "../types/item";
import { client } from "./client";

/**
 *
 * @param page  page of api from which to load items
 * @returns  List of trending items
 */
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
