import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api/axios';

const token = localStorage.getItem('token');
axios.defaults.headers.common['Authorization'] = token;

export const getOrders = createAsyncThunk('/orders/get', async (_, thunkAPI) => {
    try {
        const response = await axios.get('/orders', {
            headers: {
                'Authorization': token
            }
        });
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});
export const storeOrder = createAsyncThunk('/orders/create', async (shippingAddress,thunkAPI)=>{
    try {
        const response = await axios.post('/orders',{shippingAddress }, {
            headers: {
                'Authorization': token
            }
        });
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }

})


const orderSlice = createSlice({
    name: 'order',
    initialState: {
        orders: [],
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getOrders.pending, (state) => {
                state.error = 'loading...';
            })
            .addCase(getOrders.fulfilled, (state, action) => {
                state.orders = action.payload.data;
                state.error = null;
            })
            .addCase(getOrders.rejected, (state, action) => {
                state.error = action.payload.message;
            });
        builder
            .addCase(storeOrder.pending, (state) => {
                state.error = 'loading...';
            })
            .addCase(storeOrder.fulfilled, (state, action) => {
                state.orders.push(action.payload.data);
                state.error = null;
            })
            .addCase(storeOrder.rejected, (state, action) => {
                state.error = action.payload.message;
            });
       

    },
});

export default orderSlice.reducer;
