import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./reducers/userSlice";
import { chatSlice } from "./reducers/chatSlice";
import { messageSlice } from "./reducers/messageSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";

const persistConfig = {
   key: "root",
   version: 1,
   storage
};

const reducer = combineReducers({
   user: userSlice.reducer,
   chat: chatSlice.reducer,
   message: messageSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);
const store = configureStore({
   reducer: persistedReducer,
})

export default store;