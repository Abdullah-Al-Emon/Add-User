import React from 'react';

const Input = ({ formik, common_name, title, value }) =>
{
    return (
        <div>
            <label className="input-title" htmlFor={common_name}>{title}</label> <br />
            <input
                // required
                placeholder={title}
                className="form-control"
                id={common_name}
                name={common_name}
                type="text"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={value}
            /> <br />
        </div>
    );
};

export default Input;