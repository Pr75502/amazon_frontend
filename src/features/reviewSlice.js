import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/axios";

export const fetchReviews = createAsyncThunk(
  "reviews/fetchReviews",
  async (productId, thunkAPI) => {
    try {
      const response = await axios.get(`/reviews/fetch/${productId}`);

      console.log("API RESPONSE:", response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const addReview = createAsyncThunk(
  "reviews/addReview",
  async ({ productId, rating, comment }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `/reviews/add`,
        { productId, rating, comment },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateReview = createAsyncThunk(
  "reviews/updateReview",
  async ({ id, rating, comment }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        `/reviews/update/${id}`,
        { rating, comment },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteReview = createAsyncThunk(
  "reviews/deleteReview",
  async (id, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`/reviews/delete/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const reviewSlice = createSlice({
  name: "reviews",
  initialState: {
    reviews: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload.data;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(addReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        console.log("addReview.fulfilled:", action.payload);
        state.loading = false;
        state.reviews.push(action.payload.data);
      })
      .addCase(addReview.rejected, (state, action) => {
        console.log("addReview.rejected:", action.payload);
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(updateReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateReview.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = state.reviews.map((review) =>
          review._id === action.payload.data._id ? action.payload.data : review
        );
      })
      .addCase(updateReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(deleteReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = state.reviews.filter(
          (review) => review._id !== action.payload.data._id
        );
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export default reviewSlice.reducer;
