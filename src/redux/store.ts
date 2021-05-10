import { configureStore } from "@reduxjs/toolkit";
import movie from "./reducers/movie";
import home from "./reducers/home";

export const store = configureStore({
  reducer: {
    movie,
    home,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
