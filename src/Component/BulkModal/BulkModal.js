import { Form, Field, ErrorMessage, FieldArray, Formik } from 'formik'
import React, { useState } from 'react';
import * as Yup from 'yup';
import { City, State } from 'country-state-city';
import Option from '../ReusableComponent/Option';
import './BulkModal.css'
import InputField from '../ReusableComponent/InputField';

const validationSchema = Yup.object().shape({
    users: Yup.array().of(
        Yup.object().shape({
            first_name: Yup.string().required('Type Your First Name'),
            last_name: Yup.string().required('Type Your Last Name'),
            user_type: Yup.string().required('Select Your User Type'),
            division: Yup.string().required('Select Your Division'),
            district: Yup.string().required('Select Your District'),
        })
    )
})


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
                        validationSchema={validationSchema}
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
                                                    {formik.values.users.map((users, index) => (
                                                        <div key={index}>
                                                            <div>
                                                                <div className='card'>
                                                                    <div className='card-title'>{`Users ${index + 1}`}</div>
                                                                    <div className="card-body">
                                                                        <div className='row'>
                                                                            <InputField common_name={`users.${index}.first_name`} title={'First Name'} />
                                                                            <InputField common_name={`users.${index}.last_name`} title={'Last Name'} />
                                                                        </div>
                                                                        <div className="from-group">
                                                                            <label htmlFor={`users.${index}.user_type`}>User Type</label> <br />
                                                                            <Field className='form-control' onClick={handleUserChange} as="select" name={`users.${index}.user_type`}>
                                                                                <option value="">Select User Type</option>
                                                                                <option value="Employee">Employee</option>
                                                                                <option value="Admin">Admin</option>
                                                                            </Field> <br />
                                                                            <ErrorMessage
                                                                                component='span'
                                                                                className='field_error'
                                                                                name={`users.${index}.user_type`}
                                                                            />
                                                                        </div>
                                                                        <div>
                                                                            {
                                                                                employee === "Employee" ?
                                                                                    <div>
                                                                                        <div className="from-group">
                                                                                            <label htmlFor={`users.${index}.division`}>Division</label> <br />
                                                                                            <Field as="select" className='form-control' name={`users.${index}.division`}>
                                                                                                <option value="">Select Your Division</option>
                                                                                                {
                                                                                                    state.map((st, index) => <Option key={index} common={st} />)
                                                                                                }
                                                                                            </Field> <br />
                                                                                            <ErrorMessage
                                                                                                component='span'
                                                                                                className='field_error'
                                                                                                name={`users.${index}.division`}
                                                                                            />
                                                                                        </div>
                                                                                        <div className="from-group">
                                                                                            <label htmlFor={`users.${index}.district`}>District</label> <br />
                                                                                            <Field as="select" className='form-control' name={`users.${index}.district`}>
                                                                                                <option value="">Select Your District</option>
                                                                                                {
                                                                                                    cities.map((ct, index) => <Option key={index} common={ct} />)
                                                                                                }
                                                                                            </Field> <br />
                                                                                            <ErrorMessage
                                                                                                component='span'
                                                                                                className='field_error'
                                                                                                name={`users.${index}.district`}
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                    :
                                                                                    <div></div>
                                                                            }
                                                                            {
                                                                                admin === "Admin" ?
                                                                                    <div>
                                                                                        <InputField common_name={`users.${index}.division`} title={'Division'} />
                                                                                        <InputField common_name={`users.${index}.district`} title={'District'} />
                                                                                    </div>
                                                                                    :
                                                                                    <div></div>
                                                                            }

                                                                        </div>
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