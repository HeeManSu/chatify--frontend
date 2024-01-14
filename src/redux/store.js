import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./reducers/userSlice";
import { conversationSlice } from "./reducers/conversation-slice";



const store = configureStore({
   reducer: {
    user: userSlice.reducer,
      conversation: conversationSlice.reducer,
   }
})

export default store;