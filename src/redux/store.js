import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./reducers/userSlice";
import { chatSlice } from "./reducers/chatSlice";
import { messageSlice } from "./reducers/messageSlice";
// import userSlice from "./reducers/userSlice";



const store = configureStore({
   reducer: {
      user: userSlice.reducer,
      chat: chatSlice.reducer,
      message: messageSlice.reducer,
   }
})

export default store;