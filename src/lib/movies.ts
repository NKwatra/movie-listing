import { Item } from "../types/item";
import { MovieListState } from "../types/reducers/movie";
import { client } from "./client";

/**
 *
 * @param type : the type of movies to load eg: now_playing, popular, etc
 * @returns
 */
function loadMoviesOfType(
  type: keyof Omit<MovieListState, "dataLoaded" | "error" | "loading">
): Promise<{ results: Item[] }> {
  return client
    .get(`/movie/${type}`, {
      params: {
        api_key: process.env.REACT_APP_API_KEY,
      },
    })
    .then((response) => response.data);
}

/**
 * Loads all the movies to be displayed on movies page
 */
export function loadMovies() {
  let promises: ReturnType<typeof loadMoviesOfType>[] = [];
  promises.push(loadMoviesOfType("now_playing"));
  promises.push(loadMoviesOfType("popular"));
  promises.push(loadMoviesOfType("top_rated"));
  promises.push(loadMoviesOfType("upcoming"));

  return Promise.all(promises).then((results) => ({
    now_playing: results[0],
    popular: results[1],
    top_rated: results[2],
    upcoming: results[3],
  }));
}
