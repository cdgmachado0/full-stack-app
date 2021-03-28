import React, { useContext } from 'react';
import {
    Route,
    Redirect
} from 'react-router-dom';
import { Context } from '../Context';


function PrivateRoute({ component: Component}) {
    const { authenticatedUser } = useContext(Context);

    return (
        <Route render={props => authenticatedUser ? (
            <Component />
        ) : (
            <Redirect to={{
                pathname: '/signin',
                state: { from: props.location }
            }} />
        )} />
    );
}



export default PrivateRoute;