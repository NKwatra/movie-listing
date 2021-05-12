import { Item } from "../types/item";
import { TVShowsListState } from "../types/reducers/shows";
import { client } from "./client";

/**
 *
 * @param type  the type of show to load eg: top_rated, popular, etc
 * @returns details of show of a given type
 */
function loadShowsOfType(
  type: keyof Omit<TVShowsListState, "dataLoaded" | "error" | "loading">
): Promise<{ results: Item[] }> {
  return client
    .get(`/tv/${type}`, {
      params: {
        api_key: process.env.REACT_APP_API_KEY,
      },
    })
    .then((response) => response.data);
}

/**
 * Loads all the shows to be displayed on TV shows page
 */
export function loadShows() {
  let promises: ReturnType<typeof loadShowsOfType>[] = [];
  promises.push(loadShowsOfType("on_the_air"));
  promises.push(loadShowsOfType("popular"));
  promises.push(loadShowsOfType("top_rated"));

  return Promise.all(promises).then((results) => ({
    on_the_air: results[0],
    popular: results[1],
    top_rated: results[2],
  }));
}
