import React from 'react';

import Header from './Header';


function Forbidden() {
    return (
        <React.Fragment>
            <Header />
            <main>
                <div class="wrap">
                    <h2>Forbidden</h2>
                    <p>Oh oh! You can't access this page.</p>
                </div>
            </main>
        </React.Fragment>
    );
}


export default Forbidden;

//working on the comp that gets rendered when isOwner failes ---->