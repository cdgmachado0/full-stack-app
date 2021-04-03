import React, { useState } from 'react';
import url from './baseUrl';
import Cookies from 'js-cookie';

export const Context = React.createContext();


export function Provider(props) {
    
    const [ authenticatedUser, setAuth ] = useState(Cookies.getJSON('authenticatedUser') || null);
    const [ errors, setErrors ] = useState([]);
    const [ ownerId, setOwner ] = useState('');


    const api = async (url, method = 'GET', _body) => {
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

            const res = await fetch(url, options);
            if (res) {return res}
        } catch (err) {
            window.location.href = '/error';
        }
            
    }
    

    const handleCourseUserInter = async (e, url, method, path) => {
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
                    console.log(from);
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

    const signOut = () => {
        setAuth(authenticatedUser !== null ? null : authenticatedUser);
        Cookies.remove('authenticatedUser');  
    }


    const signUp = (e) => {
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



