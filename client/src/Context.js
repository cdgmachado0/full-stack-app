import React, { useState } from 'react';
import url from './baseUrl';
import Cookies from 'js-cookie';

export const Context = React.createContext();


export function Provider(props) {
    const [ authenticatedUser, setAuth ] = useState(Cookies.getJSON('authenticatedUser') || null);
    const [ errors, setErrors ] = useState([]);
    const [ ownerId, setOwner ] = useState('');

    /**
     * Main function that interacts (fetches/modifies/deletes) data from the database.
     * @param {string} url url of the request
     * @param {string} method HTTP method
     * @param {object} _body body of the request
     * @param {object} authCredentials log-in credentials from user
     * @returns A promise containing the data fetch from the database
     */
    const api = async (url, method = 'GET', _body, authCredentials) => {
        try {
            let body;
            if (_body) {
                body = JSON.stringify(_body);
            }

            const options = {
                method,
                body,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            };

            if (authCredentials) {
                const { email, password } = authCredentials;
                const encodedCredentials = btoa(`${email}:${password}`);
                options.headers['Authorization'] = `Basic ${encodedCredentials}`;
            }
        
            const res = await fetch(url, options);
            if (res) {return res}

        } catch (err) {
            window.location.href = '/error';
        }      
    }
    
    /**
     * Main function that groups together and format the data of the request before it is sent.
     * Handles the redirection depending on the status of the response.
     * In case of a failed request, modifies the Error state which would be displayed on its proper component.
     * @param {object} e event object
     * @param {string} url url of the request 
     * @param {string} method HTTP method 
     * @param {string} path endpoint of the request 
     */
    const handleCourseUserInter = async (e, url, method, path) => {
        //Formats the text on "Materials Needed" to be Markdown compatible
        const setMarkdown = () => {
            return body.materialsNeeded
                .match(/^.+$[\n\r]*/gm)
                .map((material, index) => index === 0 ? '* ' + material : material)
                .join('* ');
        }

        let body = {};
        if (e) {
            body = getFormData(e);
        }
        if (body.materialsNeeded) {
            body.materialsNeeded = setMarkdown();
        }
        body.isAuthenticated = true;
        
        const response = await api(url, method, body);
        if (response.status === 201 || ( response.status === 204 && method === 'DELETE' )) {
            window.location.href = '/';
        } else if (response.status === 204) {
            window.location.href = path;
        } else {
            const data = await response.json();
            setErrors(data.errors);
        }
    }

    /**
     * Signs in an user or sets the Error state if credentials don't match with database.
     * Sets the user's credentials to a cookie.
     * @param {object} e event object
     * @param {string} email user's email
     * @param {string} password user's password
     * @param {object} from contains the path of redirection
     */
    const signIn = (e, email, password, from) => { 
        e.preventDefault();
        api(`${url}/users`, 'GET', null, { email, password })
            .then(res => res.json())
            .then(data => {
                if (data.email) {
                    setAuth(data); 
                    Cookies.set('authenticatedUser', JSON.stringify(data), {expires: 1});
                    if (typeof from === 'object') {
                        window.location.href = from.pathname;
                    } else {
                        window.location.href = from;
                    }
                } else {
                    setErrors(data);
                }
            });
    }

    /**
     * Signs out the authenticated user and remove their cookie from storage.
     */
    const signOut = () => {
        setAuth(authenticatedUser !== null ? null : authenticatedUser);
        Cookies.remove('authenticatedUser');  
    }

    /**
     * Signs up a new user by sending their details to the database.
     * Sets the new user's credentials to a cookie.
     * @param {object} e event object
     */
    const signUp = e => {
        //For styling purposes, capitalizes the user's first letter on both first and last names. 
        const capitalizeFirstLetter = name => name.charAt(0).toUpperCase() + name.slice(1);

        const body = getFormData(e);
        body.firstName = capitalizeFirstLetter(body.firstName);
        body.lastName = capitalizeFirstLetter(body.lastName);

        api(`${url}/users`, 'POST', body)
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

    /**
     * Gets the values from the form elements and formats them as the body of the request.
     * @param {object} e event object
     * @returns body of the request
     */
    const getFormData = e => {
        e.preventDefault();
        const formData = new FormData(e.target.parentNode); 
        const body = {};
    
        for (let pair of formData.entries()) {
            body[pair[0]] = pair[1];
        }
        return body;
    }

    /**
     * Redirects the user to the page where they were before.
     * @param {object} e event object
     * @param {string} path previous endpoint
     */
    const goBack = (e, path) => {
        e.preventDefault();
        window.location.href = path;
    }

    
    const value = {
        authenticatedUser,
        errors,
        ownerId,
        actions: {
           getFormData,
           goBack,
           signIn,
           signOut,
           setErrors,
           signUp,
           setOwner,
           api,
           handleCourseUserInter
        }
    };

    return (
        <Context.Provider value={value}>
            { props.children }
        </Context.Provider>
    );
    
}



