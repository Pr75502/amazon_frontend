import {  createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/axios.js";
const token = localStorage.getItem('token');
axios.defaults.headers.common['Authorization'] = token;
axios.defaults.headers.common['Content-Type'] = 'application/json';
export const getCartItems = createAsyncThunk('/cart/get', async (_, thunkAPI) => {
    try {
        const response = await axios.get(`/cart/`, {
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

export const addToCart = createAsyncThunk('/cart/add', async (product, thunkAPI) => {
    try {
        const response = await axios.post(`/cart/add`, { productId: product._id, quantity: 1 }, {
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

export const removeFromCart = createAsyncThunk('/cart/remove', async (productId, thunkAPI) => {
    try {
        const response = await axios.delete(`/cart/remove/${productId}`, {
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






const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: [],
    },
    reducers: {
       
    },
    extraReducers: (builder) => {
        builder
            .addCase(addToCart.pending, (state) => {
                state.error = "loading...";
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.cartItems.push(action.payload.data);
                state.error = null;
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.error = action.payload.message;
            })
            .addCase(removeFromCart.pending, (state) => {
                state.error = "loading...";
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.cartItems = state.cartItems.filter(item => item.product._id !== action.meta.arg);
                state.error = null;
            })
            .addCase(removeFromCart.rejected, (state, action) => {
                state.error = action.payload.message;
            })
            .addCase(getCartItems.pending, (state) => {
                state.error = "loading...";
            })
            .addCase(getCartItems.fulfilled, (state, action) => {
                state.cartItems = action.payload.data.items;
                state.error = null;
            })
            .addCase(getCartItems.rejected, (state, action) => {
                state.error = action.payload.message;
            })
    }
})
export default cartSlice.reducer;