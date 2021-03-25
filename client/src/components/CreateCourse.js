import React, {
    useContext,
    useState
} from 'react';
import { Context } from '../Context';

import Header from './Header';


function CreateCourse() {
    const { actions } = useContext(Context);
    const [ errors, setErrors ] = useState([]);
    
    const setCourse = (e) => {
        const body = actions.getFormData(e);
        actions.createCourse(JSON.stringify(body))
            .then(res => res.json())
            .then(data => {
                if (data.errors) {
                    setErrors(data.errors)
                } else {
                    window.location.href = '/';
                }
            }); 
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

//export this component and use it here and in the signin validation (component) both.
//errors state and setErrors are who interact with the ErrorValidation component
//because they have to be used in two components (ErrorValidation/UserSignIn), consider to move them to Context.js.
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

