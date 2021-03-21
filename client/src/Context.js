import React, { useState } from 'react';
import url from './baseUrl';

export const Context = React.createContext();


export function Provider(props) {
    // const [ courses, setCourses ] = useState([]);

    const getCourses = async () => {
        return await fetch(`${url}/courses`)
            .then(res => res.json())
            .then(data => data); 
    }

    const value = {
        actions: {
           getCourses,
        }
    };

    return (
        <Context.Provider value={value}>
            { props.children }
        </Context.Provider>
    );
    
}


