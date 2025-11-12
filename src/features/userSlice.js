import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/axios.js";

export const register=createAsyncThunk('auth/register',async (userData, thunkAPI)=>{
    try {
        const response = await axios.post(`/auth/register`, userData);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data || error.message);
    }  
})

export const login=createAsyncThunk('auth/login',async (userData, thunkAPI)=>{
    try {
       const response = await axios.post(`/auth/login`, userData);
       return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
})

export const logout=createAsyncThunk('auth/logout',async (_, thunkAPI)=>{
    try {
        const response = await axios.post(`/auth/logout`);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data || error.message);
    }
})

export const fetchById=createAsyncThunk("/user",async(_,thunkAPI)=>{
    try {
        const response = await axios.get(`/user`);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data || error.message);
    } 
})

export const editUserDetails = createAsyncThunk("auth/update-profile", async (user,thunkAPI) => {
    try {
        const response = await axios.patch("auth/update-profile", user);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
})

export const updateUserProfilePhoto = createAsyncThunk("auth/update-photo", async (formData, thunkAPI) => {
    try {
        const response = await axios.patch("auth/update-photo", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.user = null;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.user=action.payload.data;
                state.error = null;
            })
            .addCase(register.rejected, (state, action) => {
                state.user = null;
                state.error = action.payload.message;
            })
            .addCase(login.pending, (state) => {
                state.user = null;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                localStorage.setItem('token', action.payload.data.token);
                state.user = action.payload.data.user;
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.user = null;
                state.error = action.payload.message;
            })
            .addCase(logout.pending, (state) => {
                state.user = null;
                state.error = null;
            })
            .addCase(logout.fulfilled, (state, action) => {
                localStorage.removeItem('token');
                state.user = null;
                state.error = null;
            })
            .addCase(logout.rejected, (state, action) => {
                state.user = null;
                state.error = action.payload.message;
            })
            .addCase(fetchById.pending, (state) => {
                state.user = null;
                state.error = null;
            })
           .addCase(fetchById.fulfilled, (state, action) => {
                state.user = action.payload.data;
                state.error = null;
            })
           .addCase(fetchById.rejected, (state, action) => {
                state.user = null;
                state.error = action.payload.message;
           });
        builder
            .addCase(editUserDetails.pending, (state) => {
                state.error="Loading..."
            })
            .addCase(editUserDetails.fulfilled, (state,action) => {
                state.user=action.payload.data;
                state.error=null;
            })
            .addCase(editUserDetails.rejected, (state,action) => {
                state.error = action.payload.message;
            });
        builder
            .addCase(updateUserProfilePhoto.pending, (state) => {
                state.error = "Uploading...";
            })
            .addCase(updateUserProfilePhoto.fulfilled, (state, action) => {
                state.user = action.payload.data;
                state.error = null;
            })
            .addCase(updateUserProfilePhoto.rejected, (state, action) => {
                state.error = action.payload.message;
            });
    }
})

export default userSlice.reducer;
