import React, {
    useContext,
    useRef
} from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../Context';



function UserSignIn() {
    const { actions, authenticatedUser } = useContext(Context);
    const email = useRef();
    const password = useRef();
    
    return (
        <React.Fragment>
            <header>
                <div className="wrap header--flex">
                    <h1 className="header--logo"><a href="index.html">Courses</a></h1>
                    <nav>
                        <ul className="header--signedout">
                            <li><a href="sign-up.html">Sign Up</a></li>
                            <li><Link to="/signin">Sign In</Link></li>
                        </ul>
                    </nav>
                </div>
            </header>
            <main>
                <div className="form--centered">
                    <h2>Sign In</h2>
                    
                    <form>
                        <label htmlFor="emailAddress">Email Address</label>
                        <input id="emailAddress" name="emailAddress" type="email" ref={email}/>
                        <label htmlFor="password">Password</label>
                        <input id="password" name="password" type="password" ref={password}/>
                        <button className="button" type="submit" onClick={(e) => actions.signIn(e, email.current.value, password.current.value)}>Sign In</button><button className="button button-secondary" onClick={(e) => actions.goBack(e, '/')}>Cancel</button>
                    </form>
                    <p>Don't have a user account? Click here to <a href="sign-up.html">sign up</a>!</p>
                    
                </div>
            </main>
        </React.Fragment>
    );
}


export default UserSignIn;

