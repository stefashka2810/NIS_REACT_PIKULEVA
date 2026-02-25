import { createSlice } from "@reduxjs/toolkit";
import type { AuthState } from "./types.ts";

const initialState: AuthState = {
  user: null,
  isAuth: false,
  accessToken: null,
  refreshToken: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.isAuth = true;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },

    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuth = true;
    },

    logout: (state) => {
      state.isAuth = false;
      state.refreshToken = null;
      state.accessToken = null;
      state.user = null;
    },
  },
});

export const { setAuth, logout, setUser } = authSlice.actions;
export default authSlice.reducer;
