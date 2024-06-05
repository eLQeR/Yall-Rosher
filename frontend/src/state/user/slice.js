import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  user: null,
  accessToken: null,
  refreshToken: null,
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: (create) => ({
    setTokens: create.reducer((state, action) => {
      state.accessToken = action.payload.accessToken || state.accessToken;
      state.refreshToken = action.payload.refreshToken || state.refreshToken;
    }),
    setUser: create.reducer((state, action) => {
      state.user = action.payload;
    }),
    logout: create.reducer((state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
    }),
  }),
});

export const userReducer = userSlice.reducer;
export const { logout, setTokens, setUser } = userSlice.actions;
