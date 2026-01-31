
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";


const initialState = {
  isLoading: false,
  addressList: [],
};


export const addNewAddress = createAsyncThunk(
  "/addresses/addNewAddress",
  async (formData) => {
    const response = await axios.post(
      `${BASE_URL}/api/shop/address/add`,
      formData,
      {
        withCredentials: true,
      }
    );
    return response.data;
  }
);

export const fetchAllAddresses = createAsyncThunk(
  "/addresses/fetchAllAddresses",
  async (userId) => {
    const response = await axios.get(
      `${BASE_URL}/api/shop/address/get/${userId}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  }
);

export const editaAddress = createAsyncThunk(
  "/addresses/editaAddress",
  async ({ userId, addressId, formData }) => {
    const response = await axios.put(
      `${BASE_URL}/api/shop/address/update/${userId}/${addressId}`,
      formData,
      { withCredentials: true }
    );
    return response.data;
  }
);

export const deleteAddress = createAsyncThunk(
  "/addresses/deleteAddress",
  async ({ userId, addressId }) => {
    const response = await axios.delete(
      `${BASE_URL}/api/shop/address/delete/${userId}/${addressId}`,
      { withCredentials: true }
    );
    return response.data;
  }
);

// ================================
// Slice
// ================================
const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ADD ADDRESS
      .addCase(addNewAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewAddress.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(addNewAddress.rejected, (state) => {
        state.isLoading = false;
      })

      // FETCH ALL ADDRESSES
      .addCase(fetchAllAddresses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllAddresses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = action.payload.data;
      })
      .addCase(fetchAllAddresses.rejected, (state) => {
        state.isLoading = false;
        state.addressList = [];
      });

    // Optional: You can handle editAddress and deleteAddress pending/fulfilled/rejected here
  },
});

export default addressSlice.reducer;
