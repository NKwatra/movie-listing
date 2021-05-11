import { configureStore } from "@reduxjs/toolkit";
import movie from "./reducers/movie";
import home from "./reducers/home";
import show from "./reducers/shows";

export const store = configureStore({
  reducer: {
    movie,
    home,
    show,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
