import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserEmployee = createAsyncThunk('usersEmployeeGet/fetchUserEmployee', async () =>
{
    const res = await axios.get('https://63b5737158084a7af394adfc.mockapi.io/users?user_type=employee');
    return res.data;
}
)

export const fetchUserEmployeeUpdate = createAsyncThunk(
    "usersAdding/addUser",
    async({values}) => {
        console.log(values.id)
        return fetch(`https://63b5737158084a7af394adfc.mockapi.io/users/${values.id}`,{
            method: 'PUT',
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
        .then(data => console.log(data))
        
    }
)

const usersEmployeeSlice = createSlice({
    name: 'usersEmployeeGet',
    initialState: {
        isLoading: false,
        users: [],
        error: null
    },
    extraReducers: (builder) =>
    {
        builder.addCase(fetchUserEmployee.pending, (state) =>
        {
            state.isLoading = true;
        })
        builder.addCase(fetchUserEmployee.fulfilled, (state, action) =>
        {
            state.isLoading = false;
            state.users = action.payload;
            state.error = null;
        })
        builder.addCase(fetchUserEmployee.rejected, (state, action) =>
        {
            state.isLoading = false;
            state.users = [];
            state.error = action.error.message;
        })
        builder.addCase(fetchUserEmployeeUpdate.fulfilled, (state, action) =>
        {
            state.isLoading = false;
            state.users = state.users.map(us => us.id === action.payload.id ? action.payload : us );
            // console.log(action.payload)
            state.error = null;
        })
    }
})

export default usersEmployeeSlice.reducer;