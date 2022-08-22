import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMessage } from "../../Types/types";

interface ChatState {
  loading: boolean;
  error: string | null;
  messages: IMessage[];
}

const initialState: ChatState = {
  loading: false,
  error: "",
  messages: [],
};

export const chatSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    chatFetchStart(state: ChatState) {
      state.loading = true;
      state.error = null;
    },
    chatFetchSuccess(state: ChatState, action: PayloadAction<IMessage[]>) {
      state.loading = false;
      state.error = null;
      state.messages = action.payload;
    },
    chatFetchFail(state: ChatState, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
