import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../api/axios.js";

export const createOrder = createAsyncThunk("payment/createOrder", async (amount, thunkAPI) => {
  try {
    const res = await instance.post("/payment/create_order", { amount });
    return res.data.data;
  } catch(error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const verifyPayment = createAsyncThunk("payment/verifyPayment", async (paymentData, thunkAPI) => {
  try {
    const res = await instance.post("/payment/verify_payment", paymentData);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const initialState = {
  order: null,
  loading: false,
  verified: false,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // CREATE ORDER
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(createOrder.rejected, (state) => {
        state.loading = false;
      });

    // VERIFY PAYMENT
    builder
      .addCase(verifyPayment.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyPayment.fulfilled, (state) => {
        state.loading = false;
        state.verified = true;
      })
      .addCase(verifyPayment.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default paymentSlice.reducer;
