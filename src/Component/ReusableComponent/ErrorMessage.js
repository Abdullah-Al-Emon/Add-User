import React from 'react';

const ErrorMessage = ({message}) => {
    return (
        <div className="errors">
            {message}
        </div>
    );
};

export default ErrorMessage;