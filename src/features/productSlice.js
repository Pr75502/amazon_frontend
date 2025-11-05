import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/axios.js";

export const fetchProducts = createAsyncThunk('/products/fetch', async (_, thunkAPI) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`/products/fetch`,{
            headers: {
                'Authorization': token
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue(error.response.data);
    }
})
export const addProduct = createAsyncThunk('/products/add', async (formData, thunkAPI) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post(`/products/add`, formData, {
            headers: {
                'Authorization': token,
                "Content-Type": "multipart/form-data"
            }
        });
        return response.data;
    }
    catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const productDetails = createAsyncThunk(`/products/details`, async (id, thunkAPI) => {
    try {
        const response = await axios.get(`/products/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const searchProducts = createAsyncThunk('/products/search', async (query, thunkAPI) => {
    try {
        const response = await axios.get(`/products/search?query=${query}`);
        return response.data;
    } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue(error.response.data);
    }
})
export const myProducts = createAsyncThunk('/products/myProducts', async (_, thunkAPI) => {
    try {
        const response = await axios.get(`/products/myProducts`, {}, {
            headers: {
                'Authorization': token
            }
        });
        return response.data;
    }
    catch (error) {
        thunkAPI.rejectWithValue(error.response.data);
    }
})
    




const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: [],
        myProducts: [],
        details:{},
        error: null,
    },
    reducers: {
    
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.products = [];
                state.error = "loading...";
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.products = action.payload.data;
                state.error = null;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.products = [];
                state.error = action.payload.message;
            })
            .addCase(productDetails.pending, (state) => {
                state.details = {};
                state.error = "loading...";
            })
            .addCase(productDetails.fulfilled, (state, action) => {
                state.details = action.payload.data;
                state.error = null;
            })
            .addCase(productDetails.rejected, (state, action) => {
                state.details = {};
                state.error = action.payload.message;
            })
            .addCase(addProduct.pending, (state) => {
                state.error = "loading...";
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.products.push(action.payload.data);
                state.error = null;
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.error = action.payload.message;
            })

            .addCase(searchProducts.pending, (state) => {
                state.products = [];
                state.error = "loading...";
            })
            .addCase(searchProducts.fulfilled, (state, action) => {
                state.products = action.payload.data;
                state.error = null;
            })
            .addCase(searchProducts.rejected, (state, action) => {
                state.products = [];
                state.error = action.payload.message;
            });
        builder
        .addCase(myProducts.pending, (state) => {
                state.myProducts = [];
                state.error = "loading...";
        })
        .addCase(myProducts.fulfilled, (state, action) => {
                state.myProducts = action.payload.data;
                state.error = null;
        })
        .addCase(myProducts.rejected, (state, action) => {
                state.myProducts = [];
                state.error = action.payload.message;
        })

    }
})
export default productSlice.reducer;

