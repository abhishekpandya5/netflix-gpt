import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import movieReducer from "./features/movieSlice";
import { tmdpCoreApi } from "./services/tmdbCore";

const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [tmdpCoreApi.reducerPath]: tmdpCoreApi.reducer,
    user: userReducer,
    movies: movieReducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tmdpCoreApi.middleware),
});

export default store;
