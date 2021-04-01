import React, { useContext } from 'react';
import { Context } from '../Context';

import Header from './Header';
import ErrorValidation from './ErrorValidation';


function CreateCourse() {
    const { actions, errors, authenticatedUser } = useContext(Context);

    const setCourse = async (e) => {
        const body = actions.getFormData(e);

        const marked = body.materialsNeeded
            .match(/^.+$[\n\r]*/gm)
            .map((material, index) => {
                if (index === 0) {
                    return '* ' + material;
                } else {
                    return material;
                }
            })
            .join('* ');
        body.materialsNeeded = marked;

        body.isAuthenticated = true;
        const response = await actions.createCourse(JSON.stringify(body));
        if (response.status === 201) {
            window.location.href = '/';
        } else {
            const data = await response.json();
            actions.setErrors(data.errors);
        }
    }

    return (
        <React.Fragment>
            <Header />
            <main>
                <div className="wrap">
                    <h2>Create Course</h2>
                    { errors && errors.length > 0 ? <ErrorValidation errors={errors} /> : '' }
                    <form>
                        <div className="main--flex">
                            <div>
                                <label htmlFor="courseTitle">Course Title</label>
                                <input id="courseTitle" name="title" type="text" />

                                <label htmlFor="courseAuthor">Course Author</label>
                                <input id="courseAuthor" name="userId" type="text" defaultValue={authenticatedUser.name} readOnly='readonly'/>

                                <label htmlFor="courseDescription">Course Description</label>
                                <textarea id="courseDescription" name="description"></textarea>
                            </div>
                            <div>
                                <label htmlFor="estimatedTime">Estimated Time</label>
                                <input id="estimatedTime" name="estimatedTime" type="text" />

                                <label htmlFor="materialsNeeded">Materials Needed</label>
                                <textarea id="materialsNeeded" name="materialsNeeded"></textarea>
                            </div>
                        </div>
                        <button className="button" type="submit" onClick={(e) => setCourse(e)}>Create Course</button><button className="button button-secondary" onClick={(e) => actions.goBack(e, '/')}>Cancel</button>
                    </form> 
                </div>
            </main>
        </React.Fragment>
    );
}



export default CreateCourse;

