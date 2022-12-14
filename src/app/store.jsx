import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "../features/movies/moviesSlice";
import trendingReducer from "../features/movies/trendingSlice";
import searchReducer from "../features/movies/searchSlice";
import loginReducer from "../features/login/loginSlice";
import genreReducer from "../features/genre/genreSlice";

export const store = configureStore({
    reducer: {
        movies: moviesReducer,
        trending: trendingReducer,
        search: searchReducer,
        login: loginReducer,
        genre: genreReducer
    }
})