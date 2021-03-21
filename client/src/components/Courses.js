import React, { 
    useContext, 
    useState, 
    useEffect 
} from 'react';
import { Context } from '../Context';

import CourseTemplate from './CourseTemplate';

function Courses() {
    const { actions } = useContext(Context);
    const [ courses, setCourses ] = useState([]);
    
    useEffect(() => {
        actions.getCourses()
            .then(data => setCourses(data.courses));
    }, [actions]);

    const renderCourses = () => {
        return courses.map((course, index) => (
            <CourseTemplate 
                name={course.title}
                id={course.id}
                key={index}
            />
        ));
    }

    return (
        <React.Fragment>
            <header>
                <div className="wrap header--flex">
                    <h1 className="header--logo"><a href="index.html">Courses</a></h1>
                    <nav>
                        <ul className="header--signedout">
                            <li><a href="sign-up.html">Sign Up</a></li>
                            <li><a href="sign-in.html">Sign In</a></li>
                        </ul>
                    </nav>
                </div>
            </header>
            <main>
                <div className="wrap main--grid">
                    {courses.length ? renderCourses() : null}
                    <a className="course--module course--add--module" href="create-course.html">
                        <span className="course--add--title">
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                            viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
                            New Course
                        </span>
                    </a>
                </div>
            </main>
        </React.Fragment>
        
    );
}

export default Courses;