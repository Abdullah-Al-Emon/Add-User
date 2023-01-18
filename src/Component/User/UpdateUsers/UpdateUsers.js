import { City, State } from 'country-state-city';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Option from '../ReusableComponent/Option';
import { fetchUserEmployeeUpdate } from '../../../Store/usersEmployeeUpdateSlice';
import './UpdateUsers.css'
import ErrorMessage from '../ReusableComponent/ErrorMessage';

const validate = values =>
{
    const errors = {};

    if (!values.first_name) {
        errors.first_name = 'Type your first name'
    }

    if (!values.last_name) {
        errors.last_name = 'Type your last name'
    }
    if (!values.user_type) {
        errors.user_type = 'select your user type'
    }
    if (!values.division) {
        errors.division = 'Select your user type'
    }
    if (!values.district) {
        errors.district = 'Select your user type'
    }
    return errors
}

const UpdateUsers = () =>
{
    const location = useLocation()
    const navigate = useNavigate()
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
            dispatch(fetchUserEmployeeUpdate({ values }))
            formik.resetForm()
            navigate('/')
        },
        validate
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
                        // required
                        placeholder="First Name"
                        className="input"
                        id="first_name"
                        name="first_name"
                        type="text"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.first_name}
                    /> <br />
                </div>
                {formik.errors.first_name && formik.touched.first_name ? <ErrorMessage message={formik.errors.first_name} /> : null}
                <div>
                    <label className="input-title" htmlFor="last_name">Last Name</label> <br />
                    <input
                        // required
                        placeholder="Last Name"
                        className="input"
                        id="last_name"
                        name="last_name"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.last_name}

                    /> <br />
                </div>
                {formik.errors.last_name && formik.touched.last_name ? <ErrorMessage message={formik.errors.last_name} /> : null}
                <div>
                    <label className="input-title" htmlFor="user_type">User Type</label><br />
                    <select
                        // required
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
                {formik.errors.user_type && formik.touched.user_type ? <ErrorMessage message={formik.errors.user_type} /> : null}

                {
                    employee === "Employee" ?
                        <div>
                            <div>
                                <label className="input-title" htmlFor="division">Division</label><br />
                                <select
                                    // required
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
                                {formik.errors.division && formik.touched.division ? <ErrorMessage message={formik.errors.division} /> : null}
                            </div>
                            <div>
                                <label className="input-title" htmlFor="district">District</label><br />
                                <select
                                    // required
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
                                {formik.errors.district && formik.touched.district ? <ErrorMessage message={formik.errors.district} /> : null}
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
                                    // required
                                    placeholder="Select Division"
                                    className="input"
                                    id="division"
                                    name="division"
                                    type="text"
                                    onChange={formik.handleChange}
                                    value={formik.values.division}
                                /> <br />
                            </div>
                            {formik.errors.division && formik.touched.division ? <ErrorMessage message={formik.errors.division} /> : null}
                            <div>
                                <label className="input-title" htmlFor="district">District</label> <br />
                                <input
                                    // required
                                    placeholder="Select District"
                                    className="input"
                                    id="district"
                                    name="district"
                                    type="text"
                                    onChange={formik.handleChange}
                                    value={formik.values.district}
                                /> <br />
                            </div>
                            {formik.errors.district && formik.touched.district ? <ErrorMessage message={formik.errors.district} /> : null}
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