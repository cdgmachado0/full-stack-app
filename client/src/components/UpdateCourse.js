import React, {
    useEffect,
    useContext,
    useState
} from 'react';
import { Context } from '../Context';
import url from '../baseUrl';


function UpdateCourse(props) {
    const { actions } = useContext(Context);
    const [ course, setDetails ] = useState({});
    const { id } = props.match.params;
    const fullUrl = url + '/courses/' + id;
    const path = `/courses/${id}`;

    useEffect(() => {
        actions.getCourseDetails(fullUrl)
            .then(data => setDetails(data.course));
    }, [actions, fullUrl]);

    const updateDetails = async (e, id) => {
        const body = actions.getFormData(e);
        await actions.updateCourse(JSON.stringify(body), id);
        window.location.href = `/courses/${id}`;
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
                <h2>Update Course</h2>
                <form>
                    <div className="main--flex">
                        <div>
                            <label htmlFor="courseTitle">Course Title</label>
                            <input id="courseTitle" name="title" type="text" defaultValue={course.title} />

                            <label htmlFor="courseAuthor">Course Author</label>
                            <input id="courseAuthor" name="courseAuthor" type="text" defaultValue={course.Student ? `${course.Student.firstName} ${course.Student.lastName}` : ''} />

                            <label htmlFor="courseDescription">Course Description</label>
                            <textarea id="courseDescription" name="description" defaultValue={course.description} />
                        </div>
                        <div>
                            {course.estimatedTime ?
                                <EstimatedTime estimated={course.estimatedTime} /> :
                                    ''
                            }
                            {course.materialsNeeded ?
                                <MaterialsNeeded materials={course.materialsNeeded} /> :
                                    ''
                            } 
                        </div>
                    </div>
                    <button className="button" type="submit" onClick={(e) => updateDetails(e, id)}>Update Course</button><button className="button button-secondary" onClick={(e) => actions.goBack(e, path)}>Cancel</button>
                </form>
            </div>
        </main>
        </React.Fragment>
    );
}

function EstimatedTime(props) {
    return (
        <React.Fragment>
            <label htmlFor="estimatedTime">Estimated Time</label>
            <input id="estimatedTime" name="estimatedTime" type="text" defaultValue={props.estimated} />
        </React.Fragment>
    );
}

function MaterialsNeeded(props) {
    return (
        <React.Fragment>
            <label htmlFor="materialsNeeded">Materials Needed</label>
            <textarea id="materialsNeeded" name="materialsNeeded" defaultValue={props.materials} />
        </React.Fragment>
    );
} 



export default UpdateCourse;