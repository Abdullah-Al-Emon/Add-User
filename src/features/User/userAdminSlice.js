import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchUserAdmin = createAsyncThunk('usersAdminGet/fetchUserAdmin', async() => {
    const res = await axios.get('https://60f2479f6d44f300177885e6.mockapi.io/users?user_type=admin');
    return res.data;
}
)

const usersAdminSlice = createSlice({
    name: 'usersAdminGet',
    initialState:{
        isLoading: false,
        users: [],
        error: null
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserAdmin.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(fetchUserAdmin.fulfilled, (state, action) => {
            state.isLoading = false;
            state.users = action.payload;
            state.error = null;
        })
        builder.addCase(fetchUserAdmin.rejected, (state, action) => {
            state.isLoading = false;
            state.users = [];
            state.error = action.error.message;
        })
    }
})

export default usersAdminSlice.reducer;