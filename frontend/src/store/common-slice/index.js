
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// ================================
// Backend base URL
// ================================
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// ================================
// Initial state
// ================================
const initialState = {
  isLoading: false,
  featureImageList: [],
};

// ================================
// Async thunks
// ================================
export const getFeatureImages = createAsyncThunk(
  "/common/getFeatureImages",
  async () => {
    const response = await axios.get(`${BASE_URL}/api/common/feature/get`);
    return response.data;
  }
);

export const addFeatureImage = createAsyncThunk(
  "/common/addFeatureImage",
  async (image) => {
    const response = await axios.post(`${BASE_URL}/api/common/feature/add`, {
      image,
    });
    return response.data;
  }
);

// ================================
// Slice
// ================================
const commonSlice = createSlice({
  name: "commonSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get feature images
      .addCase(getFeatureImages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeatureImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.featureImageList = action.payload.data;
      })
      .addCase(getFeatureImages.rejected, (state) => {
        state.isLoading = false;
        state.featureImageList = [];
      });

    // Optional: You can handle addFeatureImage pending/fulfilled/rejected here if needed
  },
});

export default commonSlice.reducer;
