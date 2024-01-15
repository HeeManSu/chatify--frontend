import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getChatsService } from "../../services/chat";

export const getChats = createAsyncThunk('getChats', async (_, { rejectWithValue }) => {
    try {
        const response = await getChatsService();
        return response.data;
    }
    catch (error) {
        console.log(error);
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

export const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        chats: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getChats.pending, (state) => {
                state.loading = true;
            })
            .addCase(getChats.fulfilled, (state, action) => {
                state.loading = false;
                state.conversations = action.payload.chats;
            })
            .addCase(getChats.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
    }

})