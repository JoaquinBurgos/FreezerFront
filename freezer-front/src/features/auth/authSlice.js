// src/features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    accessToken: null,
    isAuthenticated: false,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.accessToken = null;
      state.isAuthenticated = false;
    },
    // Agrega más reducers según sea necesario, por ejemplo, para manejar la renovación del token
  },
});

export const { loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;
