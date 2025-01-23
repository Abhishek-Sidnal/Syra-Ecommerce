import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout(state) {
      state.user = null;
      state.token = null;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;

export const login = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/login`, { email, password });
    dispatch(loginSuccess(response.data));
  } catch (err) {
    alert('Invalid credentials. Please try again.');
  }
};

export const register = (userData) => async () => {
  try {
    await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/register`, userData);
    alert('Registration successful! You can now log in.');
  } catch (err) {
    alert('Registration failed. Please try again.');
  }
};

export default authSlice.reducer;
