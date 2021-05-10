import { createSlice } from "@reduxjs/toolkit";
import { Movie } from "../../types/movie";

interface MovieListState {
  dataLoaded: boolean;
  latest: Movie[];
  now_playing: Movie[];
  popular: Movie[];
  top_rated: Movie[];
  upcoming: Movie[];
}

const initialState: MovieListState = {
  dataLoaded: false,
  latest: [],
  now_playing: [],
  popular: [],
  top_rated: [],
  upcoming: [],
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
});

export default movieSlice.reducer;
