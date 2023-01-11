import { useFormik } from "formik";
import "./Modal.css";
import { State, City } from 'country-state-city'
import { useState } from "react";
import Option from "./Option";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../addUserSlice";


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
            dispatch(addUser({values}))   
            setModal(!modal)
            formik.resetForm()
            // alert(JSON.stringify(values, null, 2));
        },
    });
    if(isLoading){
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

                    <button className="btn" type="submit">Submit</button>
                </form>
                <button className="close-modal" onClick={toggleModal}>
                    CLOSE
                </button>
            </div>
        </div>

    );
}