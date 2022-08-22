import { combineReducers } from "redux";
import { authSlice } from "./authSlice";
import { chatSlice } from "./chatSlice";
import { usersSlice } from "./usersSlice";

export const rootReducer = combineReducers({
  auth: authSlice.reducer,
  user: usersSlice.reducer,
  chat: chatSlice.reducer,
});
