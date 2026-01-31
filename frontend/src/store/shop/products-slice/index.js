
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// ================================
// Backend base URL from env
// ================================
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// ================================
// Initial state
// ================================
const initialState = {
  isLoading: false,
  productList: [],
  productDetails: null,
};

// ================================
// Async thunks
// ================================
export const fetchAllFilteredProducts = createAsyncThunk(
  "/products/fetchAllProducts",
  async ({ filterParams, sortParams }) => {
    const query = new URLSearchParams({
      ...filterParams,
      sortBy: sortParams,
    });

    const response = await axios.get(
      `${BASE_URL}/api/shop/products/get?${query}`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  }
);

export const fetchProductDetails = createAsyncThunk(
  "/products/fetchProductDetails",
  async (id) => {
    const response = await axios.get(
      `${BASE_URL}/api/shop/products/get/${id}`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  }
);

// ================================
// Slice
// ================================
const shoppingProductSlice = createSlice({
  name: "shoppingProducts",
  initialState,
  reducers: {
    setProductDetails: (state) => {
      state.productDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all filtered products
      .addCase(fetchAllFilteredProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(fetchAllFilteredProducts.rejected, (state) => {
        state.isLoading = false;
        state.productList = [];
      })

      // Fetch product details
      .addCase(fetchProductDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productDetails = action.payload.data;
      })
      .addCase(fetchProductDetails.rejected, (state) => {
        state.isLoading = false;
        state.productDetails = null;
      });
  },
});

export const { setProductDetails } = shoppingProductSlice.actions;
export default shoppingProductSlice.reducer;
