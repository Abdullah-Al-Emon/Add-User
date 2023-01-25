import React from "react";
import { FormikProvider, useFormik, FieldArray, ErrorMessage } from "formik";

const ExampleForm = () =>
{
    const formik = useFormik({
        initialValues: {
            todos: [{ name: "" }]
        },
        onSubmit: async (values) =>
        {
            console.log(values);
        },
        validate: (value) =>
        {
            // const errors = [{ name: '', last_name: '' }, { name: '', last_name: '' }];
            // // const length = 
            // value?.todos?.map((er, i) =>
            // {
            //     // console.log(er, i)
            //     if (!value?.todos[i]?.name) {
            //         // console.log('value')
            //         // value.users.errors.first_name = 'Type Your First Name'
            //         errors[i].name = 'type'

            //     }
            //     console.log(errors[i])
            // })

            // console.log(value)
            // return errors

            let errors = {
                users: []
            };

            if (value.todos.length > 0) {
                value.todos.map(er =>
                {
                    const error = {};
                    if (!er.name) {
                        error.name = 'Type Your First Name'
                    }
                    // if (!er.last_name) {
                    //     error.last_name = 'Type Your last Name'
                    // }
                    errors.users.push(error)
                })
            }
            console.log(errors)

            return errors
        }
    });

    return (
        <FormikProvider value={formik}>
            <FieldArray
                name="todos"
                render={(arrayHelpers) => (
                    <div>
                        {formik.values.todos.map((friend, index) => (
                            <div key={index} style={{ display: "flex", gap: "1rem" }}>
                                <input
                                    type='text'
                                    id={`todos[${index}].name`}
                                    name={`todos[${index}].name`}
                                    value={formik.values.todos[index].name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {/* {
                                    formik.errors?.todos?.map((vl, i) =>
                                    {
                                        formik?.errors?.todos[index]?.name ?
                                            <div>this</div> : <div>is</div>
                                    })
                                } */}
                                {/* <ErrorMessage
                                    component='span'
                                    className='field_error'
                                    name={`todos.${index}.name`}
                                /> */}
                                <button
                                    disabled={formik.values.todos?.length === 1}
                                    type="button"
                                    onClick={() => arrayHelpers.remove(index)}
                                    className="deleteButton"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => arrayHelpers.push({ name: "" })}
                        >
                            Add
                        </button>
                    </div>
                )}
            />
            <button onClick={() => formik.handleSubmit()} type="submit">submit</button>
        </FormikProvider>
    );
};

export default ExampleForm;