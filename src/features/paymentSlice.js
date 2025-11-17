import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../api/axios.js";

export const createOrder = createAsyncThunk("payment/createOrder", async ({ amount }, thunkAPI) => {
  try {
    const res = await instance.post("/payment/create_order", { amount });
    return res.data.data;
  } catch(error) {
    console.log(error);
    if (error.response && error.response.data) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
    return thunkAPI.rejectWithValue(error.message || 'An unknown error occurred');
  }
});

export const verifyPayment = createAsyncThunk("payment/verifyPayment", async (paymentData, thunkAPI) => {
  try {
    const res = await instance.post("/payment/verify_payment", paymentData);
    return res.data;
  } catch (error) {
    if (error.response && error.response.data) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
    return thunkAPI.rejectWithValue(error.message || 'An unknown error occurred');
  }
});

const initialState = {
  order: null,
  loading: false,
  verified: false,
  error: null,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    resetPaymentState: (state) => {
        state.order = null;
        state.loading = false;
        state.verified = false;
        state.error = null;
    }
  },
  extraReducers: (builder) => {
    // CREATE ORDER
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // VERIFY PAYMENT
    builder
      .addCase(verifyPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.verified = true;
      })
      .addCase(verifyPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetPaymentState } = paymentSlice.actions;
export default paymentSlice.reducer;
