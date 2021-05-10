import { configureStore } from "@reduxjs/toolkit";
import movie from "./reducers/movie";

export const store = configureStore({
  reducer: {
    movie,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
