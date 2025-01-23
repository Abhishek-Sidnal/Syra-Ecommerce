import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/products`);
  return response.data;
});

export const fetchMyProducts = createAsyncThunk('products/fetchMyProducts', async (_, { getState }) => {
  const { token } = getState().auth;
  const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/products/my-products`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
});

export const addProduct = createAsyncThunk('products/addProduct', async (product, { getState }) => {
  const { token } = getState().auth;
  const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/products`, product, {
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log('Response from Add Product:', response.data);
  return response.data;
});

export const editProduct = createAsyncThunk('products/editProduct', async ({ id, updates }, { getState }) => {
  const { token } = getState().auth;

  console.log('Editing Product ID:', id);
  console.log('Updates:', updates);

  const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/products/${id}`, updates, {
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log('Response from Edit Product:', response.data);
  return response.data;
});

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id, { getState }) => {
  const { token } = getState().auth;

  console.log('Deleting Product ID:', id);
  console.log('Authorization Token:', token);

  await axios.delete(`${import.meta.env.VITE_BASE_URL}/products/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return id; 
});

const productsSlice = createSlice({
  name: 'products',
  initialState: { list: [], status: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all products
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.list = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = 'failed';
      })

      // Fetch user products
      .addCase(fetchMyProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMyProducts.fulfilled, (state, action) => {
        state.list = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchMyProducts.rejected, (state) => {
        state.status = 'failed';
      })

      // Add product
      .addCase(addProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.list.push(action.payload);
        state.status = 'succeeded';
      })
      .addCase(addProduct.rejected, (state) => {
        state.status = 'failed';
      })

      // Edit product
      .addCase(editProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        const index = state.list.findIndex((product) => product._id === action.payload._id);
        if (index !== -1) {
          state.list[index] = action.payload; 
        }
        state.status = 'succeeded';
      })
      .addCase(editProduct.rejected, (state) => {
        state.status = 'failed';
      })

      // Delete product
      .addCase(deleteProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.list = state.list.filter((product) => product._id !== action.payload); 
        state.status = 'succeeded';
      })
      .addCase(deleteProduct.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default productsSlice.reducer;
