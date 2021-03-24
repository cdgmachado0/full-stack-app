import React, {
    useContext,
    useState
} from 'react';
import { Context } from '../Context';


function CreateCourse() {
    const { actions } = useContext(Context);
    const [ errors, setErrors ] = useState([]);
    
    const setCourse = (e) => {
        const body = actions.getFormData(e);
        actions.createCourse(JSON.stringify(body))
            .then(res => res.json())
            .then(data => setErrors(data.errors));
        window.location.href = '/';
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
                    { errors && errors.length > 0 ? <ErrorValidation errors={errors} /> : '' }
                    <form>
                        <div className="main--flex">
                            <div>
                                <label htmlFor="courseTitle">Course Title</label>
                                <input id="courseTitle" name="title" type="text" />

                                <label htmlFor="courseAuthor">Course Author</label>
                                <input id="courseAuthor" name="userId" type="text" />

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


function ErrorValidation(props) {
    return (
        <React.Fragment>
            <div className="validation--errors">
                <h3>Validation Errors</h3>
                <ul>
                    {props.errors.map((error, i) => <li key={i}>{error}</li>)}
                </ul>
            </div>  
        </React.Fragment>
    );
}


export default CreateCourse;

//got this to work but i have to put an author like a userID (foregin key).
//Otherwise I get a 500 error.
//Code a way to associate a name with an user ID fro mthe table.
//If the new author to be created doesn't have an id, create a new entry
//and assign him an ID