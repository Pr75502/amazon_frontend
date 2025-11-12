import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../api/axios';


const adminDashboard = createAsyncThunk("/dashboard", async (_,thunkAPI) => {
    try {
        const token = localStorage.getItem('token'); // Get token inside thunk
        const response = await axios.get("/dashboard",{}, {
            headers: {
                'Authorization': token
            }
        });
        return response.data
    } catch (error) {
      return  thunkAPI.rejectWithValue(error.response.data)
    }
})
export const fetchStats = createAsyncThunk("/admin/stats", async (_, thunkAPI) => {
    try {
        const token = localStorage.getItem('token'); // Get token inside thunk
        const response = await axios.get("/admin/stats", {
            headers: {
                'Authorization': token
            }
        });
        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
});

export const fetchAllUsers = createAsyncThunk("/admin/users", async (_, thunkAPI) => {
    try {
        const token = localStorage.getItem('token'); // Get token inside thunk
        const response = await axios.get("/admin/users", {
            headers: {
                'Authorization': token
            }
        });
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const fetchAllOrders = createAsyncThunk("/admin/orders", async (_, thunkAPI) => {
    try {
        const token = localStorage.getItem('token'); // Get token inside thunk
        const response = await axios.get("/admin/orders", {
            headers: {
                'Authorization': token
            }
        });
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});


const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        users: 0,
        products: 0,
        orders: 0,
        userList: [],
        orderList: [],
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchStats.pending, (state) => {
            state.error = "Loading..."
        })
            .addCase(fetchStats.fulfilled, (state, action) => {
                state.users = action.payload.data.users;
                state.products = action.payload.data.products;
                state.orders = action.payload.data.orders;
                state.error = null;
            })
            .addCase(fetchStats.rejected, (state, action) => {
                state.error = action.payload.message;
            });
        
        builder.addCase(fetchAllUsers.pending, (state) => {
            state.error = "Loading users..."
        })
        .addCase(fetchAllUsers.fulfilled, (state, action) => {
            state.userList = action.payload.data;
            state.error = null;
        })
        .addCase(fetchAllUsers.rejected, (state, action) => {
            state.error = action.payload.message;
        });

        builder.addCase(fetchAllOrders.pending, (state) => {
            state.error = "Loading orders..."
        })
        .addCase(fetchAllOrders.fulfilled, (state, action) => {
            state.orderList = action.payload.data;
            state.error = null;
        })
        .addCase(fetchAllOrders.rejected, (state, action) => {
            state.error = action.payload.message;
        });
    }


});

export default adminSlice.reducer;