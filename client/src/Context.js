import React, { useState } from 'react';
import url from './baseUrl';
import Cookies from 'js-cookie';

export const Context = React.createContext();


export function Provider(props) {
    
    const [ authenticatedUser, setAuth ] = useState(Cookies.getJSON('authenticatedUser') || null);
    const [ errors, setErrors ] = useState([]);

    const getCourses = () => {
        return fetch(`${url}/courses`)
            .then(res => res.json())
            .then(data => data)
            .catch(err => console.log(err));
    }

    const getCourseDetails = (url) => {
        return fetch(url)
            .then(res => res.json())
            .then(data => data)
            .catch(err => console.log(err));
    }

    const updateCourse = (body, id) => {
        const options = {
            method: 'PUT',
            body,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            }
        };
        fetch(`${url}/courses/${id}`, options);
    }

    const createCourse = (body) => {
        const options = {
            method: 'POST',
            body,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            }
        };
        return fetch(`${url}/courses`, options);
    }

    const deleteCourse = id => {
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        }
        fetch(`${url}/courses/${id}`, options);
    }

    const createUser = (body) => {
        const options = {
            method: 'POST',
            body,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        };
        return fetch(`${url}/users`, options);
    }

    const getFormData = e => {
        e.preventDefault();
        const formData = new FormData(e.target.parentNode); 
        const body = {};
    
        for (let pair of formData.entries()) {
            body[pair[0]] = pair[1];
        }
        return body;
    }

    const goBack = (e, path) => {
        e.preventDefault();
        window.location.href = path;
    }

    const signIn = (e, email, password, from) => {
        e.preventDefault();
        // console.log(from);
        const encodedCredentials = btoa(`${email}:${password}`);
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': `Basic ${encodedCredentials}`
            }
        };
        fetch(`${url}/users`, options)
            .then(res => res.json())
            .then(data => {
                if (data.email) {
                    setAuth(data); 
                    Cookies.set('authenticatedUser', JSON.stringify(data), {expires: 1});
                    window.location.href = from.pathname;
                } else {
                    setErrors(data);
                }
            });
    }

    const signOut = () => {
        setAuth(authenticatedUser !== null ? null : authenticatedUser);
        Cookies.remove('authenticatedUser');  
    }


    const signUp = (e) => {
        const capitalizeFirstLetter = name => name.charAt(0).toUpperCase() + name.slice(1);

        const body = getFormData(e);
        body.firstName = capitalizeFirstLetter(body.firstName);
        body.lastName = capitalizeFirstLetter(body.lastName);
        createUser(JSON.stringify(body))
            .then(res => res.json())
            .then(data => {
                if (data.errors) {
                    setErrors(data.errors)
                } else {
                    setAuth(data); 
                    Cookies.set('authenticatedUser', JSON.stringify(data), {expires: 1});
                    window.location.href = '/'; 
                }
            });
    }

    const value = {
        authenticatedUser,
        errors,
        actions: {
           getCourses,
           getCourseDetails,
           updateCourse,
           getFormData,
           goBack,
           createCourse,
           deleteCourse,
           signIn,
           signOut,
           setErrors,
           createUser,
           signUp
        }
    };

    return (
        <Context.Provider value={value}>
            { props.children }
        </Context.Provider>
    );
    
}



