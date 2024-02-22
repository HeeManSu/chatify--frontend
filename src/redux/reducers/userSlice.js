import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"
const server = "http://localhost:4004/api/v1";


export const registerUser = createAsyncThunk('registerUser', async formData => {
    try {
        const response = await axios.post(`${server}/register`,
            formData,
            {
                headers: {
                    'Content-type': 'multipart/form-data',
                },
                withCredentials: true,
            }
        )
        console.log(response);
        return response.data;
    } catch (error) {
        throw new Error(error)
    }
})


export const loginUser = createAsyncThunk('loginUser', async ({ username, password }) => {
    try {
        const response = await axios.post(`${server}/login`,
            { username, password },
            {
                headers: {
                    "Content-Type": 'application/json',
                },
                withCredentials: true,
            }
        );
        console.log("response: ", response);

        const user = response.data;
        localStorage.setItem("userInfo", JSON.stringify(user));
        return response.data;

    } catch (error) {
        throw new Error(error);
    }
})


export const userSlice = createSlice({
    name: 'user',
    initialState: {
        // loading: false,
        error: null,
        message: null,
        // isAuthenticated: false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.isAuthenticated = false;

            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload.user;
                state.message = action.payload.message;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.error = action.payload;
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload.user;
                state.message = action.payload.message;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.error = action.payload
            })
    }
})