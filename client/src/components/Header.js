import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../Context';


function Header() {
    const { authenticatedUser } = useContext(Context);
    return (
        <React.Fragment>
            <header>
                <div className="wrap header--flex">
                    <h1 className="header--logo"><a href="/">Courses</a></h1>
                    <nav>
                        {authenticatedUser && authenticatedUser.message !== 'Access denied' ?
                            <SignedIn name={authenticatedUser.name}/> : <SignedOut />
                        }
                    </nav>
                </div>
            </header>
        </React.Fragment>
    );
}

function SignedIn(props) {   
    return (
        <React.Fragment>
            <ul className="header--signedin">
                <li>Welcome, {props.name}!</li>
                <li><Link to='/signout'>Sign Out</Link></li>
            </ul>
        </React.Fragment>
    );
}

function SignedOut() {
    return (
        <React.Fragment>
            <ul className="header--signedout">
                <li><Link to="sign-up.html">Sign Up</Link></li>
                <li><Link to="/signin">Sign In</Link></li>
            </ul>
        </React.Fragment>
    );
}



export default Header;