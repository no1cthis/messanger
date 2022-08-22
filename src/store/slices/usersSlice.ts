import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../Types/types";

interface UsersState {
  loading: boolean;
  error: string | null;
  users: {
    [key: string]: IUser;
  };
}

const initialState: UsersState = {
  loading: true,
  error: "",
  users: {},
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    userFetchStart(state: UsersState) {
      state.loading = true;
      state.error = null;
    },
    userFetchSuccess(
      state: UsersState,
      action: PayloadAction<{
        [key: string]: IUser;
      }>
    ) {
      state.loading = false;
      state.error = null;
      state.users = action.payload;
    },
    userFetchFail(state: UsersState, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
