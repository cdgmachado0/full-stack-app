import React, { 
    useContext, 
    useState, 
    useEffect 
} from 'react';
import { Context } from '../Context';
import url from '../baseUrl';

import Header from './Header';

function Courses() {
    const { actions } = useContext(Context);
    const [ courses, setCourses ] = useState(null);
    
    useEffect(() => {
        actions.api(`${url}/courses`)
            .then(res => res.json())
            .then(data => setCourses(data.courses));
    }, [actions]);

    /**
     * Renders the list of courses
     * @returns array of Course components
     */
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
            {courses ? 
                <React.Fragment>
                    <Header />
                    <main>
                        <div className="wrap main--grid">
                            {courses.length ? renderCourses() : null}
                            <a className="course--module course--add--module" href="/courses/create">
                                <span className="course--add--title">
                                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                    viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
                                    New Course
                                </span>
                            </a>
                        </div>
                    </main>
                </React.Fragment>
            : <div/>}
        </React.Fragment>
        
    );
}


function CourseTemplate(props) {
    return (
        <a className="course--module course--link" href={`/courses/${props.id}`}>
            <h2 className="course--label">Course</h2>
            <h3 className="course--title">{props.name}</h3>
        </a>
    );
}

export default Courses;


