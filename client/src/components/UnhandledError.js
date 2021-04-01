import React from 'react';

import Header from './Header';


function UnhandledError() {
    return (
        <React.Fragment>
            <Header />
            <main>
                <div class="wrap">
                    <h2>Error</h2>
                    <p>Sorry! We just encountered an unexpected error.</p>
                </div>
            </main>   
        </React.Fragment>
    );
}


export default UnhandledError;