import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const handleLogin = createAsyncThunk(
    'login/handleLogin',
    async(formValues) => {
        try {
            const req = await axios.post('https://notflixtv.herokuapp.com/api/v1/users/login', formValues)
            // localStorage.setItem('token', req.data.data.token)
            // localStorage.setItem('user', JSON.stringify(req.data.data));
            return req.data.data;
        }catch(error) {
            console.error(error);
        }
    }
)

const initialState = {
    login: [],
    isLoading: false,
    hasError: false,
}
export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
    },
    extraReducers: {
        [handleLogin.fulfilled]: (state, {payload}) => {
            state.login = payload
        }
    }
})

export default loginSlice.reducer
