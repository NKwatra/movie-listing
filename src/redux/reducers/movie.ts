import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadMovies } from "../../lib/movies";
import { Item } from "../../types/item";
import { MovieListState } from "../../types/reducers/movie";
import { RootState } from "../store";

const initialState: MovieListState = {
  dataLoaded: false,
  now_playing: [],
  popular: [],
  top_rated: [],
  upcoming: [],
  loading: false,
  error: false,
};

export const loadAllMovies = createAsyncThunk("movies/load", async () => {
  const results = await loadMovies();
  return results;
});

export const movieCategories = [
  "now_playing",
  "popular",
  "top_rated",
  "upcoming",
];

function checkMovieCategory(
  key: string
): key is keyof Omit<MovieListState, "dataLoaded" | "error" | "loading"> {
  return movieCategories.includes(key);
}

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: {
    //@ts-ignore
    [loadAllMovies.pending]: (state) => {
      state.loading = true;
      state.dataLoaded = false;
      state.error = false;
    },
    //@ts-ignore
    [loadAllMovies.fulfilled]: (
      state,
      action: PayloadAction<{
        now_playing: {
          results: Item[];
        };
        popular: {
          results: Item[];
        };
        top_rated: {
          results: Item[];
        };
        upcoming: {
          results: Item[];
        };
      }>
    ) => {
      state.dataLoaded = true;
      state.loading = false;
      state.error = false;
      Object.entries(action.payload).forEach(([key, value]) => {
        if (checkMovieCategory(key)) state[key] = value.results;
      });
    },
    //@ts-ignore
    [loadAllMovies.rejected]: (state) => {
      state.error = true;
      state.loading = false;
      state.dataLoaded = false;
    },
  },
});

export const selectMovies = (state: RootState) => state.movie;

export default movieSlice.reducer;
