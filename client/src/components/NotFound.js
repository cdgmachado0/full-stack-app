import React from 'react';

import Header from './Header';


function NotFound() {
    return (
        <React.Fragment>
            <Header />
            <main>
                <div className="wrap">
                    <h2>Not Found</h2>
                    <p>Sorry! We couldn't find the page you're looking for.</p>
                </div>
            </main>
        </React.Fragment>
    );
}


export default NotFound;