import React from 'react';


function ErrorValidation(props) {
    const { errors } = props;

    return (
        <React.Fragment>
            <div className="validation--errors">
                <h3>Validation Errors</h3>
                <ul>
                    {errors.length > 0 ? errors.map((error, i) => <li key={i}>{error}</li>) : errors.message}
                </ul>
            </div>  
        </React.Fragment>
    );
}


export default ErrorValidation;