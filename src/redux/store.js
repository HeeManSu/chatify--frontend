import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./reducers/userSlice";
import { chatSlice } from "./reducers/chatSlice";
import { messageSlice } from "./reducers/messageSlice";

import { combineReducers } from "@reduxjs/toolkit";

const reducer = combineReducers({
   user: userSlice.reducer,
   chat: chatSlice.reducer,
   message: messageSlice.reducer,
});

const store = configureStore({
   reducer: reducer,

})

export default store;