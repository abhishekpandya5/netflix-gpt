import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BEARER_TOKEN } from "../../utils/constants";

export const tmdpCoreApi = createApi({
  reducerPath: "tmdpCoreApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3/movie",
    prepareHeaders: (headers) => {
      headers.set("Authorization", BEARER_TOKEN);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getNowPlayingMovies: builder.query({ query: () => "/now_playing?page=1" }),
    getTopRatedMovies: builder.query({
      query: () => "top_rated?language=en-US&page=1",
    }),
    getPopularMovies: builder.query({
      query: () => "popular?language=en-US&page=1",
    }),
    getTrailer: builder.query({
      query: (movieId) => `${movieId}/videos?language=en-US`,
    }),
  }),
});

export const { useGetNowPlayingMoviesQuery } = tmdpCoreApi;
