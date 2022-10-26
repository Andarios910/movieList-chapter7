import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getTrending = createAsyncThunk(
    'trending/getTrending',
    async(key) => {
        try {
            const res = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=1`);
            return res.data.results;
        }catch(error) {
            console.error(error);
        }
    }
)

const initialState = {
    trending: [],
    isLoading: false,
    hasError: false,
}
export const trendingSlice = createSlice({
    name: 'trending',
    initialState,
    reducers: {
    },
    extraReducers: {
        [getTrending.fulfilled]: (state, {payload}) => {
            state.trending = payload
        }
    }
})

export default trendingSlice.reducer
