import React, {
    useEffect,
    useContext,
    useState
} from 'react';
import { Context } from '../Context';
import url from '../baseUrl';
import Courses from './Courses';

function UpdateCourse(props) {
    const { actions } = useContext(Context);
    const [ course, setDetails ] = useState({});

    useEffect(() => {
        const fullUrl = url + props.match.url;
        actions.getCourseDetails(fullUrl)
            .then(data => setDetails(data.course))
    }, [actions, props.match.url]);

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
                            <input id="courseTitle" name="courseTitle" type="text" value={course.title} />

                            <label htmlFor="courseAuthor">Course Author</label>
                            <input id="courseAuthor" name="courseAuthor" type="text" value={course.Student ? `${course.Student.firstName} ${course.Student.lastName}` : null} />

                            <label htmlFor="courseDescription">Course Description</label>
                            <textarea id="courseDescription" name="courseDescription" />{course.description}
                        </div>
                        <div>
                            {course.estimatedTime ?
                                <EstimatedTime estimated={course.estimatedTime} /> :
                                    null
                            }
                            {course.materialsNeeded ?
                                <MaterialsNeeded materials={course.materialsNeeded} /> :
                                    null
                            }
                            

                            <label htmlFor="materialsNeeded">Materials Needed</label>
                            <textarea id="materialsNeeded" name="materialsNeeded">{}</textarea>
                        </div>
                    </div>
                    <button className="button" type="submit">Update Course</button><button className="button button-secondary" onClick="event.preventDefault(); location.href='index.html';">Cancel</button>
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
            <input id="estimatedTime" name="estimatedTime" type="text" value={props.estimated} />
        </React.Fragment>
    );
}

function MaterialsNeeded(props) {
    const { materials } = props;
    let arrMaterials = materials.split('*');
    if (arrMaterials[0] === '') {
        arrMaterials.shift()
    }
    const createList = () => arrMaterials.map((material, index) => <li key={index}>{material}</li>);

    return (
        <React.Fragment>
            <label htmlFor="materialsNeeded">Materials Needed</label>
            <textarea id="materialsNeeded" name="materialsNeeded">{}</textarea>
        </React.Fragment>
    );
} //finishing up with this component 


export default UpdateCourse;