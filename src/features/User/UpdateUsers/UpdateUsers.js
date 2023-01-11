import { City, State } from 'country-state-city';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Option from '../Modal/Option';
import { fetchUserEmployeeUpdate } from '../usersEmployeeSlice';
import './UpdateUsers.css'

const UpdateUsers = () =>
{
    const location = useLocation()
    const {users} = useSelector(state => state.usersEmployee)
    const navigate = useNavigate()

    const {id} = location.state
    console.log(id)

    const dispatch = useDispatch();


    const [employee, setEmployee] = useState('')
    const [admin, setAdmin] = useState('')
    const formik = useFormik({
        initialValues: {
            first_name: `${location.state.first_name}`,
            last_name: `${location.state.last_name}`,
            user_type: `${location.state.user_type}`,
            division: `${location.state.division}`,
            district: `${location.state.district}`,
            id: `${location.state.id}`
        },
        onSubmit: values =>
        {
            dispatch(fetchUserEmployeeUpdate({values}))
            formik.resetForm()
            navigate('/')
        },
    });

    const state = State.getStatesOfCountry("BD")

    const cities = City.getCitiesOfCountry("BD")

    const handleUserChange = (e) =>
    {
        setEmployee(e.target.value)
        setAdmin(e.target.value)
    }
    return (
        <div className='update-users'>
            <form className="form" onSubmit={formik.handleSubmit}>
                <div>
                    <label className="input-title" htmlFor="first_name">First Name</label> <br />
                    <input
                        required
                        placeholder="First Name"
                        className="input"
                        id="first_name"
                        name="first_name"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.first_name}
                    /> <br />
                </div>
                <div>
                    <label className="input-title" htmlFor="last_name">Last Name</label> <br />
                    <input
                        required
                        placeholder="Last Name"
                        className="input"
                        id="last_name"
                        name="last_name"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.last_name}

                    /> <br />
                </div>
                <div>
                    <label className="input-title" htmlFor="user_type">User Type</label><br />
                    <select
                        required
                        className="input"
                        id="user_type"
                        onClick={handleUserChange}
                        onChange={formik.handleChange}
                        value={formik.values.user_type}
                    >
                        <option value="">Select User Type</option>
                        <option value="Employee">Employee</option>
                        <option value="Admin">Admin</option>
                    </select> <br />
                </div>

                {
                    employee === "Employee" ?
                        <div>
                            <div>
                                <label className="input-title" htmlFor="division">Division</label><br />
                                <select
                                    required
                                    className="input "
                                    id="division"
                                    onChange={formik.handleChange}
                                    value={formik.values.division}
                                // onClick={handleChange}
                                >
                                    <option value="">Select Division</option>
                                    {
                                        state.map((st, index) => <Option key={index} common={st} />)
                                    }
                                </select>
                            </div>
                            <div>
                                <label className="input-title" htmlFor="district">District</label><br />
                                <select
                                    required
                                    className="input"
                                    id="district"
                                    onChange={formik.handleChange}
                                    value={formik.values.district}
                                >
                                    <option value="">Select District</option>
                                    {
                                        cities.map((ct, index) => <Option key={index} common={ct} />)
                                    }
                                </select>
                            </div>
                        </div>
                        :
                        <div></div>
                }
                {
                    admin === "Admin" ?
                        <div>
                            <div>
                                <label className="input-title" htmlFor="division">Division</label> <br />
                                <input
                                    required
                                    placeholder="Select Division"
                                    className="input"
                                    id="division"
                                    name="division"
                                    type="text"
                                    onChange={formik.handleChange}
                                    value={formik.values.division}
                                /> <br />
                            </div>
                            <div>
                                <label className="input-title" htmlFor="district">District</label> <br />
                                <input
                                    required
                                    placeholder="Select District"
                                    className="input"
                                    id="district"
                                    name="district"
                                    type="text"
                                    onChange={formik.handleChange}
                                    value={formik.values.district}
                                /> <br />
                            </div>
                        </div>
                        :
                        <div></div>
                }

                <div className='flex'>
                <button className="btn" type="submit">
                    <Link to='/'>Go Back</Link>
                </button>
                <button className="btn" type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateUsers;