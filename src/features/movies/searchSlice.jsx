import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getSearch = createAsyncThunk(
    'search/getSearch',
    async(query) => {
        try {
            const res = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=a69ac84e7a5ab50d30d9c6e241bda7f6&language=en-US&page=1&include_adult=false&query=${query}`)
            return res.data.results;
        }catch(error) {
            console.error(error);
        }
    }
)

const initialState = {
    data: [],
    isLoading: false,
    hasError: false,
}
export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
    },
    extraReducers: {
        [getSearch.pending]: (state, {payload}) => {
            state.isLoading = true
            state.hasError = false
        },
        [getSearch.fulfilled]: (state, {payload}) => {
            state.data = payload
        },
        [getSearch.rejected]: (state, {payload}) => {
            state.isLoading = false
            state.hasError = true
        }
    }
})

export default searchSlice.reducer
