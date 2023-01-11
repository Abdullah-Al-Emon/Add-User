import { configureStore } from "@reduxjs/toolkit";
import addUserSlice from "../features/User/addUserSlice";
import userAdminSlice from "../features/User/userAdminSlice";
import usersEmployeeSlice from "../features/User/usersEmployeeSlice";


const store = configureStore({
    reducer: {
        usersEmployee: usersEmployeeSlice,
        usersAdmin: userAdminSlice,
        addingUsers: addUserSlice
    }
})

export default store;