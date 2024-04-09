import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const server = "http://localhost:4002/api/v1";


export const sendMessages = createAsyncThunk('sendMessage', async ({ content, chatId }) => {
    try {
        const response = await axios.post(`${server}/message`, {
            content, chatId
        },
            {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                }
            },
        )
        return response.data;
    } catch (error) {
        throw new Error("unable to fetch data", 400)
    }
});


export const fetchAllMessages = createAsyncThunk('fetchMessages', async ({ chatId }) => {
    try {
        const { data } = await axios.get(`${server}/message/${chatId}`, {
            withCredentials: true,
        });

        return data;
    } catch (error) {
        throw new Error("unable to fetch data");
    }
});

export const messageSlice = createSlice({
    name: "message",
    initialState: {
        messages: [],
        allMessages: [],
        notifications: [],
    },

    reducers: {
        setMessages: (state, action) => {
            return { ...state, messages: action.payload.messages }
        },
        clearMessages: (state) => {
            return { ...state, messages: [] };
        },
        setNotifications: (state, action) => {
            return { ...state, notifications: action.payload.notifications }
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(sendMessages.pending, (state) => {
                state.loading = true;
            })
            .addCase(sendMessages.fulfilled, (state, action) => {
                state.loading = false;
                state.chatMessage = action.payload.chatMessage;
                state.error = null;
            })
            .addCase(sendMessages.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchAllMessages.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAllMessages.fulfilled, (state, action) => {
                state.loading = false;
                state.allMessages = action.payload.allMessages;
                state.error = null;
            })
            .addCase(fetchAllMessages.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    }
})


export const { setMessages, clearMessages, setNotifications } = messageSlice.actions;

// export default messageSlice.reducer;