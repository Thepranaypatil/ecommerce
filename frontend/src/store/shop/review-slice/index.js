/*import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  reviews: [],
};

export const addReview = createAsyncThunk(
  "/order/addReview",
  async (formdata) => {
    const response = await axios.post(
      `http://localhost:3000/api/shop/review/add`,
      formdata
    );

    return response.data;
  }
);

export const getReviews = createAsyncThunk("/order/getReviews", async (id) => {
  const response = await axios.get(
    `http://localhost:3000/api/shop/review/${id}`
  );

  return response.data;
});

const reviewSlice = createSlice({
  name: "reviewSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload.data;
      })
      .addCase(getReviews.rejected, (state) => {
        state.isLoading = false;
        state.reviews = [];
      });
  },
});

export default reviewSlice.reducer;
*/
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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
  reviews: [],
};

// ================================
// Async thunks
// ================================
export const addReview = createAsyncThunk(
  "/review/addReview",
  async (formdata) => {
    const response = await axios.post(
      `${BASE_URL}/api/shop/review/add`,
      formdata,
      {
        withCredentials: true,
      }
    );
    return response.data;
  }
);

export const getReviews = createAsyncThunk("/review/getReviews", async (id) => {
  const response = await axios.get(`${BASE_URL}/api/shop/review/${id}`, {
    withCredentials: true,
  });
  return response.data;
});

// ================================
// Slice
// ================================
const reviewSlice = createSlice({
  name: "reviewSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get reviews
      .addCase(getReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload.data;
      })
      .addCase(getReviews.rejected, (state) => {
        state.isLoading = false;
        state.reviews = [];
      })
      // Add review
      .addCase(addReview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.isLoading = false;
        // Optionally push the new review to the reviews array
        if (action.payload?.data) state.reviews.push(action.payload.data);
      })
      .addCase(addReview.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default reviewSlice.reducer;
