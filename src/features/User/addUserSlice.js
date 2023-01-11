import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const addUser = createAsyncThunk(
    "usersAdding/addUser",
    async({values}) => {
        return fetch('https://60f2479f6d44f300177885e6.mockapi.io/users',{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                first_name : values.first_name,
                last_name: values.last_name,
                user_type: values.user_type,
                division: values.division,
                district: values.district
            }),
        }).then((res) => res.json())
        .then(data => window.location.reload(true))
        
    }
)

const userAdding = createSlice({
    name: 'usersAdding',
    initialState: {
        isLoading: false,
        users: [],
        error: null
    },
    extraReducers: (builder) =>
    {   
        builder.addCase(addUser.pending, (state) =>
        {
            state.isLoading = true;
        })
        builder.addCase(addUser.fulfilled, (state, action) =>
        {
            state.isLoading = false;
            state.users = [action.payload];
            state.error = null;
        })
        builder.addCase(addUser.rejected, (state, action) =>
        {
            state.isLoading = false;
            state.users = [];
            state.error = action.error.message;
        })
    }
})

export default userAdding.reducer;