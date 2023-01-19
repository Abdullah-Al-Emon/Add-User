import React from 'react';
import './Admin.css'

const Admin = ({users, isLoading, error}) => {
    
    return (
        <div className='div'>
            <h2>Admin</h2>
            {isLoading && <span>Loading...</span>}
            {error && <span>{error.message}</span>}
            <div>
                <table>
                    <tr className='head'>
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