import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getConversations = createAsyncThunk('getConversations', async (formData, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${server}/conversations`,
            {
                withCredentials: true,
            }
        )
        console.log(response);
        return response.data;
    }
    catch (error) {
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

export const conversationSlice = createSlice({
    name: 'conversation',
    initialState: {
        conversations: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getConversations.pending, (state) => {
                state.loading = true;
            })
            .addCase(getConversations.fulfilled, (state, action) => {
                state.loading = false;
                state.conversations = action.payload.conversations;
            })
            .addCase(getConversations.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
    }

})