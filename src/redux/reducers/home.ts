import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadHomePageItems } from "../../lib/home";
import { Item } from "../../types/item";
import { HomePageState } from "../../types/reducers/home";
import { RootState } from "../store";

const initialState: HomePageState = {
  error: false,
  dataLoaded: false,
  loading: false,
  items: [],
};

export const loadTrendingItem = createAsyncThunk("home/load", async () => {
  const result = await loadHomePageItems();
  return result;
});

const home = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: {
    //@ts-ignore
    [loadTrendingItem.pending]: (state) => {
      state.loading = true;
      state.dataLoaded = false;
      state.error = false;
    },
    // @ts-ignore
    [loadTrendingItem.fulfilled]: (
      state,
      action: PayloadAction<{
        results: Item[];
      }>
    ) => {
      state.dataLoaded = true;
      state.error = false;
      state.loading = false;
      state.items = action.payload.results;
    },
    //@ts-ignore
    [loadTrendingItem.rejected]: (state) => {
      state.error = true;
      state.loading = false;
      state.dataLoaded = false;
    },
  },
});

export const selectHome = (state: RootState) => state.home;

export default home.reducer;
