import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const handleLogin = createAsyncThunk(
    'login/handleLogin',
    async(formValues) => {
        try {
            const req = await axios.post('https://notflixtv.herokuapp.com/api/v1/users/login', formValues)
            localStorage.setItem('token', req.data.data.token);
            localStorage.setItem('user', JSON.stringify(req.data.data));
            setTimeout(() => {
                window.location.reload(1)
            }, 1500)
        }catch(error) {
            console.error(error);
        }
    }
)

export const handleRegister = createAsyncThunk(
    'login/handleRegister',
    async(formValues) => {
        try {
            const req = await axios.post('https://notflixtv.herokuapp.com/api/v1/users', formValues)
            localStorage.setItem('token', req.data.data.token)
            localStorage.setItem('user', JSON.stringify(req.data.data))
            setTimeout(() => {
                window.location.reload(1)
            }, 1500)
        }catch(error) {
            console.error(error);
        }
    }
)

export const googleOauth = createAsyncThunk(
    'login/googleOauth',
    async(credentialResponse) => {
        localStorage.setItem('google_user', credentialResponse.credential)
    }
)

const initialState = {
    status: false,
    statusG: false,
    isLoading: false,
    hasError: false,
}

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
    },
    extraReducers: {
        [handleLogin.pending]: (state) => {
            state.isLoading = true;
        },
        [handleLogin.fulfilled]: (state) => {
            state.status = true
        },
        [handleLogin.rejected]: (state) => {
            state.hasError = true;
        },
        [handleRegister.fulfilled]: (state) => {
            state.status = true
        }, 
        [googleOauth.fulfilled]: (state) => {
            state.statusG = true
        }

    }
})

export default loginSlice.reducer
