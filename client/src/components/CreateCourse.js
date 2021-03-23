import React, { useContext } from 'react';
import { Context } from '../Context';


function CreateCourse() {
    const { actions } = useContext(Context);

    const setCourse = (e) => {
        actions.getFormData(e);
    }

    return (
        <React.Fragment>
            <header>
                <div className="wrap header--flex">
                    <h1 className="header--logo"><a href="index.html">Courses</a></h1>
                    <nav>
                        <ul className="header--signedin">
                            <li>Welcome, Joe Smith!</li>
                            <li><a href="sign-out.html">Sign Out</a></li>
                        </ul>
                    </nav>
                </div>
            </header>
            <main>
                <div className="wrap">
                    <h2>Create Course</h2>
                    <div className="validation--errors">
                        <h3>Validation Errors</h3>
                        <ul>
                            <li>Please provide a value for "Title"</li>
                            <li>Please provide a value for "Description"</li>
                        </ul>
                    </div>
                    <form>
                        <div className="main--flex">
                            <div>
                                <label htmlFor="courseTitle">Course Title</label>
                                <input id="courseTitle" name="courseTitle" type="text" />

                                <label htmlFor="courseAuthor">Course Author</label>
                                <input id="courseAuthor" name="courseAuthor" type="text" />

                                <label htmlFor="courseDescription">Course Description</label>
                                <textarea id="courseDescription" name="courseDescription"></textarea>
                            </div>
                            <div>
                                <label htmlFor="estimatedTime">Estimated Time</label>
                                <input id="estimatedTime" name="estimatedTime" type="text" />

                                <label htmlFor="materialsNeeded">Materials Needed</label>
                                <textarea id="materialsNeeded" name="materialsNeeded"></textarea>
                            </div>
                        </div>
                        <button className="button" type="submit" onClick={(e) => setCourse(e)}>Create Course</button><button className="button button-secondary" onClick={(e) => e.preventDefault().location.href = '/'}>Cancel</button>
                    </form> 
                </div>
            </main>
        </React.Fragment>
    );
}
//setting up the CANCEL button here (try with a custom hook and see) - then setCourse() - validate req.body with db

export default CreateCourse;