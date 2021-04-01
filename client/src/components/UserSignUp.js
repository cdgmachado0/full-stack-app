import React, { useContext } from 'react';
import { Context } from '../Context';

import Header from './Header';
import ErrorValidation from './ErrorValidation';


function UserSignUp() {
    const { actions, errors } = useContext(Context);

    return (
        <React.Fragment>
            <Header />
            <main>
                <div className="form--centered">
                    <h2>Sign Up</h2>
                    { errors && errors.length > 0 ? <ErrorValidation errors={errors} /> : '' }
                    <form>
                        <label htmlFor="firstName">First Name</label>
                        <input id="firstName" name="firstName" type="text"/>
                        <label htmlFor="lastName">Last Name</label>
                        <input id="lastName" name="lastName" type="text"/>
                        <label htmlFor="emailAddress">Email Address</label>
                        <input id="emailAddress" name="emailAddress" type="email"/>
                        <label htmlFor="password">Password</label>
                        <input id="password" name="password" type="password"/>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input id="confirmPassword" name="confirmPassword" type="password"/>
                        <button className="button" type="submit" onClick={actions.signUp}>Sign Up</button><button className="button button-secondary" onClick={(e) => actions.goBack(e, '/')}>Cancel</button>
                    </form>
                    <p>Already have a user account? Click here to <a href="/signin">sign in</a>!</p>
                </div>
            </main>
        </React.Fragment>
    );
}


export default UserSignUp;

