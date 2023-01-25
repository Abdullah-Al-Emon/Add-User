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
                
                <button type="submit">Submit</button>
            </Formik>
        </form>
    );
};

export default MoreExample