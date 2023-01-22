import { ErrorMessage, Field } from 'formik';
import React from 'react';

const InputField = ({common_name, title}) =>
{
    return (
        <div className="from-group">
            <label
                htmlFor={common_name}>
                {title}
            </label> <br />
            <Field
                placeholder={title}
                type='text'
                className='form-control'
                name={common_name}
                id={common_name}
            /> <br />
            <ErrorMessage
                component='span'
                className='field_error'
                name={common_name}
            />
        </div>
    );
};

export default InputField;