import React from 'react';
import { FieldArray, Form, Formik, useFormik } from 'formik';

const validat = values =>
{
    const errors = {}
    values.users.map(er =>
    {
        if (!er.first_name) {
            errors.first_name = 'Type Your First Name'
        }
        if (!er.last_name) {
            errors.last_name = 'Type your last name'
        }
    })
    console.log(errors)
    return errors;
};

const MoreExample = () =>
{
    const formik = useFormik({

        initialValues: {
            users: [{ first_name: '', last_name: '' }]
        },
        validate: validat,
        // validate: value =>
        // {
        //     const errors = {}
        //     value.users.map(er =>
        //     {
        //         if (!er.firstName) {
        //             errors.firstName = 'Required'
        //         }
        //     })
        //     console.log(errors)
        //     return errors;
        // },
        onSubmit: values =>
        {
            console.log(values)
            alert(JSON.stringify(values, null, 2));
        },
    });
    return (
        <form onSubmit={formik.handleSubmit}>
            <Formik>
                <Form>
                    <FieldArray
                        name='users'
                        render={
                            (arrayHelpers) => (
                                <div>
                                    {formik.values.users.map((value, index) => (
                                        <div>
                                            <div>
                                                
                                                <label htmlFor={`users.${index}.first_name`}>First Name</label>
                                                <input type="text"
                                                    name={`users.${index}.first_name`}
                                                    id={`users.${index}.first_name`}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={value.first_name}
                                                />
                                                {
                                                    formik?.touched?.users?.map(vl => 
                                                        (formik.errors.first_name && vl.first_name ? 
                                                        <div>{formik.errors.first_name}</div> : null))
                                                }
                                            </div>
                                            <div>
                                                <label htmlFor={`users.${index}.last_name`}>Last Name</label>
                                                <input type="text"
                                                    name={`users.${index}.last_name`}
                                                    id={`users.${index}.last_name`}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={value.last_name}
                                                />
                                                {
                                                    formik?.touched?.users?.map(vl => 
                                                        (formik.errors.last_name && vl.last_name ? 
                                                        <div>{formik.errors.last_name}</div> : null))
                                                }
                                               
                                            </div>
                                        </div>
                                    ))
                                    }
                                    <div>
                                        <button type='button' onClick={
                                                () => arrayHelpers.push(formik?.values?.users?.length + 1, {first_name: '', last_name: ''})
                                            } >Add</button>
                                        {/* {console.log(formik.values.users)} */}
                                    </div>
                                </div>
                            )
                        }
                    />
                </Form>
            </Formik>
            <button type="submit">Submit</button>
        </form>
    );
};

export default MoreExample