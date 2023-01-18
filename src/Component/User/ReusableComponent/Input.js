import React from 'react';

const Input = ({ formik, common_name, title }) =>
{
    return (
        <div>
            <div>
                <label className="input-title" htmlFor={common_name}>{title}</label> <br />
                <input
                    // required
                    placeholder={title}
                    className="input"
                    id={common_name}
                    name={common_name}
                    type="text"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.common_name}
                /> <br />
            </div>
        </div>
    );
};

export default Input;