import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadShows } from "../../lib/shows";
import { Item } from "../../types/item";
import { TVShowsListState } from "../../types/reducers/shows";
import { RootState } from "../store";

const initialState: TVShowsListState = {
  dataLoaded: false,
  popular: [],
  top_rated: [],
  on_the_air: [],
  loading: false,
  error: false,
};

export const loadAllShows = createAsyncThunk("shows/load", async () => {
  const results = await loadShows();
  return results;
});

export const showCategories = ["on_the_air", "popular", "top_rated"];

function checkShowCategory(
  key: string
): key is keyof Omit<TVShowsListState, "dataLoaded" | "error" | "loading"> {
  return showCategories.includes(key);
}

const showsSlice = createSlice({
  name: "shows",
  initialState,
  reducers: {},
  extraReducers: {
    //@ts-ignore
    [loadAllShows.pending]: (state) => {
      state.loading = true;
      state.dataLoaded = false;
      state.error = false;
    },
    //@ts-ignore
    [loadAllShows.fulfilled]: (
      state,
      action: PayloadAction<{
        on_the_air: {
          results: Item[];
        };
        popular: {
          results: Item[];
        };
        top_rated: {
          results: Item[];
        };
      }>
    ) => {
      state.dataLoaded = true;
      state.loading = false;
      state.error = false;
      Object.entries(action.payload).forEach(([key, value]) => {
        if (checkShowCategory(key)) state[key] = value.results;
      });
    },
    //@ts-ignore
    [loadAllShows.rejected]: (state) => {
      state.error = true;
      state.loading = false;
      state.dataLoaded = false;
    },
  },
});

export const selectShows = (state: RootState) => state.show;

export default showsSlice.reducer;
