import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const server = "http://localhost:4002/api/v1";

export const createPersonChat = createAsyncThunk('createNewChat', async (secondUserName) => {
    try {
        const response = await axios.post(`${server}/personchat`, { secondUserName }, { withCredentials: true });
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
});

export const createGroupChat = createAsyncThunk('createGroupChat', async (formData) => {
    try {
        const response = await axios.post(`${server}/groupchat`, formData, {
            withCredentials: true,
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || error.message);
    }
})

export const fetchAllChats = createAsyncThunk('fetchAllChats', async () => {
    try {
        const response = await axios.get(`${server}/`, { withCredentials: true });
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
});

export const renameGroup = createAsyncThunk(
    'chat/rename',
    async ({ chatId, newName }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${server}/rename`, { newChatName: newName, chatId: chatId },
                { withCredentials: true }

            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);



export const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        loading: false,
        chat: null,
        message: null,
        error: null,
        chats: [],
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
                state.chats.unshift(action.payload.chat);
                state.chat = action.payload.chat;
                state.message = action.payload.message;
                state.error = null;
            })
            .addCase(createPersonChat.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(createGroupChat.pending, (state) => {
                state.loading = true;
            })
            .addCase(createGroupChat.fulfilled, (state, action) => {
                state.loading = false;
                state.chats.unshift(action.payload.newChat);
                state.chat = action.payload.newChat;
                state.message = action.payload.message;
                state.error = null;
            })
            .addCase(createGroupChat.rejected, (state, action) => {
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
            .addCase(renameGroup.fulfilled, (state, action) => {
                const { chatId, name } = action.payload;
                const chat = state.chats.find(chat => chat._id === chatId);
                if (chat) {
                    chat.chatName = name;
                }
            })
            .addCase(renameGroup.rejected, (state, action) => {
                state.message = action.payload;
            });
    }
});

export const { clearError, clearMessage, updateActiveChat } = chatSlice.actions;
export default chatSlice.reducer;