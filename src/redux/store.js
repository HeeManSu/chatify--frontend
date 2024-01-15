import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./reducers/userSlice";
import { chatSlice } from "./reducers/chat-slice";



const store = configureStore({
   reducer: {
      user: userSlice.reducer,
      chat: chatSlice.reducer,
   }
})

export default store;