import React from 'react';
import url from './baseUrl';

export const Context = React.createContext();


export function Provider(props) {

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

    const value = {
        actions: {
           getCourses,
           getCourseDetails,
           updateCourse,
           getFormData,
           goBack,
           createCourse,
           deleteCourse
        }
    };

    return (
        <Context.Provider value={value}>
            { props.children }
        </Context.Provider>
    );
    
}



