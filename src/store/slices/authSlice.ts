import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  loading: boolean;
  error: string | null;
  uid: string;
}

const initialState: AuthState = {
  loading: true,
  error: "",
  uid: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authStart(state: AuthState) {
      state.loading = true;
      state.error = null;
    },
    authFinish(
      state: AuthState,
      action: PayloadAction<{ uid: string; error: string | null }>
    ) {
      const { uid, error } = action.payload;
      state.loading = false;
      state.error = error;
      state.uid = uid;
    },
  },
});
