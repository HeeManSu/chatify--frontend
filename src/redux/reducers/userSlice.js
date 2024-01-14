import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginUserService } from "../../services";
import toast from "react-hot-toast";


export const registerUser = createAsyncThunk('registerUser', async (formData, { rejectWithValue }) => {
    try {
        const response = registerUserService(formData);
        return response.data;
    } catch (error) {
        if (!error.response) {
            throw error;
        }
        return rejectWithValue({
            message: error.response.data.message,
            status: error.response.status,
            success: error.response.data.success,
        });
    }
})


export const loginUser = createAsyncThunk('loginUser', async ({ username, password }, { rejectWithValue }) => {
    try {
        const response = await loginUserService({ username, password });
        const user = response.data;
        localStorage.setItem("userInfo", JSON.stringify(user));
        return response.data;
    } catch (error) {
        if (!error.response) {
            throw error;
        }
        return rejectWithValue({
            message: error.response.data.message,
            status: error.response.status,
            success: error.response.data.success,
        });
    }

})

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        // loading: false,
        error: null,
        message: null,
        isAuthenticated: localStorage.getItem("userInfo") ? true : false,
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
                toast.error(action.payload.message);
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
                state.error = action.payload;
                toast.error(action.payload.message);
            })
    }
})



