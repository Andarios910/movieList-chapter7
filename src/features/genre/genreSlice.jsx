import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getGenre = createAsyncThunk(
    'genre/getGenre',
    async(key) => {
        try {
            const res = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${key}&language=en-US`);
            return res.data.genres
        } catch(error) {
            console.error(error);
        }
    }
)

export const getDataCategory = createAsyncThunk(
    'genre/getDataCategory',
    async(genreId) => {
        try {
            const res = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=a69ac84e7a5ab50d30d9c6e241bda7f6&with_genres=${genreId}`);
            return res.data.results
        } catch(error) {
            console.error(error);
        }
    }
)

const initialState = {
    genre: [],
    dataGenre: [],
    isLoading: false,
    hasError: false,
}

export const genreSlice = createSlice({
    name: 'genre',
    initialState,
    extraReducers: {
        [getGenre.pending]: (state) => {
            state.isLoading = true
        },
        [getGenre.fulfilled]: (state, {payload}) => {
            state.genre = payload
        },
        [getGenre.rejected]: (state) => {
            state.hasError = true
        },
        [getDataCategory.fulfilled]: (state, {payload}) => {
            state.dataGenre = payload
        }
    }
})

export default genreSlice.reducer;