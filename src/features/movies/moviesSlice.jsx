import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getMovies = createAsyncThunk(
    'movies/getMovies',
    async(key) =>  {
        try {
            const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`)
            return res.data.results;
        }catch(error) {
            console.error(error)
        }
    }
)

export const getAllMovies = createAsyncThunk(
    'movie/getAllMovies',
    async(key, page) => {
        try {
            const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=${page}`);
            return res.data.results;
        } catch(error) {
            console.error(error);
        }
    }
)

export const getMoviesDetail = createAsyncThunk(
    'movies/getMoviesDetail',
    async(id) => {
        try {
            const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=a69ac84e7a5ab50d30d9c6e241bda7f6`)
            return res.data;
        }catch(error) {
            console.error(error);
        }
    } 
)

export const getCast = createAsyncThunk(
    'movies/getCast',
    async(id) => {
        try {
            const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=a69ac84e7a5ab50d30d9c6e241bda7f6&language=en-US`)
            console.log(res.data.cast)
            return res.data.cast;
        } catch(error) {
            console.error(error);
        }
    }
)

const initialState = {
    movies: [],
    detail: [],
    cast: [],
    allMovie:[],
    isLoading: false,
    hasError: false,
}
export const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
    },
    extraReducers: {
        [getMoviesDetail.fulfilled]: (state, {payload}) => {
            state.detail = payload
        },
        [getMovies.fulfilled]: (state, {payload}) => {
            state.movies = payload
        },
        [getCast.fulfilled]: (state, {payload}) => {
            state.cast = payload
        },
        [getAllMovies.fulfilled]: (state, {payload}) => {
            state.allMovie = payload
        }
    }
})

export default moviesSlice.reducer
