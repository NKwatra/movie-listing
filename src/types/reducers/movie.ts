import { Movie } from "../movie";

export interface MovieListState {
  dataLoaded: boolean;
  now_playing: Movie[];
  popular: Movie[];
  top_rated: Movie[];
  upcoming: Movie[];
  loading: boolean;
  error: boolean;
}
