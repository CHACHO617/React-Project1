import React from 'react';

const ErrorMessageLogin = ({ message }) => {
    return (
        <div className="error-popup">
            <p>{message}</p>
        </div>
    );
};

export default ErrorMessageLogin;
