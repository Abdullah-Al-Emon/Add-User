import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserAdmin } from '../userAdminSlice';
import '../Employee/Employee.css'


const Admin = ({ toggleState }) =>
{
    const { isLoading, users, error } = useSelector((state) => state.usersAdmin)

    const dispatch = useDispatch();

    useEffect(() =>
    {
        dispatch(fetchUserAdmin())
    }, [])
    
    console.log(users)

    return (
        <div
            className={toggleState === 2 ? "content  active-content" : "content"}
        >
            <h2>Admin</h2>
            <hr />
            {isLoading && <span>Loading...</span>}
            {error && <span>{error.message}</span>}
            <div style={{overflowX: 'auto'}}>
                <table>
                    <tr>
                        <th>Name</th>
                        <th>User Type</th>
                        <th>Division</th>
                        <th>District</th>
                    </tr>
                    {users &&
                        users.map((user, index) =>
                        {
                            return (

                                <tr key={index}>
                                    <td data-label='Name'>{user.first_name} {user.last_name}</td>
                                    <td data-label='User Type'>{user.user_type}</td>
                                    <td data-label='Division'>{user.division}</td>
                                    <td data-label='District'>{user.district}</td>
                                </tr>

                            )
                        })
                    }
                </table>
            </div>
        </div>
    );
};

export default Admin;