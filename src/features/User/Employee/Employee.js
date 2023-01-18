import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUserEmployee } from '../usersEmployeeSlice';
import './Employee.css'

const Employee = ({ toggleState }) =>
{
    const { isLoading, users, error } = useSelector((state) => state.usersEmployee)

    const dispatch = useDispatch();

    useEffect(() =>
    {
        dispatch(fetchUserEmployee())
    }, [])

    // const { data, isLoading, error } = useQuery({
    //     queryKey: ['fetchData'],
    //     queryFn: async () =>
    //     {
    //         const res = await fetch('https://60f2479f6d44f300177885e6.mockapi.io/users?user_type=employee');
    //         const data = await res.json();
    //         return data;
    //     }
    // })
    // console.log(data)

    return (
        <div
            className={toggleState === 1 ? "content  active-content" : "content"}
        >
            <h2>Employee</h2>
            <hr />
            {isLoading && <span>Loading...</span>}
            {error && <span>{error.message}</span>}
            <div className='table' style={{ overflowX: 'auto' }}>
                <table>
                    <tr>
                        <th  >Name</th>
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