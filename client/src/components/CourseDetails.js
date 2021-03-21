import React, {
    useEffect,
    useContext,
    useState
} from 'react';
import { Context } from '../Context';
import url from '../baseUrl';


function CourseDetails(props) {
    const { actions } = useContext(Context);
    const [ course, setDetails ] = useState({});

    useEffect(() => {
        const fullUrl = url + props.match.url;
        actions.getCourseDetails(fullUrl)
            .then(data => setDetails(data.course))
    }, [actions, props.match.url]);

    return(
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
            <div className="actions--bar">
                <div className="wrap">
                    <a className="button" href="update-course.html">Update Course</a>
                    <a className="button" href="/">Delete Course</a>
                    <a className="button button-secondary" href="index.html">Return to List</a>
                </div>
            </div>
            
            <div className="wrap">
                <h2>Course Detail</h2>
                <form>
                    <div className="main--flex">
                        <div>
                            <h3 className="course--detail--title">Course</h3>
                            <h4 className="course--name">{course.title}</h4>
                            <p>By {course.Student ? `${course.Student.firstName} ${course.Student.lastName}` : null }</p>

                            <p>{course.description}</p>
                            
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
                            

                            {/* <h3 className="course--detail--title">Materials Needed</h3>
                            <ul className="course--detail--list">
                                <li>1/2 x 3/4 inch parting strip</li>
                                <li>1 x 2 common pine</li>
                                <li>1 x 4 common pine</li>
                                <li>1 x 10 common pine</li>
                                <li>1/4 inch thick lauan plywood</li>
                                <li>Finishing Nails</li>
                                <li>Sandpaper</li>
                                <li>Wood Glue</li>
                                <li>Wood Filler</li>
                                <li>Minwax Oil Based Polyurethane</li>
                            </ul> */}
                        </div>
                    </div>
                </form>
            </div>
        </main>
        </React.Fragment>
    );
}

function EstimatedTime(props) {
    return (
        <React.Fragment>
        <h3 className="course--detail--title">Estimated Time</h3>
        <p>{props.estimated}</p>
        </React.Fragment>
    );
}

function MaterialsNeeded(props) {
    return (
        <React.Fragment>
            <h3 className="course--detail--title">Materials Needed</h3>
            <ul className="course--detail--list">
                <li>{props.materials}</li>
            </ul>
        </React.Fragment>
    );
}


export default CourseDetails;


