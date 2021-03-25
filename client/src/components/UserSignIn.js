import React, {
    useContext,
    useState,
    useRef
} from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../Context';



function UserSignIn() {
    const { actions } = useContext(Context);
    const [ authenticated, setAuth ] = useState(false);
    const emailAddress = useRef(); // emailAddress.current.value
    const password = useRef();

    const signIn = (e) => {
        e.preventDefault();
        //getting the authorization user to update authenticated state
        console.log(emailAddress.current.value, password.current.value);

        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            }
        };
        return fetch('/users', options);
    }
    
    return (
        <React.Fragment>
            <header>
            <div className="wrap header--flex">
                <h1 className="header--logo"><a href="index.html">Courses</a></h1>
                <nav>
                    <ul className="header--signedout">
                        <li><a href="sign-up.html">Sign Up</a></li>
                        <li><a href="sign-in.html">Sign In</a></li>
                    </ul>
                </nav>
            </div>
        </header>
        <main>
            <div className="form--centered">
                <h2>Sign In</h2>
                
                <form>
                    <label htmlFor="emailAddress">Email Address</label>
                    <input id="emailAddress" name="emailAddress" type="email" ref={emailAddress}/>
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" ref={password}/>
                    <button className="button" type="submit" onClick={(e) => signIn(e)}>Sign In</button><button className="button button-secondary" onClick={(e) => actions.goBack(e, '/')}>Cancel</button>
                </form>
                <p>Don't have a user account? Click here to <a href="sign-up.html">sign up</a>!</p>
                
            </div>
        </main>
        </React.Fragment>
    );
}


export default UserSignIn;


//create a function to be called on the button to sign in.
//this func will check the user's credentials and if they existe in the db, 
//set authenticated state to true which will be passed down along the user's
//credentials to the Header component to display the user's name 