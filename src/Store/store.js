import { configureStore } from "@reduxjs/toolkit";
import addUserSlice from "./addUserSlice";
import usersEmployeeUpdateSlice from "./usersEmployeeUpdateSlice";


const store = configureStore({
    reducer: {
        usersEmployee: usersEmployeeUpdateSlice,
        addingUsers: addUserSlice
    }
})

export default store;