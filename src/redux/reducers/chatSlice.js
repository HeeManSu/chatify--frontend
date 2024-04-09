import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const server = "http://localhost:4002/api/v1";

export const createPersonChat = createAsyncThunk('createNewChat', async (secondUserName) => {
    try {
        const response = await axios.post(`${server}/personchat`,
            { secondUserName },
            {
                withCredentials: true
            }
        );
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
});

export const fetchAllChats = createAsyncThunk('fetchAllChats', async () => {
    try {
        const response = await axios.get(`${server}/`,
            {
                withCredentials: true
            });
        return response.data
    } catch (error) {
        throw new Error(error)
    }
})



export const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        loading: false,
        chat: null,
        message: null,
        error: null,
        chats: null,
        activeChat: null,
    },
    reducers: {
        updateActiveChat: (state, action) => {
            return { ...state, activeChat: action.payload.activeChat };
        },
        clearError: state => {
            state.error = null;
        },
        clearMessage: state => {
            state.message = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createPersonChat.pending, (state) => {
                state.loading = true;
            })
            .addCase(createPersonChat.fulfilled, (state, action) => {
                state.loading = false;
                state.chat = action.payload.chat;
                state.message = action.payload.message;
                state.error = null;
            })
            .addCase(createPersonChat.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchAllChats.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAllChats.fulfilled, (state, action) => {
                state.loading = false;
                state.chats = action.payload.chats;
                state.message = action.payload.message;
                state.error = null;
            })
            .addCase(fetchAllChats.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    }
})

export const { clearError, clearMessage, updateActiveChat } = chatSlice.actions;