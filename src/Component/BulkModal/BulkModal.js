import { ErrorMessage, Field, FieldArray, Form, Formik } from 'formik';
import React from 'react';
import { AiFillPlusCircle, AiOutlineCloseCircle } from 'react-icons/ai'
import './BulkModal.css'

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
    return errors
}

const BulkModal = ({ toggleBulkModal, setBulkModal, bulkModal }) =>
{

    const submitForm = (values) =>
    {
        console.log(values);
        alert(JSON.stringify(values, null, 2));
    };

    const initialValues = {
        friends: [
            {
                first_name: '',
                last_name: '',
                user_type: ''
            },
        ],
    };

    return (
        <div className="modal">
            <div onClick={toggleBulkModal} className="overlay"></div>
            <div className="bulkModal-content">
                <h2>Bulk User</h2>
                <Formik
                    initialValues={initialValues}
                    validate={validate}
                    onSubmit={submitForm}
                >
                    {(formik) =>
                    {
                        const {
                            values,
                            // handleChange,
                            // handleSubmit,
                            // errors,
                            // touched,
                            // handleBlur,
                            // isValid,
                            // dirty
                        } = formik;
                        <Form>
                            <FieldArray name="friends">
                                {({ insert, remove, push }) => (
                                    <div>
                                        {values.friends.length > 0 &&
                                            values.friends.map((friend, index) => (
                                                <div className="row" key={index}>
                                                    <div className="col">
                                                        <label htmlFor={`friends.${index}.first_name`}>First Name</label>
                                                        <Field
                                                            className='input'
                                                            name={`friends.${index}.first_name`}
                                                            placeholder="Last Name"
                                                            type="text"
                                                        />
                                                        <ErrorMessage
                                                            name={`friends.${index}.first_name`}
                                                            component="div"
                                                            className="field-error"
                                                        />
                                                    </div>
                                                    <div className="col">
                                                        <label htmlFor={`friends.${index}.last_name`}>Last Name</label>
                                                        <Field
                                                            className='input'
                                                            name={`friends.${index}.last_name`}
                                                            placeholder="Last Name"
                                                            type="text"
                                                        />
                                                        <ErrorMessage
                                                            name={`friends.${index}.last_name`}
                                                            component="div"
                                                            className="field-error"
                                                        />
                                                    </div>
                                                    <div className="col">
                                                        <AiFillPlusCircle
                                                            type="button"
                                                            className="secondary-plus"
                                                            onClick={() => push({ first_name: '', last_name: '' })}>
                                                        </AiFillPlusCircle>
                                                    </div>
                                                    <div className="col">
                                                        <AiOutlineCloseCircle
                                                            type="button"
                                                            className="secondary-close"
                                                            onClick={() => remove(index)}
                                                        >
                                                        </AiOutlineCloseCircle>
                                                    </div>
                                                </div>
                                            ))}
                                        <AiFillPlusCircle
                                            type="button"
                                            className="secondary-plus"
                                            onClick={() => push({ first_name: '', last_name: '' })}
                                        >
                                        </AiFillPlusCircle>
                                    </div>
                                )}
                            </FieldArray>
                            <label className="input-title" htmlFor="user_type">User Type</label><br />
                            <Field className='input' name="user_type" as="select">
                                <option value="">Select User Type</option>
                                <option value="Employee">Employee</option>
                                <option value="Admin">Admin</option>
                            </Field>
                            <button className='btn' type="submit">Submit</button>
                        </Form>
                    }}
                </Formik>
                <button className="close-modal" onClick={toggleBulkModal}>
                    CLOSE
                </button>
            </div>
        </div>
    );
};

export default BulkModal;