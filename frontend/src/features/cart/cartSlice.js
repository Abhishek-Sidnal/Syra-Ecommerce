import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCart = createAsyncThunk('cart/fetchCart', async (_, { getState }) => {
  const { token } = getState().auth;
  const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/cart`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.items;
});

export const addToCart = createAsyncThunk('cart/addToCart', async (item, { getState }) => {
  const { token } = getState().auth;
  const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/cart`, item, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.items;
});

export const removeFromCart = createAsyncThunk('cart/removeFromCart', async (productId, { getState }) => {
  const { token } = getState().auth;
  const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/cart/${productId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.items;
});

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [], status: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchCart.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = action.payload;
      })

  },
});

export default cartSlice.reducer;
