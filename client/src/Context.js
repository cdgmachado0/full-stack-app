import React from 'react';
import url from './baseUrl';

export const Context = React.createContext();


export function Provider(props) {

    const getCourses = async () => {
        return await fetch(`${url}/courses`)
            .then(res => res.json())
            .then(data => data)
            .catch(err => console.log(err));
    }

    const getCourseDetails = async (url) => {
        return await fetch(url)
            .then(res => res.json())
            .then(data => data)
            .catch(err => console.log(err));
    }

    const updateCourse = async (form, id) => {
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            }
        }
        console.log(form);
        options.body = JSON.stringify(form);
        await fetch(`${url}/courses/${id}`, options);
    }

    const value = {
        actions: {
           getCourses,
           getCourseDetails,
           updateCourse
        }
    };

    return (
        <Context.Provider value={value}>
            { props.children }
        </Context.Provider>
    );
    
}


