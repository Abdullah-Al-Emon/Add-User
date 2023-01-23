import { Form, FieldArray, Formik } from 'formik'
import React, { useState } from 'react';
// import * as Yup from 'yup';
import { City, State } from 'country-state-city';
import Option from '../ReusableComponent/Option';
import './BulkModal.css'
import Input from '../ReusableComponent/Input';
import ErrorMessage from '../ReusableComponent/ErrorMessage';

// const validationSchema = Yup.object().shape({
//     users: Yup.array().of(
//         Yup.object().shape({
//             first_name: Yup.string().required('Type Your First Name'),
//             last_name: Yup.string().required('Type Your Last Name'),
//             user_type: Yup.string().required('Select Your User Type'),
//             division: Yup.string().required('Select Your Division'),
//             district: Yup.string().required('Select Your District'),
//         })
//     )
// })

// const validate = values =>
// {
//     const errors = {};

//     if (!values.first_name) {
//         errors.first_name = 'Type your first name'
//     }

//     if (!values.last_name) {
//         errors.last_name = 'Type your last name'
//     }
//     if (!values.user_type) {
//         errors.user_type = 'select your user type'
//     }
//     if (!values.division) {
//         errors.division = 'Select your user type'
//     }
//     if (!values.district) {
//         errors.district = 'Select your user type'
//     }
//     return errors
// }


const BulkModal = ({ toggleBulkModal, setBulkModal, bulkModal }) =>
{

    const [employee, setEmployee] = useState('')
    const [admin, setAdmin] = useState('')

    const handleSubmit = (values, { resetForm }) =>
    {
        values?.users?.map(vl =>
            fetch('https://63b5737158084a7af394adfc.mockapi.io/users', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    first_name: vl.first_name,
                    last_name: vl.last_name,
                    user_type: vl.user_type,
                    division: vl.division,
                    district: vl.district
                }),
            }).then((res) => res.json())
                .then(data => console.log(data))
        )
        setBulkModal(!bulkModal)
        resetForm()
    }
    const state = State.getStatesOfCountry("BD")

    const cities = City.getCitiesOfCountry("BD")


    const handleUserChange = (e) =>
    {
        setEmployee(e.target.value)
        setAdmin(e.target.value)
    }

    return (
        <div className="modal">
            <div onClick={toggleBulkModal} className="overlay"></div>
            <div className="bulkModal-content">
                <h2>Bulk User</h2>
                <div>
                    <Formik
                        initialValues={{
                            users: [{ first_name: '', last_name: '', user_type: ``, division: '', district: '' }]
                        }}
                        // validationSchema={validationSchema}
                        validate={(value) =>
                        {
                            const errors = {};
                            value?.users?.map(er =>
                            {
                                if (!er?.first_name) {
                                    errors.first_name = 'Type Your First Name'
                                }
                                if (!er.last_name) {
                                    errors.last_name = 'Type your last name'
                                }
                                if (!er.user_type) {
                                    errors.user_type = 'select your user type'
                                }
                                if (!er.division) {
                                    errors.division = 'Select your division'
                                }
                                if (!er.district) {
                                    errors.district = 'Select your district'
                                }
                            })

                            // if (!value.first_name) {
                            //     console.log('validation')
                            //     errors.first_name = 'Type your first name'
                            // }
                            // console.log(value)
                            return errors
                        }}
                        onSubmit={handleSubmit}
                    >
                        {(formik) => (
                            <Form>
                                <div className="form-group">
                                    <FieldArray name='users' render={
                                        (arrayHelpers) =>
                                        {
                                            return (
                                                <div>
                                                    {formik.values?.users.map((users, index) => (
                                                        <div key={index}>
                                                            <div className='card'>
                                                                <div className='card-title'>{`Users ${index + 1}`}</div>
                                                                <div className="card-body">
                                                                    <div className='row'>
                                                                        <div>
                                                                            <Input formik={formik} value={users?.first_name} common_name={`users.${index}.first_name`} title={'First Name'} />
                                                                            {
                                                                                formik?.touched?.users?.map(vl => (formik.errors?.first_name && vl?.first_name ? <ErrorMessage message={formik?.errors?.first_name} /> : null))
                                                                            }
                                                                            {/* <ErrorMessage
                                                                                component='span'
                                                                                className='field_error'
                                                                                name={`users.${index}.first_name`}
                                                                            /> */}
                                                                            {/* {console.log(formik.errors.first_name)} */}
                                                                            {/* {console.log(formik.touched.users)} */}
                                                                        </div>
                                                                        <div>
                                                                            <Input formik={formik} value={users.last_name} common_name={`users.${index}.last_name`} title={'Last Name'} />
                                                                            {
                                                                                formik?.touched?.users?.map(vl => (formik.errors?.last_name && vl?.last_name ? <ErrorMessage message={formik?.errors?.last_name} /> : null))
                                                                            }
                                                                            {/* <ErrorMessage
                                                                                component='span'
                                                                                className='field_error'
                                                                                name={`users.${index}.last_name`}
                                                                            /> */}
                                                                        </div>
                                                                    </div>
                                                                    <div className="from-group">
                                                                        <label htmlFor={`users.${index}.user_type`}>User Type</label> <br />
                                                                        <select id={`users.${index}.user_type`}
                                                                            onBlur={formik.handleBlur}
                                                                            onChange={formik.handleChange}
                                                                            value={users.user_type}
                                                                            className='form-control'
                                                                            onClick={handleUserChange}
                                                                            name={`users.${index}.user_type`}>
                                                                            <option value="">Select User Type</option>
                                                                            <option value="Employee">Employee</option>
                                                                            <option value="Admin">Admin</option>
                                                                        </select> <br />
                                                                        {
                                                                            formik?.touched?.users?.map(vl => (formik.errors?.user_type && vl?.user_type ? <ErrorMessage message={formik?.errors?.user_type} /> : null))
                                                                        }
                                                                        {/* <ErrorMessage
                                                                            component='span'
                                                                            className='field_error'
                                                                            name={`users.${index}.user_type`}
                                                                        /> */}
                                                                    </div>
                                                                    <div>
                                                                        {
                                                                            employee === "Employee" ?
                                                                                <div>
                                                                                    <div className="from-group">
                                                                                        <label htmlFor={`users.${index}.division`}>Division</label> <br />
                                                                                        <select
                                                                                            id={`users.${index}.division`}
                                                                                            onBlur={formik.handleBlur}
                                                                                            onChange={formik.handleChange}
                                                                                            value={users.division}
                                                                                            className='form-control'
                                                                                            name={`users.${index}.division`}>
                                                                                            <option value="">Select Your Division</option>
                                                                                            {
                                                                                                state.map((st, index) => <Option key={index} common={st} />)
                                                                                            }
                                                                                        </select> <br />
                                                                                        {
                                                                                            formik?.touched?.users?.map(vl => (formik.errors?.division && vl?.division ? <ErrorMessage message={formik?.errors?.division} /> : null))
                                                                                        }
                                                                                        {/* <ErrorMessage
                                                                                            component='span'
                                                                                            className='field_error'
                                                                                            name={`users.${index}.division`}
                                                                                        /> */}
                                                                                    </div>
                                                                                    <div className="from-group">
                                                                                        <label htmlFor={`users.${index}.district`}>District</label> <br />
                                                                                        <select
                                                                                            className='form-control'
                                                                                            id={`users.${index}.district`}
                                                                                            onBlur={formik.handleBlur}
                                                                                            onChange={formik.handleChange}
                                                                                            value={users.district}
                                                                                            name={`users.${index}.district`}>
                                                                                            <option value="">Select Your District</option>
                                                                                            {
                                                                                                cities.map((ct, index) => <Option key={index} common={ct} />)
                                                                                            }
                                                                                        </select> <br />
                                                                                        {
                                                                                            formik?.touched?.users?.map(vl => (formik.errors?.district && vl?.district ? <ErrorMessage message={formik?.errors?.district} /> : null))
                                                                                        }
                                                                                        {/* <ErrorMessage
                                                                                            component='span'
                                                                                            className='field_error'
                                                                                            name={`users.${index}.district`}
                                                                                        /> */}
                                                                                    </div>
                                                                                </div>
                                                                                :
                                                                                <div></div>
                                                                        }
                                                                        {
                                                                            admin === "Admin" ?
                                                                                <div>
                                                                                    <div>
                                                                                        <Input formik={formik} value={users.division} common_name={`users.${index}.division`} title={'Division'} />
                                                                                        {
                                                                                            formik?.touched?.users?.map(vl => (formik.errors?.division && vl?.division ? <ErrorMessage message={formik?.errors?.division} /> : null))
                                                                                        }
                                                                                        {/* <ErrorMessage
                                                                                            component='span'
                                                                                            className='field_error'
                                                                                            name={`users.${index}.division`}
                                                                                        /> */}
                                                                                    </div>
                                                                                    <div>
                                                                                        <Input formik={formik} value={users.district} common_name={`users.${index}.district`} title={'District'} />
                                                                                        {
                                                                                            formik?.touched?.users?.map(vl => (formik.errors?.district && vl?.district ? <ErrorMessage message={formik?.errors?.district} /> : null))
                                                                                        }
                                                                                        {/* <ErrorMessage
                                                                                            component='span'
                                                                                            className='field_error'
                                                                                            name={`users.${index}.district`}
                                                                                        /> */}
                                                                                    </div>
                                                                                </div>
                                                                                :
                                                                                <div></div>
                                                                        }

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                    <div>
                                                        <button
                                                            className='plus'
                                                            type='button'
                                                            onClick={
                                                                () => arrayHelpers.insert(formik.values.users.length + 1,
                                                                    { first_name: '', last_name: '', user_type: '' }
                                                                )}>
                                                            + Add
                                                        </button>
                                                    </div>
                                                </div>
                                            )
                                        }}
                                    />
                                </div>
                                <div>
                                    <button className='btn-submit' type='submit'>
                                        Submit
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
                <button className="close-modal" onClick={toggleBulkModal}>
                    CLOSE
                </button>
            </div>
        </div>
    );
};

export default BulkModal;