import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  status: 'checking' | 'authenticated' | 'not-authenticated';
  token: string;
  email: string | null;
  username: string | null;
  errorMessage: string | null;
}

const initialState: AuthState = {
  status: 'checking',
  token: '',
  email: null,
  username: null,
  errorMessage: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (
      state,
      {
        payload,
      }: PayloadAction<{ token: string; email: string; username: string }>
    ) => {
      state.status = 'authenticated';
      state.token = payload.token;
      state.email = payload.email;
      state.username = payload.username;
      state.errorMessage = null;
    },

    logout: (
      state,
      { payload }: PayloadAction<{ errorMessage: string | null }>
    ) => {
      state.status = 'not-authenticated';
      state.token = '';
      state.email = null;
      state.username = null;
      state.errorMessage = payload?.errorMessage;
    },

    checkingCredentials: (state) => {
      state.status = 'checking';
      state.errorMessage = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, checkingCredentials } = authSlice.actions;
