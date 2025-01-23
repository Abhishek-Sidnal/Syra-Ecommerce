import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchWishlist = createAsyncThunk('wishlist/fetchWishlist', async (_, { getState }) => {
  const { token } = getState().auth; 
  const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/wishlist`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data; 
});

export const addToWishlist = createAsyncThunk('wishlist/addToWishlist', async (productId, { getState }) => {
  const { token } = getState().auth;
  const response = await axios.post(
    `${import.meta.env.VITE_BASE_URL}/wishlist`,
    { productId },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data.items;
});

export const removeFromWishlist = createAsyncThunk('wishlist/removeFromWishlist', async (productId, { getState }) => {
  const { token } = getState().auth;
  const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/wishlist/${productId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.items; 
});

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: { items: [], status: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchWishlist.rejected, (state) => {
        state.items = [];
        state.status = 'failed';
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.items = action.payload;
      });
  },
});

export default wishlistSlice.reducer;
