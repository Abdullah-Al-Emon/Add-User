import { FieldArray, Form, Formik, useFormik } from 'formik';
import React from 'react';

const ExampleForm = () =>
{
    const onSubmit = values =>
    {
        console.log(values)
    }

    // const formik = useFormik({ first_name: '', },
    //     onSubmit,
    // );
    return (
        <Formik
            initialValues={{
                users: [{ firstName: '', }]
            }}
            validate={(values) =>
            {
                const errors = {};
                // console.log(errors)

                if (!!values.firstName) {
                    console.log('value')
                    errors.firstName = 'Required';
                }

                return errors;
            }}
            onSubmit={(values, { setSubmitting }) =>
            {
                console.log(values)
                setTimeout(() =>
                {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                }, 400);
            }}
        >
            {formik => (
                <Form>
                    <FieldArray
                        name='users'
                        render={
                            (arrayHelpers) => 
                            {
                                return (
                                    <div>
                                        {
                                            formik.values.users.map((users, index) => (
                                                <div>
                                                    <input
                                                        type='text'
                                                        id={`users.${index}.firstName`}
                                                        name={`users.${index}.firstName`}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={users.firstName}
                                                    />
                                                    <div>
                                                        {console.log(formik.touched.users)}
                                                    </div>
                                                </div>
                                            ))
                                        }
                                        <div>
                                            <button type='button'
                                                onClick={
                                                    () => arrayHelpers.insert(formik.values.users.length + 1, { firstName: '' })
                                                }
                                            >
                                                add
                                            </button>
                                        </div>
                                    </div>
                                )
                            }
                        }
                    />
                    <button type="submit">Submit</button>
                </Form>
            )}
        </Formik>
    );
};

export default ExampleForm;