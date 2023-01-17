import { useFormik } from "formik";
import "./Modal.css";
import { State, City } from 'country-state-city'
import { useState } from "react";
import Option from "./Option";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../addUserSlice";
import Input from "./Input";


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


export default function Modal({ toggleModal, setModal, modal })
{
    const { isLoading, users, } = useSelector((state) => state.addingUsers)
    const [employee, setEmployee] = useState('')
    const [admin, setAdmin] = useState('')

    const dispatch = useDispatch();


    const formik = useFormik({
        initialValues: {
            first_name: '',
            last_name: '',
            user_type: '',
            division: '',
            district: ''
        },
        onSubmit: values =>
        {
            dispatch(addUser({ values }))
            setModal(!modal)
            formik.resetForm()
            console.log(values)

            // alert(JSON.stringify(values, null, 2));
        },
        validate
    });


    console.log(formik.touched)

    if (isLoading) {
        return <div>...Loading</div>
    }

    const state = State.getStatesOfCountry("BD")

    const cities = City.getCitiesOfCountry("BD")

    // console.log(City.getCitiesOfState("BD", "13"))

    const handleUserChange = (e) =>
    {
        setEmployee(e.target.value)
        setAdmin(e.target.value)
    }
    return (

        <div className="modal">
            <div onClick={toggleModal} className="overlay"></div>
            <div className="modal-content">
                <h2>Hello User</h2>
                <form className="form" onSubmit={formik.handleSubmit}>
                    <Input formik={formik} common_name={"first_name"} title={'First Name'}></Input>
                    {formik.errors.first_name && formik.touched.first_name ? <div className="errors">{formik.errors.first_name}</div> : null}
                    <Input formik={formik} common_name={'last_name'} title={'Last Name'}></Input>
                    {formik.errors.last_name && formik.touched.last_name ? <div className="errors">{formik.errors.last_name}</div> : null}
                    <div>
                        <label className="input-title" htmlFor="user_type">User Type</label><br />
                        <select
                            required
                            className="input"
                            id="user_type"
                            onBlur={formik.handleBlur}
                            onClick={handleUserChange}
                            onChange={formik.handleChange}
                            value={formik.values.user_type}
                        >
                            <option value="">Select User Type</option>
                            <option value="Employee">Employee</option>
                            <option value="Admin">Admin</option>
                        </select> <br />
                    </div>
                    {formik.errors.user_type && formik.touched.user_type ? <div className="errors">{formik.errors.user_type}</div> : null}

                    {
                        employee === "Employee" ?
                            <div>
                                <div>
                                    <label className="input-title" htmlFor="division">Division</label><br />
                                    <select
                                        required
                                        className="input "
                                        id="division"
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        value={formik.values.division}
                                    // onClick={handleChange}
                                    >
                                        <option value="">Select Division</option>
                                        {
                                            state.map((st, index) => <Option key={index} common={st} />)
                                        }
                                    </select>
                                    {formik.errors.division && formik.touched.division ? <div className="errors">{formik.errors.division}</div> : null}
                                </div>
                                <div>
                                    <label className="input-title" htmlFor="district">District</label><br />
                                    <select
                                        required
                                        className="input"
                                        id="district"
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        value={formik.values.district}
                                    >
                                        <option value="">Select District</option>
                                        {
                                            cities.map((ct, index) => <Option key={index} common={ct} />)
                                        }
                                    </select>
                                    {formik.errors.district && formik.touched.district ? <div className="errors">{formik.errors.district}</div> : null}
                                </div>
                            </div>
                            :
                            <div></div>
                    }
                    {
                        admin === "Admin" ?
                            <div>
                                <Input formik={formik} common_name={'division'} title={'Division'} />
                                {formik.errors.division && formik.touched.division ? <div className="errors">{formik.errors.division}</div> : null}
                                <Input formik={formik} common_name={'district'} title={'District'} />
                                {formik.errors.district && formik.touched.district ? <div className="errors">{formik.errors.district}</div> : null}
                            </div>
                            :
                            <div></div>
                    }

                    <button className="btn" type="submit">Submit</button>
                </form>
                <button className="close-modal" onClick={toggleModal}>
                    CLOSE
                </button>
            </div>
        </div>

    );
}