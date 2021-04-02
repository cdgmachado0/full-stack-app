import React, { useContext } from 'react';
import { Context } from '../Context';

import Header from './Header';
import ErrorValidation from './ErrorValidation';
import url from '../baseUrl';


function CreateCourse() {
    const { actions, errors, authenticatedUser } = useContext(Context);
    const fullUrl = url + '/courses';

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
                        <button className="button" type="submit" onClick={(e) => actions.setCourseDetails(e, fullUrl, 'POST')}>Create Course</button><button className="button button-secondary" onClick={(e) => actions.goBack(e, '/')}>Cancel</button>
                    </form> 
                </div>
            </main>
        </React.Fragment>
    );
}



export default CreateCourse;

