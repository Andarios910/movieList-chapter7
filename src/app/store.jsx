import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "../features/movies/moviesSlice";
import trendingReducer from "../features/movies/trendingSlice";
import searchReducer from "../features/movies/searchSlice";

export const store = configureStore({
    reducer: {
        movies: moviesReducer,
        trending: trendingReducer,
        search: searchReducer
    }
})