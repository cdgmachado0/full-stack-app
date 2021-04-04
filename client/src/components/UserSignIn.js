import React, {
    useContext,
    useRef
} from 'react';
import { Context } from '../Context';

//Components
import ErrorValidation from './ErrorValidation';
import Header from './Header';


function UserSignIn(props) {
    const { actions, errors } = useContext(Context);
    const email = useRef();
    const password = useRef();
    const { from } = props.location.state || { from: { pathname: '/' }};
    
    return (
        <React.Fragment>
            <Header />
            <main>
                <div className="form--centered">
                    <h2>Sign In</h2>
                    { errors.message ? <ErrorValidation errors={errors} /> : '' }
                    <form>
                        <label htmlFor="emailAddress">Email Address</label>
                        <input id="emailAddress" name="emailAddress" type="email" ref={email}/>
                        <label htmlFor="password">Password</label>
                        <input id="password" name="password" type="password" ref={password}/>
                        <button className="button" type="submit" onClick={(e) => actions.signIn(e, email.current.value, password.current.value, from)}>Sign In</button><button className="button button-secondary" onClick={(e) => actions.goBack(e, '/')}>Cancel</button>
                    </form>
                    <p>Don't have a user account? Click here to <a href="/signup">sign up</a>!</p>
                    
                </div>
            </main>
        </React.Fragment>
    );
}


export default UserSignIn;

