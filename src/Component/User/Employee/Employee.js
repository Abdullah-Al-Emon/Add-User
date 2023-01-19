import React from 'react';
import { Link } from 'react-router-dom';
import './Employee'

const Employee = ({users, isLoading, error }) =>
{
    return (
        <div className='div'>
            <h2>Employee</h2>
            {/* <hr /> */}
            {isLoading && <span>Loading...</span>}
            {error && <span>{error.message}</span>}
            <div>
                <table>
                    <tr className='head'>
                        <th >Name</th>
                        <th >User Type</th>
                        <th >Division</th>
                        <th >District</th>
                        <th>Details</th>
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
                                    <td className='btn-dt'>
                                        <Link to={`details/${user.id}`}>Details</Link>
                                    </td>
                                </tr>

                            )
                        })
                    }
                </table>
            </div>
        </div>
    );
};

export default Employee;